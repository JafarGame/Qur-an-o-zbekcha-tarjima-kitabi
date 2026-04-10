const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const translations = {
    1: {
        1: "Mehribon va rahmli Allah nomi bilan.",
        2: "Hamd butun olamlarning Rabbi bo‘lgan Allahgadir.",
        3: "U Mehribon va Rahmlidir.",
        4: "Jazo kunining Egasi.",
        5: "Faqat Senga ibodat qilamiz va faqat Sendan yordam so‘raymiz.",
        6: "Bizni to‘g‘ri yo‘lga hidoyat qil.",
        7: "Ne’mat berganlarning yo‘liga, g‘azabga uchraganlar va adashganlarning yo‘liga emas."
    }
};
2: {
    1: "Alif, Lam, Mim.",
    2: "Bu Kitob — unda shubha yo‘q. Muttaqilar uchun hidoyatdir.",
    3: "Ular g‘aybga iymon keltiradilar, namozni to‘kis ado etadilar va Biz ularga bergan narsalardan ehson qiladilar.",
    4: "Ular sizga nozil qilingan narsaga va sizdan oldin nozil qilingan narsalarga iymon keltiradilar va oxiratga aniq ishonadilar.",
    5: "Ana o‘shalar Robblaridan bo‘lgan hidoyat ustidadirlar va ana o‘shalar najot topuvchilardir.",
    6: "Albatta, kufr keltirganlar — ularni ogohlantirsang ham, ogohlantirmasang ham ular uchun baribir, iymon keltirmaydilar.",
    7: "Allah ularning qalblarini va quloqlarini muhrlab qo‘ydi, ko‘zlarida esa parda bor. Ular uchun ulkan azob bordir.",
    8: "Odamlar orasida shundaylar ham borki: «Allahga va oxirat kuniga iymon keltirdik», deydilar, holbuki ular mo‘min emaslar.",
    9: "Ular Allahni va iymon keltirganlarni aldamoqchi bo‘ladilar, holbuki faqat o‘zlarini aldaydilar, lekin sezmaydilar.",
    10: "Ularning qalblarida kasallik bor. Allah ularning kasalligini ziyoda qildi. Ular uchun yolg‘on gapirganlari sababli alamli azob bor.",
    11: "Ularga: «Yer yuzida buzg‘unchilik qilmanglar», deyilsa, «Biz faqat isloh qiluvchilarmiz», deydilar.",
    12: "Ogoh bo‘ling! Albatta, ular buzg‘unchilardir, lekin sezmaydilar.",
    13: "Ularga: «Odamlar iymon keltirgandek iymon keltiringlar», deyilsa, «Ahmoqlar iymon keltirgandek iymon keltiraylikmi?» deydilar. Ogoh bo‘ling! Albatta, o‘zlari ahmoqlardir, lekin bilmaydilar.",
    14: "Ular iymon keltirganlarga uchraganlarida: «Iymon keltirdik», deydilar. O‘z shaytonlari bilan yolg‘iz qolganlarida esa: «Biz sizlar bilandirmiz, faqat masxara qilmoqdamiz», deydilar.",
    15: "Allah ularni masxara qiladi va ularni o‘z tug‘yonlarida sarson holda qoldiradi.",
    16: "Ana o‘shalar hidoyat o‘rniga zalolatni sotib olganlardir. Ularning savdosi foyda bermadi va ular hidoyat topmadilar.",
    17: "Ularning misoli xuddi olov yoqqan kimsaga o‘xshaydi. Atrofini yoritgach, Allah ularning nurini olib qo‘ydi va ularni zulmatlarda qoldirdi, ular ko‘rmaydilar.",
    18: "Kar, soqov va ko‘rdirlar — bas, ular qaytmaydilar.",
    19: "Yoki (ular) osmondan tushayotgan yomg‘irga o‘xshaydi, unda zulmatlar, momaqaldiroq va chaqmoq bor...",
}
// 🌍 GLOBAL SURA LIST (MUHIM!)
const surahs = [
"Fatiha","Baqara","Ali Imran","Nisa","Maida","An'am","A'raf","Anfal","Tavba","Yunus",
"Hud","Yusuf","Ra'd","Ibrahim","Hijr","Nahl","Isra","Kahf","Maryam","Taha",
"Anbiya","Haj","Mu'minun","Nur","Furqan","Shuara","Naml","Qasas","Ankabut","Rum",
"Luqman","Sajda","Ahzab","Saba","Fatir","Yasin","Saffat","Sad","Zumar","G'afir",
"Fussilat","Shura","Zuxruf","Duxan","Josiya","Ahqaf","Muhammad","Fath","Hujurat","Qaf",
"Zariyat","Tur","Najm","Qamar","Rahman","Vaqia","Hadid","Mujadala","Hashr","Mumtahana",
"Saff","Jumu'a","Munafiqun","Tag'abun","Talaq","Tahrim","Mulk","Qalam","Haqqa","Maarij",
"Nuh","Jin","Muzzammil","Muddassir","Qiyamah","Inson","Mursalat","Naba","Nazi'at","Abasa",
"Takvir","Infitar","Mutaffifin","Inshiqaq","Buruj","Tariq","A'la","G'oshiya","Fajr","Balad",
"Shams","Layl","Duha","Sharh","Tin","Alaq","Qadr","Bayyina","Zalzala","Odiyat",
"Qari'a","Takasur","Asr","Humaza","Fil","Quraysh","Ma'un","Kavsar","Kafirun","Nasr",
"Masad","Ixlas","Falaq","Nos"
];

// 🟢 START
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Assalamu alaykum!", {
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
        const surahTranslations = translations[surahId] || {};
const tarjima = surahTranslations[ayah.numberInSurah] || "Tarjima yo‘q";

let text = `${ayah.numberInSurah}. ${ayah.text}\n\n`;
text += `📖 Tarjima:\n${tarjima}\n\n`;
text += `📚 Tafsir:\n.......`;
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

            const surahTranslations = translations[surahId] || {};
const tarjima = surahTranslations[ayah.numberInSurah] || "Tarjima yo‘q";

let text = `${ayah.numberInSurah}. ${ayah.text}\n\n`;
text += `📖 Tarjima:\n${tarjima}\n\n`;
text += `📚 Tafsir:\n.......`;

            bot.sendMessage(msg.chat.id, text);
        }

    } catch (err) {
        console.log(err);
        bot.sendMessage(msg.chat.id, "❌ Xatolik");
    }

    bot.answerCallbackQuery(query.id);
});
