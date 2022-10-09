const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const checkLogin = require('../utils/checkLogin');

// the homepage
//Goal: render all the blogs. Needs the checkLogin middleware to seee if the user is logged in (if not the browser will be redirected to login screeen)
//put the middleware back in
router.get('/', async (req, res) => {
    console.log("****1**")

  try {
    console.log("***2***")

    //get all blogs and joins it with the user db
    const blogData = await Blog.findAll(
        {   
            raw: true,
            nest: true,
            include: [
                { 
                    model: User,
                    attributes: ['name'], 
                }

            ],
        }

    );
      console.log("***3***")

    // Serialize data so the template can read it
    console.log("***4***")

    //temporaily use this
    // res.status(200).json(blogData);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      homepage: blogData, 
      logged_in: req.session.logged_in   
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//when the user clicks on one of the blogs, it will render that blog using the id
router.get('/blog/:id', checkLogin, async (req, res) => {
  try {
    console.log("***5***");

    const blogData = await Blog.findByPk(req.params.id, 
        {   
            raw: true,
            nest: true,
            include: [
                { 
                    model: Comment,
                    attributes: ['comments'] 
                }

            ],
        }
    );
    console.log("***6***");

// console.log(req.params.id)
    res.status(200).json(blogData);

    res.render('blog', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/account', checkLogin, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/blog');
    return;
  }

  res.render('login');
});

module.exports = router;