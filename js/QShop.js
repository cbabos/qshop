/** 
 * YourWeb Mobileapp/qshop.js
 *
 * A script a qshop mobilapp fő JavaScript vezérlője.
 * LGPL licence alatt szabadon felhasználható annak megkötései mellett.
 * Vonatkozó licence: http://www.gnu.org/licenses/lgpl.txt
 *
 * Szerző: Babos Csaba, cbabos
 */

/**
 * Todo A nyelvesítést ki kéne találni, és meg kéne valósítani. Offline üzemhez
 *      is meg kellene csinálni, úgyhogy valamilyen helyi db-t is kéne erre használni.
 */

/**
 * Az app objektum kezeli az alkalmazás fő vezérlését.
 * Támogatja a fejlesztői / produkciós módokat, külön API elérési domainekkel.
 */
qshop.prototype = new app();

function qshop() {
    /** app specifikus beállítások */
    this.lsqldbname = "qshop";
    this.lsqldbversion = "1.0";

    /** Elindítjuk az _init metódust. */
    this._init();
}

qshop.prototype._init = function() {
    var _this = this;

    /** Adattároló */
    //this.store = new datastore();


    document.addEventListener("backbutton", function() {
        window.app.back();
    });
}

qshop.prototype.start = function() {
    var _this = this;
    user = new User();

    if (user.data.isLoggedin() == false) {
        var login = user.login();
        login.done(function() {
            _this.drawUI(
                $("<div>Bejelentkezett</div>").append(
                    $("<button>Kijelentkezés</button>").click(function() {
                        user.logout();
                        window.app.start();
                    })
                )
            );
        });
    } else {
        _this.drawUI(
            $("<div>Bejelentkezett</div>").append(
                $("<button>Kijelentkezés</button>").click(function() {
                    user.logout();
                    window.app.start();
                })
            )
        );
    }
}
