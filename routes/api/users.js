const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

//@route POST api/users
//@desc register user
//@access public
router.post('/',[
    check('name', 'Name cannot be empty').not().isEmpty(),
    check('email', 'Add a proper email').isEmail(),
    check('password', 'Enter a password with six or more characters').isLength({min: 6})
],
    (req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        console.log(req.body);
    });

module.exports = router;
