var $api = require('./api');
module.exports = {
    login(paramObj) {
        $api.refreshHeader();
        return new Promise((resolve, reject) => {
            $api.post('/login', paramObj)
                .then(data => {
                    $api.addHeaderItem({ 'X-LC-Session': data.sessionToken });
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    },
    discover(paramObj) {
        return new Promise((resolve, reject) => {
            $api.get('/classes/Entry', paramObj)
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    },
    subscribe(paramObj) {
        return new Promise((resolve, reject) => {
            $api.get('/classes/Subscribe', paramObj)
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    },
    column(paramObj) {
        return new Promise((resolve, reject) => {
            $api.get('/classes/Entry', paramObj)
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    },
    getUser() {

        return new Promise((resolve, reject) => {
            $api.get('/classes/Comment?&where={"entry":{"__type":"Pointer","className":"Entry","objectId":"58c01380da2f6019f62fd774"}}&include=user,reply.user&limit=100&skip=0&order=-likesCount')
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    },
    like(obj) {
        return new Promise((resolve, reject) => {
            //xt 551d6923e4b0cd5b623f54da //584ccdd40ce463005c5a36e3
            // $api.post('/classes/CommentLike',{
            //                 "comment":{"__type":"Pointer","className":"Comment","objectId":obj.cId},
            //                 "user":{"__type":"Pointer","className":"_User","objectId":"551d6923e4b0cd5b623f54da"}
            //             })
            $api.post('/classes/CommentLike', {
                    "comment": { "__type": "Pointer", "className": "Comment", "objectId": "58fedc9da22b9d0065b15bf7" },
                    "user": { "__type": "Pointer", "className": "_User", "objectId": obj.uId }
                })
                .then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
        });
    }
}