const express = require('express');
const {check,validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

//@route GET api/posts
//@desc test route
//@access public
router.get('/',(req,res) => {
    res.send("user routes");
});

//@route POST api/posts
//@desc create a post
//@access private

router.post('/',[auth,
    [
        check('text', 'text is required').not().isEmpty()
    ]
],async(req,res) => {
    errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    };

    try{
        const user = User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });

        const post = await newPost.save();

        res.json(post);

    }catch(error){
        res.status(500).json({error: 'Server Error'})
    }

});

module.exports = router;
