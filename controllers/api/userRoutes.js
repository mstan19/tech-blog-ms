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
  console.log(req.body)
      req.session.save(() => {
        req.session.loggedIn = true;
        console.log(req.session)
  
        res.status(200).json(userDB);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
console.log("***1***")
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Either the email or password is incorrect' });
      return;
    }
    console.log("**2***")

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(500)
        .json({ message: 'Either the email or password is incorrect' });
      return;
    }
    console.log("***3***")
console.log(req.session)
    req.session.save(() => {
        console.log("test")
      req.session.user_id = userData.id;
      console.log("test2")

      req.session.logged_in = true;
      console.log("test3")

      
      res.json({ user: userData, message: 'You are logged in' });
    });
    console.log("***4***")

  } catch (err) {
    res.status(400).json(err);
  }
});
console.log("***5***")

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
console.log("***6***")

module.exports = router;