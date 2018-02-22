/* eslint-disable no-unused-vars */
class Service {
    constructor(options) {
        this.app = options.app;
        this.options = options || {};
    }

    _getUserService() {
        return this.options.app.service('users')
    }

    create(data, params) {
        return this._getUserService().find({
            query: {
                email: data.email.toLowerCase()
            }
        }).then(result => {
            if (result.length === 1) {
                let user = result[0]
                let url = this.app.service('set-password').getUrlSetPassword(user._id)
                if (user.rol === 'designer') {
                    if (user.greeted === true) {

                        return this.app.service('send-mail').create({
                            to: data.email, //TODO
                            subject: 'Confirmar Direccion de correo',
                            content: 'Pincha el siguiente link para confirmar tu registro. Ojo! este link caduca.<br><a href="http://www.suutil.com/confirm-mail'
                            + url +
                            '"> Confirmar </a>'
                        })
                    } else {

                        this.app.service('send-mail').create({
                            to: data.email, //TODO
                            subject: 'Hello',
                            content: "Muchas gracias por registrarte! ya perteneces a  la comunidad del buen diseño.<br>Con cualquier duda, contáctanos en hola@suutil.com<br>Un saludo!"

                        }).then((_) => {
                            this._getUserService().patch(user._id, {greeted: true})
                            return this.app.service('send-mail').create({
                                to: data.email, //TODO
                                subject: 'Confirmar Direccion de correo',
                                content: 'Pincha el siguiente link para confirmar tu registro. Ojo! este link caduca.<br><p><a href="http://www.suutil.com/confirm-mail'
                                + url +
                                '"> Confirmar </a></p>'
                            })
                        })
                    }

                } else if (user.rol === 'provider') {
                    return this.app.service('send-mail').create({
                        to: data.email, //TODO
                        subject: 'Bienvenido',
                        content: "Enhorabuena!, has comenzado con éxito tu proceso de registro en SUUTIL.<br>En unas horas valoraremos tu candidatura para poder enviarte las claves de acceso e instrucciones de funcionamiento de tu espacio de proveedor.<br>Con cualquier duda, contáctanos en hola@suutil.com<br>Un saludo!"
                    })
                }

            }
        }).then(_ => {
            return {status: 'ok'}
        })

    }

}

module.exports = function(options) {
    return new Service(options);
};

module.exports.Service = Service;
