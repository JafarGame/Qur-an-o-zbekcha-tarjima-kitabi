const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// 🌍 GLOBAL SURA LIST (MUHIM!)
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

// 🟢 START
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Assalomu alaykum!", {
        reply_markup: {
            keyboard: [
                ["📖 Qur'an", "🔍 Qidiruv"],
                ["⬅️ Ortga"]
            ],
            resize_keyboard: true
        }
    });
});
// 🟢 MESSAGE
bot.on("message", async (msg) => {
// 🔙 ORTGA
if (msg.text === "⬅️ Ortga") {
    return bot.sendMessage(msg.chat.id, "🏠 Asosiy menyu", {
        reply_markup: {
            keyboard: [
                ["📖 Qur'an", "🔍 Qidiruv"],
                ["⬅️ Ortga"]
            ],
            resize_keyboard: true
        }
    });
}

// 🔍 QIDIRUV BOSHLASH
if (msg.text === "🔍 Qidiruv") {
    return bot.sendMessage(msg.chat.id, "🔎 Qidirish uchun yozing:\n\nMasalan:\n2:255");
}

// 🔎 QIDIRUV ISHLASH
if (/^\d+:\d+$/.test(msg.text)) {
    const surahId = Number(msg.text.split(":")[0]);
    const ayahNum = Number(msg.text.split(":")[1]);
    try {
        const res = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
        const ayah = res.data.data.ayahs[ayahNum - 1];
        let text = `${ayah.numberInSurah}. ${ayah.text}\n\n`;
        text += `Tarjima:\n...\n\n`;
        text += `Tafsir:\n.......`;
        return bot.sendMessage(msg.chat.id, text);
    } catch {
        return bot.sendMessage(msg.chat.id, "❌ Topilmadi");
    }
}
    if (msg.text === "📖 Qur'an") {

        const page = 0;
        const pageSize = 20;

        const start = page * pageSize;
        const end = start + pageSize;

        const pageSurahs = surahs.slice(start, end);

        const buttons = pageSurahs.map((s, i) => [{
            text: `${start + i + 1}. ${s}`,
            callback_data: `surah_${start + i + 1}`
        }]);

        const nav = [];

        if (end < surahs.length) {
            nav.push({ text: "➡️ Keyingi", callback_data: `surah_page_1` });
        }

        if (nav.length) buttons.push(nav);

        bot.sendMessage(msg.chat.id, "📚 Suralar:", {
            reply_markup: {
                inline_keyboard: buttons
            }
        });
    }
});

// 🟢 CALLBACK
bot.on("callback_query", async (query) => {

    const data = query.data;
    const msg = query.message;

    try {

        // 🔹 SURAH PAGINATION
        if (data.startsWith("surah_page_")) {

            const page = Number(data.split("_")[2]);
            const pageSize = 20;

            const start = page * pageSize;
            const end = start + pageSize;

            const pageSurahs = surahs.slice(start, end);

            const buttons = pageSurahs.map((s, i) => [{
                text: `${start + i + 1}. ${s}`,
                callback_data: `surah_${start + i + 1}`
            }]);

            const nav = [];

            if (page > 0) {
                nav.push({ text: "⬅️ Oldingi", callback_data: `surah_page_${page - 1}` });
            }

            if (end < surahs.length) {
                nav.push({ text: "➡️ Keyingi", callback_data: `surah_page_${page + 1}` });
            }

            if (nav.length) buttons.push(nav);

            bot.editMessageText("📚 Suralar:", {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: buttons
                }
            });
        }

        // 🔹 SURAH TANLANGANDA
        else if (data.startsWith("surah_")) {

            const surahId = data.split("_")[1];

            const res = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
            const ayahs = res.data.data.ayahs;

            const page = 0;
            const pageSize = 20;

            const start = page * pageSize;
            const end = start + pageSize;

            const pageAyahs = ayahs.slice(start, end);

            const buttons = pageAyahs.map(a => [{
                text: `${a.numberInSurah}`,
                callback_data: `ayah_${surahId}_${a.numberInSurah}`
            }]);

            const nav = [];

            if (end < ayahs.length) {
                nav.push({ text: "➡️ Keyingi", callback_data: `page_${surahId}_1` });
            }

            if (nav.length) buttons.push(nav);

            bot.sendMessage(msg.chat.id, "📖 Oyatlar:", {
                reply_markup: {
                    inline_keyboard: buttons
                }
            });
        }

        // 🔹 AYAH PAGINATION
        else if (data.startsWith("page_")) {

            const [_, surahId, pageRaw] = data.split("_");
            const page = Number(pageRaw);
            const pageSize = 20;

            const res = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
            const ayahs = res.data.data.ayahs;

            const start = page * pageSize;
            const end = start + pageSize;

            const pageAyahs = ayahs.slice(start, end);

            const buttons = pageAyahs.map(a => [{
                text: `${a.numberInSurah}`,
                callback_data: `ayah_${surahId}_${a.numberInSurah}`
            }]);

            const nav = [];

            if (page > 0) {
                nav.push({ text: "⬅️ Oldingi", callback_data: `page_${surahId}_${page - 1}` });
            }

            if (end < ayahs.length) {
                nav.push({ text: "➡️ Keyingi", callback_data: `page_${surahId}_${page + 1}` });
            }

            if (nav.length) buttons.push(nav);

            bot.editMessageText("📖 Oyatlar:", {
                chat_id: msg.chat.id,
                message_id: msg.message_id,
                reply_markup: {
                    inline_keyboard: buttons
                }
            });
        }

        // 🔹 AYAH
        else if (data.startsWith("ayah_")) {

            const [_, surahId, ayahNum] = data.split("_");

            const res = await axios.get(`https://api.alquran.cloud/v1/surah/${surahId}`);
            const ayah = res.data.data.ayahs[ayahNum - 1];

            let text = `${ayah.numberInSurah}. ${ayah.text}\n\n`;
            text += `Tarjima:\n...\n\n`;
            text += `Tafsir:\n.......`;

            bot.sendMessage(msg.chat.id, text);
        }

    } catch (err) {
        console.log(err);
        bot.sendMessage(msg.chat.id, "❌ Xatolik");
    }

    bot.answerCallbackQuery(query.id);
});
