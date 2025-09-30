const router = require('express').Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/roles');
const { createTeam, getTeams } = require('../controllers/teamController');

router.post('/', auth, permit('Admin','Manager'), createTeam);
router.get('/', auth, getTeams);

module.exports = router;
