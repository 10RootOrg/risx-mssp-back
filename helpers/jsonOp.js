function mergeJSONData(newData, oldData) {
    try {
        
        // Function to merge objects recursively
        function mergeObjects(newObj, oldObj) {
            const result = { ...newObj }; // Start with new object to preserve new fields
            
            // Iterate through old object properties
            for (const key in oldObj) {
                if (oldObj.hasOwnProperty(key) && newObj.hasOwnProperty(key)) {
                    // If both objects have this key
                    if (typeof oldObj[key] === 'object' && oldObj[key] !== null && 
                        typeof newObj[key] === 'object' && newObj[key] !== null &&
                        !Array.isArray(oldObj[key]) && !Array.isArray(newObj[key])) {
                        // If both are objects (not arrays), merge recursively
                        result[key] = mergeObjects(newObj[key], oldObj[key]);
                    } else {
                        // For primitive values or arrays, use old data
                        result[key] = oldObj[key];
                    }
                }
                // If key only exists in old object, ignore it (don't add to result)
            }
            
            return result;
        }
        
        // Handle different JSON structures
        let mergedData;
        
        if (Array.isArray(newData) && Array.isArray(oldData)) {
            // If both are arrays, merge by index
            mergedData = newData.map((newItem, index) => {
                if (index < oldData.length) {
                    return mergeObjects(newItem, oldData[index]);
                }
                return newItem; // Keep new items that don't have old counterparts
            });
        } else if (typeof newData === 'object' && typeof oldData === 'object') {
            // If both are objects, merge directly
            mergedData = mergeObjects(newData, oldData);
        } else {
            throw new Error('JSON files must have compatible structures (both objects or both arrays)');
        }
        
        console.log('✅ JSON data merged successfully!');
        
        // Show summary of what was merged
        console.log('\n📊 Merge Summary:');
        if (Array.isArray(mergedData)) {
            console.log(`   - Merged ${mergedData.length} items`);
        } else {
            console.log(`   - Merged object with ${Object.keys(mergedData).length} top-level properties`);
        }
        
        return mergedData;
        
    } catch (error) {
        console.error('❌ Error merging files:', error.message);
        throw error;
    }
}

// Function to preview what fields will be merged (without actually merging)
function previewMerge(newData, oldData) {
    try {
        
        function getSharedKeys(newObj, oldObj, path = '') {
            const shared = [];
            const newOnly = [];
            const oldOnly = [];
            
            // Get all unique keys
            const allKeys = new Set([...Object.keys(newObj), ...Object.keys(oldObj)]);
            
            for (const key of allKeys) {
                const currentPath = path ? `${path}.${key}` : key;
                
                if (newObj.hasOwnProperty(key) && oldObj.hasOwnProperty(key)) {
                    shared.push(currentPath);
                    
                    // Recursively check nested objects
                    if (typeof newObj[key] === 'object' && typeof oldObj[key] === 'object' &&
                        newObj[key] !== null && oldObj[key] !== null &&
                        !Array.isArray(newObj[key]) && !Array.isArray(oldObj[key])) {
                        const nested = getSharedKeys(newObj[key], oldObj[key], currentPath);
                        shared.push(...nested.shared);
                        newOnly.push(...nested.newOnly);
                        oldOnly.push(...nested.oldOnly);
                    }
                } else if (newObj.hasOwnProperty(key)) {
                    newOnly.push(currentPath);
                } else {
                    oldOnly.push(currentPath);
                }
            }
            
            return { shared, newOnly, oldOnly };
        }
        
        // Handle arrays vs objects
        let analysis;
        if (Array.isArray(newData) && Array.isArray(oldData) && newData.length > 0 && oldData.length > 0) {
            analysis = getSharedKeys(newData[0], oldData[0]);
            console.log('📋 Preview based on first array item:');
        } else {
            analysis = getSharedKeys(newData, oldData);
            console.log('📋 Merge Preview:');
        }
        
        console.log(`\n✅ Shared fields (will be updated from old file):`);
        analysis.shared.forEach(field => console.log(`   - ${field}`));
        
        console.log(`\n🆕 New-only fields (will be preserved):`);
        analysis.newOnly.forEach(field => console.log(`   - ${field}`));
        
        console.log(`\n🗂️ Old-only fields (will be ignored):`);
        analysis.oldOnly.forEach(field => console.log(`   - ${field}`));
        
        return analysis;
        
    } catch (error) {
        console.error('❌ Error previewing merge:', error.message);
        throw error;
    }
}

// Example usage:
const newJson = {
    "name": "",
    "email": "",
    "phone": "",
    "newField": "new value",
    "settings": {
        "theme": "dark",
        "notifications": true,
        "newSetting": "default"
    }
};

const oldJson = {
    "name": "John Doe",
    "email": "john@example.com", 
    "phone": "123-456-7890",
    "oldField": "this will be ignored",
    "settings": {
        "theme": "light",
        "notifications": false,
        "oldSetting": "removed"
    }
};

// 1. Preview the merge first
// previewMerge(newJson, oldJson);

// 2. Perform the actual merge
// const mergedResult = mergeJSONData(newJson, oldJson);
// console.log(JSON.stringify(mergedResult, null, 2));

module.exports = { mergeJSONData, previewMerge };