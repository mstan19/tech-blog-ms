const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
// the params needs to match how the columns are defined as
router.post('/', async (req, res) => {
    try {
      const userDB = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(userDB);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Either the email or password is incorrect' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(500)
        .json({ message: 'Either the email or password is incorrect' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;

      req.session.logged_in = true;

      
      res.json({ user: userData, message: 'You are logged in' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;