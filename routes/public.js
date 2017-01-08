var router = require('express').Router();
const nuggets = require('./nuggets');

router.get('/discover',(req, res, next) => {
    nuggets.discover(req.query)
    .then(data=>{
        res.status(200).json(data);
    },error=>{
        res.status(500).send(data);
    });
});

module.exports = router