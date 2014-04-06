/**
 * Az osztály az ajax úton történő adatlekérésekért felel.
 * Segítségével adatot küldhetünk illetve fogadhatunk.
 *
 * Fontos megemlíteni, hogy az egyes különböző paraméterezések miatt nem készítek specifikus metódusokat,
 * csak egy query metódust tartalmaz.
 * Mindig az API feladata, hogy a kapott POST adatok alapján dolgozzon!
 * A kéréseknek mindenképpen tartalmaznia kell egy controller és egy action paramétert.
 * Ezzel biztosítjuk azt, hogy a DriverXHR a megfelelő helyre tudjon kérést küldeni.
 *
 * User: Csaba
 * Date: 2013.05.25.
 * Time: 16:48
 */
function DriverXHR () {

}

/**
 * API hívás a szerver oldal felé.
 *
 * @param data Mindenképp tartalmaznia kell egy controller és egy action elemet.
 * @returns {$.Deferred}
 */
DriverXHR.prototype.query = function (data) {
	var defer = new $.Deferred();
	if (typeof(data.controller) == "undefined" || typeof(data.action) == "undefined") {
		window.app.debugLog("Érvénytelen XHR hívási kísérlet, nincs controller és/vagy action");
		defer.resolve(false);
		return defer;
	}

	$.ajax({
		url: window.app.getHost()+ "/" + data.controller + "/api/" + data.action,
		data: data,
		dataType: "json",
		type: "post",
		success: function (response) {
			defer.resolve(response);
		}
	});

	return defer;
}