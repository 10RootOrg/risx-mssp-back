const router = require('express').Router();

const ResourcesRoutes = require('./ResourcesRoutes');
const ToolsRoutes = require('./ToolsRoutes');
const ResultsRoutes = require('./ResultsRoutes');
const ConfigRoutes = require('./ConfigRoutes');
const ProcessRoutes = require('./ProcessRoutes');
const UsersRoutes = require('./UsersRoutes');

router.use('/Resources', ResourcesRoutes);
router.use('/tools', ToolsRoutes);
router.use('/results', ResultsRoutes);
router.use('/config', ConfigRoutes);
router.use('/process', ProcessRoutes);
router.use('/users', UsersRoutes);

module.exports = router;
