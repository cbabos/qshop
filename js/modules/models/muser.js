/**
 * Felhasználók adataival kapcsolatos adatműveletek.
 * User: Csaba
 * Date: 2013.05.16.
 * Time: 19:09
 */
/* jshint -W117 */
function MUser() {

}

MUser.prototype.source = 'ajax';

MUser.prototype.isLoggedin = function() {
    'use strict';
    var token = this.getToken();

    if (token !== null && token !== false) {
        return true;
    } else {
        return false;
    }
};

MUser.prototype.logout = function() {
    'use strict';
    return store.remove({
        name: 'token'
    });
};

MUser.prototype.getToken = function(username, password) {
    'use strict';
    var defer = $.Deferred();

    if (typeof(username) === 'undefined' && typeof(password) === 'undefined') {
        /** Ekkor belépett usert keresünk */
        var token = store.getdata('token');
        return token;
    } else {

        var authenticate = store.getdata({
            controller: 'user',
            action: 'getAuth',
            username: username,
            password: password
        }, 'ajax');

        authenticate.done(function(res) {
            if (!(typeof(res.token) === 'undefined' || res.token === null || res.token === false)) {
                store.setdata({
                    name: 'token',
                    data: res.token
                });
            }

            defer.resolve(res);
        });
    }

    return defer;
};
