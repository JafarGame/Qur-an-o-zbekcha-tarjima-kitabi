const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });
const myTranslation = {
  "1:1": "Mehribon va rahmli Allah nomi bilan."
};

const myTafsir = {
  "1:1": "Bu oyat har bir ishni Allah nomi bilan boshlashga undaydi. Unda Allahning rahmati zikr qilingan."
};
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
const key = `1:${a.numberInSurah}`;

let text = `${a.numberInSurah}. ${a.text}\n\n`;

text += `Tarjima:\n${myTranslation[key] || "..."}\n\n`;
text += `Izoh:\n${myTafsir[key] || ""}`;

            await bot.sendMessage(msg.chat.id, text);

        } catch (err) {
            console.log(err);
            bot.sendMessage(msg.chat.id, "❌ API xato");
        }
    }
});
