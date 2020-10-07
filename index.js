//init
const Botkit = require('./lib/Botkit.js');
const xml = require('@xmpp/xml');

var controller = Botkit.jabberbot({ json_file_store: './bot_store/' });

var bot = controller.spawn({
    // client: {
    //     jid: 'demobot01@abc.inc',
    //     password: 'devbot',
    //     host: "10.10.20.17",
    //     stats_optout: true,
    //     port: 5222
    // }
    client: {
        jid: '1cbot@psport.ru',
        password: 'Bot1cTest@',
        host: "expw-e.psport.ru",
        stats_optout: true,
        port: 5222
    }
});


//Setup intent rules
controller.hears(['vacation'], ['direct_message', 'self_message'],
    (bot, message) => {
        try {
            let reply_message = {};
            let to = message.user;
            console.log(to);
            let type = message.group ? 'groupchat' : 'chat';

            let body = 'Create vacation';
            reply_message.text = body;
            reply_message.stanza = xml` <message to="${to}" type="${type}"> <body>${body}</body> <html xmlns="http://jabber.org/protocol/xhtml-im"> <body xmlns="http://www.w3.org/1999/xhtml"> <div class="container"> <h5>Пожалуйста заполните все поля для отправки вашего отпуска на согласование:</h5> <form class="form-horizontal" onsubmit="return false;"> <div class="form-group-sm"> <label class="control-label col-sm-2" for="required_surname">Фамилия</label> <div class="col-sm-10"> <input type="text" class="form-control" id="required_surname" placeholder="Фамилия" name="required_surname"/> </div> </div> <div class="form-group-sm"> <label class="control-label col-sm-2" for="required_name">Имя</label> <div class="col-sm-10"> <input type="text" class="form-control" id="required_name" placeholder="Имя" name="required_name"/> </div> </div> <div class="form-group-sm"> <label class="control-label col-sm-2" for="required_patronymic">Отчество</label> <div class="col-sm-10"> <input type="text" class="form-control" id="required_patronymic" placeholder="Отчетсво" name="required_patronymic"/> </div> </div> <div class="form-group-sm"> <label class="control-label col-sm-2" for="start">Начало:</label> <div class="col-sm-10"> <input name="start" type="date"/> </div> </div> <div class="form-group-sm"> <label class="control-label col-sm-2" for="end">Конец:</label> <div class="col-sm-10"> <input name="end" type="date"/> </div> </div> <div class="form-group-sm"> <div class="col-sm-offset-2 col-sm-10"> <button class="btn btn-primary btn-sm" style="margin-top:8px"  robot-type="robot-submit" type="button" value="Submit">Отправить</button> </div> </div> </form> </div> </body> </html> </message>`;
            bot.startConversation(message, (err, convo) => {
                if (!err) {
                    convo.ask(reply_message, (res, convo) => {
                        try {
                            console.log(res.from_jid == bot.client_jid);
                            if (res.from_jid == bot.client_jid)
                                return;
                            let { required_surname, required_name, required_patronymic, start, end } = JSON.parse(res.text);
                            let vacationRequest = {}
                            let body = 'Vacation request';
                            vacationRequest.text = body;
                            vacationRequest.stanza = xml`<message to="${to}" type="${type}"> <body> ${body} </body> <html xmlns="http://jabber.org/protocol/xhtml-im"> <body xmlns="http://www.w3.org/1999/xhtml"> <div class="container"> <h5> Заявление на отпуск </h5> <h6> Ф.И.О: ${required_surname} ${required_name} ${required_patronymic} </h6> <h6> Период с ${start} по ${end} </h6> <div class="btn-group"> <button type="button" class="btn btn-success btn-sm" robot-type="robot-button" type="button" robot-message="resolve">Принять</button> <button type="button" class="btn btn-danger btn-sm" robot-type="robot-button" type="button" robot-message="reject">Отклонить</button> </div> </div> </body> </html> </message>`;
                            bot.reply(message, vacationRequest);
                            convo.stop();
                        } catch (error) {
                            console.log(error.massage);
                            convo.stop();
                        }
                    })
                }
            })
        } catch (exeption) {
            console.log(exeption);
        }
    });

//Setup intent rules
controller.hears(['vacation-status'], ['direct_message'],
    (bot, message) => {
        try {
            let reply_message = {};
            let to = message.user;
            console.log(to);
            let type = message.group ? 'groupchat' : 'chat';

            let body = 'Create vacation';
            reply_message.text = body;
            reply_message.stanza = xml` <message to="${to}" type="${type}"> <body>${body}</body> <html xmlns="http://jabber.org/protocol/xhtml-im"> <body xmlns="http://www.w3.org/1999/xhtml"> <div class="container"> <h5>Пожалуйста заполните все поля для отправки вашего отпуска на согласование:</h5> <form class="form-horizontal" onsubmit="return false;"> <div class="form-group-sm"> <label class="control-label col-sm-2" for="required_surname">Фамилия</label> <div class="col-sm-10"> <input type="text" class="form-control" id="required_surname" placeholder="Фамилия" name="required_surname"/> </div> </div> <div class="form-group-sm"> <label class="control-label col-sm-2" for="required_name">Имя</label> <div class="col-sm-10"> <input type="text" class="form-control" id="required_name" placeholder="Имя" name="required_name"/> </div> </div> <div class="form-group-sm"> <label class="control-label col-sm-2" for="required_patronymic">Отчество</label> <div class="col-sm-10"> <input type="text" class="form-control" id="required_patronymic" placeholder="Отчетсво" name="required_patronymic"/> </div> </div> <div class="form-group-sm"> <label class="control-label col-sm-2" for="start">Начало:</label> <div class="col-sm-10"> <input name="start" type="date"/> </div> </div> <div class="form-group-sm"> <label class="control-label col-sm-2" for="end">Конец:</label> <div class="col-sm-10"> <input name="end" type="date"/> </div> </div> <div class="form-group-sm"> <div class="col-sm-offset-2 col-sm-10"> <button class="btn btn-primary btn-sm" style="margin-top:8px"  robot-type="robot-submit" type="button" value="Submit">Отправить</button> </div> </div> </form> </div> </body> </html> </message>`;
            bot.startConversation(message, (err, convo) => {
                if (!err) {
                    convo.ask(reply_message, (res, convo) => {
                        try {
                            console.log(res.from_jid == bot.client_jid);
                            if (res.from_jid == bot.client_jid)
                                return;
                            let query = JSON.parse(res.text);
                            console.log(query);
                        } catch (error) {
                            console.log(error.massage);
                            convo.stop();
                        }
                    })
                }
            })
        } catch (exeption) {
            console.log(exeption);
        }
    });

//Setup intent rules
controller.hears(['menu'], [ 'direct_message'],
    (bot, message) => {
        try {
            let reply_message = {};
            let to = message.user;
            let type = message.group ? 'groupchat' : 'chat';

            let body = 'Show bot menu';
            reply_message.text = body;
            reply_message.stanza = xml`<message to="${to}" type="${type}"> <body> ${body} </body> <html xmlns="http://jabber.org/protocol/xhtml-im"> <body xmlns="http://www.w3.org/1999/xhtml"> <div class="container"> <h6> Меню: </h6> <button class="btn btn-primary btn-sm btn-block" style="margin-top:8px;" robot-type="robot-button" type="button" robot-message="vacation"> Заявка на отпуск </button> <button class="btn btn-primary btn-sm btn-block" style="margin-top:8px;" robot-type="robot-button" type="button" robot-message="vacation-status"> Статус заявки </button> </div> </body> </html> </message>`
            bot.reply(message, reply_message)
        } catch (exeption) {
            console.log(exeption);
        }
    });
