const router = require('express').Router()
const author = require('./authority')
router.use(author)
router.get('/info', (req, res, next) =>{
    res.status(200).json({userInfo:req.session.userInfo})
})
module.exports = router