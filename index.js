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
    },

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
    20: "Chaqmoq deyarli ularning ko‘zlarini olib ketay deydi. Har qachon ularga yoritib bersa, unda yuradilar, qachon qorong‘ulik tushsa, to‘xtab qoladilar. Agar Allah xohlasa edi, ularning eshitish va ko‘rish qobiliyatini olib qo‘ygan bo‘lur edi. Albatta, Allah har narsaga qodirdir.",
21: "Ey odamlar! Sizlarni va sizlardan oldin o‘tganlarni yaratgan Robbingizga ibodat qiling, shoyad taqvo qilsangiz.",
22: "U sizlar uchun yerni to‘shak, osmonni esa bino qildi va osmondan suv tushirdi. U bilan sizlarga rizq bo‘lishi uchun mevalar chiqardi. Bas, bilib turib, Allahga tengdoshlar keltirmang.",
23: "Agar bandamizga nozil qilgan narsamizdan shubhada bo‘lsangiz, unga o‘xshash bir sura keltiring va Allahdan boshqa guvohlaringizni chaqiring, agar rostgo‘y bo‘lsangiz.",
24: "Agar buni qila olmasangiz — va aslo qila olmaysiz — bas, kofirlar uchun tayyorlangan, yoqilg‘isi odamlar va toshlar bo‘lgan do‘zaxdan qo‘rqing.",
25: "Iymon keltirib, solih amallar qilganlarga xushxabar ber: ular uchun ostidan daryolar oqib turadigan jannatlar bor. Qachon ularga rizq sifatida mevalardan berilsa: «Bu bizga ilgari berilgan narsaga o‘xshash», deydilar. Ularga o‘xshash qilib berilgan. Ular uchun u yerda pok juftlar bor va ular u yerda abadiy qoladilar.",
26: "Albatta, Allah bir chivin yoki undan ham kichik narsani misol qilishdan uyalmaydi. Iymon keltirganlar uning haqiqat ekanini biladilar. Kofirlar esa: «Allah bu bilan nimani nazarda tutdi?» deydilar. U bilan ko‘plarni adashtiradi va ko‘plarni hidoyat qiladi. Lekin u bilan faqat fosiqlarni adashtiradi.",
27: "Ular Allah bilan ahd qilganlaridan keyin uni buzadilar, Allah bog‘lashni buyurgan narsalarni uzadilar va yer yuzida buzg‘unchilik qiladilar. Ana o‘shalar ziyon ko‘ruvchilardir.",
28: "Qanday qilib Allahga kufr keltirasizlar? Sizlar o‘lik edingizlar, U sizlarga hayot berdi. Keyin sizlarni o‘ldiradi, so‘ng yana tiriltiradi va oxir-oqibat Unga qaytarilasizlar.",
29: "U sizlar uchun yerdagi barcha narsalarni yaratdi, so‘ng osmonga yuzlandi va ularni yetti osmon qilib tartibga soldi. U har narsani biluvchidir.",
30: "Eslang, Robbingiz farishtalarga: «Men yerda xalifa qilaman», deganida, ular: «Unda buzg‘unchilik qiladigan va qon to‘kadigan kishini qilasanmi? Holbuki biz Seni hamd bilan tasbeh aytamiz va poklaymiz», dedilar. U dedi: «Albatta, Men sizlar bilmagan narsani bilaman».",
31: "U Odamga barcha nomlarni o‘rgatdi, so‘ng ularni farishtalarga ko‘rsatib: «Agar rostgo‘y bo‘lsangiz, mana bularning nomlarini Menga aytinglar», dedi.",
32: "Ular dedilar: «Seni poklaymiz! Bizda Sen o‘rgatganingdan boshqa ilm yo‘q. Albatta, Sen Biluvchi va Hikmatlisansan».",
33: "U dedi: «Ey Odam! Ularning nomlarini ularga ayt». U aytgach, dedi: «Men sizlarga osmonlar va yerning g‘aybini bilaman, sizlar oshkor qilgan va yashirgan narsalarni ham bilaman, demaganmidim?»",
34: "Farishtalarga: «Odamga sajda qilinglar», deganimizda, ular sajda qildilar. Faqat Iblis bosh tortdi, kibr qildi va kofirlardan bo‘ldi.",
35: "Dedik: «Ey Odam! Sen va jufting jannatda yashanglar va undan xohlagan joyingizdan bemalol yenglar, lekin bu daraxtga yaqinlashmanglar, aks holda zolimlardan bo‘lib qolasizlar».",
36: "Shayton ularni undan adashtirdi va ular bo‘lgan joylaridan chiqardi. Dedik: «Bir-biringizga dushman bo‘lgan holda tushinglar. Sizlar uchun yerda bir muddat yashash va foydalanish bor».",
37: "Odam Robbidan kalimalarni oldi va U uning tavbasini qabul qildi. Albatta, U Tavbalarni qabul qiluvchi va Rahmlidir.",
38: "Dedik: «Hammangiz undan tushinglar. Agar Mendan sizlarga hidoyat kelsa, kim Mening hidoyatimga ergashsa, ularga qo‘rquv yo‘q va ular xafa ham bo‘lmaydilar».",
39: "Kufr keltirgan va oyatlarimizni inkor etganlar esa — ana o‘shalar do‘zax ahlidir. Ular unda abadiy qoladilar.",
40: "Ey Bani Isroil! Sizlarga bergan ne’matimni eslang va Menga bergan ahdingizni ado eting, Men ham sizlarga bergan ahdimni ado etaman. Va faqat Mendan qo‘rqing.",
 41: "Sizlar bilan birga bo‘lgan narsani tasdiqlovchi qilib nozil qilgan narsamga iymon keltiringlar. Uni birinchi inkor qiluvchilardan bo‘lmanglar va oyatlarimni oz bahoga sotmanglar. Va faqat Mendan qo‘rqinglar.",
42: "Haqni botil bilan aralashtirmanglar va haqiqatni bila turib yashirmanglar.",
43: "Namozni to‘kis ado etinglar, zakotni beringlar va ruku qiluvchilar bilan birga ruku qilinglar.",
44: "Odamlarga yaxshilikni buyurib, o‘zlaringizni unutasizlarmi? Holbuki Kitobni tilovat qilasizlar. Aql qilmaydilarmi?",
45: "Sabr va namoz bilan yordam so‘ranglar. Albatta, bu og‘ir ishdir, magar xushu’ egalari uchun emas.",
46: "Ular Robblariga yo‘liqishni va Unga qaytishlarini bilganlardir.",
47: "Ey Bani Isroil! Sizlarga bergan ne’matimni eslang va sizlarni olamlardan ustun qilganimni (ham eslang).",
48: "Shunday kundan qo‘rqinglarki, unda hech kim boshqa bir jon uchun foyda bermaydi, undan shafoat qabul qilinmaydi, undan badal olinmaydi va ularga yordam ham berilmaydi.",
49: "Sizlarni Fir’avn qavmidan qutqarganimizni eslang. Ular sizlarga yomon azob berar, o‘g‘illaringizni so‘yib, ayollaringizni tirik qoldirar edilar. Bu sizlar uchun Robbingiz tomonidan ulkan sinov edi.",
50: "Sizlar uchun dengizni yorib, sizlarni qutqarganimizni va Fir’avn qavmini ko‘z o‘ngingizda g‘arq qilganimizni eslang.",
51: "Musoga qirq kecha va’da berganimizni, so‘ng sizlar undan keyin buzoqni (iloh qilib) tutganingizni va zolim bo‘lganingizni eslang.",
52: "Shundan keyin ham, shukr qilarsizlar, deb sizlarni afv etdik.",
53: "Musoga Kitobni va Furqonni berganimizni eslang, shoyad hidoyat topsangizlar.",
54: "Muso qavmiga: «Ey qavmim! Sizlar buzoqni (iloh qilib) tutib, o‘zlaringizga zulm qildingizlar. Endi Yaratguvchingizga tavba qilinglar va o‘zlaringizni o‘ldiringlar. Bu sizlar uchun Yaratguvchingiz huzurida yaxshiroqdir», dedi. Bas, U tavbangizni qabul qildi. Albatta, U Tavbalarni qabul qiluvchi va Rahmlidir.",
55: "Sizlar: «Ey Muso! Allahni ochiq ko‘rmagunimizcha senga ishonmaymiz», deganingizni eslang. Shunda sizlarni chaqmoq urdi, siz qarab turganingizda.",
56: "So‘ng sizlarni o‘limingizdan keyin tiriltirdik, shoyad shukr qilsangizlar.",
57: "Ustingizga bulutlarni soyabon qildik va sizlarga mann va salwa tushirdik. «Biz sizlarga bergan pok narsalardan yenglar», dedik. Ular Bizga zulm qilmadilar, balki o‘zlariga zulm qildilar.",
58: "Dedik: «Mana bu shaharga kiringlar va undan xohlagan joyingizdan bemalol yenglar. Darvozadan sajda qilgan holda kiringlar va: “Hittah!” denglar. Gunohlaringizni kechiramiz va yaxshilik qiluvchilarga ziyoda qilamiz».",
59: "Zolimlar aytilgan so‘zni boshqasiga almashtirdilar. Bas, Biz zolimlarga osmondan azob tushirdik, ular buzg‘unchilik qilganlari sababli.",
60: "Muso qavmi uchun suv so‘raganini eslang. Biz: «Asoing bilan toshga ur», dedik. Undan o‘n ikki buloq otilib chiqdi. Har bir qavm o‘z ichimligini bildi. «Allahning rizqidan yenglar va ichinglar va yer yuzida buzg‘unchilik qilmanglar», dedik.",   
    }
 };
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
