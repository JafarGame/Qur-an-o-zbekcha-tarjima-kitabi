const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });
const myTranslation = {
  "1:1": "Mehribon va rahmli Allah nomi bilan.",
  "1:2": "Hamd butun olamlarning Robbi bo‘lgan Allahgadir."
};
const myTafsir = {
  "1:1": "Bu ayat har bir ishni Allah nomi bilan boshlashga undaydi. Unda Allahning rahmati zikr qilingan.",
  "1:2": "Bu ayatda barcha hamd va maqtovlar faqat Allahga tegishli ekani bayon qilinadi. U olamlarning egasidur."
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
    bot.on('message', async (msg) => {

    // 📖 Qur'an bosilganda
    if (msg.text === "📖 Qur'an kitob") {
        bot.sendMessage(msg.chat.id, "📚 Suralar:", {
            reply_markup: {
                keyboard: [["📖 Fotiha"]],
                resize_keyboard: true
            }
        });
    }

    // 📖 Fotiha bosilganda
    else if (msg.text === "📖 Fotiha") {
        bot.sendMessage(msg.chat.id, "Fotiha surasi oyatlari:", {
            reply_markup: {
                keyboard: [
                    ["1", "2", "3"],
                    ["4", "5", "6"],
                    ["7"]
                ],
                resize_keyboard: true
            }
        });
    }

    // 🔢 Oyat tanlanganda
    else if (["1","2","3","4","5","6","7"].includes(msg.text)) {
        try {
            const res = await axios.get('https://api.alquran.cloud/v1/surah/1');
            const ayahs = res.data.data.ayahs;

            const number = parseInt(msg.text);
            const a = ayahs[number - 1];
            const key = `1:${a.numberInSurah}`;

            let text = `${a.numberInSurah}. ${a.text}\n\n`;

            text += `Tarjima:\n${myTranslation[key] || "..."}\n\n`;
            text += `Izoh:\n${myTafsir[key] || ""}`;

            await bot.sendMessage(msg.chat.id, text);

        } catch (err) {
            console.log(err);
            bot.sendMessage(msg.chat.id, "❌ Xatolik");
        }
    }
});
