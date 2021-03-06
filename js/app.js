/**
 * YourWeb MobileApp/App.js
 *
 * A script a YourWeb mobilApp készítésekor való használatra készült.
 * Szerző: Babos Csaba, cbabos
 */

/**
 * Az App objektum kezeli az alkalmazás fő vezérlését.
 * Támogatja a fejlesztői / produkciós módokat, külön API elérési domainekkel.
 */
function App() {}

/** 
 * Az alkalmazás nyelveit tárolja
 * @todo nyelvesítés megoldása
 * @type {Object}
 */
App.prototype.Langs = {};
/**
 * Az alkalmazás ebben a holderben fog megjelenni.
 * @type {Object}
 */
App.prototype.holder = $('div#applicationholder');
/**
 * Az alkalmazáson belüli helyváltoztatási állapotokat tároljuk
 * (aka window.history egy mobilappnak)
 * @type {Array}
 */
App.prototype.history = []; // Verem, mindig a legutolsóra tudunk visszamenni vele.

/**
 * Környezet beállítása (dev vagy prod mód)
 * @type {String}
 */
App.prototype.mode = 'prod';

/** 
 * Éles környezet API url-je
 * @type {String}
 */
App.prototype.prodHost = 'http://acms.yourweb.hu';
/** 
 * Fejlesztői környezet API url-je
 * @type {String}
 */
App.prototype.devHost = 'http://dev.acms.com';

/** 
 * LocalStorage adatbázis neve.
 * @type {String}
 */
App.prototype.lsqldbname = 'dbname'; // Külön DisplayName-t nem definiálunk.
/**
 * [lsqldbversion description]
 * @type {String}
 */
App.prototype.lsqldbversion = '1.0';
/**
 * [lSqlDbSize description]
 * @type {Number}
 */
App.prototype.lSqlDbSize = 10; // megabájt!!!
/**
 * [store description]
 * @type {Object}
 */
App.prototype.store = null;

/**
 * UI section
 */
/**
 * [header description]
 * @type {Object}
 */
App.prototype.header = null;
/**
 * [footer description]
 * @type {Object}
 */
App.prototype.footer = null;

/**
 * [_init description]
 * @return {Boolean}
 */
App.prototype._init = function() {
    'use strict';
    return false;
};

/**
 * [getHost description]
 * @return {String}
 */
App.prototype.getHost = function() {
    'use strict';
    if (this.mode === 'dev') {
        return this.devHost;
    } else {
        return this.prodHost;
    }
};

/**
 * [hideHeader description]
 * @return {Void}
 */
App.prototype.hideHeader = function() {
    'use strict';
    $('header.uiheader').animate({
        height: 0
    }, 100, 'ease-out');
};

/**
 * [showHeader description]
 * @return {Void}
 */
App.prototype.showHeader = function() {
    'use strict';
    $('header.uiheader').animate({
        height: '2em'
    }, 100, 'ease-in');
};

/**
 * [setHeader description]
 * @param {Bool} show
 * @param {String} title
 * @param {Bool} backButton
 * @param {Object} buttons
 * @return {Void}
 */
App.prototype.setHeader = function(show, title, backButton, buttons) {
    'use strict';
    var _this = this;

    if (typeof(show) === 'undefined') {
        show = false;
    }

    // Ha nem kérünk header-t akkor benullozzuk.
    if (show === false) {
        this.header = null;
        return;
    }

    // Ha kérünk, akkor szimplán egy header tag-et hozunk létre.
    this.header = $('<header>').addClass('uiheader');

    // Gombok hozzáadása - float right okán itt csináljuk.
    if (typeof(buttons) !== 'undefined') {
        var btnHolder = $('<span>').addClass('buttons');
        for (var i in buttons) {
            var btn = $('<button></button>');
            btn.append(buttons[i].label);
            btn.on('click', buttons[i].callback);
            if (typeof(buttons[i]['class']) !== 'undefined') {
                btn.att('class', buttons[i]['class']);
            }
            btnHolder.append(btn);
        }

        this.header.append(btnHolder);
    }

    // BackButton hozzáadása
    if (typeof(backButton) !== 'undefined') {
        this.header.addClass('withBackButton');

        var newbtn =
            $('<button></button>').on('click', function() {
                _this.back();
            });

        this.header.append(
            $('<span></span>').addClass('backbuttonholder').append(newbtn)
        );
    }

    // Title hozzáadása
    if (typeof(title) !== 'undefined') {
        if (typeof(title) === 'string') {
            title = $('<span>').addClass('title').html(title);
        }
        this.header.append(title);
    }
};

/**
 * [back description]
 * @return {Void}
 */
App.prototype.back = function() {
    'use strict';
    if ($('div#contentholder').children('.pleft').length > 0) {
        $('div#contentholder').children('.pcenter').addClass('pright').removeClass('pcenter')
            .on('transitionend', function() {
                $(this).remove();
            }).on('oTransitionEnd', function() {
                $(this).remove();
            }).on('webkitTransitionEnd', function() {
                $(this).remove();
            });
        $('div#contentholder').children('.pleft').addClass('pcenter').removeClass('pleft');
    } else {
        if (window.confirm('Biztosan ki szeretnél lépni?')) {
            this.quit();
        }
    }
};

/**
 * [debuglog description]
 * @param  {String} msg
 * @return {Void}
 */
App.prototype.debuglog = function(msg) {
    'use strict';
    if (this.mode === 'dev') {
        console.log(msg);
    }
};

/**
 * [removeLastPage description]
 * @param  {Object} container
 * @return {Void}
 */
App.prototype.removeLastPage = function(container) {
    'use strict';
    if ($(document).find('header').hasClass('withBackButton') === false) {
        container.find('.pleft').remove();
    }
};

/**
 * [drawUI description]
 * @param  {Object} UI
 * @param  {String} bodyClass
 * @param  {Object} Container
 * @return {Void}
 */
App.prototype.drawUI = function(UI, bodyClass, Container) {
    'use strict';
    var _this = this;

    if (typeof(Container) === 'undefined' && $('div#contentholder').length === 0) {
        Container = $('<div></div>').attr('id', 'contentholder').addClass('contentholder');
    } else if (typeof(Container) === 'undefined') {
        Container = $('div#contentholder');
    }

    var showAnim = true,
        UIC = null;
    if (Container.find('.pcenter').length > 0) {
        UIC = $('<div></div>').addClass('page pright');
    } else {
        UIC = $('<div></div>').addClass('page pcenter');
        showAnim = false;
    }

    /**
     * Header kirajzolása
     */
    $('header.uiheader').remove();
    if (this.header !== null) {
        UIC.append(this.header);
        this.header = null;
    }

    UIC.append(UI);

    Container.append(UIC);
    this.holder.append(Container);

    setTimeout(function() {
        if (Container.find('.pcenter').length > 0 && showAnim) {
            if (Container.find('.pleft').length > 0) {
                Container.find('.pleft').remove();
            }
            Container.find('.pcenter').removeClass('pcenter').addClass('pleft');
            Container.find('.pright').removeClass('pright').addClass('pcenter')
                .on('transitionend', function() {
                    _this.removeLastPage(Container);
                }).on('oTransitionEnd', function() {
                    _this.removeLastPage(Container);
                }).on('webkitTransitionEnd', function() {
                    _this.removeLastPage(Container);
                });
        }
    }, 100);



    if (typeof(bodyClass) === 'undefined') {
        bodyClass = '';
    }
    $('body').addClass(bodyClass);
};

/**
 * [quit description]
 * @return {Void}
 */
App.prototype.quit = function() {
    'use strict';
    navigator.App.exitApp();
};

/**
 * [inheritsFrom description]
 * @param  {Object} ParentClassOrObject
 * @return {Object}
 */
Function.prototype.inheritsFrom = function(ParentClassOrObject) {
    'use strict';
    if (ParentClassOrObject.constructor === Function) {
        $.extend(this.prototype, new ParentClassOrObject());
    } else {
        $.extend(this.prototype, ParentClassOrObject);
    }
    return this;
};
