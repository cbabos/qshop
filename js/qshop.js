/** 
 * YourWeb MobileApp/QShop.js
 *
 * A script a QShop mobilApp fő JavaScript vezérlője.
 *
 * Szerző: Babos Csaba, cbabos
 */

/**
 * Todo A nyelvesítést ki kéne találni, és meg kéne valósítani. Offline üzemhez
 *      is meg kellene csinálni, úgyhogy valamilyen helyi db-t is kéne erre használni.
 */

/* jshint -W117 */
/**
 * Az App objektum kezeli az alkalmazás fő vezérlését.
 * Támogatja a fejlesztői / produkciós módokat, külön API elérési domainekkel.
 */
function QShop() {
    'use strict';
    /** App specifikus beállítások */
    this.lsqldbname = 'QShop';
    this.lsqldbversion = '1.0';

    /** Elindítjuk az _init metódust. */
    this._init();
}

/**
 * [prototype description]
 */
QShop.prototype = new App();
/**
 * [_init description]
 * @return {Void}
 */
QShop.prototype._init = function() {
    'use strict';

    document.addEventListener('backbutton', function() {
        window.App.back();
    });
};

/**
 * [start description]
 * @return {Void}
 */
QShop.prototype.start = function() {
    'use strict';
    var _this = this,
        user = new User();

    if (user.data.isLoggedin() === false) {
        var login = user.login();
        login.done(function() {
            _this.drawUI(
                $('<div>Bejelentkezett</div>').append(
                    $('<button>Kijelentkezés</button>').click(function() {
                        user.logout();
                        window.App.start();
                    })
                )
            );
        });
    } else {
        _this.drawUI(
            $('<div>Bejelentkezett</div>').append(
                $('<button>Kijelentkezés</button>').click(function() {
                    user.logout();
                    window.App.start();
                })
            )
        );
    }
};
