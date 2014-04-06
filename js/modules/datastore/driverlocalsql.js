/**
 * Az osztály kezeli a lokális adatbázis műveleteket.
 * Gyakorlatilag egy extension, ami a PhoneGap beépített SQL kezelőjét használja.
 * FIGYELEM!
 * Androidon a következő jogosultság szükségeltetik (App/res/xml/config.xml):
 *  <plugin name="Storage" value="org.apache.cordova.Storage" />
 *
 * Minden config variable-t az App fő js-ében (eg.: <projectname>.js ami az App.js-ből extendelt) definiálunk.
 *
 * Az adatbázis inicializációt mindig a modell végzi el táblaszinten, az adatbázis meglétét, létrehozását pedig a driver
 * végzi el a paramétereknek megfelelően. (window.App.lsqldbname, window.App.lsqldbversion)
 *
 * User: Csaba
 * Date: 2013.05.25.
 * Time: 15:34
 */
function DriverLocalsql() {
    if (typeof(window.App.lsqldbname) != "string" || typeof(window.App.lsqldbversion) != "string" ||
        typeof(window.App.lSqlDbSize) != "number") {
        window.App.debuglog("Nincs definiálva az adatbázis neve és/vagy verziója és/vagy mérete!");
        return false;
    }

    if (typeof(window.openDatabase) != "function") {
        window.App.debuglog("Úgy tűnik nincs betöltve a PhoneGap storage pluginje.");
        return false;
    }

    this.isactive = true;
    this.openDB(window.App.lsqldbname, window.App.lsqldbversion, window.App.lSqlDbSize * 1024 * 1024);
}

DriverLocalsql.prototype.isactive = false;
DriverLocalsql.prototype.dbObj = null;

DriverLocalsql.prototype.openDB = function(dbName, dbVersion, dbSize) {
    this.dbObj = window.openDatabase(dbName, dbVersion, dbName, dbSize);
}

DriverLocalsql.prototype.getdata = function(data) {

}
