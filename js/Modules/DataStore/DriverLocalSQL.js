/**
 * Az osztály kezeli a lokális adatbázis műveleteket.
 * Gyakorlatilag egy extension, ami a PhoneGap beépített SQL kezelőjét használja.
 * FIGYELEM!
 * Androidon a következő jogosultság szükségeltetik (app/res/xml/config.xml):
 *  <plugin name="Storage" value="org.apache.cordova.Storage" />
 *
 * Minden config variable-t az app fő js-ében (eg.: <projectname>.js ami az app.js-ből extendelt) definiálunk.
 *
 * Az adatbázis inicializációt mindig a modell végzi el táblaszinten, az adatbázis meglétét, létrehozását pedig a driver
 * végzi el a paramétereknek megfelelően. (window.app.lsqldbname, window.app.lsqldbversion)
 *
 * User: Csaba
 * Date: 2013.05.25.
 * Time: 15:34
 */
function driverlocalsql() {
    if (typeof(window.app.lsqldbname) != "string" || typeof(window.app.lsqldbversion) != "string" ||
        typeof(window.app.lSqlDbSize) != "number") {
        window.app.debuglog("Nincs definiálva az adatbázis neve és/vagy verziója és/vagy mérete!");
        return false;
    }

    if (typeof(window.openDatabase) != "function") {
        window.app.debuglog("Úgy tűnik nincs betöltve a PhoneGap storage pluginje.");
        return false;
    }

    this.isactive = true;
    this.openDB(window.app.lsqldbname, window.app.lsqldbversion, window.app.lSqlDbSize * 1024 * 1024);
}

driverlocalsql.prototype.isactive = false;
driverlocalsql.prototype.dbObj = null;

driverlocalsql.prototype.openDB = function(dbName, dbVersion, dbSize) {
    this.dbObj = window.openDatabase(dbName, dbVersion, dbName, dbSize);
}

driverlocalsql.prototype.getdata = function(data) {

}
