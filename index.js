const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
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
bot.on('message', async (msg) => {
    if (msg.text === "📖 Qur'an kitob") {
        try {
            const res = await axios.get('https://api.alquran.cloud/v1/surah/1');
            const ayahs = res.data.data.ayahs;

            // faqat 1-oyatni chiqaramiz (test)
            const a = ayahs[0];

            let text = `${a.numberInSurah}. ${a.text}`;

            await bot.sendMessage(msg.chat.id, text);

        } catch (err) {
            console.log(err);
            bot.sendMessage(msg.chat.id, "❌ API xato");
        }
    }
});
