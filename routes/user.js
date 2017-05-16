const router = require('express').Router()
const author = require('./authority')
const nuggets = require('./nuggets')
const resData = require('../util/resData')
const userCtrl = require('../app/controllers/users')


router.post('/login', async(req, res, next) => {
    try {
        let user = await userCtrl.login(req.body);
        if (user) {
            res.status(200).json(resData(200, { user }))
        } else {
            res.status(200).json(resData(401, { msg: 'invalidate email or password' }))
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

router.post('/register', async(req, res, next) => {
    let { email, password } = req.body;
    let isExist = await userCtrl.isExists({ email });
    if (isExist) {
        res.status(200).json(resData(-1, { msg: 'email is exist' }));
    } else {
        try {
            let user = await userCtrl.create({ email, password });
            res.status(200).json(resData(200, user))
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

router.use(author)

router.post('/loginout', (req, res, next) => {
    console.log(req);
    req.session.destroy(err => {
        if (!err) {
            res.status(200).json(resData(200, { msg: '退出登录' }))
        } else {
            res.status(200).json(resData(400, { msg: '退出失败' }))
        }
    })
})
router.get('/subscribe', (req, res, next) => {
    nuggets.subscribe(req.query)
        .then(data => {
            res.status(200).json(resData(200, data));
        }, error => {
            res.status(500).send(error);
        });
});
module.exports = router