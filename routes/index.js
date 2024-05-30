const router = require('express').Router();

const ResourcesRoutes = require('./ResourcesRoutes');
const ToolsRoutes = require('./ToolsRoutes');
const ResultsRoutes = require('./ResultsRoutes');



router.use('/Resources', ResourcesRoutes);
router.use('/tools', ToolsRoutes);
router.use('/results', ResultsRoutes);



module.exports = router;
