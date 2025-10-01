const router = require('express').Router();
const { registerSchema, loginSchema } = require('../validators/auth');
const { register, login } = require('../controllers/authController');
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports = router;
