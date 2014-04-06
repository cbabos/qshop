/**
 * Felhasználók adataival kapcsolatos adatműveletek.
 * User: Csaba
 * Date: 2013.05.16.
 * Time: 19:09
 */
function MUser() {

}

MUser.prototype.source = "ajax";

MUser.prototype.isLoggedin = function () {
	var token = this.getToken();

	if (token != null && token != false) {
		return true;
	} else {
		return false;
	}
}

MUser.prototype.logout = function () {
	return store.remove({
		name: "token"
	});
}

MUser.prototype.getToken = function (username, password) {
	var defer = $.Deferred();

	if (typeof(username) == "undefined" && typeof(password) == "undefined") {
		/** Ekkor belépett usert keresünk */
		var token = store.getData("token");
		return token;
	} else {

		var authenticate = store.getData({
			controller: "user",
			action: "getAuth",
			username: username,
			password: password
		}, "ajax");

		authenticate.done(function (res) {
			if (!(typeof(res.token) == "undefined" || res.token == null || res.token == false)) {
				store.setData({
					name: "token",
					data: res.token
				});
			}

			defer.resolve(res);
		})
	}

	return defer;
}