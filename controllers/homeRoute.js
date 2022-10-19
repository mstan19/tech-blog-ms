const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const checkLogin = require('../utils/checkLogin');

// the homepage
//Goal: render all the blogs. Needs the checkLogin middleware to seee if the user is logged in (if not the browser will be redirected to login screeen)
//put the middleware back in
router.get('/', async (req, res) => {

  try {

    //get all blogs and joins it with the user db
    const blogData = await Blog.findAll(
        {   raw: true,
            nest: true,
            include: [
                { 
                    model: User,
                    attributes: ['name'], 
                }
            ],
        }
    );

    // Serialize data so the template can read it

    //temporaily use this
    // res.status(200).json(blogData);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogData, 
      logged_in: req.session.logged_in   
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//add middleware
//when the user clicks on one of the blogs, it will render that blog using the id
router.get('/blog/:id', checkLogin, async (req, res) => {
  try {

    const blogs = await Blog.findByPk(req.params.id, 
        {   
            raw: true,
            nest: true,
            include: [
                { 
                    model: Comment,
                    attributes: ['comments'] 
                },
                { 
                  model: User,
                  attributes: ['name'] 
                }

            ],
        }
    );

    const allComment = await Comment.findAll(
      {   
          raw: true,
          nest:true,
          where: {blog_id: blogs.id},
          include: [
            
            { 
              model: User,
              attributes: ['name'] 
            }

        ],
      }
  );
    // res.status(200).json(blogIdData);
    console.log("** allComment",allComment)
    res.render('blog', {
      blogs,
      allComment,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/account', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('account', {
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