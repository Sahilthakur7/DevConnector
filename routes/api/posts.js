const express = require('express');

const router = express.Router();

//@route GET api/posts
//@desc test route
//@access public
router.get('/',(req,res) => {
    res.send("user routes");
});

module.exports = router;
