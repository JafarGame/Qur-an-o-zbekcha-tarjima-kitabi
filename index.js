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
 },
  3: {
    1: "Alif. Lam. Mim.",
    2: "Allah — Undan boshqa iloh yo‘q. U Tirik va Qayyumdir.",
    3: "U senga Kitobni haqiqat bilan nozil qildi — o‘zidan oldingi narsalarni tasdiqlovchi. Tavrot va Injilni ham nozil qildi.",
    4: "Bundan oldin odamlar uchun hidoyat qilib va Furqanni nozil qildi. Albatta, Allahning oyatlariga kufr keltirganlar uchun qattiq azob bor. Allah Aziz va intiqom egasidir.",
    5: "Albatta, yerda ham, osmondagi narsalarda ham Allahdan hech narsa yashirin qolmaydi.",
    6: "U sizlarni bachadonlarda O‘zi xohlaganidek shakllantiradi. Undan boshqa iloh yo‘q. U Aziz va Hikmatlidir.",
    7: "U senga Kitobni nozil qildi. Unda muhkamat oyatlar bor — ular Kitobning asosidir. Boshqalari esa mutashabihdir. Qalblarida og‘ish borlar fitna va ta’vil izlab mutashabihga ergashadilar. Holbuki uning ta’vilini faqat Allah biladi. Ilmda sobit bo‘lganlar: «Biz unga iymon keltirdik — hammasi Rabbimiz huzuridan», deydilar. Buni faqat aql egalari eslaydilar.",
    8: "Rabbimiz! Bizni hidoyat qilganingdan keyin qalblarimizni og‘dirma va bizga O‘zingdan rahmat ber. Albatta, Sen beruvchisan.",
    9: "Rabbimiz! Albatta, Sen odamlarni shubha yo‘q bo‘lgan kunda jamlaysan. Albatta, Allah va’dasiga xilof qilmaydi.",
    10: "Albatta, kufr keltirganlarga mol-mulklari ham, bolalari ham Allah huzurida hech narsaga foyda bermaydi. Ular do‘zaxning yoqilg‘isidir.",
    11: "Fir’avn ahli va ulardan oldingilar odatidek — oyatlarimizni yolg‘on deb hisobladilar, bas, Allah ularni gunohlari sababli ushladi. Allah azobi qattiqdir.",
    12: "Kafirlarga ayting: «Albatta, sizlar yengilasizlar va jahannamga jamlanasizlar. Qanday yomon joy!»",
    13: "Albatta, sizlar uchun to‘qnashgan ikki guruhda belgi bor edi: biri Allah yo‘lida urushayotgan edi, boshqasi kofir edi. Ular ularni ko‘zlari bilan ikki barobar ko‘rdilar. Allah O‘z yordamini kimga xohlasa, o‘shanga beradi. Albatta, bunda ko‘zi borlar uchun ibrat bor.",
    14: "Odamlarga ayollarga, bolalarga, oltin-kumush xazinalarga, zotdor otlarga, chorva va ekinlarga muhabbat ziynatli qilib ko‘rsatildi. Bu dunyo hayotining matosidir. Allah huzurida esa eng yaxshi qaytish joyi bor.",
    15: "Ayting: «Sizlarga bundan yaxshiroq narsani aytaymi?» Taqvodorlar uchun Rabblari huzurida ostidan daryolar oqadigan jannatlar bor — ular unda abadiy qoladilar, pok juftlar va Allahning roziligi bor. Allah bandalarni ko‘rib turuvchidir.",
    16: "Ular: «Rabbimiz! Biz iymon keltirdik, bas, gunohlarimizni kechir va bizni do‘zax azobidan saqla», deydilar.",
    17: "Sabr qiluvchilar, rostgo‘ylar, itoatkorlar, sadaqa qiluvchilar va saharlarda mag‘firat so‘rovchilardir.",
    18: "Allah guvohlik berdi — Undan boshqa iloh yo‘q. Farishtalar va ilm egalari ham adolat bilan (guvohlik berdilar). Undan boshqa iloh yo‘q — U Aziz va Hikmatlidir.",
    19: "Albatta, Allah huzurida din — Islomdir. Kitob berilganlar o‘zlariga ilm kelganidan keyin hasad sabab ixtilof qildilar. Kim Allahning oyatlariga kufr keltirsa — albatta, Allah tez hisob qiluvchidir.",
    20: "Agar ular sen bilan tortishsalar, ayt: «Men yuzimni Allahga taslim qildim va menga ergashganlar ham». Kitob berilganlar va ummiylarga ayt: «Taslim bo‘ldingizlarmi?» Agar taslim bo‘lsalar — hidoyat topadilar. Agar yuz o‘girsalar — senga faqat yetkazish bor. Allah bandalarni ko‘rib turuvchidir.",
     21: "Albatta, Allahning oyatlariga kufr keltirganlar, payg‘ambarlarni nohaq o‘ldirganlar va odamlardan adolatga buyuruvchilarni o‘ldirganlar — ularga alamli azob xushxabarini ber.",
22: "Ana o‘shalar amallari dunyo va oxiratda bekor bo‘lganlardir va ularga yordamchilar yo‘q.",
23: "Kitobdan nasiba berilganlarni ko‘rmadingmi? Ular Allahning Kitobiga — u o‘rtalarida hukm qilishi uchun — chaqiriladilar, so‘ng ulardan bir guruhi yuz o‘giradi.",
24: "Bu ularning: «Bizga do‘zax faqat sanoqli kunlargina tegadi», deganlari sababli. Ularning o‘ylab topgan narsalari ularni dinlarida aldadi.",
25: "Shubhasiz kun keladi — unda ularni jamlaymiz, unda shubha yo‘q. Har bir jon qilgan narsasini to‘liq oladi va ularga zulm qilinmaydi.",
26: "Ayting: «Ey mulk egasi bo‘lgan Allah! Sen mulkni xohlagan kishiga berasan, xohlagan kishidan olasan, xohlagan kishani aziz qilasan va xohlagan kishani xor qilasan. Yaxshilik Sening qo‘lingdadir. Albatta, Sen har narsaga qodirsan».",
27: "Sen kechani kunduzga kiritasan va kunduzni kechaga kiritasan. Tirikni o‘likdan chiqarasan va o‘likni tirikdan chiqarasan. Xohlagan kishaga hisobsiz rizq berasan.",
28: "Mo‘minlar mo‘minlarni qo‘yib, kofirlarni do‘st tutmasinlar. Kim shunday qilsa, Allah bilan hech qanday aloqasi yo‘q — faqat ulardan saqlanish uchun ehtiyot bo‘lish bundan mustasno. Allah sizlarni O‘zidan ogohlantiradi. Qaytish faqat Allahgadir.",
29: "Ayting: «Ichingizdagini yashirsangiz ham, oshkor qilsangiz ham, Allah uni biladi. Osmonlar va yerdagi narsalarni biladi. Allah har narsaga qodirdir».",
30: "Har bir jon qilgan yaxshiligini ham, qilgan yomonligini ham oldida tayyor holda topadigan kunni eslang. U yomonlik bilan o‘zi orasida uzoq masofa bo‘lishini istaydi. Allah sizlarni O‘zidan ogohlantiradi. Allah bandalarga mehribondir.",
31: "Ayting: «Agar Allahni sevsangizlar, menga ergashinglar — Allah sizlarni sevadi va gunohlaringizni kechiradi. Allah kechiruvchi va Rahmlidir».",
32: "Ayting: «Allahga va Rasulga itoat qilinglar». Agar yuz o‘girsalar, albatta, Allah kofirlarni sevmaydi.",
33: "Albatta, Allah Odamni, Nuhni, Ibrohim oilasini va Imron oilasini olamlardan ustun qildi.",
34: "Ular bir-biridan bo‘lgan avlodlardir. Allah eshituvchi va biluvchidir.",
35: "Imranning xotini dedi: «Robbim! Qornimdagi narsani Senga bag‘ishladim, uni qabul qilgin. Albatta, Sen eshituvchi va biluvchisan».",
36: "Uni tug‘gach dedi: «Rabbim! Uni qiz tug‘dim». Allah esa nima tug‘ilganini yaxshi biladi. «O‘g‘il qizdek emas. Men unga Maryam deb nom qo‘ydim va uni hamda zurriyotini shaytondan panohingga topshirdim».",
37: "Rabbisi uni chiroyli tarzda qabul qildi va yaxshi o‘stirdi, Zakariyoni unga kafolat qildi. Har safar Zakariyo uning oldiga mehrobga kirsa, uning yonida rizq topardi. Dedi: «Ey Maryam! Bu senga qayerdan?» U dedi: «Bu Allah huzuridandir. Albatta, Allah xohlagan kishaga hisobsiz rizq beradi».",
38: "O‘sha yerda Zakariyo Rabbisiga duo qildi: «Rabbim! Menga O‘zingdan pok zurriyot ber. Albatta, Sen duoni eshituvchisan».",
39: "U mehrobda namoz o‘qib turganida farishtalar uni chaqirdilar: «Allah senga Yahyoni xushxabar qiladi — u Allahning Kalimasini tasdiqlovchi, ulug‘, o‘zini tiyuvchi va solih payg‘ambarlardan bo‘ladi».",
40: "U dedi: «Rabbim! Qanday qilib menga o‘g‘il bo‘ladi, holbuki qarilik menga yetdi va xotinim bepusht?» U dedi: «Shunday! Allah xohlaganini qiladi».",
41: "U dedi: «Rabbim! Menga bir belgi ber». U dedi: «Sening belging — uch kun odamlar bilan faqat ishora bilan gaplashishingdir. Robbingni ko‘p zikr qil va kechqurun va ertalab tasbeh ayt».",
42: "Malaikalar dedilar: «Ey Maryam! Albatta, Allah seni tanladi, pokladi va olam ayollaridan ustun qildi».",
43: "Ey Maryam! Rabbingga itoat qil, sajda qil va ruku qiluvchilar bilan ruku qil».",
44: "Bu g‘ayb xabarlaridan bo‘lib, Biz uni senga vahiy qilamiz. Ular qaysi biri Maryamga kafolat bo‘lishini aniqlash uchun qalamlarini tashlaganlarida sen ular bilan emas eding. Ular tortishganlarida ham sen ular bilan emas eding.",
45: "Malaikalar dedilar: «Ey Maryam! Albatta, Allah seni O‘zidan bir Kalima bilan xushxabar qiladi — uning nomi Masih Iso ibn Maryamdir, dunyo va oxiratda hurmatli va yaqinlardan bo‘ladi».",
46: "U odamlar bilan beshikda ham, ulg‘ayganida ham gaplashadi va solihlardan bo‘ladi».",
47: "U dedi: «Rabbim! Qanday qilib menga farzand bo‘ladi, holbuki menga hech bir erkak tegmagan?» U dedi: «Shunday! Allah xohlaganini yaratadi. Bir ishni iroda qilsa, unga faqat: «Bo‘l!» deydi — bas, u bo‘ladi».",
48: "Unga Kitobni, hikmatni, Tavrotni va Injilni o‘rgatadi.",
49: "Va uni Bani Isroilga payg‘ambar qiladi: «Men sizlarga Rabbingizdan oyat bilan keldim: loydan qush shaklini yasayman va unga puflayman — Allahning izni bilan u qush bo‘ladi. Ko‘rni va moxovni tuzataman va o‘liklarni Allahning izni bilan tiriltiraman. Sizlarga yegan va uylaringizda saqlagan narsalaringizni aytib beraman. Agar mo‘min bo‘lsangizlar, bunda sizlar uchun albatta belgi bor».",
50: "«Men sizlardan oldingi Tavrotni tasdiqlovchi va sizlarga harom qilingan ba’zi narsalarni halol qilish uchun keldim. Men sizlarga Rabbingizdan oyat bilan keldim. Bas, Allahdan qo‘rqinglar va menga itoat qilinglar».",
51: "Albatta, Allah mening Rabbim va sizlarning Rabbingizdir. Bas, Unga ibodat qilinglar. Bu to‘g‘ri yo‘ldir».",
52: "Iso ulardan kufrni sezgach dedi: «Kimlar mening yordamchilarim — Allah tomon?» Havoriylar dedilar: «Biz Allahning yordamchilarimiz. Biz Allahga iymon keltirdik va guvoh bo‘l — biz musulmonlarmiz».",
53: "Rabbimiz! Sen nozil qilgan narsaga iymon keltirdik va payg‘ambarga ergashdik. Bas, bizni guvohlardan yoz».",
54: "Ular makr qildilar, Allah ham makr qildi. Allah makr qiluvchilarning eng yaxshisidir.",
55: "Allah dedi: «Ey Iso! Albatta, Men seni vafot ettiraman va O‘zimga ko‘taraman, seni kufr keltirganlardan poklayman va senga ergashganlarni qiyomat kunigacha kofirlardan ustun qilaman. So‘ngra qaytishingiz Mening huzurimgadir, bas, sizlar ixtilof qilgan narsalarda o‘rtangizda hukm qilaman».",
56: "Kufr keltirganlarga dunyoda va oxiratda qattiq azob beraman va ularga yordamchilar bo‘lmaydi.",
57: "Iymon keltirib, solih amallar qilganlarga esa mukofotlarini to‘liq beraman. Allah zolimlarni sevmaydi.",
58: "Bu Biz senga tilovat qilayotgan oyatlar va hikmatli zikrdir.",
59: "Albatta, Iso misoli Allah huzurida Odam misoliga o‘xshaydi. Uni tuproqdan yaratdi, so‘ng unga: «Bo‘l!» dedi — bas, u bo‘ldi.",
60: "Haqiqat Rabbingdandir. Bas, shubha qiluvchilardan bo‘lma.",
61: "Kim senga kelgan ilmiydan keyin bu haqda tortishsa, ayt: «Kelinglar, o‘g‘illarimizni va o‘g‘illaringizni, ayollarimizni va ayollaringizni, o‘zimizni va o‘zingizni chaqiraylik, so‘ng duo qilib, Allahning la’natini yolg‘onchilarga qilaylik».",
62: "Albatta, bu haqiqiy qissadir. Allahdan boshqa iloh yo‘q. Albatta, Allah Aziz va Hikmatlidir.",
63: "Agar yuz o‘girsalar, albatta, Allah buzg‘unchilarni biluvchidir.",
64: "Ayting: «Ey Kitob ahli! Biz bilan sizlar o‘rtasida teng bo‘lgan so‘zga kelinglar — faqat Allahga ibodat qilaylik, Unga hech narsani sherik qilmaylik va bir-birimizni Allahdan boshqa Rablar qilib olmaylik». Agar yuz o‘girsalar, ayting: «Guvoh bo‘linglar — biz musulmonlarmiz».",
65: "Ey Kitob ahli! Nega Ibrahim haqida tortishasizlar, holbuki Tavrat va Injil undan keyin nozil qilingan? Aql qilmaysizlarmi?",
66: "Mana sizlar — bilgan narsangiz haqida tortishdingizlar. Nega bilmagan narsangiz haqida tortishasizlar? Allah biladi, sizlar bilmaysizlar.",
67: "Ibrohim na yahudiy, na nasroniy edi. Balki hanif — musulmon edi va mushriklardan emas edi.",
68: "Albatta, odamlarning Ibrohimga eng yaqinlari — unga ergashganlar, bu payg‘ambar va iymon keltirganlardir. Allah mo‘minlarning do‘stidir.",
69: "Kitob ahlidan bir guruhi sizlarni adashtirmoqchi bo‘ladi. Ular faqat o‘zlarini adashtiradilar, lekin sezmaydilar.",
70: "Ey Kitob ahli! Nega Allahning oyatlariga guvoh bo‘la turib kufr keltirasizlar?",
71: "Ey Kitob ahli! Nega haqiqatni botil bilan aralashtirasizlar va haqiqatni bila turib yashirasizlar?",
72: "Kitob ahlidan bir guruhi dedi: «Mo‘minlarga nozil qilingan narsaga kun boshida iymon keltiringlar, oxirida esa kufr keltiringlar — balki ular qaytib ketarlar».",
73: "Va faqat o‘z diningizga ergashganlarga ishoninglar. Ayting: «Albatta, hidoyat — Allahning hidoyatidir». (Ular deydilar:) «Sizlarga berilgandek boshqa birovga ham berilmasin yoki ular Rabingiz huzurida sizlar bilan tortishmasin». Ayting: «Albatta, fazl Allahning qo‘lidadir — uni xohlagan kishaga beradi. Allah keng va biluvchidir».",
74: "U rahmatini kimga xohlasa, o‘shanga xos qiladi. Allah ulkan fazl egasidir.",
75: "Kitob ahlidan shundayi borki, unga katta xazina topshirsang, uni senga qaytaradi. Ulardan shundayi ham borki, unga bir dinor topshirsang, ustidan turmaguningcha senga qaytarmaydi. Bu ularning: «Ummiylar haqida bizga yo‘l yo‘q», deganlari sababli. Ular bila turib Allah haqida yolg‘on gapiradilar.",
76: "Yo‘q! Kim ahdiga vafo qilsa va taqvo qilsa — albatta, Allah taqvodorlarni sevadi.",
77: "Albatta, Allahning ahdini va qasamlarini oz bahoga sotadiganlar — ana o‘shalarga oxiratda nasiba yo‘q. Allah ular bilan gaplashmaydi, qiyomat kuni ularga qaramaydi va ularni poklamaydi. Ular uchun alamli azob bor.",
78: "Ulardan bir guruhi tilini Kitob bilan buraydi — sizlar uni Kitobdan deb o‘ylaysizlar, holbuki u Kitobdan emas. Ular: «Bu Allah huzuridandir», deydilar, holbuki u Allah huzuridan emas. Ular bila turib Allah haqida yolg‘on gapiradilar.",
79: "Hech bir inson uchun to‘g‘ri emas — Allah unga Kitob, hukm va payg‘ambarlik bergach, odamlarga: «Allahdan boshqa menga bandalar bo‘linglar», desin. Balki: «Rabbaniy bo‘linglar — Kitobni o‘rgatganingiz va o‘rganganingiz sabab», deydi.",
80: "Va u sizlarga malaikalarni va payg‘ambarlarni Rabblar qilib olishni buyurmaydi. Sizlar musulmon bo‘lganingizdan keyin sizlarga kufrni buyurarmidi?",
81: "Allah payg‘ambarlardan ahd olganini eslang: «Men sizlarga Kitob va hikmat berdim. So‘ng sizlarga sizlardagi narsani tasdiqlovchi payg‘ambar kelsa, albatta, unga iymon keltirasizlar va yordam berasizlar». U dedi: «Iqror bo‘ldingizlarmi va bu ahdimni oldingizlarmi?» Ular dedilar: «Iqror bo‘ldik». U dedi: «Guvoh bo‘linglar, Men ham sizlar bilan guvohlardandirman».",
82: "Kim bundan keyin yuz o‘girsa — ana o‘shalar fasiqlardir.",
83: "Ular Allahning dinidan boshqasini izlayaptlarmi? Osmonlar va yerdagi barcha narsa istab-istamay Unga bo‘ysungan. Va Unga qaytariladilar.",
84: "Ayting: «Biz Allahga, bizga nozil qilingan narsaga, Ibrahim, Ismail, Ishoq, Ya’qub va avlodlariga nozil qilingan narsaga, Muso, Iso va payg‘ambarlarga Rablaridan berilgan narsaga iymon keltirdik. Ular orasini ajratmaymiz va biz Unga bo‘ysunuvchilarmiz».",
85: "Kim Islamdan boshqa din izlasа, undan qabul qilinmaydi va u oxiratda ziyon ko‘ruvchilardandir.",
86: "Qanday qilib Allah iymon keltirgan, payg‘ambar haq ekaniga guvohlik bergan va aniq dalillar kelgan qavmni hidoyat qiladi, keyin kufr keltirsalar? Allah zolim qavmni hidoyat qilmaydi.",
87: "Ana o‘shalarning jazosi — ularga Allahning, malaikalarning va barcha odamlarning la’nati bo‘lishidir.",
88: "Ular unda abadiy qoladilar. Ulardan azob yengillashtirilmaydi va ularga muhlat berilmaydi.",
89: "Magar bundan keyin tavba qilgan va isloh qilganlar bundan mustasno. Albatta, Allah kechiruvchi va Rahmlidir.",
90: "Albatta, iymon keltirgandan keyin kufr keltirib, keyin kufrini ziyoda qilganlarning tavbasi qabul qilinmaydi. Ana o‘shalar adashganlardir.",
91: "Albatta, kufr keltirgan va kofir bo‘lgan holda o‘lganlar — yer to‘la oltinni fidya qilsa ham qabul qilinmaydi. Ular uchun alamli azob bor va ularga yordamchilar yo‘q.",
92: "Sevgan narsalaringizdan sarflamaguningizcha yaxshilikka erisha olmaysizlar. Qanday narsani sarflasangiz, albatta, Allah uni biladi.",
93: "Tavrot nozil qilinishidan oldin Isroil o‘ziga harom qilgan narsadan tashqari barcha taomlar Bani Isroil uchun halol edi. Ayting: «Agar rostgo‘y bo‘lsangizlar, Tavrotni keltirib o‘qinglar».",
94: "Kim bundan keyin Allah haqida yolg‘on to‘qisa — ana o‘shalar zolimlardir.",
95: "Ayting: «Allah rost gapirdi. Bas, hanif bo‘lgan Ibrohim diniga ergashinglar. U mushriklardan emas edi».",
96: "Albatta, odamlar uchun qo‘yilgan birinchi uy — Makkadagi (Ka’ba)dir — muborak va olamlar uchun hidoyatdir.",
97: "Unda aniq oyatlar bor — Ibrohim maqomi. Kim unga kirsa, omonda bo‘ladi. Yo‘l topa olgan odamlar zimmasida Allah uchun Baytni haj qilish bor. Kim kufr keltirsa — albatta, Allah olamlardan behojatdir.",
98: "Ayting: «Ey Kitob ahli! Nega Allahning oyatlariga kufr keltirasizlar? Allah qilayotgan ishlaringizga guvohdir».",
99: "Ayting: «Ey Kitob ahli! Nega iymon keltirganlarni Allah yo‘lidan to‘sasizlar, uni egri qilishni xohlaysizlar, holbuki o‘zingiz guvohsizlar?» Allah qilayotgan ishlaringizdan g‘ofil emas.",
100: "Ey iymon keltirganlar! Agar Kitob berilganlardan bir guruhiga itoat qilsangizlar, sizlarni iymoningizdan keyin kofirga aylantiradilar.",
101: "Sizlarga Allahning ayatlari tilovat qilinib turgan va ichingizda Uning payg‘ambari bo‘lgan holda qanday kufr keltirasizlar? Kim Allahga yopishsa — albatta, to‘g‘ri yo‘lga hidoyat qilinadi.",
102: "Ey iymon keltirganlar! Allahdan haqiqiy qo‘rqish bilan qo‘rqinglar va faqat musulmon bo‘lgan holda o‘linglar.",
103: "Barchangiz Allahning ipiga mahkam yopishinglar va bo‘linmanglar. Allahning sizlarga bergan ne’matini eslang — sizlar dushman edingizlar, U qalblaringizni birlashtirdi va Uning ne’mati bilan birodar bo‘ldingizlar. Sizlar olov chuqurining chetida edingizlar, U sizlarni undan qutqardi. Shunday qilib Allah sizlarga oyatlarini bayon qiladi, shoyad hidoyat topsangizlar.",
104: "Sizlardan yaxshilikka chaqiradigan, yaxshilikni buyuradigan va yomonlikdan qaytaradigan bir ummat bo‘lsin. Ana o‘shalar najot topuvchilardir.",
105: "Aniq dalillar kelganidan keyin bo‘linib ketgan va ixtilof qilganlar kabi bo‘lmanglar. Ana o‘shalar uchun ulkan azob bor.",
106: "Ba’zi yuzlar oq bo‘ladigan va ba’zi yuzlar qora bo‘ladigan kunda. Yuzlari qora bo‘lganlarga: «Iymoningizdan keyin kufr keltirdingizlarmi? Bas, kufr qilganingiz uchun azobni tatib ko‘ringlar», deyiladi.",
107: "Yuzlari oq bo‘lganlar esa — ular Allahning rahmatidadirlar, unda abadiy qoladilar.",
108: "Bular Allahning ayatlaridir — Biz ularni senga haqiqat bilan tilovat qilamiz. Allah olamlarga zulm qilishni istamaydi.",
109: "Osmonlar va yerdagi barcha narsa Allahnikidir. Barcha ishlar Allahga qaytariladi.",
110: "Sizlar odamlar uchun chiqarilgan eng yaxshi ummatsizlar — yaxshilikni buyurasizlar, yomonlikdan qaytarasizlar va Allahga iymon keltirasizlar. Agar Kitob ahli iymon keltirganida edi, bu ular uchun yaxshiroq bo‘lardi. Ular orasida mo‘minlar ham bor, lekin ko‘pchiligi fosiqlardir.",
 111: "Ular sizlarga ozor berishdan boshqa zarar yetkaza olmaydilar. Agar sizlar bilan urushsalar, orqalariga qaytadilar, keyin ularga yordam berilmaydi.",
112: "Ular qayerda bo‘lmasinlar, xorlik bilan qoplandilar — faqat Allahning ipi va odamlarning ipi bilan bo‘lmasa. Ular Allahning g‘azabiga uchradilar va miskinlik bilan qoplandilar. Bu ularning Allahning oyatlariga kufr keltirganlari va payg‘ambarlarni nohaq o‘ldirganlari sababli edi. Bu itoatsizliklari va haddan oshganlari sababli edi.",
113: "Ular bir xil emaslar. Kitob ahli ichida to‘g‘ri yo‘lda bo‘lgan ummat ham bor — ular kechalari Allahning oyatlarini tilovat qiladilar va sajda qiladilar.",
114: "Ular Allahga va oxirat kuniga iymon keltiradilar, yaxshilikni buyuradilar, yomonlikdan qaytaradilar va yaxshiliklarda shoshiladilar. Ana o‘shalar solihlardandir.",
115: "Qanday yaxshilik qilsalar, undan mahrum qilinmaydilar. Allah taqvodorlarni biluvchidir.",
116: "Albatta, kufr keltirganlarga mol-mulklari ham, bolalari ham Allah huzurida hech narsaga foyda bermaydi. Ular do‘zax ahlidir, unda abadiy qoladilar.",
117: "Ularning bu dunyodagi sarflagan narsalari sovuq shamol urib ketgan ekinga o‘xshaydi — u o‘zlariga zulm qilgan qavmning ekinini halok qiladi. Allah ularga zulm qilmadi, balki ular o‘zlariga zulm qildilar.",
118: "Ey iymon keltirganlar! O‘zingizdan boshqalarni sirdosh tutmanglar — ular sizlarga zarar yetkazishda ayamaydi. Ular sizlarning qiyinchilikka tushishingizni xohlaydilar. Ularning nafrati og‘izlaridan chiqib turibdi, qalblarida yashirgani esa bundan ham kattaroqdir. Agar aql qilsangizlar, Biz sizlarga oyatlarni bayon qildik.",
119: "Mana sizlar ularni sevasizlar, ular esa sizlarni sevmaydilar. Sizlar barcha Kitoblarga iymon keltirasizlar. Ular sizlarga uchraganlarida: «Iymon keltirdik», deydilar. Yolg‘iz qolganlarida esa sizlarga bo‘lgan g‘azabdan barmoqlarini tishlaydilar. Ayting: «G‘azabing bilan o‘linglar!» Albatta, Allah ko‘ngillardagi narsani biluvchidir.",
120: "Agar sizlarga yaxshilik yetib kelsa, bu ularni xafa qiladi. Agar sizlarga yomonlik yetsa, bunga xursand bo‘ladilar. Agar sabr qilsangizlar va taqvo qilsangizlar, ularning hiylalari sizlarga hech zarar yetkaza olmaydi. Albatta, Allah ularning qilayotgan ishlarini qamrab oluvchidir.",
121: "Sen ertalab ahli-uyingdan chiqib, mo‘minlarni jang uchun joylashtirganingni eslang. Allah eshituvchi va biluvchidir.",
122: "Sizlardan ikki guruh qo‘rqib qolishga yaqin edi, holbuki Allah ularning do‘sti edi. Bas, mo‘minlar Allahga tavakkul qilsinlar.",
123: "Albatta, sizlar zaif bo‘lganingizda Allah sizlarga Badrda yordam berdi. Bas, Allahdan qo‘rqinglar, shoyad shukr qilsangizlar.",
124: "Sen mo‘minlarga: «Rabbingiz sizlarga uch ming malaikalar bilan yordam berishi sizlarga yetmaydimi?» deganingni eslang.",
125: "Ha, agar sabr qilsangizlar va taqvo qilsangizlar va ular darhol sizlarga kelsalar, Rabbingiz sizlarga besh ming belgilangan malaikalar bilan yordam beradi.",
126: "Allah buni faqat sizlarga xushxabar qilish va qalblaringiz tinchlanishi uchun qildi. G‘alaba faqat Aziz va Hikmatli Allah huzuridandir.",
127: "U kofirlardan bir qismini yo‘q qilish yoki ularni xor qilish uchun — ular umidsiz holda qaytib ketishlari uchun.",
128: "Bu ishda senga hech narsa yo‘q — U ularning tavbasini qabul qiladi yoki ularni azoblaydi. Albatta, ular zolimlardir.",
129: "Osmonlar va yerdagi barcha narsa Allahnikidir. U xohlagan kishani kechiradi va xohlagan kishani azoblaydi. Allah kechiruvchi va Rahmlidir.",
130: "Ey iymon keltirganlar! Riboni bir necha barobar qilib yemanglar va Allahdan qo‘rqinglar, shoyad najot topsangizlar.",
131: "Kafirlar uchun tayyorlangan olovdan qo‘rqinglar.",
132: "Allahga va payg‘ambarga itoat qilinglar, shoyad rahm qilinsangizlar.",
133: "Rabbingizdan mag‘firat va kengligi osmonlar va yerga teng bo‘lgan jannatga shoshilinglar — u taqvodorlar uchun tayyorlangan.",
134: "Ular kenglikda ham, torlikda ham sarflaydilar, g‘azablarini yutadilar va odamlarni kechiradilar. Allah yaxshilik qiluvchilarni sevadi.",
135: "Ular biror fahsh ish qilganlarida yoki o‘zlariga zulm qilganlarida Allahni eslab, gunohlari uchun mag‘firat so‘raydilar — gunohlarni Allahdan boshqa kim kechiradi? — va qilgan ishlarida bila turib turib olmaydilar.",
136: "Ana o‘shalar uchun Rabblaridan mag‘firat va ostidan daryolar oqadigan jannatlar bor — ular unda abadiy qoladilar. Amal qiluvchilarning mukofoti naqadar yaxshi!",
137: "Sizlardan oldin ham sunnatlar o‘tgan. Bas, yer yuzida yuringlar va yolg‘onchilarning oqibati qanday bo‘lganini ko‘ringlar.",
138: "Bu odamlar uchun bayon, taqvodorlar uchun hidoyat va nasihatdir.",
139: "Sustlashmanglar va g‘amgin bo‘lmanglar — agar mo‘min bo‘lsangizlar, sizlar ustunsizlar.",
140: "Agar sizlarga jarohat yetgan bo‘lsa, (dushman) qavmga ham xuddi shunday jarohat yetgan. Biz bu kunlarni odamlar o‘rtasida aylantiramiz — toki Allah iymon keltirganlarni ajratsin va sizlardan shahidlarni tanlasin. Allah zolimlarni sevmaydi.",
 141: "Va Allah iymon keltirganlarni poklashi va kofirlarni yo‘q qilishi uchun.",
142: "Yoki sizlar jannatga kiramiz deb o‘yladinglarmi, holbuki Allah sizlardan jihod qilganlarni va sabr qilganlarni hali bilmagan edi?",
143: "Sizlar o‘limni uchrashdan oldin uni orzu qilgan edingizlar. Endi uni ko‘rdingizlar, holbuki qarab turibsizlar.",
144: "Muhammad faqat payg‘ambardir. Undan oldin ham payg‘ambarlar o‘tgan. Agar u o‘lsa yoki o‘ldirilsa, ortingizga qaytib ketasizlarmi? Kim ortiga qaytsa, Allahga hech zarar yetkaza olmaydi. Allah shukr qiluvchilarni mukofotlaydi.",
145: "Hech bir jon Allahning iznisiz o‘la olmaydi — bu yozilgan muddatdir. Kim dunyo mukofotini istasa, undan beramiz. Kim oxirat mukofotini istasa, undan beramiz. Va shukr qiluvchilarni mukofotlaymiz.",
146: "Qancha payg‘ambarlar bilan birga ko‘p Rabbaniylar urushgan — ular Allah yo‘lida yetgan narsaga zaiflashmadilar, sustlashmadilar va taslim bo‘lmadilar. Allah sabr qiluvchilarni sevadi.",
147: "Ularning so‘zlari faqat: «Rabimiz! Gunohlarimizni va ishimizdagi haddan oshishimizni kechir, qadamlarimizni mustahkam qil va kofir qavmga qarshi bizga yordam ber», deyish edi.",
148: "Allah ularga dunyo mukofotini va oxiratning chiroyli mukofotini berdi. Allah yaxshilik qiluvchilarni sevadi.",
149: "Ey iymon keltirganlar! Agar kufr keltirganlarga itoat qilsangizlar, sizlarni ortingizga qaytaradilar va ziyon ko‘ruvchilarga aylanasizlar.",
150: "Yo‘q! Allah sizlarning Mawloingizdir va U yordam beruvchilarning eng yaxshisidir.",
151: "Biz kafirlarning qalblariga qo‘rquv solamiz, chunki ular Allahga U ruxsat bermagan narsani sherik qilganlar. Ularning joyi do‘zaxdir. Zolimlarning joyi naqadar yomon!",
152: "Albatta, Allah sizlarga O‘z va’dasini rost qildi — sizlar Ularning izni bilan ularni qirayotgan edingizlar. To sizlar zaiflashib, buyruq haqida tortishib, itoatsizlik qilganingizgacha — sizlar xohlagan narsani ko‘rsatgandan keyin. Sizlardan dunyoni xohlaganlar ham, oxiratni xohlaganlar ham bor edi. So‘ng sizlarni sinash uchun ulardan qaytardi. Va albatta, sizlarni afv etdi. Allah mo‘minlarga fazl egasidir.",
153: "Sizlar qochayotganingizda va hech kimga qaramayotganingizda, payg‘ambar orqangizdan sizlarni chaqirayotgan edi. Bas, (Allah) sizlarga g‘am ustiga g‘am berdi — toki qo‘ldan ketgan narsaga ham, sizlarga yetgan narsaga ham g‘amgin bo‘lmasligingiz uchun. Allah qilayotgan ishlaringizdan xabardordir.",
154: "So‘ng g‘amdan keyin sizlarga bir xotirjamlik — bir guruhni qamrab olgan uyquni tushirdi. Boshqa guruh esa o‘zlari haqida tashvishda edi — ular Allah haqida haqsiz gumon qilardilar. Deyishardi: «Bu ishda bizga biror narsa bormi?» Ayting: «Barcha ish Allahnikidir». Ular qalblarida yashirgan narsani senga oshkor qilmaydilar. Deyishardi: «Agar bizda biror ish bo‘lganida, bu yerda o‘ldirilmas edik». Ayting: «Agar uylaringizda bo‘lganingizda ham, o‘lim yozilganlar yotgan joylariga chiqib ketgan bo‘lardilar». Bu Allah qalblaringizdagini sinashi va ko‘ngillaringizni poklashi uchun. Allah ko‘ngillardagi narsani biluvchidir.",
155: "Sizlardan ikki guruh to‘qnashgan kuni orqaga qaytganlar — shayton ularni ba’zi qilgan ishlari sababli adashtirdi. Allah ularni afv etdi. Albatta, Allah kechiruvchi va halimdir.",
156: "Ey iymon keltirganlar! Kufr keltirganlar va safarga chiqqan yoki urushgan birodarlari haqida: «Agar ular biz bilan bo‘lganida, o‘lmagan va o‘ldirilmagan bo‘lardi», deganlar kabi bo‘lmanglar. Allah buni ularning qalblariga hasrat qiladi. Allah tiriltiradi va o‘ldiradi. Allah qilayotgan ishlaringizni ko‘rib turuvchidir.",
157: "Agar Allah yo‘lida o‘ldirilgan yoki o‘lgan bo‘lsangizlar — albatta, Allahning mag‘firati va rahmati ular jamlagan narsalardan yaxshiroqdir.",
158: "Agar o‘lsangizlar yoki o‘ldirilgan bo‘lsangizlar — albatta, Allah huzuriga jamlanasizlar.",
159: "Allahning rahmati bilan sen ularga muloyim bo‘lding. Agar qo‘pol va qattiq qalbli bo‘lganingda, ular atrofingdan tarqalib ketgan bo‘lardilar. Bas, ularni afv qil, ular uchun mag‘firat so‘ra va ishda ular bilan maslahat qil. Qaror qilganingda esa Allahga tavakkul qil. Albatta, Allah tavakkul qiluvchilarni sevadi.",
160: "Agar Allah sizlarga yordam bersa, sizlarni hech kim yenga olmaydi. Agar sizlarni tashlab qo‘ysa, Undan keyin kim yordam bera oladi? Mo‘minlar faqat Allahga tavakkul qilsinlar.",
161: "Hech bir payg‘ambar uchun xiyonat qilish to‘g‘ri emas. Kim xiyonat qilsa, qiyomat kuni o‘sha narsasi bilan keladi. So‘ng har bir jon qilgan narsasini to‘liq oladi va ularga zulm qilinmaydi.",
162: "Allahning roziligiga ergashgan kishi, Allahning g‘azabiga uchragan va joyi jahannam bo‘lgan kishi kabi bo‘ladimi? Qanday yomon joy!",
163: "Ular Allah huzurida darajalardir. Allah ularning qilayotgan ishlarini ko‘rib turuvchidir.",
164: "Albatta, Allah mo‘minlarga o‘zlaridan bo‘lgan payg‘ambar yuborib ne’mat berdi — u ularga oyatlarini tilovat qiladi, ularni poklaydi va ularga Kitob va hikmatni o‘rgatadi. Holbuki ilgari ochiq adashishda edilar.",
165: "Sizlarga (Badrda) ikki barobarini yetkazgan musibat (Uhudda) yetganda: «Bu qayerdan?» dedingizlarmi? Ayting: «Bu o‘zingizdandir». Albatta, Allah har narsaga qodirdir.",
166: "Ikki guruh to‘qnashgan kuni sizlarga yetgan narsa — Allahning izni bilan edi va mo‘minlarni ajratish uchun.",
167: "Va munofiqlarni ajratish uchun. Ularga: «Kelinglar, Allah yo‘lida urushinglar yoki himoya qilinglar», deyilganda, ular: «Agar urushni bilganimizda, sizlarga ergashgan bo‘lardik», dedilar. Ular o‘sha kuni iymondan ko‘ra kufrga yaqinroq edilar. Ular og‘izlari bilan qalblarida bo‘lmagan narsani aytadilar. Allah yashirgan narsalarini biluvchidir.",
168: "Ular o‘tirib olib, birodarlari haqida: «Agar bizga itoat qilganlarida, o‘ldirilmagan bo‘lardi», dedilar. Ayting: «Agar rostgo‘y bo‘lsangizlar, o‘limni o‘zingizdan qaytaringlar».",
169: "Allah yo‘lida o‘ldirilganlarni o‘lik deb o‘ylamanglar. Yo‘q! Ular Rablarining huzurida tirikdirlar, rizqlanadilar.",
170: "Allah ularga bergan fazl bilan shoddirlar va ortlaridan hali ularga qo‘shilmaganlar haqida xushxabar qiladilar — ularga qo‘rquv yo‘q va ular g‘amgin bo‘lmaydilar.",
 171: "Ular Allahning ne’mati va fazli bilan shoddirlar va albatta, Allah mo‘minlarning ajrini zoye qilmasligini biladilar.",
172: "Ular yaralanganlaridan keyin ham Allah va payg‘ambarga javob berganlar — ulardan yaxshilik qilgan va taqvo qilganlar uchun ulkan ajr bor.",
173: "Odamlar ularga: «Albatta, odamlar sizlarga qarshi yig‘ildilar, ulardan qo‘rqinglar», deganlarida, bu ularning iymonini ziyoda qildi va dedilar: «Bizga Allah kifoya qiladi va U qanday yaxshi vakildir».",
174: "Bas, ular Allahning ne’mati va fazli bilan qaytdilar — ularga hech qanday yomonlik yetmadi. Ular Allahning roziligiga ergashdilar. Allah ulkan fazl egasidir.",
175: "Bu faqat shaytondir — u o‘z do‘stlarini qo‘rqitadi. Agar mo‘min bo‘lsangizlar, ulardan qo‘rqmanglar, Mendan qo‘rqinglar.",
176: "Kufrga shoshayotganlar seni g‘amgin qilmasin. Albatta, ular Allahga hech zarar yetkaza olmaydilar. Allah ularga oxiratda nasiba bermaslikni xohlaydi va ularga ulkan azob bor.",
177: "Iymonni kufrga almashtirganlar — ular Allahga hech zarar yetkaza olmaydilar. Ular uchun alamli azob bor.",
178: "Kafirlar Biz ularga berayotgan muhlatni o‘zlari uchun yaxshilik deb o‘ylamasinlar. Biz ularga faqat gunohlarini ziyoda qilish uchun muhlat beramiz. Ular uchun xorlovchi azob bor.",
179: "Allah mo‘minlarni sizlar turgan holatda qoldirmaydi — toki nopokni pokdan ajratmaguncha. Allah sizlarga g‘aybni bildirmaydi, lekin payg‘ambarlaridan kimni xohlasa, tanlaydi. Bas, Allahga va Uning payg‘ambarlariga iymon keltiringlar. Agar iymon keltirib, taqvo qilsangizlar, sizlarga ulkan ajr bor.",
180: "Allah O‘z fazlidan bergan narsada baxillik qilganlar bu o‘zlari uchun yaxshi deb o‘ylamasinlar. Yo‘q! Bu ular uchun yomondir. Qiyomat kuni baxillik qilgan narsalari bo‘yinlariga o‘raladi. Osmonlar va yerning merosi Allahnikidir. Allah qilayotgan ishlaringizdan xabardordir.",
181: "Albatta, Allah: «Allah kambag‘al, biz boymiz», deganlarning so‘zini eshitdi. Ularning aytganlarini va payg‘ambarlarni nohaq o‘ldirganlarini yozamiz va deymiz: «Yondiruvchi azobni tatib ko‘ringlar!»",
182: "Bu sizlar qo‘llaringiz bilan oldindan qilgan narsalar sababli. Albatta, Allah bandalarga zulm qiluvchi emas.",
183: "Ular: «Allah bizdan ahd olgan — bizga qurbonlikni olov yeb ketadigan payg‘ambar kelmaguncha iymon keltirmaymiz», dedilar. Ayting: «Mendan oldin sizlarga payg‘ambarlar aniq dalillar va siz aytgan narsa bilan kelgan edi. Agar rostgo‘y bo‘lsangizlar, nega ularni o‘ldirdingizlar?»",
184: "Agar seni yolg‘onchiga chiqarsalar, sendan oldingi payg‘ambarlar ham yolg‘onchiga chiqarilgan — ular aniq dalillar, sahifalar va nurli Kitob bilan kelgan edilar.",
185: "Har bir jon o‘limni tatadi. Albatta, mukofotlaringiz qiyomat kuni to‘liq beriladi. Kim do‘zaxdan uzoqlashtirilib, jannatga kiritilsa — u najot topdi. Dunyo hayoti esa aldov matosidan boshqa narsa emas.",
186: "Albatta, sizlar mol-mulklaringizda va jonlaringizda sinovdan o‘tasizlar va sizlardan oldin Kitob berilganlardan va mushriklardan ko‘p ozor eshitasizlar. Agar sabr qilsangizlar va taqvo qilsangizlar — bu ishlarning azmidir.",
187: "Allah Kitob berilganlardan: «Uni odamlarga albatta bayon qilasizlar va yashirmaysizlar», deb ahd olgan edi. Bas, ular uni orqalariga uloqtirdilar va oz bahoga sotdilar. Sotib olgan narsalari naqadar yomon!",
188: "Qilgan narsalari bilan xursand bo‘lib, qilmagan narsalari bilan maqtanishni yaxshi ko‘rganlarni azobdan najot topadi deb o‘ylamang. Ular uchun alamli azob bor.",
189: "Osmonlar va yer mulki Allahnikidir. Allah har narsaga qodirdir.",
190: "Albatta, osmonlar va yerning yaratilishida, kecha va kunduzning almashinishida aql egalari uchun oyatlar bor.",
191: "Ular turganlarida, o‘tirganlarida va yonboshlab yotganlarida Allahni zikr qiladilar va osmonlar va yerning yaratilishi haqida tafakkur qiladilar: «Rabbimiz! Sen buni bekor yaratmading. Sen poksan. Bizni do‘zax azobidan saqla».",
192: "Rabbimiz! Kimni do‘zaxga kiritsang, uni albatta xor qilding. Zolimlar uchun yordamchilar yo‘q.",
193: "Rabbimiz! Biz bir da’vatchini eshitdik — u iymonga chaqirdi: «Rabbingizga iymon keltiringlar», dedi. Bas, biz iymon keltirdik. Rabbimiz! Gunohlarimizni kechir, yomonliklarimizni o‘chir va bizni yaxshilar bilan birga vafot ettir.",
194: "Rabbimiz! Bizga payg‘ambarlaring orqali va’da qilgan narsangni ber va qiyomat kuni bizni xor qilma. Albatta, Sen va’daga xilof qilmaysan».",
195: "Bas, Rabblari ularga javob berdi: «Albatta, Men sizlardan hech bir amal qiluvchining amalini zoye qilmayman — erkak bo‘lsin, ayol bo‘lsin — sizlar bir-biringizdansizlar. Hijrat qilganlar, yurtlaridan chiqarilganlar, yo‘limda ozor ko‘rganlar, urushganlar va o‘ldirilganlar — albatta, ularning yomonliklarini o‘chiraman va ularni ostidan daryolar oqadigan jannatlarga kiritaman — bu Allah huzuridan mukofotdir. Allah huzurida eng yaxshi mukofot bor».",
196: "Kafirlarning shaharlarda erkin yurishi seni aldamasin.",
197: "Bu ozgina bahramandlik, so‘ng ularning joyi jahannamdir. Qanday yomon joy!",
198: "Lekin Rabblaridan qo‘rqqanlar uchun ostidan daryolar oqadigan jannatlar bor — ular unda abadiy qoladilar — bu Allah huzuridan mehmondir. Allah huzuridagi narsa yaxshilar uchun yaxshiroqdir.",
199: "Albatta, Kitob ahli ichida Allahga, sizlarga nozil qilingan narsaga va ularga nozil qilingan narsaga iymon keltiradiganlar ham bor — ular Allahdan qo‘rqib, oyatlarini oz bahoga sotmaydilar. Ana o‘shalarga Rabblari huzurida ajr bor. Albatta, Allah tez hisob qiluvchidir.",
200: "Ey iymon keltirganlar! Sabr qilinglar, sabrda sobit bo‘linglar, (dushmanga qarshi) tayyor turinglar va Allahdan qo‘rqinglar — shoyad najot topsangizlar.",
  },
 4: {
    1: "Ey insonlar! Sizlarni bir jondan yaratgan, undan uning juftini yaratgan va ikkisidan ko‘p erkak va ayollarni tarqatgan Rabbingizdan qo‘rqinglar. U bilan bir-biringizdan so‘raydigan Allahdan va qarindoshlik rishtalaridan qo‘rqinglar. Albatta, Allah sizlarni kuzatib turuvchidir.",
    2: "Yetimlarga mollari-ni beringlar va pok narsani nopokga almashtirmanglar. Ularning molini o‘z molingizga qo‘shib yemanglar. Bu katta gunohdir.",
    3: "Agar yetim ayollar haqida adolat qilolmaslikdan qo‘rqsangizlar, sizlarga ma’qul bo‘lgan ayollardan ikki, uch yoki to‘rttadan uylaninglar. Agar adolat qilolmaslikdan qo‘rqsangizlar, birta bilan yoki qo‘lingiz ostidagilar bilan. Bu adolatdan og‘maslikka yaqinroqdir.",
    4: "Ayollarga mahrlarini mamnuniyat bilan beringlar. Agar ular undan bir qismini o‘z ixtiyorlari bilan bersalar, uni mamnun bo‘lib yenglar.",
    5: "Aqlsizlarga Allah sizlar uchun tiriklik vositasi qilgan molni bermanglar. Ularni unda boqib-kiyintiringlar va ularga yaxshi so‘z aytinglar.",
    6: "Yetimlarni nikoh yoshiga yetguncha sinab ko‘ringlar. Agar ulardan to‘g‘ri fikr ko‘rsangizlar, mollari-ni ularga topshiringlar. Uni isrof qilib yoki tezda o‘sib ketishidan oldin yemanglar. Kim boy bo‘lsa, o‘zini tiyib tursin. Kim kambag‘al bo‘lsa, ma’lum darajada yesin. Ularga mollari-ni topshirganingizda guvoh tutinglar. Hisob-kitob qiluvchi sifatida Allah kifoyadir.",
    7: "Erkaklarga ota-ona va yaqinlar qoldirgan narsadan ulush bor. Ayollarga ham ota-ona va yaqinlar qoldirgan narsadan ulush bor — oz bo‘lsa ham, ko‘p bo‘lsa ham — belgilangan ulush.",
    8: "Taqsim paytida qarindoshlar, yetimlar va miskinlar hozir bo‘lsa, ularga ham undan berib, yaxshi so‘z aytinglar.",
    9: "O‘zlaridan keyin zaif zurriyot qoldirishdan qo‘rqadiganlar (boshqalarning yetimlari haqida ham) qo‘rqsinlar. Allahdan qo‘rqsinlar va to‘g‘ri so‘z aytsinlar.",
    10: "Yetimlarning molini nohaq yeydiganlar qorinlariga faqat olov yeydilar va ular do‘zaxda yonadilar.",
    11: "Allah sizlarga farzandlaringiz haqida buyuradi: erkakka ikki ayol ulushiga teng. Agar faqat ayollar bo‘lsa, ikki yoki undan ortiq — ularga merosning uchdan ikki qismi. Agar bitta bo‘lsa — unga yarim. Agar marhumning farzandi bo‘lsa, ota-onasining har biriga oltidan bir qismi. Agar farzandi bo‘lmasa va ota-onasi merosxo‘r bo‘lsa — onasiga uchdan bir. Agar aka-uka bo‘lsa — onasiga oltidan bir. (Bu) vasiyat yoki qarzdan keyin. Otalaringiz va farzandlaringiz — qaysi biri sizlarga foydaliroq ekanini bilmaysizlar. Bu Allah tomonidan farzdir. Albatta, Allah biluvchi va hikmatlidir.",
    12: "Sizlarga ayollaringiz qoldirgan narsaning yarmi — agar ularning farzandi bo‘lmasa. Agar farzandi bo‘lsa — sizlarga to‘rtdan bir. Bu vasiyat yoki qarzdan keyin. Ayollarga sizlar qoldirgan narsaning to‘rtdan biri — agar sizlarning farzandingiz bo‘lmasa. Agar farzandingiz bo‘lsa — ularga sakkizdan biri. Bu vasiyat yoki qarzdan keyin. Agar erkak yoki ayol meros qoldirsa va uning ota-onasi yoki farzandi bo‘lmasa, lekin aka-uka yoki opa-singil bo‘lsa — har biriga oltidan bir. Agar ular bundan ko‘p bo‘lsa — uchdan birda sherikdirlar. Bu zarar bermaydigan vasiyat yoki qarzdan keyin. Bu Allah tomonidan buyruqdir. Allah biluvchi va halimdir.",
    13: "Bular Allahning chegaralaridir. Kim Allahga va Uning payg‘ambariga itoat qilsa, Uni ostidan daryolar oqadigan jannatlarga kiritadi — ular unda abadiy qoladilar. Bu ulkan yutuqdir.",
    14: "Kim Allahga va Uning payg‘ambariga itoatsizlik qilsa va Uning chegaralaridan oshsa, Uni do‘zaxga kiritadi — unda abadiy qoladi va unga xorlovchi azob bor.",
    15: "Ayollaringizdan fahsh ish qilganlarga to‘rtta guvoh keltiringlar. Agar guvohlik bersalar, ularni o‘lim olguncha yoki Allah ularga yo‘l qilguncha uyda tutinglar.",
    16: "Sizlardan ikki kishi (shu ishni) qilsa, ularni jazolanglar. Agar tavba qilib, isloh qilsalar, ularni qo‘yib yuboringlar. Albatta, Allah tavbani qabul qiluvchi va Rahmlidir.",
    17: "Allah tavbani faqat bilmay gunoh qilib, so‘ng tezda tavba qilganlarga qabul qiladi. Allah ana o‘shalarning tavbasini qabul qiladi. Allah biluvchi va hikmatlidir.",
    18: "Yomonlik qilib yurib, o‘lim kelganida: «Endi tavba qildim», deydiganlar va kofir bo‘lib o‘lganlar uchun tavba yo‘q. Ana o‘shalarga alamli azob tayyorlab qo‘yilgan.",
    19: "Ey iymon keltirganlar! Sizlarga ayollarni majburlab meros qilib olish halol emas. Ularga bergan narsangizning bir qismini qaytarib olish uchun ularni siqmanglar — faqat ochiq fahsh qilganlaridan mustasno. Ular bilan yaxshi muomala qilinglar. Agar ularni yomon ko‘rsangizlar, balki sizlar yomon ko‘rgan narsada Allah ko‘p yaxshilik qilgandir.",
    20: "Agar bir ayol o‘rniga boshqa ayolni olishni istasangizlar va ulardan biriga katta mol bergan bo‘lsangizlar ham, undan hech narsa olmanglar. Uni tuhmat va ochiq gunoh bilan olasizlarmi?",
    21: "Qanday qilib uni olasizlar, holbuki bir-biringiz bilan yaqin bo‘lgansizlar va ular sizlardan mustahkam ahd olganlar?",
    22: "Otalaringiz uylangan ayollarga uylanmanglar — faqat o‘tgan narsa mustasno. Albatta, bu fahsh, yomon va yomon yo‘ldir.",
    23: "Sizlarga onalaringiz, qizlaringiz, opa-singillaringiz, ammalaringiz, xolalaringiz, aka-ukalaringizning qizlari, opa-singillaringizning qizlari, sizlarni emizgan onalaringiz, emikdosh opa-singillaringiz, xotinlaringizning onalari, o‘z uylaringizda tarbiyalangan xotinlaringizdan bo‘lgan qizlari — agar ularning onalari bilan yaqin bo‘lgan bo‘lsangizlar — harom qilindi. Agar yaqin bo‘lmagan bo‘lsangizlar, gunoh yo‘q. O‘z belingizdan bo‘lgan o‘g‘illaringizning xotinlari va ikki opa-singilni birga olish ham harom — faqat o‘tgan narsa mustasno. Albatta, Allah kechiruvchi va Rahmlidir.",
    24: "Va turmush qurgan ayollar ham (harom) — faqat qo‘lingiz ostidagilar mustasno. Bu Allahning sizlarga yozganidir. Bundan boshqasi sizlarga halol — poklikni istab, zinodan emas, mollaringiz bilan izlab topasizlar. Ular bilan foydalanganingiz uchun ularga mahrlarini farz qilib beringlar. Farzdan keyin o‘zaro kelishgan narsangizda sizlarga gunoh yo‘q. Albatta, Allah biluvchi va hikmatlidir.",
    25: "Kim sizlardan ozod mo‘mina ayollarga uylanishga kuchi yetmasa, qo‘lingiz ostidagi mo‘mina kanizlardan uylansin. Allah iymoningizni yaxshiroq biladi. Sizlar bir-biringizdansizlar. Ularni egalarining ruxsati bilan uylanglar va mahrlarini yaxshi tarzda beringlar — pok bo‘lgan, zino qilmaydigan va yashirin do‘st tutmaydigan bo‘lsinlar. Agar ular turmushga chiqqandan keyin fahsh ish qilsalar, ularga ozod ayollarning azobining yarmi bor. Bu sizlardan zinodan qo‘rqadiganlar uchundir. Sabr qilsangizlar, sizlar uchun yaxshiroqdir. Allah kechiruvchi va Rahmlidir.",
    26: "Allah sizlarga bayon qilishni, sizlardan oldingilarning yo‘llariga hidoyat qilishni va tavbangizni qabul qilishni xohlaydi. Allah biluvchi va hikmatlidir.",
    27: "Allah sizlarning tavbangizni qabul qilishni xohlaydi. Nafslarga ergashganlar esa sizlarning katta og‘ishga ketishingizni xohlaydilar.",
    28: "Allah sizlardan yengillikni xohlaydi. Inson zaif yaratilgan.",
    29: "Ey iymon keltirganlar! Mollaringizni o‘zaro nohaq yemanglar — faqat o‘zaro rozi bo‘lgan savdo bundan mustasno. O‘zingizni o‘ldirmanglar. Albatta, Allah sizlarga Rahmlidir.",
    30: "Kim buni tajovuz va zulm bilan qilsa — Biz uni olovga kiritamiz. Bu Allah uchun osondir.",
    31: "Agar sizlarga man qilingan katta gunohlardan chetlansangizlar, yomonliklaringizni o‘chirib yuboramiz va sizlarni hurmatli joyga kiritamiz.",
32: "Allah ba’zilaringizni boshqalardan ustun qilgan narsaga hasad qilmanglar. Erkaklar uchun o‘z mehnatlaridan ulush bor, ayollar uchun ham o‘z mehnatlaridan ulush bor. Allahdan Uning fazlini so‘ranglar. Albatta, Allah har narsani biluvchidir.",
33: "Har bir inson uchun ota-ona va qarindoshlar qoldirgan narsadan merosxo‘rlar tayin qildik. Sizlar bilan ahd qilganlarga ham ulushlarini beringlar. Albatta, Allah har narsaga guvohdir.",
34: "Erkaklar ayollar ustidan mas’uldirlar — Allah ba’zilarini boshqalardan ustun qilgani va ular mol sarflaganlari sababli. Soliha ayollar itoatkor va erlari yo‘qligida Allah saqlashni buyurgan narsani saqlaydilar. Itoatsizlikdan qo‘rqgan ayollarga nasihat qilinglar, ularni yotoqda ajratinglar va (yengil) uringlar. Agar itoat qilsalar, ularga qarshi yo‘l izlamanglar. Albatta, Allah oliy va buyukdir.",
35: "Agar er-xotin orasida ajralishdan qo‘rqsangizlar, uning tomonidan bir hakam va uning tomonidan bir hakam yuboringlar. Agar ular yarashtirishni istasalar, Allah ularning orasini isloh qiladi. Albatta, Allah biluvchi va xabardordir.",
36: "Allahga ibodat qilinglar va Unga hech narsani sherik qilmanglar. Ota-onaga yaxshilik qilinglar, qarindoshlarga, yetimlarga, miskinlarga, yaqin qo‘shniga, uzoq qo‘shniga, yoningizdagi do‘stga, musofirga va qo‘lingiz ostidagilarga ham. Albatta, Allah kibrli va maqtanchoqni sevmaydi.",
37: "Ular baxillik qiladilar va odamlarni ham baxillikka buyuradilar hamda Allah ularga bergan fazlni yashiradilar. Biz kofirlarga xorlovchi azob tayyorlab qo‘yganmiz.",
38: "Ular molini odamlarga ko‘rsatish uchun sarflaydilar va Allahga ham, oxirat kuniga ham iymon keltirmaydilar. Kimning do‘sti shayton bo‘lsa — u qanday yomon do‘st!",
39: "Agar ular Allahga va oxirat kuniga iymon keltirib, Allah bergan narsalardan sarflaganlarida edi, ularga nima zarar edi? Allah ularni biluvchidir.",
40: "Albatta, Allah zarra miqdoricha ham zulm qilmaydi. Agar yaxshilik bo‘lsa, uni ko‘paytiradi va O‘z huzuridan ulkan ajr beradi.",
41: "Har bir ummatdan bir guvoh keltirib, seni ularga guvoh qilib keltirganimizda qanday bo‘ladi?",
42: "O‘sha kuni kufr keltirgan va payg‘ambarga itoatsizlik qilganlar yer bilan tekis bo‘lishni xohlardilar va Allahdan hech bir gapni yashira olmaydilar.",
43: "Ey iymon keltirganlar! Mast bo‘lgan holda — nima deyayotganingizni bilmaguningizcha — namozga yaqinlashmanglar. Junub holatda ham — yuvinmaguningizcha — (yaqinlashmanglar), faqat yo‘ldan o‘tuvchi bo‘lsangizlar bundan mustasno. Agar kasal bo‘lsangizlar yoki safarda bo‘lsangizlar yoki hojatdan kelgan bo‘lsangizlar yoki ayollarga tegib, suv topa olmasangizlar, pok tuproq bilan tayammum qilinglar — yuzlaringizni va qo‘llaringizni silanglar. Albatta, Allah afv qiluvchi va kechiruvchidir.",
44: "Kitobdan nasiba berilganlarni ko‘rmadingmi? Ular adashishni sotib olib, sizlarni ham yo‘ldan ozdirishni xohlaydilar.",
45: "Allah dushmanlaringizni yaxshiroq biladi. Allah yetarli do‘st va yetarli yordamchidir.",
46: "Yahudiylardan ba’zilari so‘zlarni joyidan o‘zgartiradilar va: «Eshitdik va itoatsizlik qildik», «Eshit, eshitilmasin», «Ro‘ina», deydilar — tillarini burib va dinni masxara qilib. Agar ular: «Eshitdik va itoat qildik», «Eshit» va «Unzurna» deganlarida edi, bu ular uchun yaxshiroq va to‘g‘riroq bo‘lardi. Lekin Allah ularni kufrlari sabab la’natladi — bas, ular ozgina iymon keltiradilar.",
47: "Ey Kitob berilganlar! Yuzlarni o‘zgartirib, orqaga qaytarmasimizdan oldin yoki ularni la’natlab, shanba egalarini la’natlaganimiz kabi la’natlashimizdan oldin sizlar bilan birga bo‘lgan narsani tasdiqlovchi qilib nozil qilgan narsaga iymon keltiringlar. Allahning amri albatta amalga oshadi.",
48: "Albatta, Allah O‘ziga shirk keltirilishini kechirmaydi. Bundan boshqasini esa xohlagan kishaga kechiradi. Kim Allahga shirk keltirsa — u katta gunoh to‘qigan bo‘ladi.",
49: "O‘zlarini poklaydiganlarni ko‘rmadingmi? Yo‘q! Allah xohlagan kishani poklaydi va ularga zarra ham zulm qilinmaydi.",
50: "Qara, ular qanday qilib Allahga yolg‘on to‘qiydilar! Bu ochiq gunoh sifatida yetarlidir.",
51: "Kitobdan nasiba berilganlarni ko‘rmadingmi? Ular jibt va tag‘utga iymon keltiradilar va kofirlar haqida: «Bular mo‘minlardan ko‘ra to‘g‘ri yo‘lda», deydilar.",
52: "Ana o‘shalar — Allah la’natlaganlardir. Allah kimni la’natlasa, unga yordamchi topa olmaysan.",
53: "Yoki ular mulkdan ulushga egami? Unday bo‘lsa, odamlarga hatto danakdagi nuqta ham bermaydilar.",
54: "Yoki ular odamlarni Allah ularga O‘z fazlidan bergan narsaga hasad qiladilarmi? Biz Ibrohim oilasiga Kitob va hikmat berdik va ularga katta mulk berdik.",
55: "Ulardan ba’zilari unga iymon keltirdi, ba’zilari esa yuz o‘girdi. Jahannam yetarli alangadir.",
56: "Albatta, oyatlarimizga kufr keltirganlarni olovga kiritamiz. Terilari kuyib bitganda, azobni tatib turishlari uchun ularni boshqa terilar bilan almashtiramiz. Albatta, Allah Aziz va Hikmatlidir.",
57: "Iymon keltirib, solih amallar qilganlarni esa ostidan daryolar oqadigan jannatlarga kiritamiz — ular unda abadiy qoladilar. Ular uchun pok juftlar bor va ularni salqin soyaga kiritamiz.",
58: "Albatta, Allah sizlarga omonatlarni egalariga topshirishni va odamlar o‘rtasida hukm qilganingizda adolat bilan hukm qilishni buyuradi. Albatta, Allah sizlarga qanday yaxshi nasihat qiladi! Albatta, Allah eshituvchi va ko‘ruvchidir.",
59: "Ey iymon keltirganlar! Allahga itoat qilinglar, payg‘ambarga itoat qilinglar va o‘zingizdan bo‘lgan amirlariga ham. Agar biror narsada tortishsangizlar, agar Allahga va oxirat kuniga iymon keltirgan bo‘lsangizlar, uni Allahga va payg‘ambarga qaytaringlar. Bu yaxshiroq va natija jihatidan chiroyliroqdir.",
60: "Senga nozil qilingan narsaga va sendan oldin nozil qilingan narsaga iymon keltirdik deb o‘ylaganlarni ko‘rmadingmi? Ular hukmni tag‘utga olib borishni xohlaydilar, holbuki unga kufr keltirishga buyurilgan edilar. Shayton esa ularni uzoq adashtirishni xohlaydi.",
 61: "Ularga: «Allah nozil qilgan narsaga va payg‘ambarga kelinglar», deyilganda, munofiqlarning sendan butunlay yuz o‘girayotganini ko‘rasan.",
62: "Qo‘llari qilgan narsalari sabab ularga musibat yetganda qanday bo‘ladi? So‘ng oldingga kelib: «Biz faqat yaxshilik va yarashtirishni istadik», deb Allah bilan qasam ichadilar.",
63: "Ular — Allah qalblaridagini biladiganlardir. Bas, ulardan yuz o‘gir, ularga nasihat qil va o‘zlari haqida ta’sirli so‘z ayt.",
64: "Biz har bir payg‘ambarni faqat Allahning izni bilan itoat qilinishi uchun yubordik. Agar ular o‘zlariga zulm qilganlarida senga kelib, Allahdan mag‘firat so‘rasalar va payg‘ambar ham ular uchun mag‘firat so‘rasa, albatta, Allahni tavbani qabul qiluvchi va Rahmli topardilar.",
65: "Yo‘q! Rabbingga qasamki, ular o‘zaro chiqqan tortishuvlarda seni hakam qilmagunlaricha, so‘ng hukmingdan ichlarida torlik topmay, to‘liq taslim bo‘lmagunlaricha iymon keltirmaydilar.",
66: "Agar Biz ularga: «O‘zingizni o‘ldiringlar yoki yurtlaringizdan chiqinglar», deb yozganimizda, ozchiligidan boshqasi buni qilmagan bo‘lardi. Agar ularga berilgan nasihatni bajarganlarida edi, bu ular uchun yaxshiroq va iymonlarini mustahkam qiluvchi bo‘lardi.",
67: "Va albatta, ularga O‘z huzurimizdan ulkan ajr berardik.",
68: "Va albatta, ularni to‘g‘ri yo‘lga hidoyat qilardik.",
69: "Kim Allahga va payg‘ambarga itoat qilsa, ana o‘shalar Allah ne’mat berganlar — payg‘ambarlar, siddiqlar, shahidlar va solihlar bilan birgadirlar. Ular qanday yaxshi hamrohlardir!",
70: "Bu Allahning fazlidir. Allah biluvchi sifatida kifoyadir.",
71: "Ey iymon keltirganlar! Ehtiyot choralarini ko‘ringlar — guruh-guruh bo‘lib chiqinglar yoki barchangiz birga chiqinglar.",
72: "Sizlardan shundayi bor-ki, albatta ortda qoladi. Agar sizlarga musibat yetsa: «Allah menga marhamat qildi, men ular bilan bo‘lmadim», deydi.",
73: "Agar Allahdan sizlarga fazl yetsa, go‘yo sizlar bilan uning o‘rtasida do‘stlik bo‘lmagandek: «Qani edi men ham ular bilan bo‘lganimda edi, ulkan g‘alabaga erishgan bo‘lardim», deydi.",
74: "Bas, dunyo hayotini oxiratga sotadiganlar Allah yo‘lida urushsinlar. Kim Allah yo‘lida urushib o‘ldirilsa yoki g‘alaba qilsa — Biz unga ulkan ajr beramiz.",
75: "Sizlarga nima bo‘ldi — Allah yo‘lida va: «Rabimiz! Bizni zolim aholidan chiqar, bizga O‘zingdan do‘st va yordamchi ber», deydigan zaif erkaklar, ayollar va bolalar uchun urushmaysizlar?",
76: "Iymon keltirganlar Allah yo‘lida urushadilar. Kufr keltirganlar esa tag‘ut yo‘lida urushadilar. Bas, shayton do‘stlariga qarshi urushinglar. Albatta, shaytonning makri zaifdir.",
77: "Ularga: «Qo‘llaringizni tiyib turinglar, namozni ado qilinglar va zakot beringlar», deyilganlarni ko‘rmadingmi? So‘ng ularga urush farz qilingach, ulardan bir guruhi odamlardan xuddi Allahdan qo‘rqqandek yoki undan ham qattiqroq qo‘rqdi va dedilar: «Rabimiz! Nega bizga urushni yozding? Bizni yaqin muddatgacha kechiktirmadingmi?» Ayting: «Dunyo matosi ozdir, oxirat esa taqvodorlar uchun yaxshiroqdir. Sizlarga zarra ham zulm qilinmaydi».",
78: "Qayerda bo‘lsangizlar ham, o‘lim sizlarni topadi — hatto mustahkam qal’alarda bo‘lsangizlar ham. Agar ularga yaxshilik yetsa: «Bu Allahdandir», deydilar. Agar yomonlik yetsa: «Bu sendandir», deydilar. Ayting: «Hammasi Allahdandir». Bu qavmga nima bo‘ldi — deyarli hech narsani tushunmaydilar?",
79: "Senga yetgan har qanday yaxshilik — Allahdandir. Senga yetgan har qanday yomonlik — o‘zingdandir. Seni odamlarga payg‘ambar qilib yubordik. Allah guvoh sifatida kifoyadir.",
80: "Kim payg‘ambarga itoat qilsa — Allahga itoat qilgan bo‘ladi. Kim yuz o‘girsa — Biz seni ularning ustidan qo‘riqchi qilib yubormadik.",
81: "Ular: «Itoat qildik», deydilar. Sendan chiqib ketgach, ulardan bir guruhi kechasi sen aytganingga zid narsani o‘ylaydi. Allah ularning kechasi o‘ylaganlarini yozib boradi. Bas, ulardan yuz o‘gir va Allahga tavakkul qil. Allah vakil sifatida kifoyadir.",
82: "Ular Qur’on haqida tafakkur qilmaydilarmi? Agar u Allahdan boshqasidan bo‘lganida, unda ko‘p ixtilof topgan bo‘lardilar.",
83: "Ularga xavfsizlik yoki qo‘rquv haqida bir xabar kelsa, uni yoyib yuboradilar. Agar uni payg‘ambarga va o‘zlaridan bo‘lgan mas’ullarga qaytarganlarida edi, uni to‘g‘ri tushunadiganlar bilib olgan bo‘lardilar. Agar sizlarga Allahning fazli va rahmati bo‘lmaganida edi, ozchiligingizdan boshqangiz shaytonga ergashgan bo‘lardingizlar.",
84: "Bas, Allah yo‘lida urush. Sen faqat o‘zing uchun javobgarsan. Mo‘minlarni rag‘batlantir. Balki Allah kofirlarning kuchini to‘xtatar. Allahning kuchi kuchliroq va jazosi qattiqroqdir.",
85: "Kim yaxshi shafoat qilsa, undan nasiba oladi. Kim yomon shafoat qilsa, undan ham nasiba oladi. Allah har narsani kuzatib turuvchidir.",
86: "Agar sizlarga salom berilsa, undan yaxshiroq bilan javob beringlar yoki o‘shasini qaytaringlar. Albatta, Allah har narsani hisob qiluvchidir.",
87: "Allah — Undan boshqa iloh yo‘q. Albatta, sizlarni qiyomat kunida jamlaydi — unda shubha yo‘q. Allahdan ko‘ra kim so‘zda rostgo‘y?",
88: "Sizlarga nima bo‘ldi — munofiqlar haqida ikki guruh bo‘lib qoldingizlar? Holbuki Allah ularni qilganlari sababli ortga qaytardi. Allah adashtirgan kishini hidoyat qilmoqchimisiz? Allah kimni adashtirsa, unga yo‘l topa olmaysan.",
89: "Ular sizlar ham o‘zlari kabi kufr keltirib, teng bo‘lishingizni xohlaydilar. Bas, ular Allah yo‘lida hijrat qilmaguncha ularni do‘st tutmanglar. Agar yuz o‘girsalar, ularni topgan joyingizda tutinglar va o‘ldiringlar. Ulardan do‘st ham, yordamchi ham tutmanglar.",
90: "Magar sizlar bilan ular o‘rtasida ahd bo‘lgan qavmga qo‘shilganlar yoki sizlar bilan urushishga ham, o‘z qavmlari bilan urushishga ham ko‘ngillari siqilib kelganlar bundan mustasno. Agar Allah xohlasa edi, ularni sizlarga qarshi kuchli qilgan bo‘lardi va ular sizlar bilan urushgan bo‘lardilar. Agar sizlardan chetga chiqib, sizlar bilan urushmay, sizlarga sulh taklif qilsalar — Allah sizlarga ularga qarshi yo‘l bermaydi.",
91: "Sizlar yana boshqalarni topasizlar — ular sizlardan ham, o‘z qavmlaridan ham omon bo‘lishni xohlaydilar. Har safar fitnaga qaytarilsalar, unga bosh qo‘shadilar. Agar sizlardan chetga chiqmasalar, sizlarga sulh taklif qilmasalar va qo‘llarini tiyib turmasalar — ularni topgan joyingizda tutinglar va o‘ldiringlar. Ana o‘shalarga qarshi sizlarga aniq hujjat berdik.",
92: "Mo‘min uchun boshqa mo‘minni o‘ldirish joiz emas — faqat xato bilan bundan mustasno. Kim mo‘minni xato bilan o‘ldirsa, mo‘min bir qulni ozod qilishi va o‘ldirilganning oilasiga diyat berishi lozim — agar ular kechmasa. Agar u mo‘min bo‘lib, sizlarga dushman qavmdan bo‘lsa — mo‘min bir qulni ozod qilish kifoya. Agar sizlar bilan ular o‘rtasida ahd bo‘lgan qavmdan bo‘lsa — oilasiga diyat berish va mo‘min bir qulni ozod qilish lozim. Kim topa olmasa — ikki oy ketma-ket ro‘za tutadi. Bu Allahdan tavbadir. Allah biluvchi va hikmatlidir.",
93: "Kim mo‘minni qasddan o‘ldirsa — uning jazosi jahannamdir — unda abadiy qoladi. Allah unga g‘azab qiladi, uni la’natlaydi va unga ulkan azob tayyorlab qo‘yadi.",
94: "Ey iymon keltirganlar! Allah yo‘lida chiqqaningizda aniqlab ko‘ringlar. Sizlarga salom bergan kishiga: «Sen mo‘min emassan», demanglar — dunyo hayotining o‘tkinchi manfaatini istab. Allah huzurida ko‘p o‘ljalar bor. Ilgari sizlar ham shunday edingizlar, so‘ng Allah sizlarga ne’mat berdi. Bas, aniqlab ko‘ringlar. Albatta, Allah qilayotgan ishlaringizdan xabardordir.",
95: "Mo‘minlardan uzrli bo‘lmagan holda o‘tirganlar bilan Allah yo‘lida moli va jonlari bilan jihod qilganlar teng emas. Allah moli va jonlari bilan jihod qilganlarni daraja jihatidan o‘tirganlardan ustun qildi. Har ikkisiga ham yaxshi (mukofot) va’da qildi, lekin jihod qilganlarni o‘tirganlardan ulkan ajr bilan ustun qildi.",
96: "Undan darajalar, mag‘firat va rahmat bor. Allah kechiruvchi va Rahmlidir.",
97: "O‘zlariga zulm qilgan holda jonlarini olgan malaikalar ularga dedilar: «Nima holatda edingizlar?» Ular: «Biz yerda zaif edik», dedilar. (Malaikalar) dedilar: «Allahning yeri keng emasmi edi, unda hijrat qilsangizlar bo‘lmasmidi?» Ana o‘shalarning joyi jahannamdir. Qanday yomon joy!",
98: "Magar erkaklardan, ayollardan va bolalardan zaif bo‘lgan, yo‘l topa olmaydigan va hidoyat topa olmaydiganlar bundan mustasno.",
99: "Ana o‘shalarni Allah afv qilishi mumkin. Allah afv qiluvchi va kechiruvchidir.",
100: "Kim Allah yo‘lida hijrat qilsa, yerda ko‘p panoh va kenglik topadi. Kim uyidan chiqib Allah va Uning payg‘ambariga hijrat qilib, so‘ng unga o‘lim yetsa — uning ajri Allah zimmasiga tushadi. Allah kechiruvchi va Rahmlidir.",
101: "Yerda safarda bo‘lsangizlar, agar kofirlar sizlarga zarar yetkazishidan qo‘rqsangizlar, namozni qisqartirishingizda sizlarga gunoh yo‘q. Albatta, kofirlar sizlarga ochiq dushmandir.",
102: "Sen ular orasida bo‘lib, ularga namoz o‘qitganingda, ulardan bir guruhi sen bilan tursin va qurollarini olsin. Sajda qilganlarida, orqangizda bo‘lsinlar. So‘ng namoz o‘qimagan boshqa guruhi kelib sen bilan o‘qisinlar va ehtiyot choralarini hamda qurollarini olsinlar. Kofirlar sizlarning qurollaringizdan va yuklaringizdan g‘ofil bo‘lishingizni istaydilar, toki birdaniga sizlarga bostirib kelsinlar. Agar sizlarga yomg‘ir azobi yoki kasallik bo‘lsa, qurollarni qo‘yishingizda gunoh yo‘q, lekin ehtiyot choralarini ko‘ringlar. Albatta, Allah kofirlar uchun xorlovchi azob tayyorlab qo‘ygan.",
103: "Namozni tugatganingizdan keyin turib, o‘tirib va yonboshlab yotgan holda Allahni zikr qilinglar. Xotirjam bo‘lganingizda namozni to‘kis ado qilinglar. Albatta, namoz mo‘minlarga belgilangan vaqt bilan farz qilingan.",
104: "Dushman qavmni ta’qib qilishda sustlashmanglar. Agar sizlar og‘riq chekayotgan bo‘lsangizlar, ular ham xuddi sizlar kabi og‘riq chekadilar. Sizlar esa Allahdan ular umid qilmaydigan narsani umid qilasizlar. Allah biluvchi va hikmatlidir.",
105: "Albatta, Biz senga Kitobni haqiqat bilan nozil qildik — odamlar o‘rtasida Allah ko‘rsatgan narsa bilan hukm qilishing uchun. Xiyonatkorlar tarafdori bo‘lma.",
106: "Allahdan mag‘firat so‘ra. Albatta, Allah kechiruvchi va Rahmlidir.",
107: "O‘zlariga xiyonat qiladiganlar uchun tortishma. Albatta, Allah xiyonatkor, gunohkorni sevmaydi.",
108: "Ular odamlardan yashiradilar, lekin Allahdan yashira olmaydilar. U ular bilan — ular Allah rozi bo‘lmaydigan so‘zlarni kechasi o‘ylaganlarida ham birgadir. Allah ularning qilayotgan ishlarini qamrab oluvchidir.",
109: "Mana sizlar — dunyo hayotida ular uchun tortishdingizlar. Qiyomat kuni ular uchun kim Allah bilan tortishadi yoki kim ularning vakili bo‘ladi?",
110: "Kim yomonlik qilsa yoki o‘ziga zulm qilsa, so‘ng Allahdan mag‘firat so‘rasa — Allahni kechiruvchi va Rahmli topadi.",
111: "Kim gunoh qilsa — uni faqat o‘ziga qarshi qiladi. Allah biluvchi va hikmatlidir.",
112: "Kim xato yoki gunoh qilib, so‘ng uni begunoh kishiga yuklasa — u tuhmat va ochiq gunohni ko‘targan bo‘ladi.",
113: "Agar Allahning senga fazli va rahmati bo‘lmaganida edi, ulardan bir guruhi seni adashtirishni xohlagan bo‘lardi. Ular faqat o‘zlarini adashtiradilar va senga hech zarar yetkaza olmaydilar. Allah senga Kitobni, hikmatni nozil qildi va bilmagan narsangni o‘rgatdi. Allahning senga fazli ulkandir.",
114: "Ularning ko‘p yashirin suhbatlarida yaxshilik yo‘q — faqat sadaqa buyurgan, yaxshilikni buyurgan yoki odamlar orasini isloh qilgan bundan mustasno. Kim buni Allahning roziligini istab qilsa — Biz unga ulkan ajr beramiz.",
115: "Kim hidoyat aniq bo‘lgandan keyin payg‘ambarga qarshi chiqsa va mo‘minlar yo‘lidan boshqa yo‘lga ergashsa — Biz uni o‘sha yo‘liga tashlab qo‘yamiz va jahannamga kiritamiz. Qanday yomon joy!",
116: "Albatta, Allah O‘ziga shirk keltirilishini kechirmaydi. Bundan boshqasini esa xohlagan kishaga kechiradi. Kim Allahga shirk keltirsa — u uzoq adashgan bo‘ladi.",
117: "Ular Undan boshqa faqat ayol (butlar)ga sig‘inadilar va faqat itoatsiz shaytonga sig‘inadilar.",
118: "Allah uni la’natladi. U dedi: «Albatta, bandalaringdan ma’lum ulushni olaman».",
119: "«Albatta, ularni adashtiraman, orzular bilan aldab qo‘yaman, ularga buyuraman — ular chorvalarning quloqlarini kesadilar, ularga buyuraman — ular Allah yaratgan narsani o‘zgartiradilar». Kim Allah o‘rniga shaytonni do‘st tutsa — u ochiq ziyon ko‘rgan bo‘ladi.",
120: "U ularga va’da beradi va ularni orzular bilan aldab qo‘yadi. Shayton ularga faqat aldov va’da qiladi.",
121: "Ana o‘shalarning joyi jahannamdir. Ular undan qochadigan joy topa olmaydilar.",
122: "Iymon keltirib, solih amallar qilganlarni esa ostidan daryolar oqadigan jannatlarga kiritamiz — ular unda abadiy qoladilar. Allahning va’dasi haqdir. Allahdan ko‘ra kim so‘zda rostgo‘y?",
123: "Bu sizlarning orzularingiz bilan ham, Kitob ahlining orzulari bilan ham emas. Kim yomonlik qilsa, jazolanadi va o‘zi uchun Allahdan boshqa do‘st ham, yordamchi ham topa olmaydi.",
124: "Kim mo‘min bo‘lgan holda solih amallar qilsa — erkak bo‘lsin, ayol bo‘lsin — ana o‘shalar jannatga kiradilar va ularga zarra ham zulm qilinmaydi.",
125: "Kim din jihatidan yaxshiroq — o‘zini Allahga topshirib, yaxshilik qilgan va hanif bo‘lgan Ibrohim diniga ergashgan kishidan yaxshiroq? Allah Ibrohimni do‘st qilib oldi.",
126: "Osmonlar va yerdagi barcha narsa Allahnikidir. Allah har narsani qamrab oluvchidir.",
127: "Sizdan ayollar haqida fatvo so‘rashadi. Ayting: «Allah sizlarga ular haqida fatvo beradi va sizlarga Kitobda o‘qilayotgan narsalar ham — yetim ayollar haqida, sizlar ularga yozilgan narsani bermay, ularni nikohlashni xohlaganlar haqida, zaif bolalar haqida va yetimlarga adolat qilish haqida (fatvo beradi)». Qanday yaxshilik qilsangizlar — albatta, Allah uni biladi.",
128: "Agar bir ayol eridan sovuqlik yoki yuz o‘girishdan qo‘rqsa, ular o‘zaro yarashsalar — bu yaxshidir. Yarashish yaxshiroqdir. Nafslarga baxillik yaqin. Agar yaxshilik qilsangizlar va taqvo qilsangizlar — albatta, Allah qilayotgan ishlaringizdan xabardordir.",
129: "Ayollar orasida adolat qilishga qanchalik harakat qilsangizlar ham, to‘liq qila olmaysizlar. Bas, biriga butunlay og‘ib ketmanglar — boshqasini osilib qolgan holatda qoldirmanglar. Agar isloh qilsangizlar va taqvo qilsangizlar — albatta, Allah kechiruvchi va Rahmlidir.",
130: "Agar ular ajrashsalar, Allah har birini O‘z kengligidan boy qiladi. Allah keng va hikmatlidir.",
131: "Osmonlar va yerdagi barcha narsa Allahnikidir. Sizlardan oldin Kitob berilganlarga ham, sizlarga ham: «Allahdan qo‘rqinglar», deb vasiyat qildik. Agar kufr keltirsangizlar ham, osmonlar va yerdagi barcha narsa Allahnikidir. Allah behojat va hamdga loyiqdir.",
132: "Osmonlar va yerdagi barcha narsa Allahnikidir. Allah vakil sifatida kifoyadir.",
133: "Ey insonlar! Agar xohlasa, sizlarni yo‘q qilib, boshqalarni keltiradi. Allah bunga qodirdir.",
134: "Kim dunyo mukofotini istasa — Allah huzurida dunyo va oxirat mukofoti bor. Allah eshituvchi va ko‘ruvchidir.",
135: "Ey iymon keltirganlar! Adolatni mustahkam tutuvchilar bo‘linglar — o‘zingizga, ota-onangizga yoki qarindoshlaringizga qarshi bo‘lsa ham, Allah uchun guvohlik beruvchilar bo‘linglar. Boy yoki kambag‘al bo‘lsa ham — Allah ularga yaqinroqdir. Bas, adolatdan og‘maslik uchun nafsga ergashmanglar. Agar og‘dirsangizlar yoki yuz o‘girsangizlar — albatta, Allah qilayotgan ishlaringizdan xabardordir.",
136: "Ey iymon keltirganlar! Allahga, Uning payg‘ambariga, U nozil qilgan Kitobga va undan oldin nozil qilgan Kitobga iymon keltiringlar. Kim Allahga, malaikalariga, kitoblariga, payg‘ambarlariga va oxirat kuniga kufr keltirsa — u uzoq adashgan bo‘ladi.",
137: "Albatta, iymon keltirib, so‘ng kufr keltirib, yana iymon keltirib, yana kufr keltirib, so‘ng kufrlarini ziyoda qilganlar — Allah ularni kechirmaydi va to‘g‘ri yo‘lga hidoyat qilmaydi.",
138: "Munofiqlarga alamli azob xushxabarini ber.",
139: "Ular mo‘minlarni qo‘yib, kofirlarni do‘st tutadilar. Ular huzurida izzat izlaydilarmi? Albatta, barcha izzat Allahnikidir.",
140: "U sizlarga Kitobda: «Allahning oyatlari inkor qilinib, masxara qilinayotganini eshitganingizda, boshqa gapga o‘tmaguncha ular bilan o‘tirmanglar. Aks holda, sizlar ham ular kabisizlar», deb nozil qildi. Albatta, Allah munofiqlar va kofirlarni jahannamda jamlaydi.",
141: "Ular sizlarni kuzatib turadilar. Agar sizlarga Allahdan g‘alaba yetsa: «Biz sizlar bilan emas edikmi?» deydilar. Agar kofirlarga ulush bo‘lsa: «Biz sizlarni himoya qilmadikmi va sizlarni mo‘minlardan saqlamadikmi?» deydilar. Allah qiyomat kuni o‘rtangizda hukm qiladi. Allah kofirlarga mo‘minlar ustidan yo‘l bermaydi.",
142: "Munofiqlar Allahni aldamoqchi bo‘ladilar, holbuki U ularni aldab qo‘yadi. Namozga turganlarida erinib turadilar, odamlarga ko‘rsatadilar va Allahni kam eslaydilar.",
143: "Ular bu bilan o‘rtada sarson — na bularga, na ularga. Kimni Allah adashtirsa — unga yo‘l topa olmaysan.",
144: "Ey iymon keltirganlar! Mo‘minlarni qo‘yib, kofirlarni do‘st tutmanglar. Allahga o‘zingizga qarshi ochiq hujjat bermoqchimisizlar?",
145: "Albatta, munofiqlar do‘zaxning eng past darajasidadirlar va ular uchun yordamchi topa olmaysan.",
146: "Magar tavba qilganlar, isloh qilganlar, Allahga yopishganlar va dinlarini faqat Allah uchun qilganlar bundan mustasno. Ana o‘shalar mo‘minlar bilan birgadirlar. Allah mo‘minlarga ulkan ajr beradi.",
147: "Agar shukr qilsangizlar va iymon keltirsangizlar, Allah sizlarga azob berib nima qiladi? Allah shukr qiluvchini qadrlovchi va biluvchidir.",
148: "Allah yomon so‘zni oshkora aytishni yoqtirmaydi — faqat zulm ko‘rgan bundan mustasno. Allah eshituvchi va biluvchidir.",
149: "Agar yaxshilikni oshkor qilsangizlar yoki uni yashirsangizlar yoki yomonlikni kechirsangizlar — albatta, Allah afv qiluvchi va qodirdir.",
150: "Albatta, Allahga va Uning payg‘ambarlariga kufr keltirib, Allah bilan payg‘ambarlarini ajratmoqchi bo‘lganlar va: «Ba’zilariga iymon keltiramiz, ba’zilariga kufr keltiramiz», deydiganlar va o‘rtada yo‘l tutmoqchi bo‘lganlar —",
 151: "Ana o‘shalar haqiqiy kofirlardir. Biz kofirlar uchun xorlovchi azob tayyorlab qo‘yganmiz.",
152: "Allahga va Uning payg‘ambarlariga iymon keltirganlar va ularning birortasini ajratmaganlar — ana o‘shalarga (Allah) mukofotlarini beradi. Allah kechiruvchi va Rahmlidir.",
153: "Kitob ahli sendan osmondan kitob tushirishingni so‘raydilar. Ular Musodan bundan ham kattaroq narsani so‘raganlar: «Bizga Allahni ochiq ko‘rsat», deganlar. Bas, zulmlari sababli ularni chaqmoq urdi. So‘ng aniq dalillar kelganidan keyin buzoqqa sig‘indilar. Biz buni ham kechirdik va Musoga aniq dalil berdik.",
154: "Ularning ustiga Tur tog‘ini ko‘tardik — ahdlari sababli — va ularga: «Eshikdan sajda qilib kiringlar», dedik. Yana ularga: «Shanba kuni haddan oshmanglar», dedik va ulardan mustahkam ahd oldik.",
155: "Bas, ahdlarini buzganlari, Allahning oyatlariga kufr keltirganlari, payg‘ambarlarni nohaq o‘ldirganlari va: «Qalblarimiz yopiq», deganlari sababli — yo‘q, balki Allah ularni kufrlari sabab muhrlab qo‘ydi — ular ozgina iymon keltiradilar.",
156: "Va kufr keltirganlari va Maryam haqida ulkan tuhmat aytganlari sababli,",
157: "Va: «Biz Masih — Maryam o‘g‘li Iso payg‘ambarni o‘ldirdik», deganlari sababli — holbuki ular uni o‘ldirmadilar ham, xochga ham osmadilar, lekin ularga shunday ko‘rsatildi. Bu haqda ixtilof qilganlar shubhadadirlar — ular bu haqda faqat gumonga ergashadilar. Ular uni aniq o‘ldirmadilar.",
158: "Balki Allah uni O‘ziga ko‘tardi. Allah Aziz va Hikmatlidir.",
159: "Kitob ahlidan har biri o‘limidan oldin unga albatta iymon keltiradi. Qiyomat kuni esa u ularga qarshi guvoh bo‘ladi.",
160: "Yahudiylarning zulmlari va ko‘plab odamlarni Allah yo‘lidan to‘sganlari sababli ularga halol qilingan ba’zi pok narsalarni harom qildik.",
161: "Va ribo olishlari — holbuki undan qaytarilgan edilar — va odamlarning molini nohaq yeyishlari sababli. Biz ulardan kofir bo‘lganlar uchun alamli azob tayyorlab qo‘yganmiz.",
162: "Lekin ulardan ilmda mustahkam bo‘lganlar va mo‘minlar senga nozil qilingan narsaga va sendan oldin nozil qilingan narsaga iymon keltiradilar. Namozni ado qiluvchilar, zakot beruvchilar, Allahga va oxirat kuniga iymon keltiruvchilar — ana o‘shalarga ulkan ajr beramiz.",
163: "Albatta, Biz senga Nuhga va undan keyingi payg‘ambarlarga vahiy qilganimiz kabi vahiy qildik. Ibrohimga, Ismoilga, Ishoqga, Ya’qubga, avlodlarga, Iso ga, Ayyubga, Yunusga, Harunga va Sulaymonga vahiy qildik. Dovudga esa Zaburni berdik.",
164: "Ba’zi payg‘ambarlarni oldin senga hikoya qildik, ba’zilarini esa hikoya qilmadik. Allah Muso bilan gaplashdi.",
165: "Payg‘ambarlar xushxabar beruvchi va ogohlantiruvchi bo‘lib — toki payg‘ambarlar kelgandan keyin odamlar uchun Allahga qarshi hujjat qolmasin. Allah Aziz va Hikmatlidir.",
166: "Lekin Allah senga nozil qilgan narsaga guvohlik beradi — uni O‘z ilmi bilan nozil qildi. Malaikalar ham guvohlik beradilar. Allah guvoh sifatida kifoyadir.",
167: "Albatta, kufr keltirganlar va Allah yo‘lidan to‘sganlar uzoq adashganlar.",
168: "Albatta, kufr keltirgan va zulm qilganlarni Allah kechirmaydi va ularni yo‘lga hidoyat qilmaydi.",
169: "Faqat jahannam yo‘liga — unda abadiy qoladilar. Bu Allah uchun osondir.",
170: "Ey insonlar! Payg‘ambar sizlarga Rabbingizdan haqiqat bilan keldi. Bas, iymon keltiringlar — bu sizlar uchun yaxshiroq. Agar kufr keltirsangizlar — osmonlar va yerdagi barcha narsa Allahnikidir. Allah biluvchi va hikmatlidir.",
171: "Ey Kitob ahli! Diningizda haddan oshmanglar va Allah haqida faqat haqiqatni aytinglar. Masih — Maryam o‘g‘li Iso — faqat Allahning payg‘ambari, Maryamga tashlagan Kalimasi va Undan bir ruhdir. Bas, Allahga va Uning payg‘ambarlariga iymon keltiringlar va: «Uchta», demanglar. To‘xtanglar — bu sizlar uchun yaxshiroq. Allah yagona ilohdir. U farzand olishdan pokdir. Osmonlar va yerdagi barcha narsa Unikidir. Allah vakil sifatida kifoyadir.",
172: "Masih ham, yaqin malaikalar ham Allahga banda bo‘lishdan kibr qilmaydilar. Kim Unga ibodat qilishdan kibr qilsa va takabburlik qilsa — ularning barchasini O‘z huzuriga jamlaydi.",
173: "Iymon keltirib, solih amallar qilganlarga mukofotlarini to‘liq beradi va O‘z fazlidan ziyoda qiladi. Kibr qilgan va takabburlik qilganlarni esa alamli azob bilan azoblaydi va ular uchun Allahdan boshqa do‘st ham, yordamchi ham topa olmaydilar.",
174: "Ey insonlar! Sizlarga Rabbingizdan aniq dalil keldi va Biz sizlarga yorug‘ nur nozil qildik.",
175: "Allahga iymon keltirib, Unga yopishganlarni O‘z rahmatiga va fazliga kiritadi va ularni O‘ziga to‘g‘ri yo‘lga hidoyat qiladi.",
176: "Sizdan fatvo so‘raydilar. Ayting: «Allah sizlarga kalala haqida fatvo beradi: agar bir erkak o‘lsa va uning farzandi bo‘lmasa, lekin singlisi bo‘lsa — unga merosning yarmi tegadi. Agar u (ayol) o‘lsa va farzandi bo‘lmasa, u (aka) unga merosxo‘r bo‘ladi. Agar ikki singil bo‘lsa — ularga uchdan ikki. Agar aka-uka va opa-singillar bo‘lsa — erkakka ikki ayol ulushi kabi». Allah sizlarga adashib ketmasligingiz uchun bayon qiladi. Allah har narsani biluvchidir.",
 },  
 5: {
  1: "Ey iymon keltirganlar! Ahdnomalarga vafo qiling! Sizga, keyin tilovat qilinadiganlaridan boshqa, chorva hayvonlari halol qilindi, ehromdalik vaqtingizda ovni halol sanamagan holda. Albatta, Allah nimani iroda etsa, shuni hukm qiladur.",
  2: "Ey iymon keltirganlar! Allahning dini alomatlarini, harom oyini, qurbonlikni, osilgan belgilari va Robbilaridan fazl va rozilik izlab Baitul Haromga yo‘l olganlarni to‘sib qo‘ymang. Ehromdan chiqqaningizdan keyin ov qiling. Masjidul Haromdan to‘sib qo‘ygan qavmni yomon ko‘rishingiz sizni adolatsizlikka olib bormasin. Yaxshilik va taqvo yo‘lida hamkorlik qiling, gunoh va tajovuz yo‘lida hamkorlik qilmang. Allahdan qo‘rqing, albatta, Allah azobda qat’iydir.",
  3: "Sizlarga o‘lik jon, qon, cho‘chqa go‘shti, Allohdan boshqaning nomi bilan so‘yilgan, bo‘g‘ilib o‘ldirilgan, urib o‘ldirilgan, yiqilib o‘ldirilgan, suzib o‘ldirilgan, yirtqichlar tomonidan o‘ldirilgan hayvonlarning go‘shti harom qilindi. Magar, (tirik holda) so‘yilganlari haloldir. Va butlarga so‘yilganlar ham, cho‘p bilan fol ochish ham harom qilindi. Bunday harakatlar fosoqlikdir. Bugun kufr keltirganlar sizning dindingizga zarar yetkazishdan umid uzdilar. Ularni qo‘rqitishdan qo‘rqmang, Men'dan qo‘rqing! Bugun sizning diningizni mukammal qildim va ne’matimni to‘la qildim. Va Islomni sizlar uchun din deb qabul qildim. Kimki ochlikdan muztar bo‘lsa, lekin gunoh qilmasdan, Allah mag‘firatli va rahmli zotdir.",
  4: "Ular sizdan nima halol ekanini so‘rashadi. Ayting: “Sizlarga pok narsalar halol qilindi. O‘rgatilgan ovchi itlar orqali tutgan narsalar ham haloldir. Ularga Allahning nomini ayting, Allahdan qo‘rqing, Albatta, Allah hisobni tez qiladi.”",
  5: "Bugun sizga pok narsalar halol qilindi. Ahl‑kitobning taomi sizlar uchun haloldir va sizning taomingiz ularning taomi uchun haloldir. Mumin ayollar va sizdan oldin ahl‑kitobdan bo‘lgan mumin ayollar ham haloldir, agar ularni to‘y haqini to‘lab, halol turmush uchun olsangiz. Kim iymonni inkor qilsa, uning amali bekor bo‘ladi va oxiratda u zarar ko‘rgan bo‘ladi.",
  6: "Ey iymon keltirganlar! Namoz o‘qishga turganingizda yuzlaringizni va qo‘llaringizni yuvib tozalang, boshlaringizni masx qiling, oyoqlaringizni tozalang. Agar junoob bo‘lsangiz, to‘liq holatda tozalansin. Agar kasal bo‘lsangiz yoki safarda bo‘lsangiz yoki tuxbalikdan bo‘lsangiz va suv topa olmasangiz, pok tuproq bilan tayammum qiling — yuzlaringizni va qo‘llaringizni silang. Albatta, Allah mag‘firatli va rahmdil zotdir.",
  7: "Va Allahning sizga bergan ne’matini yodlang, siz ‘eshtik va itoat qildik’ deb ahd qilgandingiz, va Allohdan qo‘rqing. Albatta, Allah qalblardagi sirlarni biluvchidir.",
  8: "Ey iymon keltirganlar! Allah uchun haqda turing, adolatli guvoh bo‘linglar. Bir qavmni yomon ko‘rishingiz sizni adolatsizlikka olib bormasin! Yaxshilik va taqvo yo‘lida hamkorlik qiling, gunoh va tajovuz yo‘lida hamkorlik qilmang. Allohdan qo‘rqing, albatta, Alloh jazoda qat’iydir.",
  9: "Allah mo‘minlarga va solih amallar qilganlarga mag‘firat va rahmat va’da qilgan — uning ostidan daryolar oqadi. Bu Allah huzuridagi ulkan yutuqdir.",
 10: "Va kufr keltirganlar va oyatlarimizni inkor qilganlar — ularning amallari jahannam olovi kabi. Ular unda abadiy qoladilar.",
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
