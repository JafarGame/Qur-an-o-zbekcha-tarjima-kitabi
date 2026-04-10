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
    5: "Ana o‘shalar Rabblaridan bo‘lgan hidoyat ustidadirlar va ana o‘shalar najot topuvchilardir.",
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
21: "Ey odamlar! Sizlarni va sizlardan oldin o‘tganlarni yaratgan Rabbingizga ibodat qiling, shoyad taqvo qilsangiz.",
22: "U sizlar uchun yerni to‘shak, osmonni esa bino qildi va osmondan suv tushirdi. U bilan sizlarga rizq bo‘lishi uchun mevalar chiqardi. Bas, bilib turib, Allahga tengdoshlar keltirmang.",
23: "Agar bandamizga nozil qilgan narsamizdan shubhada bo‘lsangiz, unga o‘xshash bir sura keltiring va Allahdan boshqa guvohlaringizni chaqiring, agar rostgo‘y bo‘lsangiz.",
24: "Agar buni qila olmasangiz — va aslo qila olmaysiz — bas, kofirlar uchun tayyorlangan, yoqilg‘isi odamlar va toshlar bo‘lgan do‘zaxdan qo‘rqing.",
25: "Iymon keltirib, solih amallar qilganlarga xushxabar ber: ular uchun ostidan daryolar oqib turadigan jannatlar bor. Qachon ularga rizq sifatida mevalardan berilsa: «Bu bizga ilgari berilgan narsaga o‘xshash», deydilar. Ularga o‘xshash qilib berilgan. Ular uchun u yerda pok juftlar bor va ular u yerda abadiy qoladilar.",
26: "Albatta, Allah bir chivin yoki undan ham kichik narsani misol qilishdan uyalmaydi. Iymon keltirganlar uning haqiqat ekanini biladilar. Kofirlar esa: «Allah bu bilan nimani nazarda tutdi?» deydilar. U bilan ko‘plarni adashtiradi va ko‘plarni hidoyat qiladi. Lekin u bilan faqat fosiqlarni adashtiradi.",
27: "Ular Allah bilan ahd qilganlaridan keyin uni buzadilar, Allah bog‘lashni buyurgan narsalarni uzadilar va yer yuzida buzg‘unchilik qiladilar. Ana o‘shalar ziyon ko‘ruvchilardir.",
28: "Qanday qilib Allahga kufr keltirasizlar? Sizlar o‘lik edingizlar, U sizlarga hayot berdi. Keyin sizlarni o‘ldiradi, so‘ng yana tiriltiradi va oxir-oqibat Unga qaytarilasizlar.",
29: "U sizlar uchun yerdagi barcha narsalarni yaratdi, so‘ng osmonga yuzlandi va ularni yetti osmon qilib tartibga soldi. U har narsani biluvchidir.",
30: "Eslang, Rabbingiz farishtalarga: «Men yerda xalifa qilaman», deganida, ular: «Unda buzg‘unchilik qiladigan va qon to‘kadigan kishini qilasanmi? Holbuki biz Seni hamd bilan tasbeh aytamiz va poklaymiz», dedilar. U dedi: «Albatta, Men sizlar bilmagan narsani bilaman».",
31: "U Odamga barcha nomlarni o‘rgatdi, so‘ng ularni farishtalarga ko‘rsatib: «Agar rostgo‘y bo‘lsangiz, mana bularning nomlarini Menga aytinglar», dedi.",
32: "Ular dedilar: «Seni poklaymiz! Bizda Sen o‘rgatganingdan boshqa ilm yo‘q. Albatta, Sen Biluvchi va Hikmatlisansan».",
33: "U dedi: «Ey Odam! Ularning nomlarini ularga ayt». U aytgach, dedi: «Men sizlarga osmonlar va yerning g‘aybini bilaman, sizlar oshkor qilgan va yashirgan narsalarni ham bilaman, demaganmidim?»",
34: "Farishtalarga: «Odamga sajda qilinglar», deganimizda, ular sajda qildilar. Faqat Iblis bosh tortdi, kibr qildi va kofirlardan bo‘ldi.",
35: "Dedik: «Ey Odam! Sen va jufting jannatda yashanglar va undan xohlagan joyingizdan bemalol yenglar, lekin bu daraxtga yaqinlashmanglar, aks holda zolimlardan bo‘lib qolasizlar».",
36: "Shayton ularni undan adashtirdi va ular bo‘lgan joylaridan chiqardi. Dedik: «Bir-biringizga dushman bo‘lgan holda tushinglar. Sizlar uchun yerda bir muddat yashash va foydalanish bor».",
37: "Odam Rabbidan kalimalarni oldi va U uning tavbasini qabul qildi. Albatta, U Tavbalarni qabul qiluvchi va Rahmlidir.",
38: "Dedik: «Hammangiz undan tushinglar. Agar Mendan sizlarga hidoyat kelsa, kim Mening hidoyatimga ergashsa, ularga qo‘rquv yo‘q va ular xafa ham bo‘lmaydilar».",
39: "Kufr keltirgan va oyatlarimizni inkor etganlar esa — ana o‘shalar do‘zax ahlidir. Ular unda abadiy qoladilar.",
40: "Ey Bani Isroil! Sizlarga bergan ne’matimni eslang va Menga bergan ahdingizni ado eting, Men ham sizlarga bergan ahdimni ado etaman. Va faqat Mendan qo‘rqing.",
41: "Sizlar bilan birga bo‘lgan narsani tasdiqlovchi qilib nozil qilgan narsamga iymon keltiringlar. Uni birinchi inkor qiluvchilardan bo‘lmanglar va oyatlarimni oz bahoga sotmanglar. Va faqat Mendan qo‘rqinglar.",
42: "Haqni botil bilan aralashtirmanglar va haqiqatni bila turib yashirmanglar.",
43: "Namozni to‘kis ado etinglar, zakotni beringlar va ruku qiluvchilar bilan birga ruku qilinglar.",
44: "Odamlarga yaxshilikni buyurib, o‘zlaringizni unutasizlarmi? Holbuki Kitobni tilovat qilasizlar. Aql qilmaydilarmi?",
45: "Sabr va namoz bilan yordam so‘ranglar. Albatta, bu og‘ir ishdir, magar xushu’ egalari uchun emas.",
46: "Ular Rabblariga yo‘liqishni va Unga qaytishlarini bilganlardir.",
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
61: "Sizlar: «Ey Muso! Bir xil taomga sabr qila olmaymiz. Robbingdan biz uchun yer yetishtiradigan narsalardan — sabzavotlaridan, bodringlaridan, sarimsoqlaridan, yasmiqlaridan va piyozlaridan chiqarib berishini so‘ra», deganingizni eslang. U dedi: «Yaxshiroq narsani pastrog‘iga almashtirmoqchimisizlar? Biror shaharga tushinglar, u yerda sizlar so‘ragan narsalar bor». Ularga xorlik va miskinlik yozildi va ular Allahning g‘azabiga duchor bo‘ldilar. Bu ular Allahning oyatlarini inkor qilganlari va payg‘ambarlarni nohaq o‘ldirganlari sababli edi. Bu itoatsizliklari va haddan oshganlari sababli edi.",
62: "Albatta, iymon keltirganlar, yahudiylar, nasroniylar va sobiiylardan kim Allahga va oxirat kuniga iymon keltirib, solih amal qilsa, ularga Robblari huzurida ajr bor. Ularga qo‘rquv yo‘q va ular g‘amgin bo‘lmaydilar.",
63: "Sizlardan ahd olganimizni va ustingizga Tog‘ni ko‘targanimizni eslang: «Sizlarga bergan narsamizni mahkam tutinglar va undagini eslanglar, shoyad taqvo qilarsizlar».",
64: "Shundan keyin sizlar yuz o‘girdingizlar. Agar sizlarga Allahning fazli va rahmati bo‘lmaganida edi, albatta ziyon ko‘ruvchilardan bo‘lardingizlar.",
65: "Sizlardan shanba kuni haddan oshganlarni bildingizlar. Biz ularga: «Past bo‘lgan maymunlarga aylaninglar», dedik.",
66: "Uni oldindagilar va keyingilar uchun ibrat va taqvodorlar uchun nasihat qildik.",
67: "Muso qavmiga: «Allah sizlarga bir sigir so‘yishni buyuradi», deganini eslang. Ular: «Bizni masxara qilyapsanmi?» dedilar. U dedi: «Johillardan bo‘lishimdan Allahga panoh tilayman».",
68: "Ular: «Rabbingdan biz uchun qanday sigir ekanini bayon qilib berishini so‘ra», dedilar. U dedi: «U na qari, na yosh — o‘rtacha yoshdagi sigir. Endi buyurilgan ishni qilinglar».",
69: "Ular: «Rabbingdan biz uchun uning rangini bayon qilib berishini so‘ra», dedilar. U dedi: «U sarg‘ish rangli, ko‘rganlarga yoqimli sigir».",
70: "Ular: «Rabbingdan biz uchun uning qandayligini bayon qilib berishini so‘ra. Albatta, sigirlar bizga o‘xshash ko‘rindi. Agar Allah xohlasa, biz albatta hidoyat topamiz», dedilar.",
71: "U dedi: «U yer haydamagan va ekin sug‘ormagan, nuqsonsiz, unda hech qanday dog‘ yo‘q sigirdir». Ular: «Endi haqiqatni keltirding», dedilar. Bas, uni so‘ydilar, deyarli qilmay qolgan edilar.",
72: "Sizlar bir jonni o‘ldirib, bu haqda tortishganingizni eslang. Allah yashirgan narsalaringizni chiqaruvchidir.",
73: "Biz: «Uni (o‘ldirilganni) uning bir bo‘lagi bilan uringlar», dedik. Shunday qilib Allah o‘liklarni tiriltiradi va sizlarga oyatlarini ko‘rsatadi, shoyad aql qilsangizlar.",
74: "Shundan keyin qalblaringiz qattiqlashdi. Ular toshdek yoki undan ham qattiqroqdir. Ba’zi toshlardan daryolar otilib chiqadi, ba’zilaridan yorilib suv chiqadi, ba’zilar esa Allahdan qo‘rqib qulaydi. Allah qilayotgan ishlaringizdan g‘ofil emas.",
75: "Ular sizlarga iymon keltirishlariga umid qilasizlarmi? Holbuki ulardan bir guruhi Allahning kalomini eshitib, tushunganlaridan keyin uni bila turib o‘zgartirar edilar.",
76: "Ular iymon keltirganlarga uchraganlarida: «Iymon keltirdik», deydilar. O‘zaro yolg‘iz qolganlarida esa: «Allah sizlarga ochib bergan narsani ularga aytasizlarmi, Robbingiz huzurida sizlarga qarshi hujjat qilib olishlari uchunmi?» deydilar. Aql qilmaydilarmi?",
77: "Ular yashirgan va oshkor qilgan narsalarini Allah bilishini bilmaydilarmi?",
78: "Ular orasida savodsizlar bor, ular Kitobni bilmaydilar, faqat xayollargagina ergashadilar va faqat gumon qiladilar.",
79: "Halok bo‘lsinlar! O‘z qo‘llari bilan kitob yozib, so‘ng: «Bu Allahning huzuridandir», deydilar, uni ozgina bahoga sotish uchun. Bas, yozganlari sababli ularga halokat va qilganlari sababli ularga halokat!",
80: "Ular: «Bizga do‘zax faqat sanoqli kunlargina tegadi», dedilar. Ayting: «Allah huzuridan ahd oldingizlarmi? Unda Allah ahdiga xilof qilmaydi. Yoki sizlar Allah haqida bilmagan narsani gapiryapsizlarmi?»",
81: "Yo‘q! Kim yomonlik kasb qilib, gunohi uni o‘rab olsa — ana o‘shalar do‘zax ahlidir, ular unda abadiy qoladilar.",
82: "Iymon keltirib, solih amallar qilganlar esa — ana o‘shalar jannat ahlidir, ular unda abadiy qoladilar.",
83: "Bani Isroildan ahd olganimizni eslang: «Allohdan boshqasiga ibodat qilmanglar, ota-onaga yaxshilik qilinglar, qarindoshlarga, yetimlarga va miskinlarga yaxshilik qilinglar, odamlar bilan chiroyli so‘z so‘zlanglar, namozni to‘kis ado etinglar va zakotni beringlar». So‘ng sizlardan oz qismingizdan boshqalar yuz o‘girdingizlar.",
84: "Sizlardan ahd olganimizni eslang: «Qon to‘kmanglar va bir-biringizni yurtlaringizdan chiqarmanglar». So‘ng iqror bo‘ldingizlar va bunga guvoh bo‘ldingizlar.",
85: "Keyin esa sizlar bir-biringizni o‘ldirasizlar va o‘zingizdan bir guruhni yurtlaridan chiqarasizlar, ularga qarshi gunoh va dushmanlik bilan yordam berasizlar. Agar ular asir holda kelsa, badal to‘lab ozod qilasizlar, holbuki ularni chiqarish sizlarga harom qilingan edi. Kitobning bir qismiga iymon keltirib, bir qismini inkor qilasizlarmi? Sizlardan shunday qilganlarning jazosi — dunyo hayotida xorlik va qiyomat kuni qattiq azobga qaytarilishdir. Allah qilayotgan ishlaringizdan g‘ofil emas.",
86: "Ana o‘shalar oxiratni dunyo hayotiga almashtirib olganlardir. Bas, ulardan azob yengillashtirilmaydi va ularga yordam berilmaydi.",
87: "Albatta, Musoga Kitobni berdik va undan keyin payg‘ambarlarni ketma-ket yubordik. Maryam o‘g‘li Iso ga aniq hujjatlar berdik va uni Ruhul-Qudus bilan quvvatladik. Har safar bir payg‘ambar sizlarga yoqmagan narsani keltirsa, kibr qilasizlarmi? Bas, ba’zilarini yolg‘onchiga chiqardingizlar, ba’zilarini esa o‘ldirdingizlar.",
88: "Ular: «Qalblarimiz yopiq», dedilar. Yo‘q! Allah ularni kufrlari sababli la’natladi. Bas, ular juda oz iymon keltiradilar.",
89: "Ularga Allah huzuridan o‘zlaridagi narsani tasdiqlovchi kitob kelganida — ilgari kofirlarga qarshi yordam so‘rar edilar — tanigan narsalari kelganida, unga kufr keltirdilar. Bas, Allahning la’nati kofirlar ustiga bo‘lsin!",
90: "O‘z jonlarini yomon narsaga sotdilar — Allah bandalaridan kimga xohlasa, O‘z fazlidan nozil qilganiga hasad qilib, Allah nozil qilgan narsaga kufr keltirdilar. Bas, g‘azab ustiga g‘azabga duchor bo‘ldilar. Kofirlar uchun xorlovchi azob bor.",
91: "Ularga: «Allah nozil qilgan narsaga iymon keltiringlar», deyilsa, «Biz faqat o‘zimizga nozil qilingan narsaga iymon keltiramiz», deydilar va undan keyin kelgan narsaga kufr keltiradilar, holbuki u o‘zlaridagi narsani tasdiqlovchi haqiqatdir. Ayting: «Agar mo‘min bo‘lsangizlar, nega ilgari Allahning payg‘ambarlarini o‘ldirgan edingizlar?»",
92: "Albatta, Muso sizlarga aniq hujjatlar bilan kelgan edi, so‘ng undan keyin buzoqni (iloh qilib) tutdingiz va zolim bo‘ldingiz.",
93: "Sizlardan ahd olganimizni va ustingizga Tog‘ni ko‘targanimizni eslang: «Sizlarga bergan narsamizni mahkam tutinglar va eshitinglar», dedik. Ular: «Eshitdik va itoatsizlik qildik», dedilar. Kufrlari sababli qalblariga buzoq singdirildi. Ayting: «Agar mo‘min bo‘lsangizlar, iymoningiz sizlarga qanday yomon narsani buyurmoqda!»",
94: "Ayting: «Agar Allah huzuridagi oxirat diyori boshqalar emas, faqat sizlarga xos bo‘lsa, rostgo‘y bo‘lsangizlar, o‘limni orzu qilinglar!»",
95: "Lekin ular o‘z qo‘llari bilan qilgan ishlari sababli uni hech qachon orzu qilmaydilar. Allah zolimlarni yaxshi biluvchidir.",
96: "Albatta, ularni hayotga eng ochko‘z odamlar ekanini ko‘rasiz. Hatto mushriklardan ham. Ularning har biri ming yil yashashni xohlaydi. Holbuki, uzoq yashashi uni azobdan uzoqlashtirmaydi. Allah ularning qilayotgan ishlarini ko‘rib turuvchidir.",
97: "Ayting: «Kim Jibrilga dushman bo‘lsa — u (Qur’onni) Allahning izni bilan sening qalbingga nozil qildi, o‘zidan oldingi narsalarni tasdiqlovchi va mo‘minlar uchun hidoyat va xushxabar qilib».",
98: "Kim Allahga, Uning farishtalariga, payg‘ambarlariga, Jibrilga va Mikailga dushman bo‘lsa — albatta, Allah ham kofirlarga dushmandir.",
99: "Albatta, Biz senga aniq oyatlarni nozil qildik. Ularga faqat fosiqlar kufr keltiradilar.",
100: "Har safar ular bir ahd qilganlarida, ularning bir guruhi uni buzadimi? Yo‘q! Ularning aksariyati iymon keltirmaydilar.",
 101: "Ularga Allah huzuridan o‘zlaridagi narsani tasdiqlovchi payg‘ambar kelganida, Kitob berilganlardan bir guruhi go‘yo bilmagandek Allahning Kitobini orqalariga uloqtirdilar.",
102: "Ular Sulaymon podshohligi haqida shaytonlar o‘qigan narsaga ergashdilar. Sulaymon kufr keltirmadi, balki shaytonlar kufr keltirdilar — odamlarga sehrni va Bobilda Harut va Marut nomli ikki farishtaga nozil qilingan narsani o‘rgatardilar. Ular: «Biz faqat sinovmiz, kufr keltirma», demaguncha hech kimga o‘rgatmas edilar. Odamlar ulardan er-xotin orasini ajratadigan narsani o‘rganardilar. Ular bilan Allahning iznisiz hech kimga zarar yetkaza olmaydilar. Ular o‘zlariga zarar yetkazadigan va foyda bermaydigan narsani o‘rganardilar. Bilgan edilar: kim uni sotib olsa, oxiratda ularga nasiba yo‘q. O‘zlarini sotgan narsalari naqadar yomon! Koshki bilsalar edi.",
103: "Agar ular iymon keltirib, taqvo qilganlarida edi, albatta Allah huzuridagi savob yaxshiroq bo‘lur edi. Koshki bilsalar edi.",
104: "Ey iymon keltirganlar! «Roina» demanglar, balki «Unzurna» denglar va tinglanglar. Kofirlar uchun alamli azob bor.",
105: "Kitob ahli va mushriklardan bo‘lgan kofirlar sizlarga Robbingizdan biror yaxshilik tushishini xohlamaydilar. Allah esa O‘z rahmatini kimga xohlasa, o‘shanga xos qiladi. Allah ulkan fazl egasidir.",
106: "Biz bir oyatni bekor qilsak yoki unuttirsak, undan yaxshisini yoki o‘xshashini keltiramiz. Allah har narsaga qodir ekanini bilmadingmi?",
107: "Osmonlar va yer mulki Allahga tegishli ekanini bilmadingmi? Sizlar uchun Allahdan boshqa do‘st ham, yordamchi ham yo‘q.",
108: "Yoki sizlar payg‘ambaringizdan ilgari Musodan so‘ralganidek so‘ramoqchimisizlar? Kim iymonni kufrga almashtirsa, albatta to‘g‘ri yo‘ldan adashgan bo‘ladi.",
109: "Kitob ahlidan ko‘pchiligi haqiqat ularga ayon bo‘lgandan keyin ham, hasadlari sababli sizlarni iymoningizdan keyin kufrga qaytarishni xohlaydilar. Bas, Allah amrini keltirmaguncha, afv qilinglar va kechiringlar. Albatta, Allah har narsaga qodirdir.",
110: "Namozni to‘kis ado etinglar va zakotni beringlar. O‘zlaringiz uchun qilgan yaxshiliklaringizni Allah huzurida topasizlar. Albatta, Allah qilayotgan ishlaringizni ko‘rib turuvchidir.",
111: "Ular: «Jannatga faqat yahudiy yoki nasroniy bo‘lganlargina kiradi», dedilar. Bu ularning xom xayollari. Ayting: «Agar rostgo‘y bo‘lsangizlar, dalilingizni keltiringlar».",
112: "Yo‘q! Kim yuzini Allahga taslim qilib, yaxshilik qiluvchi bo‘lsa, uning ajri Robbisi huzuridadir. Ularga qo‘rquv yo‘q va ular g‘amgin bo‘lmaydilar.",
113: "Yahudiylar: «Nasroniylar hech narsaga asoslanmagan», dedilar. Nasroniylar esa: «Yahudiylar hech narsaga asoslanmagan», dedilar. Holbuki ular Kitobni o‘qiydilar. Shuningdek, bilmaydiganlar ham shunga o‘xshash gaplarni aytdilar. Bas, Allah qiyomat kuni ular ixtilof qilgan narsalarda hukm qiladi.",
114: "Allahning masjidlarida Uning nomi zikr qilinishiga to‘sqinlik qilgan va ularni buzishga harakat qilganlardan ko‘ra zolimroq kim bor? Ular u yerlarga faqat qo‘rqib kirishlari lozim edi. Ular uchun dunyoda xorlik va oxiratda ulkan azob bor.",
115: "Sharq ham, g‘arb ham Allahnikidir. Qayerga yuzlansangizlar, o‘sha yerda Allahning yuzi bor. Albatta, Allah keng va biluvchidir.",
116: "Ular: «Allah farzand tutdi», dedilar. U pokdir! Yo‘q, osmonlar va yerdagi barcha narsa Unikidir. Hammasi Unga bo‘ysunuvchidir.",
117: "Osmonlar va yerning yaratuvchisidir. Bir ishni iroda qilsa, unga faqat: «Bo‘l!» deydi — bas, u bo‘ladi.",
118: "Bilmaydiganlar: «Nega Allah biz bilan gaplashmaydi yoki bizga biror oyat kelmaydi?» dedilar. Ulardan oldingilar ham xuddi shunday gaplarni aytgan edilar. Qalblari bir-biriga o‘xshash. Biz oyatlarni ishonadigan qavm uchun bayon qildik.",
119: "Albatta, Biz seni haqiqat bilan xushxabar beruvchi va ogohlantiruvchi qilib yubordik. Sen do‘zax egalari haqida so‘ralmaysan.",
120: "Yahudiylar ham, nasroniylar ham sen ularning diniga ergashmaguncha sendan rozi bo‘lmaydilar. Ayting: «Albatta, Allahning hidoyati — hidoyatning o‘zidir». Agar senga kelgan ilmdan keyin ularning havolariga ergashsang, senga Allahdan na do‘st, na yordamchi bo‘ladi.",
 121: "Kitobni haqqi bilan tilovat qiladiganlar — ana o‘shalar unga iymon keltiradilar. Kim unga kufr keltirsa, ana o‘shalar ziyon ko‘ruvchilardir.",
122: "Ey Bani Isroil! Sizlarga bergan ne’matimni va sizlarni olamlardan ustun qilganimni eslang.",
123: "Shunday kundan qo‘rqinglarki, unda hech kim boshqa bir jon uchun foyda bermaydi, undan badal qabul qilinmaydi, unga shafoat foyda bermaydi va ularga yordam ham berilmaydi.",
124: "Ibrohimni Robbisi bir necha kalimalar bilan sinaganida, u ularni to‘la ado etdi. U dedi: «Men seni odamlar uchun imom qilaman». U dedi: «Zurriyotimdan hammi?» U dedi: «Zolimlar Mening ahdimga erishmaydilar».",
125: "Baytni odamlar uchun qaytib kelinadigan joy va xavfsizlik maskani qilganimizni eslang. «Ibrohim maqomini namoz joyi qilinglar», dedik. Ibrohim va Ismoilga: «Uyimni tavof qiluvchilar, e’tikof qiluvchilar, ruku va sajda qiluvchilar uchun pok tutinglar», deb buyurdik.",
126: "Ibrohim dedi: «Rabbim! Bu shaharni tinch qil va uning ahliga — ulardan kim Allahga va oxirat kuniga iymon keltirsa — turli mevalardan rizq ber». U dedi: «Kim kufr keltirsa, uni ozgina bahramand qilaman, so‘ng do‘zax azobiga majbur qilaman. Qanday yomon qaytish joyi!»",
127: "Ibrohim va Ismoil uyning poydevorlarini ko‘targanlarini eslang: «Robbimiz! Bizdan qabul qilgin. Albatta, Sen eshituvchi va biluvchisan».",
128: "Rabbimiz! Bizni Senga bo‘ysunuvchi qil va zurriyotimizdan ham Senga bo‘ysunuvchi ummat qil. Bizga ibodat yo‘llarimizni ko‘rsat va tavbamizni qabul qil. Albatta, Sen Tavbalarni qabul qiluvchi va Rahmlidirsan.",
129: "Rabbimiz! Ular orasidan ularga oyatlaringni tilovat qiladigan, Kitob va hikmatni o‘rgatadigan va ularni poklaydigan bir payg‘ambar yubor. Albatta, Sen Aziz va Hikmatlisan.",
130: "Ibrohim dinidan faqat o‘zini nodon qilgan kimsagina yuz o‘giradi. Albatta, Biz uni dunyoda tanladik va u oxiratda solihlardandir.",
131: "Rabbisi unga: «Bo‘ysun», deganida, u: «Olamlar Rabbisiga bo‘ysundim», dedi.",
132: "Ibrohim o‘g‘illariga va Ya’qubga vasiyat qildi: «Ey o‘g‘illarim! Albatta, Allah sizlar uchun dinni tanladi. Bas, faqat musulmon bo‘lgan holda o‘linglar».",
133: "Ya’qubga o‘lim kelganida, sizlar guvoh edingizlarmi? U o‘g‘illariga: «Mendan keyin kimga ibodat qilasizlar?» dedi. Ular: «Sening ilohingga va otalaring Ibrohim, Ismoil va Ishoqning ilohiga — yagona ilohga ibodat qilamiz va biz Unga bo‘ysunuvchilarmiz», dedilar.",
134: "Ular o‘tgan ummatdir. Ular qilganlari o‘zlariga, sizlar qilganlaringiz o‘zlaringizga. Sizlar ularning qilganlari haqida so‘ralmaysizlar.",
135: "Ular: «Yahudiy yoki nasroniy bo‘linglar, hidoyat topasizlar», dedilar. Ayting: «Yo‘q! Biz Ibrohimning to‘g‘ri dinidamiz. U mushriklardan bo‘lmagan».",
136: "Ayting: «Biz Allahga, bizga nozil qilingan narsaga, Ibrohim, Ismoil, Ishoq, Ya’qub va avlodlariga nozil qilingan narsaga, Muso va Isoga berilgan narsaga va barcha payg‘ambarlarga Rabbilaridan berilgan narsaga iymon keltirdik. Ular orasini ajratmaymiz va biz Unga bo‘ysunuvchilarmiz».",
137: "Agar ular sizlar iymon keltirgan narsaga o‘xshash iymon keltirsalar, albatta hidoyat topadilar. Agar yuz o‘girsalar, ular faqat qarshilikdadirlar. Allah sizga ularning (zararidan) kifoya qiladi. U eshituvchi va biluvchidir.",
138: "«Allahning bo‘yog‘i!» Allahdan ko‘ra kim yaxshiroq bo‘yoq beradi? Biz Unga ibodat qiluvchilarmiz.",
139: "Ayting: «Allah haqida biz bilan tortishasizlarmi? U bizning ham Robbimiz, sizlarning ham Rabbingizdir. Bizning amallarimiz o‘zimizga, sizlarning amallaringiz o‘zlaringizga. Biz Unga ixlos qiluvchilarmiz».",
140: "Yoki sizlar: «Ibrohim, Ismoil, Ishoq, Ya’qub va avlodlari yahudiy yoki nasroniy edilar», deysizlarmi? Ayting: «Sizlar yaxshiroq bilasizlarmi yoki Allahmi?» Allahdan kelgan guvohlikni yashirgandan ko‘ra zolimroq kim bor? Allah qilayotgan ishlaringizdan g‘ofil emas.",
141: "Ular o‘tgan ummatdir. Ular qilganlari o‘zlariga, sizlar qilganlaringiz o‘zlaringizga. Sizlar ularning qilganlari haqida so‘ralmaysizlar.",
142: "Odamlardan nodonlari: «Ularni ilgari yuzlangan qiblalaridan nima qaytardi?» deydilar. Ayting: «Sharq ham, g‘arb ham Allahnikidir. U xohlagan kishini to‘g‘ri yo‘lga hidoyat qiladi».",
143: "Shunday qilib sizlarni o‘rtacha ummat qildik, odamlar ustida guvoh bo‘lishingiz uchun va payg‘ambar ham sizlar ustida guvoh bo‘lishi uchun. Ilgari yuzlangan qiblani faqat payg‘ambarga ergashganlarni ortga qaytganlardan ajratish uchun qildik. Bu og‘ir edi, faqat Allah hidoyat qilganlarga oson bo‘ldi. Allah iymoningizni zoye qilmaydi. Albatta, Allah odamlarga mehribon va rahmlidir.",
144: "Biz sening yuzingni osmonga qarab turishingni ko‘rib turibmiz. Endi seni rozi bo‘ladigan qiblaga buramiz. Bas, yuzingni Masjidul Harom tomonga bur. Qayerda bo‘lsangizlar ham, yuzlaringizni o‘sha tomonga burib turinglar. Albatta, Kitob berilganlar bu Robblaridan kelgan haqiqat ekanini biladilar. Allah ularning qilayotgan ishlaridan g‘ofil emas.",
145: "Agar sen Kitob berilganlarga barcha oyatlarni keltirsang ham, ular sening qiblanga ergashmaydilar. Sen ham ularning qiblasiga ergashuvchi emassan. Ular ham bir-birlarining qiblasiga ergashmaydilar. Agar senga kelgan ilmiydan keyin ularning havolariga ergashsang, albatta zolimlardan bo‘lasan.",
146: "Biz ularga Kitob berganlar uni o‘z o‘g‘illarini tanigandek taniydilar. Lekin ulardan bir guruhi haqiqatni bila turib yashiradilar.",
147: "Haqiqat Robbingdandir. Bas, shubha qiluvchilardan bo‘lma.",
148: "Har bir kishi uchun u yuzlanadigan yo‘nalish bor. Bas, yaxshiliklarda musobaqa qilinglar. Qayerda bo‘lsangizlar ham, Allah barchangizni jamlaydi. Albatta, Allah har narsaga qodirdir.",
149: "Qayerdan chiqsang ham, yuzingni Masjidul Harom tomonga bur. Albatta, bu Rabbingdan kelgan haqiqatdir. Allah qilayotgan ishlaringizdan g‘ofil emas.",
150: "Qayerdan chiqsang ham, yuzingni Masjidul Harom tomonga bur. Qayerda bo‘lsangizlar ham, yuzlaringizni o‘sha tomonga burib turinglar, toki odamlarda sizlarga qarshi hujjat bo‘lmasin — faqat zolimlardan boshqalar. Ulardan qo‘rqmanglar, Mendan qo‘rqinglar va sizlarga bo‘lgan ne’matimni to‘ldiray va shoyad hidoyat topasizlar.",
 151: "Sizlarga o‘zlaringizdan bo‘lgan bir payg‘ambar yuborganimiz kabi — u sizlarga oyatlarimizni tilovat qiladi, sizlarni poklaydi, sizlarga Kitob va hikmatni o‘rgatadi va bilmagan narsalaringizni o‘rgatadi.",
152: "Bas, Meni eslanglar, Men ham sizlarni eslayman. Menga shukr qilinglar va Menga kufr keltirmanglar.",
153: "Ey iymon keltirganlar! Sabr va namoz bilan yordam so‘ranglar. Albatta, Allah sabr qiluvchilar bilan birgadir.",
154: "Allah yo‘lida o‘ldirilganlar haqida «o‘liklar» demanglar. Yo‘q! Ular tirikdirlar, lekin sizlar sezmayapsizlar.",
155: "Albatta, sizlarni qo‘rquv, ochlik, mol-mulk, jon va mevalardan kamayish bilan sinaymiz. Sabr qiluvchilarga xushxabar ber.",
156: "Ular boshlariga musibat kelganda: «Albatta, biz Allahnikimiz va albatta Unga qaytuvchimiz», deydilar.",
157: "Ana o‘shalarga Rabblaridan salovotlar va rahmat bordir va ana o‘shalar hidoyat topganlardir.",
158: "Albatta, Safa va Marva Allahning belgilaridandir. Kim Baytni haj qilsa yoki umraga borsa, ularni tavof qilishida gunoh yo‘q. Kim ixtiyoriy ravishda yaxshilik qilsa, albatta, Allah shukr qiluvchi va biluvchidir.",
159: "Albatta, Biz nozil qilgan aniq oyatlar va hidoyatni, odamlarga Kitobda bayon qilib berganimizdan keyin yashirganlar — ana o‘shalarga Allah la’nat qiladi va la’nat qiluvchilar ham la’natlaydilar.",
160: "Magar tavba qilganlar, isloh qilganlar va (haqiqatni) bayon qilganlar bundan mustasno. Bas, Men ularning tavbasini qabul qilaman. Men Tavbalarni qabul qiluvchi va Rahmliman.",
161: "Albatta, kufr keltirgan va kofir bo‘lgan holda o‘lganlar — ana o‘shalarga Allahning, farishtalarning va barcha odamlarning la’nati bordir.",
162: "Ular unda abadiy qoladilar. Ulardan azob yengillashtirilmaydi va ularga muhlat berilmaydi.",
163: "Sizlarning ilohingiz — yagona ilohdir. Undan boshqa iloh yo‘q. U Mehribon va Rahmlidir.",
164: "Albatta, osmonlar va yerning yaratilishida, kecha va kunduzning almashinishida, odamlarga foyda beradigan kemalarning dengizda suzishida, Allah osmondan suv tushirib, u bilan yerga hayot berishida, unda har turli jonivorlarni tarqatishida, shamollarning aylanishida va osmon bilan yer orasida bo‘ysundirilgan bulutlarda aql qiladigan qavm uchun oyatlar bordir.",
165: "Odamlar orasida Allahdan boshqa narsalarni Unga teng tutib, ularni Allahni sevgandek sevuvchilar bor. Iymon keltirganlar esa Allahni yanada kuchliroq sevadilar. Zolimlar azobni ko‘rganlarida, barcha kuch-qudrat Allahga tegishli ekanini va Allah azobi qattiq ekanini bilsalar edi.",
166: "U paytda ergashilganlar ergashganlardan yuz o‘giradilar, azobni ko‘radilar va ular orasidagi bog‘lanishlar uziladi.",
167: "Ergashganlar: «Qani edi bizga yana bir bor qaytish bo‘lsa, ular bizdan yuz o‘girganidek biz ham ulardan yuz o‘girardik», deydilar. Shunday qilib, Allah ularga qilgan ishlarini nadomat qilib ko‘rsatadi. Ular do‘zaxdan chiqmaydilar.",
168: "Ey odamlar! Yerda halol va pok narsalardan yenglar va shaytonning izidan ergashmanglar. Albatta, u sizlar uchun ochiq dushmandir.",
169: "U sizlarga faqat yomonlikni, buzuqlikni va Allah haqida bilmagan narsani gapirishni buyuradi.",
170: "Ularga: «Allah nozil qilgan narsaga ergashinglar», deyilsa, «Yo‘q! Biz otalarimizni nimada topsak, o‘shanga ergashamiz», deydilar. Agar ularning otalari hech narsani anglamagan va hidoyat topmagan bo‘lsa hammi?",
171: "Kofirlarning misoli xuddi qichqiriqdan boshqa narsani eshitmaydigan narsaga qichqirayotgan kishining misoliga o‘xshaydi. Kar, soqov va ko‘rdirlar — bas, ular aql qilmaydilar.",
172: "Ey iymon keltirganlar! Sizlarga bergan pok narsalarimizdan yenglar va agar Unga ibodat qilayotgan bo‘lsangizlar, Allahga shukr qilinglar.",
173: "U sizlarga o‘lik hayvonni, qon, cho‘chqa go‘shtini va Allahdan boshqaning nomi bilan so‘yilgan narsani harom qildi. Kim majbur bo‘lsa — haddan oshmasdan va tajovuz qilmasdan — unga gunoh yo‘q. Albatta, Allah kechiruvchi va Rahmlidir.",
174: "Albatta, Allah nozil qilgan Kitobdan biror narsani yashirib, uni oz bahoga sotadiganlar — ana o‘shalar qorinlariga faqat olov yeb yuradilar. Qiyomat kuni Allah ular bilan gaplashmaydi va ularni poklamaydi. Ular uchun alamli azob bor.",
175: "Ana o‘shalar hidoyat o‘rniga zalolatni va mag‘firat o‘rniga azobni sotib olganlardir. Ular do‘zaxga qanday sabr qiladilar!",
176: "Bu shundaki, Allah Kitobni haqiqat bilan nozil qildi. Kitob haqida ixtilof qilganlar chuqur ixtilofdadirlar.",
177: "Yaxshilik — yuzlaringizni sharq va g‘arbga burish emas. Balki yaxshilik — kim Allahga, oxirat kuniga, farishtalarga, Kitobga va payg‘ambarlarga iymon keltirsa, molini — unga muhabbati bo‘lishiga qaramay — qarindoshlarga, yetimlarga, miskinlarga, musofirlarga, so‘rovchilarga va qullarni ozod qilishga bersa, namozni to‘kis ado etsa, zakotni bersa, ahd qilganlarida ado etsa, qiyinchilikda, zaruratda va jang paytida sabr qilsa — ana o‘shalar rostgo‘ylar va ana o‘shalar taqvodorlardir.",
178: "Ey iymon keltirganlar! Sizlarga o‘ldirilganlar haqida qasos farz qilindi: erkin — erkin uchun, qul — qul uchun, ayol — ayol uchun. Kimga birodari tomonidan biror narsa kechirilsa, yaxshi tarzda ergashish va unga yaxshilik bilan to‘lash lozim. Bu Robbingiz tomonidan yengillik va rahmatdir. Kim bundan keyin haddan oshsa, unga alamli azob bor.",
179: "Ey aql egalari! Qasosda sizlar uchun hayot bor, shoyad taqvo qilsangizlar.",
180: "Sizlardan biringizga o‘lim yaqinlashganda, agar mol qoldirsa, ota-ona va yaqinlar uchun yaxshi tarzda vasiyat qilish farz qilindi. Bu taqvodorlar uchun haqdir.",
 181: "Kim vasiyatni eshitganidan keyin uni o‘zgartirsa, uning gunohi uni o‘zgartirganlarga bo‘ladi. Albatta, Allah eshituvchi va biluvchidir.",
182: "Kim vasiyat qiluvchidan og‘ish yoki gunoh bo‘lishidan qo‘rqib, ularning orasini to‘g‘rilasa, unga gunoh yo‘q. Albatta, Allah kechiruvchi va Rahmlidir.",
183: "Ey iymon keltirganlar! Sizlarga ro‘za farz qilindi, sizlardan oldingilarga farz qilingani kabi, shoyad taqvo qilsangizlar.",
184: "Sanoqli kunlar. Kim sizlardan kasal bo‘lsa yoki safarda bo‘lsa, boshqa kunlarda tutadi. Uni tutishga qiynaladiganlar uchun fidya — bir miskinni to‘ydirishdir. Kim ixtiyoriy ravishda yaxshilik qilsa, bu uning uchun yaxshidir. Agar bilsangizlar, ro‘za tutishingiz sizlar uchun yaxshidir.",
185: "Ramazon oyi — unda Qur’an nozil qilingan, odamlar uchun hidoyat va hidoyatning aniq dalillari va farqlovchi sifatida. Kim bu oyga yetib kelsa, uni ro‘za tutsin. Kim kasal bo‘lsa yoki safarda bo‘lsa, boshqa kunlarda tutadi. Allah sizlar uchun yengillikni xohlaydi, qiyinchilikni xohlamaydi. Sanog‘ini to‘ldirishingiz va sizlarni hidoyat qilgani uchun Allahni ulug‘lashingiz va shukr qilishingiz uchun.",
186: "Bandalarim sendan Men haqimda so‘rasalar, albatta Men yaqindaman. Duo qiluvchining duosiga, u Menga duo qilganida javob beraman. Bas, ular Menga javob bersinlar va Menga iymon keltirsinlar, shoyad to‘g‘ri yo‘l topsalar.",
187: "Ro‘za kechasida sizlarga ayollaringizga yaqinlashish halol qilindi. Ular sizlar uchun libosdirlar va sizlar ular uchun libossizlar. Allah sizlarning o‘zingizga xiyonat qilayotganingizni bildi, bas, tavbangizni qabul qildi va sizlarni afv etdi. Endi ular bilan yaqin bo‘linglar va Allah sizlarga yozgan narsani izlanglar. Tong yorishguncha yeb-ichinglar, keyin ro‘zani kechgacha to‘liq tutinglar. Masjidlarda e’tikofda bo‘lganingizda ular bilan yaqinlashmanglar. Bu Allahning chegaralaridir, ularga yaqinlashmanglar. Shunday qilib Allah oyatlarini bayon qiladi, shoyad taqvo qilsangizlar.",
188: "Mol-mulklaringizni o‘zaro nohaq yo‘l bilan yemanglar va uni hokimlarga berib, odamlarning molidan bir qismini gunoh bilan yeb olish uchun ishlatmanglar, holbuki bilasizlar.",
189: "Sizdan hilollar haqida so‘rashadi. Ayting: «Ular odamlar va haj uchun vaqt belgilovchidir». Yaxshilik uylarga orqa tomonidan kirishingiz emas, balki taqvo qilgan kishidir. Uylarga eshiklaridan kiringlar va Allahdan qo‘rqinglar, shoyad najot topsangizlar.",
190: "Sizlarga qarshi urush qilganlar bilan Allah yo‘lida urushinglar, lekin haddan oshmanglar. Albatta, Allah haddan oshuvchilarni sevmaydi.",
191: "Ularni qayerda topsangizlar, o‘ldiringlar va sizlarni chiqargan joydan ularni chiqaringlar. Fitna qotillikdan ham kattaroqdir. Masjidul Haromda sizlarga qarshi urushmagunlaricha, u yerda ular bilan urushmanglar. Agar ular sizlarga qarshi urushsa, ularni o‘ldiringlar. Kofirlarning jazosi shundaydir.",
192: "Agar to‘xtasalar, albatta, Allah kechiruvchi va Rahmlidir.",
193: "Fitna qolmaguncha va din faqat Allahniki bo‘lguncha ular bilan urushinglar. Agar to‘xtasalar, zulm qiluvchilardan boshqasiga dushmanlik yo‘q.",
194: "Haram oy — haram oy uchun. Hurmatli narsalar qasoslidir. Kim sizlarga tajovuz qilsa, siz ham unga o‘sha miqdorda tajovuz qilinglar. Allahdan qo‘rqinglar va bilinglar: albatta, Allah taqvodorlar bilan birgadir.",
195: "Allah yo‘lida (molingizni) sarflanglar va o‘z qo‘llaringiz bilan o‘zingizni halokatga tashlamanglar. Yaxshilik qilinglar. Albatta, Allah yaxshilik qiluvchilarni sevadi.",
196: "Haj va umrani Allah uchun to‘liq ado etinglar. Agar to‘sqinlik qilinsangiz, oson kelgan qurbonlikni qilinglar. Qurbonlik joyiga yetmaguncha boshlaringizni qirmanglar. Kim kasal bo‘lsa yoki boshida ozor bo‘lsa, ro‘za, sadaqa yoki qurbonlik bilan fidya qiladi. Xavfsiz bo‘lsangiz, kim umrani hajgacha ado etsa, oson kelgan qurbonlik qiladi. Kim topa olmasa, haj vaqtida uch kun va qaytgach yetti kun ro‘za tutadi — jami o‘n kun. Bu oilasi Masjidul Harom atrofida yashamaydiganlar uchun. Allahdan qo‘rqinglar va bilinglar: albatta, Allahning azobi qattiqdir.",
197: "Haj ma’lum oylardadir. Kim bu oylarda hajni niyat qilsa, hajda jinsiy aloqa, gunoh va janjal yo‘q. Qilgan yaxshiligingizni Allah biladi. Oziq olinglar, eng yaxshi oziq — taqvodir. Ey aql egalari! Mendan qo‘rqinglar.",
198: "Rabbingizdan fazl izlash (savdo qilish) sizlarga gunoh emas. Arafotdan qaytgach, Mash’arul Haromda Allahni zikr qilinglar va sizlarni hidoyat qilgani uchun zikr qilinglar, holbuki ilgari adashganlardan edingizlar.",
199: "So‘ng odamlar qaytgan joydan qaytinglar va Allahdan mag‘firat so‘ranglar. Albatta, Allah kechiruvchi va Rahmlidir.",
200: "Haj amallarini tugatganingizdan keyin, otalaringizni zikr qilgandek yoki undan ham kuchliroq Allahni zikr qilinglar. Odamlardan ba’zilari: «Robbimiz! Bizga dunyoda ber», deydilar. Ularga oxiratda nasiba yo‘q.",
 201: "Ulardan ba’zilari: «Robbimiz! Bizga dunyoda ham yaxshilik ber, oxiratda ham yaxshilik ber va bizni do‘zax azobidan saqla», deydilar.",
202: "Ana o‘shalarga qilgan amallaridan nasiba bor. Allah tez hisob qiluvchidir.",
203: "Sanoq kunlarida Allahni zikr qilinglar. Kim ikki kunda shoshilib qaytsa, unga gunoh yo‘q. Kim kechiksa ham gunoh yo‘q — taqvo qilgan kishi uchun. Allahdan qo‘rqinglar va bilinglar: albatta, sizlar Unga jamlanasizlar.",
204: "Odamlar orasida shunday kimsa borki, uning dunyo hayoti haqidagi gapi seni hayratga soladi va u qalbidagi narsaga Allahni guvoh qiladi. Holbuki u eng qattiq dushmandir.",
205: "U ketgach, yer yuzida buzg‘unchilik qilishga, ekinlarni va nasllarni halok qilishga harakat qiladi. Allah buzg‘unchilikni sevmaydi.",
206: "Unga: «Allahdan qo‘rq», deyilsa, kibr uni gunohga yetaklaydi. Bas, unga jahannam yetar. Qanday yomon joy!",
207: "Odamlar orasida shunday kimsa borki, Allahning roziligini istab, o‘z jonini sotadi. Allah bandalarga mehribondir.",
208: "Ey iymon keltirganlar! To‘liq holda Islomga kiringlar va shaytonning izidan ergashmanglar. Albatta, u sizlar uchun ochiq dushmandir.",
209: "Agar sizlarga aniq dalillar kelganidan keyin og‘ishsangizlar, bilinglar: albatta, Allah Aziz va Hikmatlidir.",
210: "Ular faqat Allah va farishtalar bulutlar soyasida kelishini va ish tugashini kutyaptlarmi? Barcha ishlar Allahga qaytariladi.",
211: "Bani Isroildan so‘ra: ularga qancha aniq oyatlar berdik. Kim Allahning ne’matini o‘ziga kelganidan keyin o‘zgartirsa, albatta, Allahning azobi qattiqdir.",
212: "Kafirlarga dunyo hayoti ziynatli qilib ko‘rsatildi va ular iymon keltirganlarni masxara qiladilar. Holbuki taqvodorlar qiyomat kuni ulardan ustun bo‘ladilar. Allah kimga xohlasa, hisobsiz rizq beradi.",
213: "Odamlar bir ummat edilar. Allah payg‘ambarlarni xushxabar beruvchi va ogohlantiruvchi qilib yubordi va ular bilan haqiqat bilan Kitobni nozil qildi, odamlar o‘rtasida ixtilof qilgan narsalarda hukm qilish uchun. Unga faqat Kitob berilganlar, aniq dalillar kelganidan keyin o‘zaro hasadlari sababli ixtilof qildilar. Allah iymon keltirganlarni O‘z izni bilan haqiqatga hidoyat qildi. Allah xohlagan kishini to‘g‘ri yo‘lga hidoyat qiladi.",
214: "Yoki sizlar jannatga kiraman deb o‘yladinglarmi? Holbuki sizlardan oldingilarga kelgan narsa sizlarga kelgani yo‘q. Ularga balo va qiyinchilik yetdi va ular silkindilar, hatto payg‘ambar va u bilan birga iymon keltirganlar: «Allahning yordami qachon?» dedilar. Ogoh bo‘ling! Albatta, Allahning yordami yaqindir.",
215: "Sizdan nimani sarflash haqida so‘rashadi. Ayting: «Qilgan yaxshiligingiz ota-onaga, qarindoshlarga, yetimlarga, miskinlarga va musofirlarga bo‘lsin». Qanday yaxshilik qilsangiz, albatta, Allah uni biluvchidir.",
216: "Sizlarga urush farz qilindi, holbuki u sizlarga yoqmaydi. Balki sizlar yoqtirmagan narsangiz sizlar uchun yaxshidir, va sizlar yoqtirgan narsangiz sizlar uchun yomon bo‘lishi mumkin. Allah biladi, sizlar esa bilmaysizlar.",
217: "Sizdan haram oyda urush qilish haqida so‘rashadi. Ayting: «Unda urush qilish katta (gunoh)dir. Lekin Allah yo‘lidan to‘sish, Unga kufr keltirish, Masjidul Haromdan to‘sish va uning ahlini undan chiqarish — Allah huzurida bundan ham kattaroqdir. Fitna qotillikdan ham kattaroqdir». Ular sizlarni diningizdan qaytarmaguncha sizlar bilan urushishda davom etadilar, agar kuchlari yetsa. Sizlardan kim dinidan qaytsa va kofir holda o‘lsa, ana o‘shalar dunyo va oxiratda amallari bekor bo‘lganlardir. Ular do‘zax ahlidir, unda abadiy qoladilar.",
218: "Albatta, iymon keltirganlar, hijrat qilganlar va Allah yo‘lida jihod qilganlar — ana o‘shalar Allahning rahmatidan umid qiladilar. Allah kechiruvchi va Rahmlidir.",
219: "Sizdan mast qiluvchi ichimliklar va qimor haqida so‘rashadi. Ayting: «Ularning ikkisida katta gunoh va odamlar uchun foydalar bor. Lekin ularning gunohi foydasidan kattaroqdir». Sizdan nimani sarflash haqida so‘rashadi. Ayting: «Ortiqchasini». Shunday qilib Allah sizlarga oyatlarni bayon qiladi, shoyad tafakkur qilsangizlar.",
220: "Dunyo va oxirat haqida (tafakkur qilinglar). Sizdan yetimlar haqida so‘rashadi. Ayting: «Ularni isloh qilish yaxshidir. Agar ular bilan aralashsangizlar, ular sizlarning birodarlaringizdir». Allah buzg‘unchini isloh qiluvchidan ajratadi. Agar Allah xohlasa edi, sizlarni qiyinchilikka solgan bo‘lur edi. Albatta, Allah Aziz va Hikmatlidir.",
 221: "Mushrik ayollarga, ular iymon keltirmaguncha uylanmanglar. Albatta, mo‘mina kanizak mushrika ayoldan yaxshiroqdir, garchi u sizlarga yoqsa ham. Mushrik erkaklarga, ular iymon keltirmaguncha (qizlaringizni) bermanglar. Albatta, mo‘min qul mushrik erkakdan yaxshiroqdir, garchi u sizlarga yoqsa ham. Ular do‘zaxga chaqiradilar, Allah esa O‘z izni bilan jannat va mag‘firatga chaqiradi. U oyatlarini odamlarga bayon qiladi, shoyad eslatma olsalar.",
222: "Sizdan hayz haqida so‘rashadi. Ayting: «U ozordir. Bas, hayz paytida ayollardan uzoq bo‘linglar va ular pok bo‘lmaguncha ularga yaqinlashmanglar. Poklanganlaridan keyin, Allah buyurgan joydan ularga yaqinlashinglar. Albatta, Allah tavba qiluvchilarni va poklanuvchilarni sevadi».",
223: "Ayollaringiz sizlar uchun ekinzordir. Ekinzoringizga xohlagan tomoningizdan boringlar va o‘zlaringiz uchun (savob) tayyorlanglar. Allahdan qo‘rqinglar va bilinglar: albatta, Unga yo‘liqasizlar. Mo‘minlarga xushxabar ber.",
224: "Allahni yaxshilik qilmaslikka, taqvo qilmaslikka va odamlar orasini tuzatmaslikka qasamlaringizga to‘siq qilmanglar. Allah eshituvchi va biluvchidir.",
225: "Allah sizlarni beixtiyor qasamlaringiz uchun jazolamaydi, lekin qalblaringiz kasb qilgan narsalar uchun jazolaydi. Allah kechiruvchi va halimdir.",
226: "Ayollariga yaqinlashmaslikka qasam ichganlar uchun to‘rt oy kutish bor. Agar qaytsalar, albatta, Allah kechiruvchi va Rahmlidir.",
227: "Agar ajrashishga qaror qilsalar, albatta, Allah eshituvchi va biluvchidir.",
228: "Ajrashgan ayollar uch hayz muddatini kutadilar. Agar Allahga va oxirat kuniga iymon keltirgan bo‘lsalar, bachadonlarida Allah yaratgan narsani yashirishlari halol emas. Agar yarashishni istasalar, erlari ularni qaytarishga haqlidirlar. Ayollar uchun erkaklar zimmasida bo‘lgan huquqlarga o‘xshash haqlar bor. Erkaklar esa ular ustida bir darajaga egadirlar. Allah Aziz va Hikmatlidir.",
229: "Talak ikki martadir. Shundan keyin yaxshi ushlab turish yoki yaxshilik bilan qo‘yib yuborish kerak. Sizlar ularga bergan narsalaringizdan biror narsani qaytarib olishingiz halol emas, faqat ular Allahning chegaralarini ushlab turolmaslikdan qo‘rqsa bundan mustasno. Agar ular Allahning chegaralarini ushlab turolmaslikdan qo‘rqsangizlar, ayol o‘zini fidya qilsa, ikkala tomon uchun gunoh yo‘q. Bu Allahning chegaralaridir, ulardan oshmanglar. Kim Allahning chegaralaridan oshsa, ana o‘shalar zolimlardir.",
230: "Agar u (uchinchi marta) ajratsa, undan keyin boshqa erga turmaguncha unga halol bo‘lmaydi. Agar u ham ajratsa, agar ular Allahning chegaralarini ushlab turishlariga ishonsalar, yana qaytishlarida gunoh yo‘q. Bu Allahning chegaralaridir, biladigan qavm uchun bayon qiladi.",
231: "Ayollarni ajratsangizlar va ular muddatlariga yetsa, ularni yaxshilik bilan ushlab turinglar yoki yaxshilik bilan qo‘yib yuboringlar. Ularga zarar yetkazish uchun ushlab turmanglar. Kim shunday qilsa, o‘ziga zulm qiladi. Allahning oyatlarini masxara qilmanglar. Allahning sizlarga bergan ne’matini va sizlarga nozil qilgan Kitob va hikmatni eslang. Allahdan qo‘rqinglar va bilinglar: albatta, Allah har narsani biluvchidir.",
232: "Ayollarni ajratsangizlar va ular muddatlarini tugatsalar, o‘zaro rozi bo‘lib, yaxshi tarzda turmush qurmoqchi bo‘lsalar, ularga (sobiq erlariga) turmushga chiqishlariga to‘sqinlik qilmanglar. Bu sizlardan Allahga va oxirat kuniga iymon keltirganlar uchun nasihatdir. Bu sizlar uchun pokroq va tozaroqdir. Allah biladi, sizlar esa bilmaysizlar.",
233: "Onalar bolalarini to‘liq ikki yil emizadilar — bu emizishni to‘liq qilishni istaganlar uchun. Otaning zimmasida ularni yedirish va kiydirish yaxshi tarzda. Hech kim kuchidan ortiq majbur qilinmaydi. Ona bolasiga zarar ko‘rmasin, ota ham bolasidan zarar ko‘rmasin. Merosxo‘r ham xuddi shunday. Agar o‘zaro rozi bo‘lib, maslahat bilan ajratishni istasalar, ularga gunoh yo‘q. Agar bolalaringizni emizdirishni istasangizlar, yaxshi tarzda to‘lasangizlar, gunoh yo‘q. Allahdan qo‘rqinglar va bilinglar: albatta, Allah qilayotgan ishlaringizni ko‘rib turuvchidir.",
234: "Sizlardan vafot etib, xotinlar qoldirganlar — ular to‘rt oy o‘n kun kutadilar. Muddatlari tugagach, o‘zlari haqida yaxshi tarzda qilgan ishlarida sizlarga gunoh yo‘q. Allah qilayotgan ishlaringizdan xabardordir.",
235: "Ayollarga uylanish niyatingizni ishora bilan bildirishingiz yoki ichingizda yashirishingizda gunoh yo‘q. Allah sizlar ularni eslashingizni biladi. Lekin yashirincha va’da bermanglar, faqat yaxshi so‘z aytinglar. Muddat tugamaguncha nikohga qat’iy qaror qilmanglar. Bilinglar: albatta, Allah qalblaringizdagini biladi, bas, Undan qo‘rqinglar. Va bilinglar: albatta, Allah kechiruvchi va halimdir.",
236: "Agar ayollarga tegmagan va ular uchun mahr belgilamagan holda ajratsangizlar, sizlarga gunoh yo‘q. Ularni imkoningizga qarab — boy ham, kambag‘al ham — yaxshi tarzda foydalantiringlar. Bu yaxshilik qiluvchilar zimmasiga majburdir.",
237: "Agar ularga tegishdan oldin ajratsangizlar va mahr belgilangan bo‘lsa, belgilangan mahrning yarmini berasizlar, faqat ayollar kechsa yoki nikoh tuguni qo‘lida bo‘lgan kishi kechsa bundan mustasno. Kechishingiz taqvoga yaqinroqdir. O‘zaro yaxshilikni unutmanglar. Albatta, Allah qilayotgan ishlaringizni ko‘rib turuvchidir.",
238: "Namozlarni va o‘rta namozni saqlanglar va Allah oldida itoatkor holda turinglar.",
239: "Agar qo‘rqinch bo‘lsa, piyoda yoki minib (o‘qinglar). Xotirjam bo‘lganingizda esa, sizlarga bilmagan narsalaringizni o‘rgatgani kabi Allahni zikr qilinglar.",
240: "Sizlardan vafot etib, xotinlar qoldirganlar — xotinlari uchun bir yilgacha chiqarmasdan foydalanish vasiyatini qoldirsinlar. Agar ular chiqib ketsalar, o‘zlari haqida yaxshi tarzda qilgan ishlarida sizlarga gunoh yo‘q. Allah Aziz va Hikmatlidir.",
 241: "Ajrashgan ayollar uchun yaxshi tarzda foydalantirish bor. Bu taqvodorlar zimmasiga majburdir.",
242: "Shunday qilib Allah sizlarga oyatlarini bayon qiladi, shoyad aql qilsangizlar.",
243: "O‘limdan qo‘rqib, o‘z yurtlaridan chiqqan minglab kishilarni ko‘rmadingmi? Allah ularga: «O‘linglar», dedi, so‘ng ularni tiriltirdi. Albatta, Allah odamlarga fazl egasidir, lekin odamlarning ko‘pchiligi shukr qilmaydi.",
244: "Allah yo‘lida urushinglar va bilinglar: albatta, Allah eshituvchi va biluvchidir.",
245: "Kim Allahga chiroyli qarz bersa, U uni ko‘p barobar qilib qaytaradi. Allah tor qiladi va keng qiladi. Va sizlar Unga qaytarilasizlar.",
246: "Muso’dan keyin Bani Isroilning boshliqlarini ko‘rmadingmi? Ular payg‘ambarlariga: «Bizga bir podshoh tayinla, Allah yo‘lida urushamiz», dedilar. U dedi: «Agar sizlarga urush farz qilinsa, balki urushmasangiz kerak?» dedilar: «Bizga nima bo‘ldi, nega Allah yo‘lida urushmaylik, holbuki yurtimizdan chiqarildik va bolalarimizdan ajratildik?» Bas, ularga urush farz qilingach, oz qismidan boshqalari yuz o‘girdilar. Allah zolimlarni biluvchidir.",
247: "Payg‘ambarlari ularga dedi: «Albatta, Allah sizlarga Tolutni podshoh qilib tayinladi». Ular dedilar: «Qanday qilib u biz ustimizga podshoh bo‘lsin? Biz podshohlikka undan ko‘ra haqlimiz va unga mol-dunyo keng berilmagan». U dedi: «Albatta, Allah uni sizlardan tanladi va unga ilm va jismda kenglik berdi. Allah podshohlikni kimga xohlasa beradi. Allah keng va biluvchidir».",
248: "Payg‘ambarlari ularga dedi: «Uning podshohligining belgisi — sizlarga sandiq kelishidir. Unda Rabbingizdan taskin va Musa va Harun oilasidan qolgan narsalar bor, uni farishtalar ko‘tarib keladi. Agar mo‘min bo‘lsangizlar, bunda sizlar uchun albatta belgi bor».",
249: "Talut lashkar bilan chiqqach dedi: «Albatta, Allah sizlarni bir daryo bilan sinaydi. Kim undan ichsa, mendan emas. Kim tatib ko‘rmasa — mendandir, faqat bir hovuch olgan mustasno». Bas, ozchilikdan boshqalari undan ichdilar. U va u bilan birga iymon keltirganlar o‘tib ketgach, ular: «Bugun bizda Jolut va uning lashkariga qarshi kuch yo‘q», dedilar. Allahga yo‘liqishni bilganlar esa: «Qancha oz sonli guruhlar Allahning izni bilan ko‘p sonli guruhlarni yenggan! Allah sabr qiluvchilar bilan birgadir», dedilar.",
250: "Jalut va uning lashkariga qarshi chiqqanlarida dedilar: «Rabbimiz! Bizga sabr yog‘dir, qadamlarimizni mustahkam qil va kofir qavmga qarshi bizga yordam ber».",
251: "Bas, ular Allahning izni bilan ularni yengdilar. Davud Jalutni o‘ldirdi. Allah unga podshohlik va hikmat berdi va O‘zi xohlagan narsalarni o‘rgatdi. Agar Allah odamlarni bir-biri bilan daf etmaganida edi, yer buzilib ketgan bo‘lur edi. Lekin Allah olamlarga fazl egasidir.",
252: "Bu Allahning oyatlaridir. Biz ularni senga haqiqat bilan tilovat qilamiz. Albatta, sen yuborilgan payg‘ambarlardandirsan.",
253: "Bu payg‘ambarlarning ba’zilarini boshqalaridan ustun qildik. Ulardan ba’zisi bilan Allah gaplashdi, ba’zilarini darajalar bilan ko‘tardi. Maryam o‘g‘li Iso ga aniq hujjatlar berdik va uni Ruhul-Qudus bilan quvvatladik. Agar Allah xohlasa edi, ulardan keyin kelganlar aniq dalillar kelganidan keyin urushmas edilar. Lekin ular ixtilof qildilar: ba’zisi iymon keltirdi, ba’zisi kufr keltirdi. Agar Allah xohlasa edi, ular urushmas edilar, lekin Allah xohlaganini qiladi.",
254: "Ey iymon keltirganlar! Sizlarga bergan narsalardan sarflanglar, savdo ham, do‘stlik ham, shafoat ham bo‘lmaydigan kun kelishidan oldin. Kofirlar — ana o‘shalar zolimlardir.",
255: "Allah — Undan boshqa iloh yo‘q. U Tirik va Qayyumdir. Uni na mudroq, na uyqu oladi. Osmonlar va yerdagi barcha narsa Unikidir. Uning huzurida kim Uning iznisiz shafoat qila oladi? U ularning oldidagi va orqasidagi narsalarni biladi. Ular esa Uning ilmiga faqat O‘zi xohlaganicha yetishadilar. Uning Kursisi osmonlar va yerni qamrab olgan. Ularni saqlash Uni charchatmaydi. U Oliy va Buyukdir.",
256: "Dinda majburlash yo‘q. To‘g‘ri yo‘l adashishdan aniq ajraldi. Kim tag‘utni inkor etib, Allahga iymon keltirsa, albatta, uzilmaydigan mustahkam tutqichni ushlagan bo‘ladi. Allah eshituvchi va biluvchidir.",
257: "Allah iymon keltirganlarning do‘stidir. Ularni zulmatlardan nurga chiqaradi. Kufr keltirganlarning do‘stlari esa tag‘utlardir, ularni nurdan zulmatlarga chiqaradilar. Ana o‘shalar do‘zax ahlidir, unda abadiy qoladilar.",
258: "Ibrohim bilan Robbisi haqida tortishgan kishini ko‘rmadingmi? Allah unga podshohlik bergani uchun. Ibrohim: «Rabbim tiriltiradi va o‘ldiradi», deganida, u: «Men ham tiriltiraman va o‘ldiraman», dedi. Ibrohim: «Albatta, Allah quyoshni sharqdan chiqaradi, sen uni g‘arbdan chiqar», dedi. Shunda kufr keltirgan kishi lol qoldi. Allah zolim qavmni hidoyat qilmaydi.",
259: "Yoki bir kishi o‘tgan shaharga — u vayron bo‘lib yotgan edi — dedi: «Allah buni o‘lgandan keyin qanday tiriltiradi?» Allah uni yuz yil o‘ldirdi, so‘ng tiriltirdi. Dedi: «Qancha turding?» U dedi: «Bir kun yoki kunning bir qismi». Dedi: «Yo‘q, yuz yil turding. Taoming va ichimligingga qara — buzilmagan. Eshagingga qara — seni odamlar uchun belgi qilamiz. Suyaklarga qara — ularni qanday tiklaymiz, so‘ng go‘sht bilan qoplaymiz». Bu unga ayon bo‘lgach dedi: «Bilaman, albatta, Allah har narsaga qodirdir».",
260: "Ibrohim: «Rabbim! O‘liklarni qanday tiriltirishingni menga ko‘rsat», dedi. U dedi: «Ishonmadingmi?» U dedi: «Yo‘q, lekin qalbim taskin topishi uchun». U dedi: «To‘rtta qushni ol, ularni o‘zingga o‘rgat, so‘ng har bir tog‘ga bir bo‘lagini qo‘y, keyin ularni chaqir — ular senga tezda keladilar. Bilgin: albatta, Allah Aziz va Hikmatlidir».",
261: "Molini Allah yo‘lida sarflaydiganlarning misoli xuddi bir dona urug‘ga o‘xshaydi — u yetti boshoq chiqaradi, har boshoqda yuz dona bor. Allah xohlagan kishiga ko‘paytiradi. Allah keng va biluvchidir.",
262: "Molini Allah yo‘lida sarflab, keyin minnat qilmaydigan va ozor bermaydiganlarga Rabblari huzurida ajr bor. Ularga qo‘rquv yo‘q va ular g‘amgin bo‘lmaydilar.",
263: "Yaxshi so‘z va kechirish — ortidan ozor keladigan sadaqadan yaxshiroqdir. Allah behojat va halimdir.",
264: "Ey iymon keltirganlar! Sadaqalaringizni minnat va ozor bilan bekor qilmanglar — xuddi molini odamlarga ko‘rsatish uchun sarflab, Allahga va oxirat kuniga iymon keltirmaydigan kishi kabi. Uning misoli ustida tuproq bo‘lgan silliq toshga o‘xshaydi — yomg‘ir yog‘ib, uni yalang‘och qoldiradi. Ular qilgan narsalaridan hech narsaga ega bo‘lmaydilar. Allah kafir qavmni hidoyat qilmaydi.",
265: "Allah roziligini istab va o‘zlarini mustahkamlash uchun mol sarflaydiganlarning misoli baland joydagi bog‘ga o‘xshaydi — unga kuchli yomg‘ir yog‘adi va hosilini ikki barobar beradi. Agar kuchli yomg‘ir yog‘masa, mayin yomg‘ir yetadi. Allah qilayotgan ishlaringizni ko‘rib turuvchidir.",
266: "Sizlardan kim xurmo va uzum bog‘i bo‘lib, ostidan daryolar oqib turadigan, unda har turli mevalar bo‘lgan holda qarib qolib, zaif bolalari bo‘lsa va unga olovli bo‘ron tegib, uni kuydirib yuborishini xohlarmidi? Shunday qilib Allah sizlarga oyatlarni bayon qiladi, shoyad tafakkur qilsangizlar.",
267: "Ey iymon keltirganlar! Qilgan narsalaringizning yaxshilaridan va sizlar uchun yerdan chiqargan narsalarimizdan sarflanglar. Yomonini sarflashni niyat qilmanglar — o‘zingiz ko‘zingizni yummasdan olmaysiz. Bilgin: albatta, Allah behojat va hamdga loyiqdir.",
268: "Shayton sizlarni kambag‘allik bilan qo‘rqitadi va fahshga buyuradi. Allah esa sizlarga O‘z mag‘firatini va fazlini va’da qiladi. Allah keng va biluvchidir.",
269: "U hikmatni kimga xohlasa beradi. Kimga hikmat berilgan bo‘lsa, unga katta yaxshilik berilgan bo‘ladi. Buni faqat aql egalari eslaydilar.",
270: "Qanday sadaqa bersangiz yoki qanday nazr qilsangiz, albatta, Allah uni biladi. Zolimlar uchun yordamchilar yo‘q.",
271: "Agar sadaqalarni oshkor qilsangizlar — bu yaxshi. Agar yashirib, faqirlarga bersangizlar — bu sizlar uchun yaxshiroq va gunohlaringizni o‘chiradi. Allah qilayotgan ishlaringizdan xabardordir.",
272: "Ularni hidoyat qilish sening zimmandagi emas. Lekin Allah xohlagan kishini hidoyat qiladi. Qilgan yaxshiligingiz o‘zingiz uchundir. Sizlar faqat Allahning roziligini istab sarflaysizlar. Qilgan yaxshiligingiz sizlarga to‘liq qaytariladi va sizlarga zulm qilinmaydi.",
273: "Sadaqalar o‘zlarini Allah yo‘liga bag‘ishlab, yer yuzida yurishga qodir bo‘lmagan faqirlar uchundir. Bilmagan kishi ularni iffatlari sabab boy deb o‘ylaydi. Ularni belgilaridan taniysan — odamlardan talab qilib turmaydilar. Qanday yaxshilik qilsangiz, albatta, Allah uni biladi.",
274: "Molini kechayu kunduz, yashirin va oshkora sarflaydiganlarga Robblari huzurida ajr bor. Ularga qo‘rquv yo‘q va ular g‘amgin bo‘lmaydilar.",
275: "Ribo yeydiganlar faqat shayton urib yiqitgan kishi kabi turadilar. Bu ularning: «Savdo ham ribo kabi», deganlari sababli. Holbuki Allah savdoni halol, riboni harom qildi. Kimga Robbisidan nasihat kelib, to‘xtasa, ilgari olgani o‘ziga va ishi Allahga. Kim qaytsa — ana o‘shalar do‘zax ahlidir, unda abadiy qoladilar.",
276: "Allah riboni yo‘q qiladi va sadaqalarni ko‘paytiradi. Allah har qanday kofir gunohkorni sevmaydi.",
277: "Iymon keltirib, solih amallar qilganlar, namozni to‘kis ado etganlar va zakot berganlar uchun Robblari huzurida ajr bor. Ularga qo‘rquv yo‘q va ular g‘amgin bo‘lmaydilar.",
278: "Ey iymon keltirganlar! Allahdan qo‘rqinglar va agar mo‘min bo‘lsangizlar, ribodan qolganini tark etinglar.",
279: "Agar buni qilmasangizlar, Allah va Uning Rasulidan urush borligini bilinglar. Agar tavba qilsangizlar, asosiy molingiz sizlarniki — zulm qilmaysizlar va sizlarga ham zulm qilinmaydi.",
280: "Agar (qarzdor) qiyinchilikda bo‘lsa, yengillik bo‘lguncha kutinglar. Agar sadaqa qilsangizlar, bu sizlar uchun yaxshiroqdir, agar bilsangizlar.",
281: "Allahga qaytariladigan kundan qo‘rqinglar. So‘ng har bir jon qilgan narsasini to‘liq oladi va ularga zulm qilinmaydi.",
282: "Ey iymon keltirganlar! Ma’lum muddatga qarz olganingizda uni yozib qo‘yinglar. O‘rtangizda bir kotib adolat bilan yozsin. Hech bir kotib yozishdan bosh tortmasin — Allah uni o‘rgatgani kabi yozsin. Qarzdor aytib tursin va Robbisi — Allahdan qo‘rqsin va undan hech narsani kamaytirmasin. Agar qarzdor aqlsiz yoki zaif bo‘lsa yoki o‘zi ayta olmasa, uning valisi adolat bilan aytsin. Erkaklaringizdan ikki guvoh olinglar. Agar ikki erkak bo‘lmasa, bir erkak va ikki ayol — ulardan biri unutsa, boshqasi eslatadi. Guvohlar chaqirilganda bosh tortmasinlar. Katta yoki kichik bo‘lishidan qat’i nazar, muddatigacha yozishdan zerikmanglar. Bu Allah huzurida adolatliroq, guvohlik uchun to‘g‘riroq va shubha qilmasligingizga yaqinroqdir. Agar o‘zaro savdo bo‘lsa, yozmasangiz ham gunoh yo‘q. Savdo qilganingizda guvoh tutinglar. Kotib ham, guvoh ham zarar ko‘rmasin. Agar shunday qilsangiz, bu sizlar uchun gunohdir. Allahdan qo‘rqinglar — Allah sizlarga o‘rgatadi. Allah har narsani biluvchidir.",
283: "Agar safarda bo‘lsangizlar va kotib topmasangizlar, qo‘lga olingan garov bo‘lsin. Agar bir-biringizga ishonsangizlar, omonat topshirilgan kishi omonatini ado etsin va Robbisi — Allahdan qo‘rqsin. Guvohlikni yashirmanglar. Kim uni yashirsa, albatta, uning qalbi gunohkordir. Allah qilayotgan ishlaringizni biluvchidir.",
284: "Osmonlar va yerdagi barcha narsa Allahnikidir. Ichingizdagini oshkor qilsangiz ham, yashirsangiz ham, Allah sizlardan hisob-kitob qiladi. So‘ng kimni xohlasa kechiradi, kimni xohlasa azoblaydi. Allah har narsaga qodirdir.",
285: "Payg‘ambar Rabbisidan o‘ziga nozil qilingan narsaga iymon keltirdi va mo‘minlar ham. Barchalari Allahga, Uning farishtalariga, kitoblariga va payg‘ambarlariga iymon keltirdilar. «Payg‘ambarlaridan hech birini ajratmaymiz», dedilar va: «Eshitdik va itoat qildik. Rabbimiz, Sening mag‘firatingni so‘raymiz va qaytish faqat Senga», dedilar.",
286: "Allah hech bir jonga kuchidan ortiq yuklamaydi. Uning qilgan yaxshiligi o‘ziga, qilgan yomonligi ham o‘ziga. «Rabbimiz! Agar unutib qo‘ysak yoki xato qilsak, bizni jazolama. Rabbimiz! Bizdan oldingilarga yuklaganing kabi og‘ir yukni bizga yuklama. Rabbimiz! Bizga kuchimiz yetmaydigan narsani yuklama. Bizni afv et, bizni kechir va bizga rahm qil. Sen bizning Mawlomizsan, kofir qavmga qarshi bizga yordam ber».",   
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
"Masad","Ixlas","Falaq","Nas"
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
