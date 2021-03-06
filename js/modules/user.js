/**
 * User handling module
 *
 * Contains the next features:
 *  - login
 *  - forgotten password
 *  - registration
 *  - profile
 *
 * User: Csaba
 * Date: 2013.05.16.
 * Time: 18:24
 */
/* jshint -W117 */
/**
 * [User description]
 */
function User() {
    'use strict';
    this.data = new MUser();
}

/**
 * [form description]
 * @type {Object}
 */
User.prototype.form = null;
/**
 * [data description]
 * @type {Object}
 */
User.prototype.data = null;
/**
 * [loginDefer description]
 * @type {Object}
 */
User.prototype.loginDefer = null;

/**
 * [logout description]
 * @return {Void}
 */
User.prototype.logout = function() {
    'use strict';
    this.data.logout();
};

/**
 * [forgottenPassword description]
 * @return {Void}
 */
User.prototype.forgottenPassword = function() {
    'use strict';
    var _this = this;

    var form = $('<div></div>').addClass('loginform')
        .append(
            $('<form></form>')
            .append(
                $('<div></div>').addClass('row').append(
                    $('<input type="text" name="email" value=""' +
                        ' placeholder="E-mail cím" />')
                )
            )
            .append(
                $(' <div> </div>').addClass('row').append(
                    $('<input type="submit" name="forgotten" value="' +
                        'Jelszó - csere igénylése" /> ').click(function() {
                        alert('Elküldve');
                        _this.back();
                        return false;
                    })
                )
            )
    );
    this.setHeader(true, 'Elfelejtett jelszó ', true);
    this.drawUI(form);
};

/**
 * [register description]
 * @return {Void}
 */
User.prototype.register = function() {
    'use strict';
    var _this = this;

    var form = $('<div></div>').addClass('loginform')
        .append(
            $('<form></form>')
            .append(
                $('<div></div>').addClass('row').append(
                    $('<input type="text" name="username" value="" ' +
                        'placeholder="Felhasználónév" />')
                )
            )
            .append(
                $('<div></div>').addClass('row').append(
                    $('<input type="text" name="email" value=""' +
                        ' placeholder="E - mail cím" />')
                )
            )
            .append(
                $('<div></div>').addClass('row').append(
                    $('<input type="password" name="password" value="" ' +
                        ' placeholder="Jelszó" />')
                )
            ).append(
                $('<div></div>').addClass('row').append(
                    $('<input type="password" name="password_again" value="" ' + ' placeholder="Jelszó ismét" />')
                )
            )
            .append(
                $('<div></div>').addClass('row').append(
                    $('<input type="submit" name="forgotten" ' +
                        'value="Regisztráció" /> ').click(function() {
                        alert('Elküldve');
                        _this.back();
                        return false;
                    })
                )
            )
    );
    this.setHeader(true, 'Regisztráció ', true);
    this.drawUI(form);
};

/**
 * [login description]
 * @return {Object}
 */
User.prototype.login = function() {
    'use strict';
    var _this = this;
    this.loginDefer = new $.Deferred();

    /**
     * Login Form
     */
    if (this.data.isLoggedin() === false) {

        _this.form = $('<div></div>').addClass('loginform').append(
            /** Logo */
            $('<h1><span>Q</span>Shop <br /><small>What you need to do now?</small></h1>')
        ).append(
            /** Form */
            $('<form></form>').append(
                $('<div></div >').addClass('row').append(
                    $(' <input type="text" name="username" value="" ' +
                        ' placeholder ="Felhasználó név" />')
                )
            ).append(
                $(' <div></div>').addClass('row').append(
                    $('<input type="password" name="password" value=""' +
                        ' placeholder="Jelszó" />')
                )
            ).append(
                $('<div></div>').addClass('row submitRow').append(
                    $('<input type="submit" name="login" value="' +
                        'Bejelentkezés" />').addClass('collapsable ').click(function(ev) {
                        ev.preventDefault();
                        /** Elküldjük az adatfeldolgozónak a form-ot, és megpróbáljuk bejelentkeztetni. */
                        var username = _this.form.find('input[name = username]').val();
                        var password = _this.form.find('input[name = password]').val();
                        $(this).addClass('slideup ');
                        $('.errormessage ').remove();
                        //_this.form.find('.loader ').show();

                        var onAnswer = _this.data.getToken(username, password);
                        onAnswer.done(function(token) {
                            _this.checkLogin(token);
                        });
                        return false;
                    })
                )
            ).append(
                $('<div></div>').addClass('row notRegistered').append(
                    $('<a href="#">Még nem regisztráltál?</a>').click(function(ev) {
                        ev.preventDefault();
                        _this.register();
                        return false;
                    })
                )
            ).append(
                $('<div></div>').addClass('row forgottenPassword').append(
                    $('<a href="#">Elfelejtetted a jelszavad?</a > ').click(function(ev) {
                        ev.preventDefault();
                        _this.forgottenPassword();
                        return false;
                    })
                ).hide()
            )
        ).append(
            $('<div></div>').addClass('loader').html('Betöltés...').hide()
        );
        this.drawUI(_this.form);
    } else {
        var content = $('<div></div>').html(this.data.getToken());
        this.drawUI(content);
    }

    return this.loginDefer;
};

/**
 * [checkLogin description]
 * @param  {Object} response
 * @return {Void}
 */
User.prototype.checkLogin = function(response) {
    'use strict';
    var _this = this;

    if (this.data.isLoggedin() === false) {
        _this.form.find('.loader ').hide();
        _this.form.find('input[type = submit]').removeClass('slideup');

        console.log(response);

        for (var field in response) {
            $('<div>').addClass('errormessage').html(response[field]).
            insertBefore($('input[name=' + field + ']'));
        }

        _this.form.find('.forgottenPassword').show();
        _this.form.find('.errormessage').addClass('errormessageShow');
    } else {
        this.loginDefer.resolve();
    }
};

User.inheritsFrom(App);
