const router = require('express').Router();
const { Blog } = require('../../models');
const checkLogin = require('../../utils/checkLogin');

router.post('/', checkLogin, async (req, res) => {
  console.log("checkpoint 1")
  try {
    const newBlog = await Blog.create({
    ...req.body,
    
      user_id: req.session.user_id,

    ...console.log(req.session)

    });
    console.log("checkpoint 2")


    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
  console.log("checkpoint 3")

});
console.log("checkpoint 4")

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
