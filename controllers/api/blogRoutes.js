const router = require('express').Router();
const { Blog } = require('../../models');
const checkLogin = require('../../utils/checkLogin');

router.post('/', checkLogin, async (req, res) => {
  try {
    
    const newBlog = await Blog.create({
    ...req.body,
      user_id: req.session.user_id,
      
    });
console.log("from the post in blog")
    res.render('account', {
      newBlog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log("err", err)
    res.status(400).json(err);
    
  }

});

router.put('/update/:id',  async (req, res) => {
  // console.log("123")
  try {

    
    // console.log("456")
    const updateBlog = await Blog.update(req.body,
        {where: {id:req.params.id}}
    );
   
console.log("updateBlog",updateBlog)
    // res.render('account', {
    //   updateBlog,
    //   logged_in: req.session.logged_in
    // });
    res.status(200).json(updateBlog);
  } catch (err) {
    console.log("err", err)
    res.status(400).json(err);
  }

});

router.delete('/:id', checkLogin, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
