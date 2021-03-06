const { Router } = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Minimum password length 6 symbols').isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      console.log(req.method, req.body, req.path);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data'
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        res.status(400).json({ message: 'This email is incorrect' });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User created' });
    } catch (e) {
      res.status(500).json({ message: `Something went wrong: ${e}` });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Enter correct email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data'
        });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Incorrect password, please try again' });
      }
      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h'
      });

      res.status(201).json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
);

module.exports = router;
