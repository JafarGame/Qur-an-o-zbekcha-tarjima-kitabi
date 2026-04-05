const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// START
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "🕌 Assalomu alaykum!", {
        reply_markup: {
            keyboard: [["📖 Qur'an kitob"]],
            resize_keyboard: true
        }
    });
});

// BUTTON
bot.on('message', (msg) => {
    if (msg.text === "📖 Qur'an kitob") {
        bot.sendMessage(msg.chat.id, "📚 Tugma ishladi!");
    }
});
