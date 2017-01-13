var router = require('express').Router();
const nuggets = require('./nuggets');

router.get('/discover',(req, res, next) => {
    nuggets.discover(req.query)
    .then(data=>{
        res.status(200).json(data);
    },error=>{
        res.status(500).send(error);
    });
});
router.get('/column',(req, res, next) => {
    nuggets.column(req.query)
    .then(data=>{
        res.status(200).json(data);
    },error=>{
        res.status(500).send(error);
    });
});
module.exports = router