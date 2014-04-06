/**
 * Felhasználók adataival kapcsolatos adatműveletek.
 * User: Csaba
 * Date: 2013.05.16.
 * Time: 19:09
 */
function muser() {

}

muser.prototype.source = "ajax";

muser.prototype.isLoggedin = function() {
    var token = this.getToken();

    if (token != null && token != false) {
        return true;
    } else {
        return false;
    }
}

muser.prototype.logout = function() {
    return store.remove({
        name: "token"
    });
}

muser.prototype.getToken = function(username, password) {
    var defer = $.Deferred();

    if (typeof(username) == "undefined" && typeof(password) == "undefined") {
        /** Ekkor belépett usert keresünk */
        var token = store.getdata("token");
        return token;
    } else {

        var authenticate = store.getdata({
            controller: "user",
            action: "getAuth",
            username: username,
            password: password
        }, "ajax");

        authenticate.done(function(res) {
            if (!(typeof(res.token) == "undefined" || res.token == null || res.token == false)) {
                store.setdata({
                    name: "token",
                    data: res.token
                });
            }

            defer.resolve(res);
        })
    }

    return defer;
}
