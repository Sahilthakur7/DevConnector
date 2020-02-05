const express = require('express');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator/check');
const config = require('config');
const request = require('request');

const router = express.Router();

//@route GET api/profile/me
//@desc get user's profile
//@access private
router.get('/me',auth,async(req,res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
            res.status(400).json({errors: [{message: "There is no profile for this user"}]});
        }else{
            res.status(200).json(profile);
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

            console.log(profile);

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

//@route DELETE api/profile
//@desc  Delete profile,user and posts
//@access private

router.delete('/',auth, async(req,res) => {
    try{
        //@todo - remove user,posts
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: "User and his profile have been deleted"});
    }catch(error){
        console.log(error);
        return res.status(400).json({msg: "Server Error"})
    }
});

//@route PUT api/profile/experience
//@desc  Add profile experience
//@access private

router.put('/experience',[ auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

] ],async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try{
        const profile = await Profile.findOne({user: req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json({profile});
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "Error present"})
    }

});

//@route DELETE api/profile/experience/:exp_id
//@desc  Delete experience from profile
//@access private

router.delete('/experience/:exp_id',auth,async(req,res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id});

        const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1);

        await profile.save();

        res.json(profile);
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "ERROR"})
    }
})

//@route PUT api/profile/education
//@desc  Add profile education
//@access private

router.put('/education',[ auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofStudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

] ],async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {
        school,
        degree,
        fieldofStudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newEdu = {
        school,
        degree,
        fieldofStudy,
        from,
        to,
        current,
        description
    };

    try{
        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json({profile});
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "Error present"})
    }

});

//@route DELETE api/profile/education/:edu_id
//@desc  Delete education from profile
//@access private

router.delete('/education/:edu_id',auth,async(req,res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id});

        const removeIndex = profile.education.map(item => item._id).indexOf(req.params.exp_id);
        profile.education.splice(removeIndex,1);

        await profile.save();

        res.json(profile);
    }catch(error){
        console.log(error);
        res.status(500).json({msg: "ERROR"})
    }
})

//@route GET api/profile/github/:username
//@desc  Get user repos from github
//@access public

router.get('/github/:username', async(req,res) => {
    try{
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        request(options, (error,response, body) => {
            if(error) console.log(error);
            if(response.statusCode !== 200){
                res.status(404).json({msg: "There has been an error"})
            }
            res.json(JSON.parse(body));
        })
    }catch(error){
        console.log(error);
        res.status(500).json({error: "SOME kind of error"});
    }
})

module.exports = router;
