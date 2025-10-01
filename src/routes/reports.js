const router = require('express').Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/roles');
const { getReport } = require('../controllers/reportController');

router.get('/', auth, permit('Admin','Manager'), getReport);

module.exports = router;
