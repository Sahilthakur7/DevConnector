const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

const router = express.Router();

//@route GET api/auth
//@desc test route
//@access public
router.get('/',auth,async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
