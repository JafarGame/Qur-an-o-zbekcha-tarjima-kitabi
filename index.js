const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// TARJIMA
const myTranslation = {
  "1:1": "Mehribon va rahmli Allah nomi bilan.",
  "1:2": "Hamd butun olamlarning Rabbi bo‘lgan Allahgadir.",
  "1:3": "O‘ta Mehribon, O‘ta Rahimli.",
  "1:4": "Jazo kunining Egasi.",
  "1:5": "Faqat Senga ibodat qilamiz va faqat Sendan yordam so‘raymiz.",
  "1:6": "Bizni to‘g‘ri yo‘lga hidoyat qil.",
  "1:7": "Ne’mat berganlarning yo‘liga, g‘azabga uchraganlarning va adashganlarning yo‘liga emas."
};

// TAFSIR
const myTafsir = {
  "1:1": "Bu ayat har bir ishni Allah nomi bilan boshlashga undaydi.",
  "1:2": "Barcha hamd faqat Allahga tegishli.",
  "1:3": "Allahning cheksiz rahmati ta’kidlanadi.",
  "1:4": "Qiyomat kuni faqat Allahga tegishli.",
  "1:5": "Faqat Allahga ibodat qilinadi.",
  "1:6": "To‘g‘ri yo‘l so‘raladi.",
  "1:7": "Hidoyat yo‘li bayon qilinadi."
};

// CHANNEL CHECK
const CHANNEL = "@diynasillari";

async function checkSub(userId) {
    try {
        const res = await bot.getChatMember(CHANNEL, userId);
        return ["member", "creator", "administrator"].includes(res.status);
    } catch {
        return false;
    }
}

// START
bot.onText(/\/start/, async (msg) => {
    const userId = msg.from.id;
    const isSub = await checkSub(userId);

    if (!isSub) {
        return bot.sendMessage(msg.chat.id,
            "❗ Kanalga obuna bo‘ling",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "📢 Kanal", url: "https://t.me/diynasillari" }],
                        [{ text: "✅ Tekshirish", callback_data: "check_sub" }]
                    ]
                }
            }
        );
    }

    bot.sendMessage(msg.chat.id, "🕌 Assalamu alaykum!", {
        reply_markup: {
            keyboard: [["📖 Qur'an kitob"]],
            resize_keyboard: true
        }
    });
});

// MESSAGE
bot.on('message', async (msg) => {

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

        const buttons = surahs.map((s, i) => [{
            text: `${i + 1}. ${s}`,
            callback_data: `surah_${i + 1}`
        }]);

        bot.sendMessage(msg.chat.id, "📚 Suralar:", {
            reply_markup: {
                inline_keyboard: buttons
            }
        });
    }
});

// CALLBACK
bot.on("callback_query", async (query) => {
    const data = query.data;
    const msg = query.message;

    try {

        if (data === "check_sub") {
            const userId = query.from.id;
            const isSub = await checkSub(userId);

            if (isSub) {
                bot.sendMessage(msg.chat.id, "✅ Rahmat!", {
                    reply_markup: {
                        keyboard: [["📖 Qur'an kitob"]],
                        resize_keyboard: true
                    }
                });
            } else {
                bot.sendMessage(msg.chat.id, "❌ Obuna bo‘lmadingiz");
            }
        }

        // SURAH
        else if (data.startsWith("surah_")) {
            const surahId = data.split("_")[1];

            const res = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
            const ayahs = res.data.data.ayahs;

            const buttons = ayahs.map(a => [{
                text: `${a.numberInSurah}`,
                callback_data: `ayah_${surahId}_${a.numberInSurah}`
            }]);

            bot.sendMessage(msg.chat.id, "📖 Oyatlar:", {
                reply_markup: {
                    inline_keyboard: buttons
                }
            });
        }

        // AYAH
        else if (data.startsWith("ayah_")) {
            const [_, surahId, ayahNum] = data.split("_");

            const res = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
            const ayah = res.data.data.ayahs[ayahNum - 1];

            const key = `${surahId}:${ayah.numberInSurah}`;

            let text = `${ayah.numberInSurah}. ${ayah.text}\n\n`;
            text += `Tarjima:\n${myTranslation[key] || "Tarjima yo‘q"}\n\n`;
            text += `Izoh:\n${myTafsir[key] || "Izoh yo‘q"}`;

            bot.sendMessage(msg.chat.id, text);
        }

    } catch (err) {
        console.log(err);
        bot.sendMessage(msg.chat.id, "❌ Xatolik");
    }

    bot.answerCallbackQuery(query.id);
});
