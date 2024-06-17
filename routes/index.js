const router = require('express').Router();

const ResourcesRoutes = require('./ResourcesRoutes');
const ToolsRoutes = require('./ToolsRoutes');
const ResultsRoutes = require('./ResultsRoutes');
const ConfigRoutes = require('./ConfigRoutes');
const ProcessRoutes = require('./ProcessRoutes');


router.use('/Resources', ResourcesRoutes);
router.use('/tools', ToolsRoutes);
router.use('/results', ResultsRoutes);
router.use('/config', ConfigRoutes);
router.use('/process', ProcessRoutes);

module.exports = router;
