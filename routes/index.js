const router = require('express').Router();
const apiRoutes = require('./api');

// router.use('/api', (req, res) => res.send('Wrong route!'));

router.use('/api', apiRoutes);

module.exports = router;
