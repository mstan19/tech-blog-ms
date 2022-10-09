//post 
const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');
// const checklogin = require('../../utils/checkLogin');



router.post('/', async (req, res) => {
    console.log("****", req.body);
  try {
    console.log("****", req.body);
    // const getUserID = await User.findByPk(req.params.id)
    const newComment = await Comment.create(req.body);

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;