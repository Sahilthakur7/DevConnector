const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const router = express.Router();

//@route GET api/profile/me
//@desc get user's profile
//@access private
router.get('/me',auth,async(req,res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            res.status(400).json({errors: [{message: "There is no profile for this user"}]});
        }

    }catch(err){
        res.status(400).json({errors: [{message: "Cannot fetch the profile, server error"}]})
    }
});

module.exports = router;
