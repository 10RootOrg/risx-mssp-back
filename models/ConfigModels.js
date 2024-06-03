const { error } = require('ajv/dist/vocabularies/applicator/dependencies.js')
const DBConnection = require('../db.js')
const { DiscrError } = require('ajv/dist/vocabularies/discriminator/types.js')
 
 const config_table = "configjson"
 const config_column = "config"
 


 
async function get_full_config_model() {


const tmpconfig = {
  "General": {
    "DefaultInter": ""
  },
  "ClientInfrastructure": {
    "Assets": [
      {
        "AssetEnable": true,
        "AssetType": ["Domain"],
        "AssetString": "18.168.185.151",
        "AssetModules": ["Velociraptor", "Nuclei"]
      }
    ],

    "Population": [
      {
        "ComputerName": "SRV1",
        "Label": ""
      },
      {
        "ComputerName": "SRV3",
        "Label": ""
      }
    ]
  },

  "ClientData": {
    "API": {
      "Shodan": "APIKey",
      "Dehashed": "APIKey",
      "OpenAI": "APIKey"
    }
  },

  "Modules": {
    "Velociraptor": {
      "id": "",
      "ModulName": "Velociraptor",
      "Enable": true,
      "LastRunDate": "",
      "SubModules": {
        "PersistenceSniper": {
          "id": "",
          "SubModulName": "PersistenceSniper",
          "Enable": true,
          "Expire_Date": "1D",
          "Time_Interval": "15",
          "LastRunDate": "",
          "Arguments": {}
        },
        "HardeningKitty": {
          "id": "",
          "SubModulName": "HardeningKitty",
          "Enable": true,
          "ExpireDate": "1D",
          "TimeInterval": "15",
          "LastRunDate": "",
          "Arguments": {
            "TakeBackUp": "N",
            "Baseline": "finding_list_0x6d69636b_machine"
          }
        },
        "Zircolite": {
          "id": "",
          "SubModulName": "Zircolite",
          "Enable": true,
          "ExpireDate": "1D",
          "TimeInterval": "15",
          "LastRunDate": "",
          "Arguments": {
            "EVTXPath": "C:\\\\Windows\\\\System32\\\\winevt\\\\Logs",
            "Rules": "https:\\\\raw.githubusercontent.com\\\\wagga40\\\\Zircolite\\\\master\\\\rules\\\\rules_windows_generic.json",
            "Mappings": "https:\\\\raw.githubusercontent.com\\\\wagga40\\\\Zircolite\\\\master\\\\config\\\\fieldMappings.json"
          }
        },
        "Hayabusa": {
          "id": "",
          "SubModulName": "Hayabusa",
          "Enable": true,
          "ExpireDate": "1D",
          "TimeInterval": "15",
          "LastRunDate": "",
          "Arguments": {
            "UTC": "Y",
            "UpdateRules": "Y",
            "NoisyRules": "N",
            "OutputProfile": "standard",
            "EIDFilter": "N",
            "MinimalLevel": "informational",
            "Threads": "2"
          }
        }
      }
    },
    "Nuclei": {
      "id": "",
      "ModulName": "Velociraptor",
      "ExpireDate": "1D",
      "TimeInterval": "15",
      "Enable": true,
      "LastRunDate": "",
      "Arguments": {
        "nucleiTags": "",
        "nucleiWorkflow": "",
        "nucleiExcludeSeverity": "",
        "nucleiTargets": "18.168.185.151"
      }
    }
  }
  ,"History":[]
}

  try {

const [the_config_json] = await DBConnection(config_table).select(config_column)
console.log("the_config_json  "  , the_config_json);
console.log("the_config_json  "  , the_config_json.config.Modules.Nuclei);
// const [Nuclei] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.Modules.Nuclei") as data FROM configjson;');
// console.log("ddddssssssssssssssssss Nuclei"  , Nuclei[0].data);

// const [ReqestStatus] = await DBConnection.raw('SELECT JSON_EXTRACT(config,"$.ReqestStatus") as data FROM configjson;');
//  console.log("ReqestStatus ReqestStatus"  , ReqestStatus[0] );

return the_config_json

          }

     catch (err) {
      const error_m = {
        error:"Error find get_full_config_model",
        DiscrError:[err]
      }
      console.error('Error find get_full_config_model:', err);
      return error_m
   }
} 



module.exports = { get_full_config_model,};
