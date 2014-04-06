/**
 * Az osztály a LocalStorage-ben való adattárolással és onnan kiolvasással foglalkozik.
 *
 * User: Csaba
 * Date: 2013.05.21.
 * Time: 20:02
 */

function DriverLocal() {
    if (typeof(window.localStorage) !== "object") {
        window.App.debuglog("*************** Nem létezik a LocalStorage!!! ******************");
        this.storage = {
            /** fallback storage object */
            setItem: function(what) {
                window.App.debuglog("Nincs LocalStorage, fallback storage él.");
                return false;
            },
            /** fallback storage object */
            getItem: function(name, data) {
                window.App.debuglog("Nincs LocalStorage, fallback storage él.");
                return false;
            },
            /** fallback storage object */
            reset: function() {
                window.App.debuglog("Nincs LocalStorage, fallback storage él.");
                return false;
            },
            /** fallback storage object */
            removeItem: function() {
                window.App.debuglog("Nincs LocalStorage, fallback storage él.");
                return false;
            }
        }
    } else {
        this.storage = window.localStorage;
    }
}

DriverLocal.prototype.storage = null;

/**
 * Adat kikérése a localStorage-ből.
 *
 * @param string A változó neve amire kíváncsiak vagyunk.
 * @return NULL: ha a változó nem létezik, vagy null. Bármi más: a változó értéke.
 */
DriverLocal.prototype.getdata = function(what) {
    /** Ha a megadott paraméter nem string, akkor nem fogadjuk el, logolunk, és null-al térünk vissza */
    if (typeof(what) !== "string") {
        window.App.debuglog("Érvénytelen paramétert kapott a DriverLocal.getdata");
        return null;
    }

    /** Kikérjük LocalStorage-ből az adatot */
    var retval = this.storage.getItem(what);

    if (retval === null) {
        /** Ha az adat null, akkor jó eséllyel még nem létezik az adat, logba üzenünk */
        window.App.debuglog("NOTICE: Nincs a megadott adatnak (" + what + ") megfelelő változó.");
    }

    /** Visszatérünk az adattal legyen az bármi. */
    return retval;
}

/**
 * Adat mentése a localStorage-ba.
 * A metódus lefigyeli, hogy a paraméterek helyesek e, történik e felülírás.
 * Siker esetén true-val egyébként false-al tér vissza.
 *
 * @param name
 * @param data
 * @return {boolean}
 */
DriverLocal.prototype.setdata = function(name, data) {

    if (typeof(name) != "string" || typeof(data) == "undefined") {
        /** Érvénytelen hívás nem tudunk vele mit kezdeni. */
        window.App.debuglog("Érvénytelen hívás történt a DriverLocal.setdata függvényre");
        return false;
    }

    if (this.getdata(name) !== null) {
        /** Esélye van a változó felülírásnak NOTICE-t logolunk és megtesszük az írást. */
        window.App.debuglog("NOTICE: Felülírás történt. Változó: " + name);
    }

    /** Tárolunk. */
    this.storage.setItem(name, data);

    /** Ellenőrzés */
    if (this.getdata(name) != data) {
        /** Sikertelen adatmentés, vélhetően hibás localStorage miatt. */
        window.App.debuglog("Sikertelen adatmentés. Változó neve: " + name + ". A változó tartalma: ");
        window.App.debuglog(data);
        return false;
    }

    return true;
}

DriverLocal.prototype.remove = function(what) {
    if (this.storage.removeItem(what) === false) {
        return false; // A fallback mód miatt kell egy ilyen ág.
    }
    return true;
}

/**
 * Amennyiben szükséges tudnunk kell resetelni a LocalStorage-t. Pl logout esetén.
 */
DriverLocal.prototype.reset = function() {
    if (this.storage.reset() === false) {
        return false; // A fallback mód miatt kell egy ilyen ág.
    }
    return true;
}
