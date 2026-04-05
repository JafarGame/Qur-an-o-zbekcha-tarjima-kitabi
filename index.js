const TelegramBot = require('node-telegram-bot-api');

const token = process.env.Muvahhid jafar
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `🕌 Assalomu alaykum!

📖 Qur'an botiga xush kelibsiz

👇 Pastdagi tugmani bosing`, {
        reply_markup: {
            keyboard: [["📖 Qur'an kitob"]],
            resize_keyboard: true
        }
    });
});

bot.on('message', (msg) => {
    if (msg.text === "📖 Qur'an kitob") {
        bot.sendMessage(msg.chat.id, "📚 Suralar tez orada chiqadi in shaa Allah");
    }
});
