/** 
 * YourWeb MobileApp/QShop.js
 *
 * A script a QShop mobilApp fő JavaScript vezérlője.
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
 * Az App objektum kezeli az alkalmazás fő vezérlését.
 * Támogatja a fejlesztői / produkciós módokat, külön API elérési domainekkel.
 */
QShop.prototype = new App();

function QShop() {
    /** App specifikus beállítások */
    this.lsqldbname = "QShop";
    this.lsqldbversion = "1.0";

    /** Elindítjuk az _init metódust. */
    this._init();
}

QShop.prototype._init = function() {
    var _this = this;

    /** Adattároló */
    //this.store = new DataStore();


    document.addEventListener("backbutton", function() {
        window.App.back();
    });
}

QShop.prototype.start = function() {
    var _this = this;
    user = new User();

    if (user.data.isLoggedin() == false) {
        var login = user.login();
        login.done(function() {
            _this.drawUI(
                $("<div>Bejelentkezett</div>").append(
                    $("<button>Kijelentkezés</button>").click(function() {
                        user.logout();
                        window.App.start();
                    })
                )
            );
        });
    } else {
        _this.drawUI(
            $("<div>Bejelentkezett</div>").append(
                $("<button>Kijelentkezés</button>").click(function() {
                    user.logout();
                    window.App.start();
                })
            )
        );
    }
}
