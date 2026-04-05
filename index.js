const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const myTranslation = {
  "1:1": "Mehribon va rahmli Allah nomi bilan.",
  "1:2": "Hamd butun olamlarning Robbi bo‘lgan Allahgadir.",
  "1:3": "O‘ta Mehribon, O‘ta Rahimli.",
  "1:4": "Jazo kunining Egasi.",
  "1:5": "Faqat Senga ibodat qilamiz va faqat Sendan yordam so‘raymiz.",
  "1:6": "Bizni to‘g‘ri yo‘lga hidoyat qil.",
  "1:7": "Ne’mat bergan zotlarning yo‘liga, g‘azabga uchraganlarning va adashganlarning yo‘liga emas."
};
const myTafsir = {
  "1:1": "Bu ayat har bir ishni Allah nomi bilan boshlashga undaydi. Unda Allahning rahmati zikr qilingan.",
  "1:2": "Bu ayatda barcha hamd va maqtovlar faqat Allahga tegishli ekani bayon qilinadi. U olamlarning egasidur.",
  "1:3": "Bu ayatda Allahning cheksiz rahmati yana ta’kidlanadi. U barcha bandalariga mehribon va rahmlidir.",
  "1:4": "Bu ayatda Qiyomat kuni faqat Allahga tegishli ekani va barcha hisob-kitob Uning qo‘lida ekani bayon qilinadi.",
  "1:5": "Bu ayatda bandaning faqat Allahga ibodat qilishi va faqat Undan yordam so‘rashi kerakligi bayon qilinadi.",
  "1:6": "Bu ayatda banda Allahdan to‘g‘ri yo‘lni ko‘rsatishni va unda sobit qilishni so‘raydi.",
  "1:7": "Bu ayatda hidoyat topganlar yo‘li bilan adashganlar va g‘azabga uchraganlar yo‘li farqlanadi."
};
// START
const CHANNEL = "https://t.me/diynasillari";
async function checkSub(userId) {
    try {
        const res = await bot.getChatMember(CHANNEL, userId);
        return ["member", "creator", "administrator"].includes(res.status);
    } catch (e) {
        return false;
    }
}
bot.onText(/\/start/, async (msg) => {
    const userId = msg.from.id;
    const isSub = await checkSub(userId);
    if (!isSub) {
        return bot.sendMessage(msg.chat.id,
            "❗ Botdan foydalanish uchun kanalga obuna bo‘ling",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📢 Kanalga o'tish", url: "https://t.me/diynasillari" }],
                        [{ text: "✅ Tekshirish", callback_data: "check_sub" }]
                    ]
                }
            }
        );
    }
    bot.sendMessage(msg.chat.id,
        "🕌 Assalomu alaykum!",
        {
            reply_markup: {
                keyboard: [["📖 Qur'an kitob"]],
                resize_keyboard: true
            }
        }
    );
});
// BUTTON
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
bot.on("callback_query", async (query) => {
    if (query.data === "check_sub") {
        const userId = query.from.id;
        const isSub = await checkSub(userId);
        if (isSub) {
            bot.sendMessage(query.message.chat.id,
                "✅ Rahmat! Endi foydalanishingiz mumkin",
                {
                    reply_markup: {
                        keyboard: [["📖 Qur'an kitob"]],
                        resize_keyboard: true
                    }
                }
            );
        } else {
            bot.sendMessage(query.message.chat.id,
                "❌ Siz hali obuna bo‘lmadingiz!"
            );
        }
    }
});
