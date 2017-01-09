var $api = require('./api');
module.exports = {
    discover(paramObj){
        var promise = new Promise((resolve, reject) => {
             $api.get('/classes/Entry',paramObj)
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
            $api.post('/login',paramObj)
            .then(data => {
                resolve(data);
            },error => {
                reject(error);
            });
         });
         return promise;
    }
}