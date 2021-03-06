const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator/check');
const config = require('config');

const User = require('../../models/User');

//@route POST api/users
//@desc register user
//@access public
router.post('/',[
    check('name', 'Name cannot be empty').not().isEmpty(),
    check('email', 'Add a proper email').isEmail(),
    check('password', 'Enter a password with six or more characters').isLength({min: 6})
],
    async (req,res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {name,email,password} = req.body;

        try{
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({errors : [{message: 'User already exists'}]})
            }
            const avatar = gravatar.url(email,{
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            user = new User({name,email,password,gravatar});

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password,salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,config.get('jwtSecret'),
                {expiresIn: 3600} , (err,token) => {
                    if(err){
                        throw err;
                    }else{
                        res.json({token});
                    }
                });

        }catch(err){
            res.status(500);
        }

    });

module.exports = router;
