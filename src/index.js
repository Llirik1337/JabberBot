let { Botkit } = require("botkit");

var controller = new Botkit({
  json_file_store: "./bot_store/",
});

// var bot = controller.spawn({
//   client: {
//     jid: "1cbot@psport.ru",
//     password: "Bot1cTest@",
//     host: "expw-e.psport.ru",
//     port: 5222,
//   },
// });

controller.hears(["hello"], ["direct_mention", "direct_message"], function (
  bot,
  message
) {
  bot.reply(message, "Hi");
});

controller.on("direct_mention", function (bot, message) {
  bot.reply(
    message,
    'You mentioned me in a group and said, "' + message.text + '"'
  );
});

controller.on("direct_message", function (bot, message) {
  bot.reply(
    message,
    'I got your direct message. You said, "' + message.text + '"'
  );
});
