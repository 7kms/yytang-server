var router = require('express').Router()

function getList(start, count){
    var arr = [];
    for(var i = 0 ; i < count; i++) {
        var obj = {}
        obj.text = '今天天气不错啊,适合泡妞呢?' + i;
        arr.push(obj)
    }
    return arr;
}
router.get('/discover', (req, res, next) => {
    var count = req.query.count;
    var start = req.query.start;
    if(!count) {
        res.status(400).json({
            msg:'参数错误',
            code:400
        })
    }
    res.status(200).json(getList(start, count))
})

module.exports = router