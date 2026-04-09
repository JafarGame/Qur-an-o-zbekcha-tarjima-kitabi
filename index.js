const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const myTranslation = {
  "1:1": "Mehribon va rahmli Allah nomi bilan.",
  "1:2": "Hamd butun olamlarning Rabbi bo‘lgan Allahgadir.",
  "1:3": "O‘ta Mehribon, O‘ta Rahimli.",
  "1:4": "Jazo kunining Egasi.",
  "1:5": "Faqat Senga ibodat qilamiz va faqat Sendan yordam so‘raymiz.",
  "1:6": "Bizni to‘g‘ri yo‘lga hidoyat qil.",
  "1:7": "Ne’mat berganlarning yo‘liga, g‘azabga uchraganlarning va adashganlarning yo‘liga emas."
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
const CHANNEL = "@diynasillari";
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
        "🕌 Assalamu alaykum!",
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

    const surahs = [
        "Fotiha","Baqara","Oli Imron","Niso","Moida","An'om","A'rof","Anfol","Tavba","Yunus",
        "Hud","Yusuf","Ra'd","Ibrohim","Hijr","Nahl","Isro","Kahf","Maryam","Toha",
        "Anbiyo","Haj","Mu'minun","Nur","Furqon","Shuaro","Naml","Qasas","Ankabut","Rum",
        "Luqmon","Sajda","Ahzob","Saba","Fotir","Yosin","Soffot","Sod","Zumar","G'ofir",
        "Fussilat","Shuro","Zuxruf","Duxon","Josiya","Ahqof","Muhammad","Fath","Hujurot","Qof",
        "Zariyat","Tur","Najm","Qamar","Rahmon","Voqia","Hadid","Mujodala","Hashr","Mumtahana",
        "Saff","Jumu'a","Munofiqun","Tag'obun","Taloq","Tahrim","Mulk","Qalam","Haqqa","Maorij",
        "Nuh","Jin","Muzzammil","Muddassir","Qiyoma","Inson","Mursalat","Naba","Nozi'at","Abasa",
        "Takvir","Infitor","Mutaffifin","Inshiqoq","Buruj","Toriq","A'la","G'oshiya","Fajr","Balad",
        "Shams","Layl","Duha","Sharh","Tin","Alaq","Qadr","Bayyina","Zalzala","Odiyat",
        "Qori'a","Takosur","Asr","Humaza","Fil","Quraysh","Ma'un","Kavsar","Kafirun","Nasr",
        "Masad","Ixlos","Falaq","Nos"
    ];

    const buttons = [];

    for (let i = 0; i < surahs.length; i++) {
        buttons.push([{
            text: `${i + 1}. ${surahs[i]}`,
            callback_data: `surah_${i + 1}`
        }]);
    }

    bot.sendMessage(msg.chat.id, "📚 Suralar:", {
        reply_markup: {
            inline_keyboard: buttons
        }
    });
}
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
    const data = query.data;
    const msg = query.message;

    // OBUNA CHECK
    if (data === "check_sub") {
        const userId = query.from.id;
        const isSub = await checkSub(userId);

        if (isSub) {
            bot.sendMessage(msg.chat.id,
                "✅ Rahmat! Endi foydalanishingiz mumkin",
                {
                    reply_markup: {
                        keyboard: [["📖 Qur'an kitob"]],
                        resize_keyboard: true
                    }
                }
            );
        } else {
            bot.sendMessage(msg.chat.id,
                "❌ Siz hali obuna bo‘lmadingiz!"
            );
        }
    }

    // 📖 SURA BOSILDI
    else if (data.startsWith("surah_")) {
        const surahId = data.split("_")[1];

        try {
            const res = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
            const ayahs = res.data.data.ayahs;

            const buttons = ayahs.map(a => [{
                text: `${a.numberInSurah}`,
                callback_data: `ayah_${surahId}_${a.numberInSurah}`
            }]);

            bot.sendMessage(msg.chat.id, "📖 Oyatni tanlang:", {
                reply_markup: {
                    inline_keyboard: buttons
                }
            });

        } catch (err) {
            bot.sendMessage(msg.chat.id, "❌ Xatolik");
        }
    }

    // 🔢 OYAT BOSILDI
    else if (data.startsWith("ayah_")) {
        const [_, surahId, ayahNum] = data.split("_");

        try {
            const res = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
            const ayah = res.data.data.ayahs[ayahNum - 1];

            let text = `${ayah.numberInSurah}. ${ayah.text}`;

            bot.sendMessage(msg.chat.id, text);

        } catch (err) {
            bot.sendMessage(msg.chat.id, "❌ Xatolik");
        }
    }

    bot.answerCallbackQuery(query.id);
});
