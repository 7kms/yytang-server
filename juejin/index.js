var router = require('express').Router();
var $api = require('./api');
router.get('/discover',(req,res,next)=>{
    $api.get('/1.1/classes/Entry',req.query)
    .then(data => {
        res.status(200).json(data);
    },error => {
        res.status(500).send(error);
    })
})
module.exports = router