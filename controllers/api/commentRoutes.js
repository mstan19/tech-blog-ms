const router = require('express').Router();
const { Comment } = require('../../models');
const checkLogin = require('../../utils/checkLogin');

router.post('/', checkLogin, async (req, res) => {
  try {
    const newComment = await Comment.create( {
      ...req.body,
      user_id: req.session.user_id,
      // blog_id:req.session.blog_id
    });

    res.status(200).json(newComment);
    
  } catch (err) {
    res.status(400).json(err);
  }
  
});


// router.delete('/:id', checkLogin, async (req, res) => {
//   try {
//     const blogData = await Blog.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!blogData) {
//       res.status(404).json({ message: 'No blog found with this id!' });
//       return;
//     }

//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;