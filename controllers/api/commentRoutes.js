const router = require('express').Router();
const { Comment } = require('../../models');
const checkLogin = require('../../utils/checkLogin');

router.post('/', checkLogin, async (req, res) => {
  try {
    console.log("**58***", req.body)
    const newComment = await Comment.create( {
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
    
  } catch (err) {
    res.status(400).json(err);
  }
  
});

module.exports = router;