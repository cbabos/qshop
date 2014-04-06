/**
 * Az osztály kezeli a lokális adatbázis műveleteket.
 * Gyakorlatilag egy extension, ami a PhoneGap beépített SQL kezelőjét használja.
 * FIGYELEM!
 * Androidon a következő jogosultság szükségeltetik (app/res/xml/config.xml):
 *  <plugin name="Storage" value="org.apache.cordova.Storage" />
 *
 * Minden config variable-t az app fő js-ében (eg.: <projectname>.js ami az App.js-ből extendelt) definiálunk.
 *
 * Az adatbázis inicializációt mindig a modell végzi el táblaszinten, az adatbázis meglétét, létrehozását pedig a driver
 * végzi el a paramétereknek megfelelően. (window.app.lSqlDbName, window.app.lSqlDbVersion)
 *
 * User: Csaba
 * Date: 2013.05.25.
 * Time: 15:34
 */
function DriverLocalSQL () {
	if (typeof(window.app.lSqlDbName) != "string" || typeof(window.app.lSqlDbVersion) != "string" ||
			typeof(window.app.lSqlDbSize) != "number") {
		window.app.debugLog("Nincs definiálva az adatbázis neve és/vagy verziója és/vagy mérete!");
		return false;
	}

	if (typeof(window.openDatabase) != "function") {
		window.app.debugLog("Úgy tűnik nincs betöltve a PhoneGap storage pluginje.");
		return false;
	}

	this.isActive = true;
	this.openDB(window.app.lSqlDbName, window.app.lSqlDbVersion, window.app.lSqlDbSize * 1024 * 1024);
}

DriverLocalSQL.prototype.isActive = false;
DriverLocalSQL.prototype.dbObj = null;

DriverLocalSQL.prototype.openDB = function (dbName, dbVersion, dbSize) {
	this.dbObj = window.openDatabase(dbName, dbVersion, dbName, dbSize);
}

DriverLocalSQL.prototype.getData = function (data) {

}