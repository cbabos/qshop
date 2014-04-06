/**
 * Az osztály létrehoz egy-egy példányt a létező driverekből:
 *  - local (localStorage)
 *  - ajax  (backendtől xhr úton kéri az adatot)
 *  - lsql  (localSQL)
 *
 * Minden kérés a DataStore függvényein fut keresztül, azonban a modellek dönthetnek úgy,
 * hogy valamely adatkérést a modell beállításától függetlenül másik driveren keresztül kérik,
 * vagy akár egy időben több driverből is kérhetik ugyanazt a lekérést.
 * Ezáltal a local adatstruktúrák frissíthetővé válnak az ajax driver másodlagos meghívásával.
 *
 * User: Csaba
 * Date: 2013.05.16.
 * Time: 19:14
 */
function DataStore() {
    this.local = new DriverLocal();
    this.lsql = new DriverLocalsql();
    this.ajax = new DriverXHR();
}

DataStore.prototype.source = "local";
DataStore.prototype.local = null;
DataStore.prototype.lsql = null;
DataStore.prototype.ajax = null;

/** Ajax híváshoz a modell API-részét tartalmazó controller neve */
DataStore.prototype.apicontroller = "";
/** Ajax híváshoz a modell API-részét tartalmazó action neve */
DataStore.prototype.apiaction = "";

DataStore.prototype.getdata = function(data, driver) {
    /** Ha nem kérünk mást akkor a modell default forrása adja meg a választ */
    if (typeof(driver) === "undefined") {
        driver = this.source;
    }

    switch (driver) {
        case 'local':
            return this.local.getdata(data);
            break;
        case 'lsql':
            var defer = $.Deferred();
            defer.resolve(this.lsql.getdata(data));
            return defer;
            break;
        case 'ajax':
            var defer = $.Deferred();
            var ajaxdefer = this.ajax.query(data);
            ajaxdefer.done(function(response) {
                defer.resolve(response);
            });
            return defer;
            break;
    }
}

DataStore.prototype.setdata = function(data, driver) {
    /** Ha nem kérünk mást akkor a modell default forrása adja meg a választ */
    if (typeof(driver) === "undefined") {
        driver = this.source;
    }

    switch (driver) {
        case 'local':
            return this.local.setdata(data.name, data.data);
            break;
        case 'lsql':
            var defer = $.Deferred();
            defer.resolve(this.lsql.query(data));
            return defer;
            break;
        case 'ajax':
            var defer = $.Deferred();
            defer.resolve(this.ajax.query(data));
            return defer;
            break;
    }
}

DataStore.prototype.remove = function(data, driver) {
    /** Ha nem kérünk mást akkor a modell default forrása adja meg a választ */
    if (typeof(driver) === "undefined") {
        driver = this.source;
    }

    switch (driver) {
        case 'local':
            return this.local.remove(data.name);
            break;
        case 'lsql':
            var defer = $.Deferred();
            defer.resolve(this.lsql.query(data));
            return defer;
            break;
        case 'ajax':
            var defer = $.Deferred();
            defer.resolve(this.ajax.query(data));
            return defer;
            break;
    }
}
