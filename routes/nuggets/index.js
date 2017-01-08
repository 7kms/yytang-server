var $api = require('./api');
module.exports = {
    discover(paramObj){
        var promise = new Promise((resolve, reject) => {
             $api.get('/1.1/classes/Entry',paramObj)
            .then(data => {
                resolve(data);
            },error => {
                reject(error);
            });
        });
       return promise;
    },
    login(paramObj){
        $api.refreshHeader();
        var promise = new Promise((resolve, reject) => {
            $api.post('/1.1/login',paramObj)
            .then(data => {
                resolve(data);
            },error => {
                reject(error);
            });
         });
         return promise;
    }
}