const router = require('express').Router();
const auth = require('../middlewares/auth');
const permit = require('../middlewares/roles');
const { createTeam, getTeams, assignUser  } = require('../controllers/teamController');

router.post('/', auth, permit('Admin','Manager'), createTeam);
router.get('/', auth, getTeams);
// Assign a user to a team (Admin only)
router.put('/:id/assign', auth, permit('Admin'), assignUser);

module.exports = router;
