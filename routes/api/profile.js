const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator/check');

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

//@route POST api/profile
//@desc  Create or update user profile
//@access private
router.post('/',[auth,[
    check('status','status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()
]],async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    //Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    try{
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id},{$set: profileFields},{new: true});

            return res.json(profile);
        }else{
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        }
    }catch(error){
        console.log(error);
        res.status(500).send('Server Error')
    }

    res.send("hello");
});

//@route GET api/profile
//@desc  Gets all profiles
//@access public

router.get('/', async(req,res) => {
    try{
        const profiles = await Profile.find({}).populate('user',['name' , 'avatar']);
        res.json(profiles);
    }catch(error){
        console.log(error);
        res.status(400).send('Some error');
    }
});

//@route GET api/profile/user/:user_id
//@desc  Gets profile by user id
//@access public

router.get('/user/:user_id', async(req,res) => {
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg: 'No matching profile for this user'});
        }else{
            res.json(profile);
        }
    }catch(err){
        console.log(err);
        if(err.kind === 'ObjectId'){
            return res.status(400).json({msg: "No matching profile for this user"});
        }
    }
})

module.exports = router;
