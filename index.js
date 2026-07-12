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
  3: "Sizlarga o‘lik jon, qon, cho‘chqa go‘shti, Allahdan boshqaning nomi bilan so‘yilgan, bo‘g‘ilib o‘ldirilgan, urib o‘ldirilgan, yiqilib o‘ldirilgan, suzib o‘ldirilgan, yirtqichlar tomonidan o‘ldirilgan hayvonlarning go‘shti harom qilindi. Magar, (tirik holda) so‘yilganlari haloldir. Va butlarga so‘yilganlar ham, cho‘p bilan fol ochish ham harom qilindi. Bunday harakatlar fosoqlikdir. Bugun kufr keltirganlar sizning dindingizga zarar yetkazishdan umid uzdilar. Ularni qo‘rqitishdan qo‘rqmang, Men'dan qo‘rqing! Bugun sizning diningizni mukammal qildim va ne’matimni to‘la qildim. Va Islomni sizlar uchun din deb qabul qildim. Kimki ochlikdan muztar bo‘lsa, lekin gunoh qilmasdan, Allah mag‘firatli va rahmli zotdir.",
  4: "Ular sizdan nima halol ekanini so‘rashadi. Ayting: “Sizlarga pok narsalar halol qilindi. O‘rgatilgan ovchi itlar orqali tutgan narsalar ham haloldir. Ularga Allahning nomini ayting, Allahdan qo‘rqing, Albatta, Allah hisobni tez qiladi.”",
  5: "Bugun sizga pok narsalar halol qilindi. Ahl‑kitobning taomi sizlar uchun haloldir va sizning taomingiz ularning taomi uchun haloldir. Mumin ayollar va sizdan oldin ahl‑kitobdan bo‘lgan mumin ayollar ham haloldir, agar ularni to‘y haqini to‘lab, halol turmush uchun olsangiz. Kim iymonni inkor qilsa, uning amali bekor bo‘ladi va oxiratda u zarar ko‘rgan bo‘ladi.",
  6: "Ey iymon keltirganlar! Namoz o‘qishga turganingizda yuzlaringizni va qo‘llaringizni yuvib tozalang, boshlaringizni masx qiling, oyoqlaringizni tozalang. Agar junoob bo‘lsangiz, to‘liq holatda tozalansin. Agar kasal bo‘lsangiz yoki safarda bo‘lsangiz yoki tuxbalikdan bo‘lsangiz va suv topa olmasangiz, pok tuproq bilan tayammum qiling — yuzlaringizni va qo‘llaringizni silang. Albatta, Allah mag‘firatli va rahmdil zotdir.",
  7: "Va Allahning sizga bergan ne’matini yodlang, siz eshittik va itoat qildik deb ahd qilgandingiz, va Allahdan qo‘rqing. Albatta, Allah qalblardagi sirlarni biluvchidir.",
  8: "Ey iymon keltirganlar! Allah uchun haqda turing, adolatli guvoh bo‘linglar. Bir qavmni yomon ko‘rishingiz sizni adolatsizlikka olib bormasin! Yaxshilik va taqvo yo‘lida hamkorlik qiling, gunoh va tajovuz yo‘lida hamkorlik qilmang. Allohdan qo‘rqing, albatta, Alloh jazoda qat’iydir.",
  9: "Allah mo‘minlarga va solih amallar qilganlarga mag‘firat va rahmat va’da qilgan — uning ostidan daryolar oqadi. Bu Allah huzuridagi ulkan yutuqdir.",
 10: "Va kufr keltirganlar va oyatlarimizni inkor qilganlar — ularning amallari jahannam olovi kabi. Ular unda abadiy qoladilar.",
 11: "Ey iymon keltirganlar!Allahning sizlarga bergan ne’matini eslang:bir qavm sizlarga qo‘llarini cho‘zmoqchi bo‘lganida ya’ni sizlarga zarar yetkazmoqchi bo‘lganida,U ularning qo‘llarini sizlardan tiyib qo‘ydi.Va Allahdan qo‘rqinglar.Va mo‘minlar faqat Allahga tavakkal qilsinlar.",
 12: "Va albatta, Allah Bani Isroildan ahd oldi.Va Biz ulardan o‘n ikki boshliq yubordik.Va Allah dedi: “Albatta Men sizlar bilanman.Agar namozni to‘kis ado qilsangiz,zakotni bersangiz,Mening rasullarimga iymon keltirsangiz,ularni qo‘llab-quvvatlasangizva Allohga go‘zal qarz bersangiz ya’ni Uning yo‘lida sarf qilsangiz,albatta sizlarning yomonliklaringizni o‘chiramanva sizlarni ostidan daryolar oqadigan jannatlarga kiritaman.Bas, sizlardan kim shundan keyin kufr qilsa,u to‘g‘ri yo‘ldan adashgan bo‘ladi.",
 13: "Ularning ahdlarini buzganlari sababli Biz ularni la'natladik va qalblarini qattiq qilib qo‘ydik. Ular so‘zlarni o‘z o‘rinlaridan o‘zgartiradilar va eslatilgan narsaning bir qismini unutdilar. Sen ulardan ozchiligidan tashqari doimo xiyonatni bilib turasan. Ularni afv et va kechir. Albatta, Allah yaxshilik qiluvchilarni yaxshi ko‘radi.",
 14: "«Biz nasroniymiz», deganlardan ham ahd olgan edik. Ular ham eslatilgan narsaning bir qismini unutdilar. Bas, Biz ular orasiga qiyomat kunigacha adovat va nafrat soldi. Tezda Allah ularga qilgan ishlari haqida xabar beradi.",
 15: "Ey Ahlul Kitob! Sizlarga Rasulimiz keldi, u sizlarga Kitobdan yashirib kelgan narsalaringizning ko‘pini bayon qiladi va ko‘pini kechib yuboradi. Sizlarga Allahdan nur va ochiq Kitob keldi.",
 16: "U bilan ALLAH O‘z roziligiga ergashganlarni tinchlik yo‘llariga hidoyat qiladi va ularni O‘z izni bilan zulmatlardan nurga chiqaradi hamda ularni to‘g‘ri yo‘lga hidoyat qiladi.",
 17: "Albatta, «Allah — Maryam o‘g‘li Masihdir», deganlar kofir bo‘ldilar. Ayting: «Agar Allah Maryam o‘g‘li Masihni, uning onasini va yer yuzidagi barcha kishilarni halok qilishni istasa, ALLAHdan kim biror narsani qaytara oladi?!» Osmonlar, yer va ular orasidagi narsalar hukmronligi ALLAH uchundir. U xohlagan narsasini yaratadi. ALLAH har narsaga qodirdir.",
 18: "Yahudiylar va nasroniylar: «Biz Allahning o‘g‘illari va Uning sevimlilarimiz», dedilar. Ayting: «Unda nega U sizlarni gunohlaringiz sababli azoblaydi? Yo‘q, sizlar U yaratgan insonlardansiz. U xohlagan kishisini mag‘firat qiladi va xohlagan kishisini azoblaydi. Osmonlar, yer va ular orasidagi narsalar hukmronligi ALLAH uchundir. Qaytish ham Uning huzurigadir».",
 19: "Ey Ahlul Kitob! Sizlarga Rasulimiz kelganidan so‘ng, «Bizga na bir xushxabar beruvchi va na ogohlantiruvchi keldi», deb aytmasligingiz uchun, sizlarga (haqiqatni) bayon qiluvchi Rasulimiz keldi. ALLAH har narsaga qodirdir.",
 20: "Eslang, Muso o‘z qavmiga dedi: «Ey qavmim! ALLAHning sizlarga bergan ne’matini eslang. U sizlardan payg‘ambarlar chiqardi, sizlarni podshohlar qildi va olamlardan hech kimga bermagan narsalarini sizlarga berdi».",
 21: "Ey qavmim! ALLAH sizlarga yozib qo‘ygan muqaddas yerga kiringlar va ortingizga qaytmanglar, aks holda ziyon ko‘ruvchilardan bo‘lib qolasizlar».",
 22: "Ular dedilar: «Ey Muso! U yerda kuchli zolim qavm bor. Ular u yerdan chiqmagunlaricha biz u yerga aslo kirmaymiz. Agar ular chiqib ketsalar, biz kiramiz».",
 23: "ALLAHdan qo‘rqadigan va ALLAH ne’mat bergan ikki kishi dedilar: «Ularning ustiga darvozadan kiringlar. Agar unga kirsangizlar, albatta g‘olib bo‘lasizlar. Agar mo‘min bo‘lsangizlar, faqat ALLAHga tavakkul qilinglar».",
 24: "Ular dedilar: «Ey Muso! Ular u yerda ekan, biz u yerga hech qachon kirmaymiz. Bas, sen va Robbing borib jang qilinglar. Biz esa shu yerda o‘tiruvchilarmiz».",
 25: "U dedi: «Ey Robbim! Men faqat o‘zimga va birodarimga egalik qilaman. Bas, bizni fosiq qavmdan ajratgin».",
 26: "U dedi: «Bas, u yer ularga qirq yil harom qilindi. Ular yer yuzida sarson bo‘lib yuradilar. Bas, fosiq qavm uchun qayg‘urma».",
 27: "Ularga Odamning ikki o‘g‘li haqidagi xabarni haq ila o‘qib ber. Ikkovlari qurbonlik qilganlarida, biridan qabul qilindi, boshqasidan qabul qilinmadi. U: «Albatta, seni o‘ldiraman», dedi. U esa dedi: «Albatta, ALLAH faqat taqvodorlardan qabul qiladi».",
 28: "Agar sen meni o‘ldirish uchun qo‘lingni menga uzatsang ham, men seni o‘ldirish uchun qo‘limni senga uzatmayman. Albatta, men olamlarning Robbi bo‘lgan ALLAHdan qo‘rqaman.",
 29: "Men istaymanki, sen mening gunohimni ham, o‘z gunohingni ham ko‘tarib borishing va do‘zax ahlidan bo‘lishing. Zolimlarning jazosi shudir».",
 30: "Bas, uning nafsi unga birodarini o‘ldirishni yengil ko‘rsatdi. Shunday qilib, uni o‘ldirdi va ziyon ko‘ruvchilardan bo‘ldi.",
 31: "So‘ngra ALLAH unga birodarining jasadini qanday ko‘mishni ko‘rsatish uchun yer kovlayotgan qarg‘ani yubordi. U dedi: «Voy holimga! Birodarimning jasadini ko‘mishda shu qarg‘achalik ham ojiz bo‘ldimmi?» Bas, u pushaymon bo‘lganlardan bo‘ldi.",
 32: "Shuning uchun Bani Isroilga shunday yozdik: «Kim bir jonni (qasos yoki yer yuzidagi buzg‘unchilik sabablarisiz) o‘ldirsa, go‘yo barcha odamlarni o‘ldirgandek bo‘ladi. Kim uni tiriltirsa, go‘yo barcha odamlarni tiriltirgandek bo‘ladi». Ularga Rasulimiz ochiq bayonotlar bilan keldilar. Shundan keyin ham ulardan ko‘plari yer yuzida haddan oshuvchilardir.",
 33: "Albatta, ALLAH va Uning Rasuliga qarshi urush qiladigan va yer yuzida buzg‘unchilik qilishga harakat qiladiganlarning jazosi — o‘ldirilishlari yoki osilishlari yoki qo‘l-oyoqlarining qarama-qarshi tomonidan kesilishi yoki yurtdan haydalishlaridir. Bu ular uchun dunyodagi xorlikdir. Oxiratda esa ular uchun ulkan azob bordir.",
 34: "Faqat qo‘lga tushishingizdan oldin tavba qilganlar bundan mustasnodirlar. Bas, bilinglarki, ALLAH Mag‘firat qiluvchi va Rahmlidir.",
 35: "Ey iymon keltirganlar! ALLAHdan qo‘rqinglar va Unga yaqinlik izlanglar hamda Uning yo‘lida jihod qilinglar, shoyad najot topsangizlar.",
 36: "Albatta, kufr keltirganlar, agar yer yuzidagi barcha narsalar va u bilan birga yana shunchasi ularniki bo‘lsa va qiyomat kunidagi azobdan qutulish uchun uni fidya qilsalar ham, ulardan qabul qilinmaydi. Ular uchun alamli azob bordir.",
 37: "Ular do‘zaxdan chiqishni xohlaydilar, lekin undan chiquvchi emaslar. Ular uchun doimiy azob bordir.",
 38: "O‘g‘ri erkak va o‘g‘ri ayolning qo‘llarini kesinglar. Bu qilgan ishlariga yarasha ALLAH tomonidan berilgan jazo va ibratdir. ALLAH G‘olib va Hikmat Egasi.",
 39: "Kim zulmidan keyin tavba qilsa va o‘zini tuzatsa, albatta ALLAH uning tavbasini qabul qiladi. Albatta, ALLAH Mag‘firat qiluvchi va Rahmlidir.",
 40: "Osmonlar va yer hukmronligi ALLAHga tegishli ekanini bilmadingmi? U xohlagan kishisini azoblaydi va xohlagan kishisini mag‘firat qiladi. ALLAH har narsaga qodirdir.",
 41: "Ey Rasul! Og‘izlari bilan «imon keltirdik» degan, lekin qalblari bilan imon keltirmaganlardan va yahudiylardan kufrda shoshayotganlar seni xafa qilmasin. Ular yolg‘onni ko‘p tinglaydilar va senga kelmagan boshqa qavm uchun tinglovchidirlar.",
 42: "Ular yolg‘onga quloq soluvchilardir, haromni ko‘p yeyuvchilardir. Agar oldingga kelsalar, ular orasida hukm qil yoki ulardan yuz o‘gir. Agar ulardan yuz o‘girsang, ular senga hech qanday zarar yetkaza olmaydi. Agar hukm qilsang, ular orasida adolat bilan hukm qil. Albatta, ALLAH adolat qiluvchilarni sevadi.",
 43: "Ular ichida ALLAHning hukmi bo‘lgan Tavrot bor bo‘la turib, qanday qilib seni hukm chiqaruvchi qiladilar? So‘ngra undan keyin ham yuz o‘giradilar. Ana o‘shalar mo‘min emaslar.",
 44: "Albatta, Biz Tavrotni nozil qildik. Unda hidoyat va nur bor edi. U bilan yahudiylarga itoatkor payg‘ambarlar, Robbilar va olimlar hukm qilardilar. Chunki ular ALLAHning Kitobini saqlashga buyurilgan edilar va unga guvoh edilar. Bas, odamlardan qo‘rqmanglar, Mendan qo‘rqinglar va oyatlarimni ozgina qiymatga almashtirmanglar. Kim ALLAH nozil qilgan narsa bilan hukm qilmasa, ana o‘shalar kofirlardir.",
 45: "Unda ularga jon evaziga jon, ko‘z evaziga ko‘z, burun evaziga burun, quloq evaziga quloq, tish evaziga tish va jarohatlar uchun qasos yozdik. Kim undan sadaqa qilsa, bu uning uchun kafforatdir. Kim ALLAH nozil qilgan narsa bilan hukm qilmasa, ana o‘shalar zolimlardir.",
 46: "Ularning izidan Maryam o‘g‘li Iysoni o‘zidan oldingi Tavrotni tasdiqlovchi qilib yubordik. Unga ichida hidoyat va nur bo‘lgan Injilni berdik. U o‘zidan oldingi Tavrotni tasdiqlovchi va taqvodorlar uchun hidoyat va nasihat edi.",
 47: "Injil ahli ALLAH unda nozil qilgan narsa bilan hukm qilsinlar. Kim ALLAH nozil qilgan narsa bilan hukm qilmasa, ana o‘shalar fosiqlardir.",
 48: "Senga esa Kitobni haq ila, o‘zidan oldingi Kitoblarni tasdiqlovchi va ularni muhofaza qiluvchi qilib nozil qildik. Bas, ular orasida ALLAH nozil qilgan narsa bilan hukm qil. Senga kelgan haqdan yuz o‘girib, ularning havoyi nafslariga ergashma. Sizlardan har biringiz uchun shariat va yo‘l belgiladik. Agar ALLAH xohlasa, sizlarni bir ummat qilgan bo‘lardi. Lekin sizlarga bergan narsalarida sinash uchun shunday qildi. Bas, yaxshiliklarda o‘zaro musobaqalashinglar. Barchangizning qaytishingiz ALLAH huzurigadir. U sizlarga ixtilof qilgan narsalaringizni xabar qiladi.",
 49: "Ular orasida ALLAH nozil qilgan narsa bilan hukm qil va ularning havoyi nafslariga ergashma. ALLAH senga nozil qilgan narsaning ayrim qismidan seni burib qo‘yishlaridan ehtiyot bo‘l. Agar ular yuz o‘girsalar, bilgilki, ALLAH ularni ba’zi gunohlari sababli musibatga solishni xohlaydi. Albatta, odamlarning ko‘plari fosiqlardir.",
 50: "Ular johiliyat hukmini istaydilarmi? Ishonuvchi qavm uchun hukm qilishda ALLAHdan yaxshiroq kim bor?"   
 51: "Ey iymon keltirganlar! Yahudiylar va nasroniylarni do‘st tutmanglar. Ularning ba’zilari ba’zilarining do‘stlaridir. Sizlardan kim ularni do‘st tutsa, albatta u ham ulardandir. Albatta, ALLAH zolim qavmni hidoyat qilmaydi.",
 52: "Qalblarida kasallik bo‘lganlarning ularga shoshilayotganlarini ko‘rasan. Ular: «Bizga biror musibat yetib qolishidan qo‘rqamiz», deydilar. Balki ALLAH g‘alabani yoki O‘z huzuridan biror ishni keltiradi. Shunda ular ichlarida yashirgan narsalaridan pushaymon bo‘lib qoladilar.",
 53: "Iymon keltirganlar: «Sizlar bilan birga ekanliklariga qasam ichganlar shularmi?» deb aytadilar. Ularning amallari bekor bo‘ldi va ular ziyon ko‘ruvchilarga aylandilar.",
 54: "Ey iymon keltirganlar! Sizlardan kim dinidan qaytsa, ALLAH shunday bir qavmni keltiradiki, U ularni sevadi, ular ham Uni sevadilar. Ular mo‘minlarga yumshoq, kofirlarga qattiqdirlar. Ular ALLAH yo‘lida jihod qiladilar va malomat qiluvchining malomatidan qo‘rqmaydilar. Bu ALLAHning fazlidir, uni xohlagan kishisiga beradi. ALLAH Keng fazl Egasi va Biluvchidir.",
 55: "Sizlarning do‘stingiz faqat ALLAH, Uning Rasuli va namozni ado etuvchi, zakotni beruvchi hamda ruku’ qiluvchi holda bo‘lgan mo‘minlardir.",
 56: "Kim ALLAHni, Uning Rasulini va mo‘minlarni do‘st tutsa, albatta ALLAHning guruhi g‘olib bo‘luvchilardir.",
 57: "Ey iymon keltirganlar! Sizlardan oldin Kitob berilganlardan va kofirlardan diningizni masxara va o‘yin qilganlarni do‘st tutmanglar. Agar mo‘min bo‘lsangizlar, ALLAHdan qo‘rqinglar.",
 58: "Qachonki namozga chaqirsangizlar, uni masxara va o‘yin qiladilar. Bunga sabab ularning aqlsiz qavm ekanliklaridir.",
 59: "Ayting: «Ey Ahlul Kitob! Bizdan faqat ALLAHga, bizga nozil qilingan narsaga va ilgari nozil qilingan narsalarga iymon keltirganimiz uchun nafratlanasizlarmi? Holbuki, sizlarning ko‘plaringiz fosiqlardirsizlar».",
 60: "Ayting: «ALLAH huzuridagi jazosi bundan ham yomonroq bo‘lgan kishilar haqida sizlarga xabar beraymi? Ular ALLAH la’natlagan, g‘azab qilgan, ulardan maymunlar va to‘ng‘izlar qilgan hamda tog‘utga ibodat qilganlardir. Ana o‘shalar joy jihatidan eng yomon va to‘g‘ri yo‘ldan eng ko‘p adashganlardir».",
 61: "Ular oldingizga kelganlarida: «Iymon keltirdik», deydilar. Holbuki, ular kufr bilan kirib, kufr bilan chiqadilar. ALLAH ular yashirayotgan narsalarini biluvchidir.",
 62: "Ularning ko‘plarini gunohga, adovatga va harom yeyishga shoshayotganlarini ko‘rasan. Qilayotgan ishlari naqadar yomon!",
 63: "Nega ularning Robbaniylari va olimlari ularni gunoh so‘zlardan va harom yeyishdan qaytarmaydilar? Qilayotgan ishlari naqadar yomon!",
 64: "Yahudiylar: «ALLAHning qo‘li bog‘liq», dedilar. Ularning qo‘llari bog‘lansin va aytgan so‘zlari sababli la’natlandilar. Yo‘q, Uning ikki qo‘li ochiqdir, U qanday xohlasa ehson qiladi. Albatta, Robbingdan senga nozil qilingan narsa ulardan ko‘plarining tug‘yon va kufrini ziyoda qiladi. Biz ular orasiga qiyomat kunigacha adovat va nafrat solib qo‘ydik. Har safar urush olovini yoqsalar, ALLAH uni o‘chiradi. Ular yer yuzida buzg‘unchilik qilishga harakat qiladilar. ALLAH buzg‘unchilarni sevmaydi.",
 65: "Agar Ahlul Kitob iymon keltirib, taqvo qilganlarida edi, albatta ularning yomonliklarini o‘chirardik va ularni ne’mat bog‘lariga kiritardik.",
 66: "Agar ular Tavrot, Injil va Robbilaridan ularga nozil qilingan narsani barpo qilganlarida edi, ustlaridan va oyoqlari ostidan rizqlangan bo‘lardilar. Ularning orasida mo‘tadil bir jamoa bor, lekin ko‘plarining qilayotgan ishlari naqadar yomon!",
 67: "Ey Rasul! Robbingdan senga nozil qilingan narsani yetkaz. Agar buni qilmasang, Uning risolatini yetkazmagan bo‘lasan. ALLAH seni odamlardan himoya qiladi. Albatta, ALLAH kofir qavmni hidoyat qilmaydi.",
 68: "Ayting: «Ey Ahlul Kitob! Sizlar Tavrot, Injil va Robbingizdan sizlarga nozil qilingan narsani barpo qilmaguningizcha hech narsaga asoslanmagansizlar». Robbingdan senga nozil qilingan narsa ulardan ko‘plarining tug‘yoni va kufrini ziyoda qiladi. Bas, kofir qavm uchun qayg‘urma.",
 69: "Albatta, iymon keltirganlar, yahudiylar, sobiiylar va nasroniylardan kim ALLAHga va oxirat kuniga iymon keltirib, yaxshi amal qilsa, ularga hech qanday qo‘rquv yo‘qdir va ular g‘amgin bo‘lmaydilar.",
 70: "Batahqiq, Bani Isroildan ahd oldik va ularga Rasulchilar yubordik. Har safar ularga nafslariga yoqmagan narsani keltirganlarida, bir guruhini yolg‘onchiga chiqardilar, bir guruhini esa o‘ldirdilar.",
 71: "Ular hech qanday sinov bo‘lmaydi, deb o‘yladilar. Bas, ular ko‘r bo‘ldilar va kar bo‘ldilar. So‘ngra ALLAH ularning tavbalarini qabul qildi. Keyin ulardan ko‘plari yana ko‘r va kar bo‘ldilar. ALLAH ularning qilayotgan ishlarini ko‘ruvchidir.",
 72: "Albatta, «ALLAH — Maryam o‘g‘li Masihdir», deganlar kofir bo‘ldilar. Holbuki, Masih: «Ey Bani Isroil! Mening ham, sizlarning ham Robbingiz bo‘lgan ALLAHga ibodat qilinglar. Albatta, kim ALLAHga shirk keltirsa, ALLAH unga jannatni harom qiladi va uning joyi do‘zaxdir. Zolimlar uchun yordamchilar yo‘qdir», degan edi.",
 73: "Albatta, «ALLAH uchning uchinchisidir», deganlar kofir bo‘ldilar. Holbuki, yagona ilohdan boshqa iloh yo‘qdir. Agar ular aytayotganlaridan qaytmasalar, ulardan kofir bo‘lganlarga alamli azob yetadi.",
 74: "Ular ALLAHga tavba qilib, Undan mag‘firat so‘ramaydilarmi? ALLAH Mag‘firat qiluvchi va Rahmlidir.",
 75: "Maryam o‘g‘li Masih faqat bir Rasuldir. Undan oldin ham Rasulchilar o‘tgan. Uning onasi esa rostgo‘y ayol edi. Ikkovlari ham taom yer edilar. Qarang, ularga oyatlarni qanday bayon qilamiz. So‘ngra qarang, ular qanday yuz o‘giradilar.",
 76: "Ayting: «ALLAHni qo‘yib, sizlarga zarar ham, foyda ham yetkaza olmaydigan narsaga ibodat qilasizlarmi? ALLAH eshituvchidir, biluvchidir».",
 77: "Ayting: «Ey Ahlul Kitob! Diningizda haqsiz ravishda haddan oshmanglar va oldin adashgan, ko‘plarni adashtirgan hamda to‘g‘ri yo‘ldan chiqqan qavmning havoyi nafslariga ergashmanglar».",
 78: "Bani Isroildan kofir bo‘lganlar Dovud va Maryam o‘g‘li Iyso tilida la’natlandilar. Bu ularning isyon qilganlari va haddan oshganlari sababli edi.",
 79: "Ular qilgan yomonliklaridan bir-birlarini qaytarmas edilar. Qilgan ishlari naqadar yomondir!",
 80: "Ularning ko‘plarining kofirlarni do‘st tutayotganlarini ko‘rasan. Nafslari ular uchun qanday yomon narsani oldindan tayyorladi! ALLAH ularga g‘azab qildi va ular azobda abadiy qoluvchilardir.",
 81: "Agar ular ALLAHga, Payg‘ambarga va unga nozil qilingan narsaga iymon keltirganlarida, ularni do‘st tutmagan bo‘lardilar. Lekin ularning ko‘plari fosiqlardir.",
 82: "Odamlar ichida iymon keltirganlarga eng kuchli adovat qiluvchilar yahudiylar va mushriklarni topasan. Iymon keltirganlarga eng yaqin muhabbat qiluvchilar esa: «Biz nasroniymiz», deganlarni topasan. Chunki ular orasida ruhoniylar va rohiblar bor va ular kibr qilmaydilar.",
 83: "Rasulga nozil qilingan narsani eshitganlarida, haqiqatni taniganlari sababli ko‘zlaridan yosh oqayotganini ko‘rasan. Ular: «Ey Robbimiz! Iymon keltirdik, bizni guvohlar bilan birga yozgin», deydilar.",
 84: "«Robbimizga va bizga kelgan haq narsaga nega iymon keltirmaymiz? Biz Robbimiz bizni solihlar qatori kiritishini umid qilamiz».",
 85: "Bas, aytgan so‘zlari sababli ALLAH ularga ostidan anhorlar oqadigan jannatlarni mukofot qildi. Ular unda abadiy qoladilar. Bu yaxshilik qiluvchilarning mukofotidir.",
 86: "Kufr keltirgan va oyatlarimizni yolg‘on deganlar esa jahannam ahlidir.",
 87: "Ey iymon keltirganlar! ALLAH sizlarga halol qilgan pok narsalarni harom qilmanglar va haddan oshmanglar. Albatta, ALLAH haddan oshuvchilarni sevmaydi.",
 88: "ALLAH sizlarga bergan halol va pok narsalardan yenglar. Va sizlar iymon keltirgan ALLAHdan qo‘rqinglar.",
 89: "ALLAH sizlarni qasamlaringizdagi behuda narsalar sababli jazolamaydi, balki qalblaringiz kasb qilgan qasamlar sababli jazolaydi. Uning kafforati — oilangizga beradigan o‘rtacha taomdan o‘n miskinni to‘ydirish yoki ularni kiyintirish yoki bir qul ozod qilishdir. Kim topa olmasa, uch kun ro‘za tutadi. Bu qasamlaringizni buzganingizdagi kafforatdir. Qasamlaringizni saqlanglar. ALLAH sizlarga oyatlarini shunday bayon qiladi, shoyad shukr qilsangizlar.",
 90: "Ey iymon keltirganlar! Albatta, aroq, qimor, butlar va fol ochish uchun o‘qlar shayton amalidan bo‘lgan najosatdir. Bas, undan uzoq bo‘linglar, shoyad najot topsangizlar.",
 91: "Albatta, shayton aroq va qimor orqali orangizga adovat va nafrat solishni hamda sizlarni ALLAHni zikr qilishdan va namozdan to‘sishni xohlaydi. Bas, undan qaytmaysizlarmi?",
 92: "ALLAHga itoat qilinglar, Rasulga itoat qilinglar va ehtiyot bo‘linglar. Agar yuz o‘girsangizlar, bilinglarki, Rasulimizning vazifasi faqat ochiq yetkazishdir.",
 93: "Iymon keltirgan va yaxshi amallar qilganlarga, ular taqvo qilganlari, iymon keltirganlari va yaxshi amallar qilganlari, so‘ngra taqvo qilganlari va iymon keltirganlari, so‘ngra taqvo qilib yaxshilik qilganlari sababli, ilgari yegan narsalarida gunoh yo‘qdir. ALLAH yaxshilik qiluvchilarni sevadi.",
 94: "Ey iymon keltirganlar! ALLAH sizlarni qo‘llaringiz va nayzalaringiz yetadigan biror ov bilan sinaydi. Toki ALLAH O‘zidan g‘aybda qo‘rqadiganlarni bilsin. Kim bundan keyin haddan oshsa, unga alamli azob bordir.",
 95: "Ey iymon keltirganlar! Ehromda bo‘lganingizda ovni o‘ldirmanglar. Sizlardan kim uni ataylab o‘ldirsa, jazosi — o‘ldirganiga teng bo‘lgan chorva hayvonidan kafforatdir. Bu haqda sizlardan ikki adolatli kishi hukm qiladi. U Ka’baga yetkaziladigan qurbonlik bo‘ladi. Yoki kafforat sifatida miskinlarni taomlantirish yoki shunga teng ro‘za tutishdir. Bu bilan u qilgan ishining oqibatini totadi. ALLAH o‘tgan narsalarni afv qildi. Kim yana qaytsa, ALLAH undan intiqom oladi. ALLAH G‘olib va intiqom Egasi.",
 96: "Sizlarga dengiz ovi va uning taomi halol qilindi. Bu sizlarga va yo‘lovchilarga manfaatdir. Ehromda bo‘lganingizda esa quruqlik ovini o‘zingizga harom qilindi. Va huzuriga to‘planadigan ALLAHdan qo‘rqinglar.",
 97: "ALLAH Ka’bani — Baytul Haromni, hurmatli oyni, hadyalarni va bo‘yinlariga belgi qo‘yilgan qurbonliklarni odamlar uchun tik turuvchi vosita qildi. Bu ALLAH osmonlaru yerdagi narsalarni bilishini va ALLAH har narsani Biluvchi ekanini bilishingiz uchundir.",
 98: "Bilinglarki, ALLAHning jazosi qattiqdir va ALLAH Mag‘firat qiluvchi va Rahmlidir.",
 99: "Rasulning zimmasida faqat yetkazish bor. ALLAH sizlar oshkor qiladigan va yashiradigan narsalaringizni biladi.",
 100: "Ayting: «Nopok bilan pok teng bo‘lmasa ham, nopokning ko‘pligi seni ajablantirsa ham, ALLAHdan qo‘rqinglar, ey aql egalari! Shoyad najot topsangizlar».",
 101: "Ey iymon keltirganlar! Sizlarga oshkor qilinsa, sizlarga og‘ir bo‘ladigan narsalar haqida so‘ramanglar. Agar Qur’on nozil qilinayotgan paytda ular haqida so‘rasangizlar, sizlarga ayon qilinadi. ALLAH ularni afv etdi. ALLAH Mag‘firat qiluvchi va Halimdir.",
 102: "Sizlardan oldingi bir qavm ham shunday narsalarni so‘ragan edi, so‘ngra ular sababli kofir bo‘ldilar.",
 103: "ALLAH bahira, soiba, vasila va homni joriy qilmagan. Lekin kofir bo‘lganlar ALLAHga yolg‘on to‘qiydilar. Ularning ko‘plari aql qilmaydilar.",
 104: "Ularga: «ALLAH nozil qilgan narsaga va Rasulga kelinglar», deyilsa, ular: «Bizga otalarimizni topgan narsamiz kifoya», deydilar. Agar otalari hech narsani bilmagan va hidoyat topmagan bo‘lsalar hammi?",
 105: "Ey iymon keltirganlar! O‘zlaringizni isloh qilish sizlarning zimmangizdadir. Agar hidoyat topsangizlar, adashganlar sizlarga zarar yetkaza olmaydi. Barchangizning qaytishingiz ALLAH huzurigadir. U sizlarga qilgan ishlaringizni xabar qiladi.",
 106: "Ey iymon keltirganlar! Sizlardan birortangizga o‘lim kelganda, vasiyat qilayotgan paytda orangizdan ikki adolatli kishini guvoh qilinglar. Agar safarda bo‘lsangizlar va sizlarga o‘lim musibati yetsa, sizlardan bo‘lmagan ikki kishini guvoh qilinglar. Agar shubha qilsangizlar, ularni namozdan keyin ushlab turib, ALLAH nomi bilan qasam ichirsinlar: «Biz uni hech qanday qiymatga almashtirmaymiz, hatto qarindosh bo‘lsa ham. Biz ALLAHning guvohligini yashirmaymiz. Aks holda, albatta gunohkorlardan bo‘lamiz».",
 107: "Agar ularning gunoh qilganlari aniqlansa, o‘rniga haqqi poymol qilingan kishilardan bo‘lgan boshqa ikki kishi turadi va ALLAH nomi bilan qasam ichadilar: «Bizning guvohligimiz ularning guvohligidan ko‘ra haqliroqdir va biz haddan oshmadik. Aks holda, albatta zolimlardan bo‘lamiz».",
 108: "Bu ularning guvohlikni o‘z o‘rnida berishlariga yoki qasamlaridan keyin qasamlar rad etilishidan qo‘rqishlariga yaqinroqdir. ALLAHdan qo‘rqinglar va quloq solinglar. ALLAH fosiq qavmni hidoyat qilmaydi.",
 109: "ALLAH Rasulchilarni jamlaydigan kunda: «Sizlarga nima javob berildi?» deydi. Ular: «Bizda ilm yo‘q. Albatta, Sen g‘ayblarni Biluvchisan», deydilar.",
 110: "O‘shanda ALLAH aytadi: «Ey Maryam o‘g‘li Iyso! Senga va onangga bergan ne’matimni esla. Seni Ruhul Qudus bilan quvvatlagan edim. Sen beshikda ham, katta bo‘lganingda ham odamlar bilan gaplashar eding. Senga Kitobni, hikmatni, Tavrotni va Injilni o‘rgatgan edim. Mening iznim bilan loydan qush shaklini yasab, unga puflaganingda, Mening iznim bilan qush bo‘lgan edi. Mening iznim bilan ko‘r va pes kasallarni tuzatgan eding. Mening iznim bilan o‘liklarni tiriltirgan eding. Bani Isroilga ochiq dalillar bilan kelganingda, ulardan kofir bo‘lganlar: «Bu faqat ochiq sehrdir», deganlarida, seni ulardan saqlagan edim».",
 111: "Men havoriylarga: «Menga va Mening Rasulimizga iymon keltiringlar», deb vahiy qilganimda, ular: «Iymon keltirdik, biz musulmon ekanimizga guvoh bo‘lgin», dedilar.",
 112: "Havoriylar: «Ey Maryam o‘g‘li Iyso! Robbing bizga osmondan bir dasturxon tushira oladimi?» deganlarida, u: «Agar mo‘min bo‘lsangizlar, ALLAHdan qo‘rqinglar», dedi.",
 113: "Ular dedilar: «Undan yeyishni, qalblarimiz taskin topishini, sening bizga rost aytganingni bilishni va bunga guvohlardan bo‘lishni istaymiz».",
 114: "Maryam o‘g‘li Iyso dedi: «Ey ALLAH, bizning Robbimiz! Bizga osmondan bir dasturxon tushirgin. U bizning avvalimizga ham, oxirimizga ham bayram va Sendan bo‘lgan oyat bo‘lsin. Bizga rizq bergin. Sen rizq beruvchilarning eng yaxshisisan».",
 115: "ALLAH dedi: «Men uni sizlarga tushiruvchiman. Bas, sizlardan keyin kim kufr keltirsa, Men uni olamlardan hech kimni azoblamaganimdek azoblayman».",
 116: "ALLAH: «Ey Maryam o‘g‘li Iyso! Odamlarga: «Meni va onamni ALLAHdan boshqa ikki iloh qilib olinglar», deb aytdingmi?» deganida, u dedi: «Sen poksan! Men haqim bo‘lmagan narsani aytishim mumkin emas. Agar aytganimda, Sen uni bilgan bo‘larding. Sen qalbimdagini bilasan, men esa Sening huzuringdagi narsani bilmayman. Albatta, Sen g‘ayblarni Biluvchisan».",
 117: "«Men ularga faqat Sen menga buyurgan narsani aytdim: «Mening ham, sizlarning ham Robbingiz bo‘lgan ALLAHga ibodat qilinglar». Ular orasida bo‘lganimda ularga guvoh edim. Sen meni vafot ettirganingdan keyin esa, ularning ustidan Kuzatuvchi Sen bo‘lding. Sen har narsaga Guvohsan».",
 118: "«Agar ularni azoblasang, ular Sening bandalaringdir. Agar ularni mag‘firat qilsang, albatta Sen G‘olib va Hikmat Egasisan».",
 119: "ALLAH dedi: «Bu rostgo‘ylarga rostgo‘yliklari foyda beradigan kundir. Ular uchun ostidan anhorlar oqadigan jannatlar bordir. Ular unda abadiy qoladilar. ALLAH ulardan rozi bo‘ldi, ular ham Undan rozi bo‘ldilar. Bu ulkan najotdir».",
 120: "Osmonlaru yer va ulardagi barcha narsalar hukmronligi ALLAH uchundir. U har narsaga qodirdir.",   
    },
 6: {
  1: "Hamd osmonlar va yerni yaratgan, zulmatlar va nurni qilgan ALLAH uchundir. So‘ngra kofir bo‘lganlar Robbilariga tenglashtiradilar.",

2: "U sizlarni loydan yaratgan Zotdir. So‘ngra bir muddat belgiladi. Belgilangan muddat Uning huzuridadir. Shundan keyin ham sizlar shubha qilasizlar.",

3: "U osmonlarda ham, yerda ham ALLAHdir. U sizlarning yashirganingizni ham, oshkor qilganingizni ham biladi va nima kasb qilayotganingizni ham biladi.",

4: "Ularga Robbilarining oyatlaridan biror oyat kelganida, ular undan yuz o‘giruvchi bo‘ldilar.",

5: "Haq kelganida uni yolg‘on dedilar. Bas, ular masxara qilgan narsalarining xabari ularga keladi.",

6: "Ulardan oldin qancha avlodlarni halok qilganimizni ko‘rmadilarmi? Biz ularga yer yuzida sizlarga bermagan imkoniyatlarni bergan edik. Ularga osmondan mo‘l yomg‘ir yubordik va ostlaridan anhorlar oqizdik. So‘ng ularni gunohlari sababli halok qildik va ulardan keyin boshqa avlodlarni paydo qildik.",

7: "Agar Biz senga qog‘ozga yozilgan bir Kitob tushirganimizda va ular uni qo‘llari bilan ushlaganlarida ham, kofir bo‘lganlar: «Bu faqat ochiq sehrdir», degan bo‘lardilar.",

8: "Ular: «Unga bir malaika tushirilsa edi», dedilar. Agar Biz malaika tushirganimizda, ish hal qilingan bo‘lardi va ularga muhlat berilmas edi.",

9: "Agar uni malaika qilganimizda ham, uni inson suratida qilgan bo‘lardik va ularni yana o‘zlari shubha qilgan narsaga solib qo‘ygan bo‘lardik.",

10: "Sendan oldingi Rasulchilar ham masxara qilingan edilar. Bas, ularni masxara qilganlarni o‘zlari masxara qilgan narsa o‘rab oldi.",

11: "Ayting: «Yer yuzida sayr qilinglar va yolg‘onchilarning oqibati qanday bo‘lganini ko‘ringlar».",

12: "Ayting: «Osmonlaru yerda bor narsalar kimniki?» Ayting: «ALLAHniki». U O‘ziga rahmatni yozib qo‘ydi. Albatta, U sizlarni qiyomat kunida, unda hech qanday shubha yo‘q, jamlaydi. O‘zlarini ziyon qilganlar ana o‘shalar iymon keltirmaydilar.",

13: "Kecha va kunduzda orom oladigan narsalar Unikidir. U Eshituvchi va Biluvchidir.",

14: "Ayting: «Osmonlaru yerning yaratuvchisi bo‘lgan ALLAHdan o‘zgasini do‘st tutaymi? U taom beradi, O‘zi taom berilmaydi». Ayting: «Men musulmonlarning birinchisi bo‘lishga buyurildim va mushriklardan bo‘lma, deb buyurildim».",

15: "Ayting: «Agar Robbimga osiy bo‘lsam, ulkan kunning azobidan qo‘rqaman».",

16: "Kim o‘sha kunda undan burilsa, albatta ALLAH unga rahm qilgan bo‘ladi. Bu esa ochiq najotdir.",

17: "Agar ALLAH senga bir zarar yetkazsa, Uni o‘zidan boshqa ketkazuvchi yo‘qdir. Agar senga yaxshilik istasa, Uning fazlini qaytaruvchi yo‘qdir. U uni bandalaridan xohlagan kishisiga yetkazadi. U Mag‘firat qiluvchi va Rahmlidir.",

18: "U bandalari ustidan G‘olibdir. U Hikmat Egasi va Xabardordir.",

19: "Ayting: «Guvohlik jihatidan eng ulug‘ narsa nima?» Ayting: «ALLAH men bilan sizlarning orangizda guvohdir. Bu Qur’on menga sizlarni va u yetib borgan kishilarni ogohlantirishim uchun vahiy qilindi. Sizlar haqiqatan ham ALLAH bilan birga boshqa ilohlar borligiga guvohlik berasizlarmi?» Ayting: «Men guvohlik bermayman». Ayting: «U faqat Yagona Ilohdir va men sizlar shirk keltirayotgan narsalardan pokman».",

20: "Biz Kitob berganlar uni o‘z o‘g‘illarini taniganlaridek taniydilar. O‘zlarini ziyon qilganlar ana o‘shalar iymon keltirmaydilar.",
21: "ALLAHga yolg‘on to‘qigan yoki Uning oyatlarini yolg‘on degan kishidan ham zolimroq kim bor? Albatta, zolimlar najot topmaydilar.",

22: "Ularning barchasini jamlaydigan kunimizda: «Shirk keltirgan sheriklaringiz qayerda?» deymiz.",

23: "So‘ngra ularning uzrlari faqat: «Robbimiz ALLAHga qasamki, biz mushriklardan emas edik», deyishlari bo‘ladi.",

24: "Qarang, ular o‘zlariga qanday yolg‘on gapirdilar va to‘qib chiqargan narsalari ulardan qanday yo‘qoldi.",

25: "Ularning orasida seni tinglaydiganlari ham bor. Biz uni anglamasliklari uchun qalblariga pardalar va quloqlariga og‘irlik qo‘ydik. Ular barcha oyatlarni ko‘rsalar ham unga iymon keltirmaydilar. Hatto oldingga kelganlarida sen bilan bahslashadilar. Kofir bo‘lganlar: «Bu faqat oldingilarning afsonalaridir», deydilar.",

26: "Ular undan qaytaradilar va undan uzoqlashadilar. Ular faqat o‘zlarini halok qiladilar, lekin sezmaydilar.",

27: "Ularning do‘zax oldida to‘xtatilganlarini ko‘rsang edi! Ular: «Qani edi, dunyoga qaytarilsak edi, Robbimizning oyatlarini yolg‘on demas edik va mo‘minlardan bo‘lar edik», der edilar.",

28: "Yo‘q! Avval yashirgan narsalari ularga ayon bo‘ldi. Agar qaytarilsalar ham, o‘zlari man qilingan narsaga yana qaytadilar. Albatta, ular yolg‘onchilardir.",

29: "Ular: «Faqat dunyodagi hayotimiz bor, biz qayta tiriluvchi emasmiz», dedilar.",

30: "Agar ularni Robbilari huzurida turg‘izilganlarini ko‘rsang edi! U: «Bu haq emasmi?» deganida, ular: «Ha, Robbimizga qasamki», deydilar. U: «Bas, kofir bo‘lganingiz sababli azobni totib ko‘ringlar», deydi.",

31: "ALLAHga ro‘baro‘ bo‘lishni yolg‘on deganlar ziyon ko‘rdilar. Hatto ularga qiyomat to‘satdan kelganida: «Undagi beparvoligimiz uchun hasratimizga voy!» deydilar. Ular gunohlarini orqalariga yuklab oladilar. Ogoh bo‘linglar, ular yuklayotgan narsalari naqadar yomondir.",

32: "Dunyo hayoti faqat o‘yin va ko‘ngilxushlikdir. Taqvo qiluvchilar uchun oxirat diyori yaxshiroqdir. Aql ishlatmaysizlarmi?",

33: "Biz ularning aytgan gaplari seni xafa qilishini bilamiz. Ular seni yolg‘onchi demaydilar, balki zolimlar ALLAHning oyatlarini inkor qiladilar.",

34: "Sendan oldingi Rasulchilar ham yolg‘onchi qilingan edilar. Ularga yordamimiz kelgunicha ular yolg‘onchiga chiqarilishlari va ozorlanishlariga sabr qildilar. ALLAHning so‘zlarini o‘zgartiruvchi yo‘qdir. Senga Rasulchilarning xabarlari kelgan.",

35: "Agar ularning yuz o‘girishlari senga og‘ir bo‘lsa, imkoning bo‘lsa yer ostidan bir teshik yoki osmonga bir narvon izlab, ularga bir oyat keltirishing mumkin bo‘lsa, qilgin. Agar ALLAH xohlaganida ularni hidoyat ustida jamlagan bo‘lardi. Bas, johillardan bo‘lma.",

36: "Faqat eshitadiganlargina javob beradilar. O‘liklarni esa ALLAH tiriltiradi. So‘ngra Unga qaytariladilar.",

37: "Ular: «Unga Robbidan bir mo‘jiza tushirilsa edi», dedilar. Ayting: «Albatta, ALLAH mo‘jiza tushirishga qodirdir, lekin ularning ko‘plari bilmaydilar».",

38: "Yerda yuruvchi barcha jonzotlar va ikki qanoti bilan uchuvchi qushlar sizlar kabi ummatlardir. Biz Kitobda hech narsani qoldirmadik. So‘ngra ular Robbilari huzuriga jamlanadilar.",

39: "Oyatlarimizni yolg‘on deganlar kar va soqovdirlar, zulmatlardadirlar. Kimni xohlasa, ALLAH adashtiradi va kimni xohlasa, uni to‘g‘ri yo‘l ustida qiladi.",

40: "Ayting: «Agar sizlarga ALLAHning azobi kelsa yoki qiyomat sizlarga yetsa, agar rostgo‘y bo‘lsangizlar, ALLAHdan boshqasiga duo qilasizlarmi?»",
41: "Yo‘q, faqat Unga duo qilasizlar. Agar U xohlasa, siz duo qilgan narsani ketkazadi va siz shirk keltirayotgan narsalaringizni unutasizlar.",

42: "Albatta, Biz sendan oldingi ummatlarga ham Rasulchilar yubordik. Ularni qiyinchilik va zarar bilan tutdik, shoyad ular tavba qilsalar.",

43: "Bas, ularga Bizning azobimiz kelganida, nega ular yolvormadilar? Lekin qalblari qotib qoldi va shayton ularga qilgan ishlarini chiroyli ko‘rsatdi.",

44: "Ular o‘zlariga eslatilgan narsani unutganlarida, ularga barcha narsalarning eshiklarini ochib berdik. Nihoyat, ularga berilgan narsalar bilan xursand bo‘lganlarida, ularni to‘satdan ushladik. Bas, ular noumid bo‘ldilar.",

45: "Shunday qilib, zulm qilgan qavmning ildizi uzildi. Hamd olamlarning Robbi ALLAH uchundir.",

46: "Ayting: «O‘ylab ko‘ringlar, agar ALLAH quloqlaringizni va ko‘zlaringizni olib qo‘ysa hamda qalblaringizni muhrlasa, ularni ALLAHdan boshqa qaysi iloh sizlarga qaytarib beradi?» Qarang, Biz oyatlarni qanday turlicha bayon qilamiz, so‘ngra ular yuz o‘giradilar.",

47: "Ayting: «O‘ylab ko‘ringlar, agar ALLAHning azobi sizlarga to‘satdan yoki oshkora kelsa, zolim qavmdan boshqa kim halok qilinadi?»",

48: "Biz Rasulchilarni faqat xushxabar beruvchilar va ogohlantiruvchilar qilib yuboramiz. Kim iymon keltirib, o‘zini isloh qilsa, ularga qo‘rquv yo‘qdir va ular g‘amgin bo‘lmaydilar.",

49: "Oyatlarimizni yolg‘on deganlarga esa fosiqliklari sababli azob yetadi.",

50: "Ayting: «Men sizlarga ALLAHning xazinalari mening huzurimda, g‘aybni ham bilaman, sizlarga men malaikaman, deb aytmayman. Men faqat menga vahiy qilingan narsaga ergashaman». Ayting: «Ko‘r bilan ko‘ruvchi teng bo‘ladimi? Tafakkur qilmaysizlarmi?»",

51: "Robblari huzuriga jamlanishlaridan qo‘rqadiganlarni u bilan ogohlantir. Ular uchun Undan boshqa na bir do‘st, na bir shafoatchi bor. Shoyad taqvo qilsalar.",

52: "Robbilarining yuzini istab, ertayu kech Unga duo qilayotganlarni haydama. Ularning hisobidan senga hech narsa, sening hisobingdan ularga hech narsa yo‘qdir. Agar ularni haydasang, zolimlardan bo‘lib qolasan.",

53: "Shunday qilib, Biz ularning ba’zilarini ba’zilari bilan sinadik, toki ular: «ALLAH oramizdan shularni ne’mat berganmi?» desinlar. ALLAH shukr qiluvchilarni yaxshiroq biluvchi emasmi?",

54: "Oyatlarimizga iymon keltirganlar huzuringga kelganlarida: «Sizlarga tinchlik bo‘lsin! Robbingiz O‘ziga rahmatni yozib qo‘ydi. Sizlardan kim johillik bilan yomonlik qilib, so‘ngra undan keyin tavba qilsa va o‘zini tuzatsa, albatta U Mag‘firat qiluvchi va Rahmlidir», deb ayt.",

55: "Shunday qilib, jinoyatchilarning yo‘li aniq bo‘lishi uchun oyatlarni bayon qilamiz.",

56: "Ayting: «Men sizlarning ALLAHdan boshqa duo qilayotgan narsalaringizga ibodat qilishdan qaytarildim». Ayting: «Men sizlarning havoyi nafslaringizga ergashmayman. Agar ergashsam, adashgan bo‘lardim va hidoyat topganlardan bo‘lmasdim».",

57: "Ayting: «Men Robbimdan bo‘lgan ochiq dalilga asoslanaman, sizlar esa uni yolg‘on dedingizlar. Sizlar shoshayotgan narsa mening huzurimda emas. Hukm faqat ALLAHga tegishlidir. U haqni bayon qiladi va U hukm qiluvchilarning eng yaxshisidir».",

58: "Ayting: «Agar sizlar shoshayotgan narsa mening huzurimda bo‘lganida edi, albatta men bilan sizlarning oramizdagi ish hal qilingan bo‘lardi. ALLAH zolimlarni yaxshiroq biluvchidir».",

59: "G‘ayb kalitlari Uning huzuridadir. Ularni faqat U biladi. U quruqlikdagi va dengizdagi narsalarni biladi. Biror barg tushsa ham, Uni bilmasdan tushmaydi. Yer zulmatlaridagi biror don, ho‘l yoki quruq narsa ham borki, barchasi ochiq Kitobdadir.",

60: "U kechasi sizlarni vafot ettiradigan va kunduzda qilganlaringizni biladigan Zotdir. So‘ngra belgilangan muddat ado bo‘lishi uchun kunduzda sizlarni tiriltiradi. So‘ngra qaytishingiz Uning huzurigadir. Keyin U sizlarga qilgan ishlaringizni xabar qiladi.",
61: "U bandalari ustidan G‘olibdir. U sizlarga qo‘riqchilar yuboradi. Qachonki sizlardan birortangizga o‘lim kelsa, Bizning elchilarimiz uni vafot ettiradilar va ular sustkashlik qilmaydilar.",

62: "So‘ngra ular haqiqiy Egasi bo‘lgan ALLAH huzuriga qaytariladilar. Ogoh bo‘linglar! Hukm faqat Unga tegishlidir. U hisob qiluvchilarning eng tezkoridir.",

63: "Ayting: «Agar sizlarni quruqlik va dengiz zulmatlaridan: «Agar bizni bundan qutqarsang, albatta shukr qiluvchilardan bo‘lamiz», deb Unga yashirin va oshkora duo qilganingizda kim qutqaradi?»",

64: "Ayting: «Sizlarni undan va har qanday qayg‘udan ALLAH qutqaradi. So‘ngra sizlar shirk keltirasizlar».",

65: "Ayting: «U sizlarning ustingizdan yoki oyoqlaringiz ostidan azob yuborishga yoki sizlarni guruhlarga ajratib, bir-biringizning zo‘ravonligini totishga qodirdir». Qarang, Biz oyatlarni qanday turlicha bayon qilamiz, shoyad ular tushunsalar.",

66: "Qavming esa uni yolg‘on dedi. Holbuki, u haqdir. Ayting: «Men sizlarga vakil emasman».",

67: "Har bir xabarning belgilangan vaqti bor. Tez orada bilib olasizlar.",

68: "Agar oyatlarimiz haqida masxara bilan gapirayotganlarni ko‘rsang, ular boshqa gapga o‘tmagunlaricha ulardan yuz o‘gir. Agar shayton seni unuttirsa, eslaganingdan keyin zolim qavm bilan birga o‘tirma.",

69: "Taqvo qiluvchilarga ularning hisobidan hech narsa yuklanmaydi. Lekin eslatishlari mumkin, shoyad ular taqvo qilsalar.",

70: "Dini bilan o‘yin va ko‘ngilxushlik qilgan hamda dunyo hayoti aldab qo‘yganlarni tark qil. U bilan eslatginki, hech bir jon qilgan ishi sabab halokatga tashlanib qolmasin. Uning uchun ALLAHdan boshqa na bir do‘st va na bir shafoatchi bor. U har qanday fidyani bersa ham, undan qabul qilinmaydi. Ana o‘shalar qilgan ishlari sabab halokatga tashlanganlardir. Kofir bo‘lganlari sababli ular uchun qaynoq suvdan ichimlik va alamli azob bordir.",

71: "Ayting: «ALLAHni qo‘yib, bizga foyda ham, zarar ham yetkaza olmaydigan narsalarga duo qilaylikmi? ALLAH bizni hidoyat qilganidan keyin ortimizga qaytaylikmi? Shaytonlar yer yuzida hayratda qolgan holda chaqirayotgan kishidek bo‘laylikmi?» Ayting: «Albatta, ALLAHning hidoyati haqiqiy hidoyatdir. Biz olamlarning Robbiga bo‘ysunishga buyurildik».",

72: "«Namozni ado etinglar va Undan qo‘rqinglar». U Zot huzuriga jamlanadigan Zotdir.",

73: "U osmonlaru yerni haq ila yaratgan Zotdir. «Bo‘l», degan kuni u bo‘ladi. Uning so‘zi haqdir. Sur chalinadigan kuni hukmronlik Unikidir. U g‘aybni ham, oshkorani ham Biluvchidir. U Hikmat Egasi va Xabardordir.",

74: "Ibrohim otasi Ozarga: «Butlarni ilohlar qilib olasanmi? Albatta, men seni va qavmingni ochiq zalolatda ko‘raman», deganida eslang.",

75: "Shunday qilib, Biz Ibrohimga osmonlaru yerning hukmronligini ko‘rsatdik, toki u aniq ishonuvchilardan bo‘lsin.",

76: "Bas, kecha uni qorong‘ilik qoplaganida bir yulduzni ko‘rdi. U: «Bu mening Robbim», dedi. U botganida esa: «Men botuvchilarni sevmayman», dedi.",

77: "Oy chiqayotganini ko‘rib: «Bu mening Robbim», dedi. U botganida: «Agar Robbim meni hidoyat qilmasa, albatta adashgan qavmdan bo‘laman», dedi.",

78: "Quyosh chiqayotganini ko‘rib: «Bu mening Robbim, bu kattaroq», dedi. U botganida: «Ey qavmim! Men sizlar shirk keltirayotgan narsalardan pokman», dedi.",

79: "«Men yuzimni osmonlaru yerni yaratgan Zotga, to‘g‘ri yo‘lga moyil holda burdim va men mushriklardan emasman».",

80: "Qavmi u bilan bahslashdi. U dedi: «ALLAH meni hidoyat qilgan bo‘lsa, U haqda men bilan bahslashasizlarmi? Men Unga shirk keltirayotgan narsalaringizdan qo‘rqmayman, faqat Robbim biror narsani xohlasa bundan mustasno. Robbimning ilmi har narsani qamrab olgan. Nahotki eslatma olmaysizlar?»",
81: "Sizlar ALLAHga shirk keltirayotgan narsalardan qanday qo‘rqay? Holbuki, sizlar U sizlarga hech qanday dalil tushirmagan narsalarni Unga sherik qilayotgan bo‘lsangizlar. Agar bilsangizlar, ikki guruhdan qaysi biri xavfsizlikka haqliroqdir?",

82: "Iymon keltirgan va iymonlarini zulm bilan aralashtirmaganlar — ana o‘shalarga xavfsizlik bor va ular hidoyat topganlardir.",

83: "Bu Bizning Ibrohimga o‘z qavmiga qarshi bergan hujjatimizdir. Biz xohlagan kishilarimizni darajalarga ko‘taramiz. Albatta, Robbing Hikmat Egasi va Biluvchidir.",

84: "Biz unga Ishoq va Ya’qubni berdik. Barchasini hidoyat qildik. Oldin Nuhni ham hidoyat qilgan edik. Uning zurriyotidan Dovud, Sulaymon, Ayyub, Yusuf, Muso va Horunni ham. Shunday qilib, Biz yaxshilik qiluvchilarni mukofotlaymiz.",

85: "Zakariyo, Yahyo, Iyso va Ilyosni ham. Barchalari solihlardandir.",

86: "Ismoil, Alyasa’, Yunus va Lutni ham. Barchalarini olamlardan ustun qildik.",

87: "Ularning otalari, zurriyotlari va birodarlaridan ba’zilarini ham. Biz ularni tanladik va to‘g‘ri yo‘lga hidoyat qildik.",

88: "Bu ALLAHning hidoyatidir. U bilan bandalaridan xohlagan kishisini hidoyat qiladi. Agar ular shirk keltirganlarida edi, qilgan amallari bekor bo‘lgan bo‘lardi.",

89: "Ana o‘shalar Biz ularga Kitob, hukm va payg‘ambarlik bergan kishilardir. Agar ular unga kofir bo‘lsalar, Biz uni kofir bo‘lmaydigan bir qavmga topshirganmiz.",

90: "Ana o‘shalar ALLAH hidoyat qilgan kishilardir. Bas, ularning hidoyatiga ergash. Ayting: «Men buning uchun sizlardan haq so‘ramayman. Bu faqat olamlar uchun eslatmadir».",

91: "Ular: «ALLAH hech bir insonga hech narsa tushirmagan», deb ALLAHni haqiqiy qadri bilan qadrlamadilar. Ayting: «Muso odamlar uchun nur va hidoyat bo‘lgan Kitobni kim tushirdi? Sizlar uni qog‘ozlarga yozib, ayrimini ko‘rsatasizlar, ko‘pini yashirasizlar. Sizlarga sizlar ham, ota-bobolaringiz ham bilmagan narsalar o‘rgatilgan edi». Ayting: «ALLAH». So‘ng ularni o‘z botil gaplarida o‘ynab yurishlariga qo‘yib qo‘ying.",

92: "Bu Biz nozil qilgan muborak Kitobdir. U o‘zidan oldingi narsalarni tasdiqlovchidir. Sen Ummul Quro va uning atrofidagilarni ogohlantirishing uchundir. Oxiratga iymon keltiradiganlar unga iymon keltiradilar va ular namozlarini saqlaydilar.",

93: "ALLAHga yolg‘on to‘qigan yoki o‘ziga hech narsa vahiy qilinmagan bo‘lsa ham: «Menga vahiy qilindi», degan va: «Men ham ALLAH nozil qilgan narsaga o‘xshash narsani tushiraman», degan kishidan ham zolimroq kim bor? Zolimlarni o‘lim og‘irliklari ichida bo‘lganida ko‘rsang edi. Malaikalar qo‘llarini uzatib: «Jonlaringizni chiqaringlar! Bugun ALLAH haqida nohaq gapirganingiz va Uning oyatlaridan kibrlanganingiz sabab xorlik azobi bilan jazolanasizlar», deydilar.",

94: "Sizlar Bizga yolg‘iz holda kelgansizlar, xuddi sizlarni avval yaratganimizdek. Sizlarga bergan narsalarimizni ortingizda qoldirgansizlar. Sizlar bilan birga shafoatchilar deb o‘ylagan sheriklaringizni ko‘rmayapmiz. Orangiz uzildi va da’vo qilgan narsalaringiz sizlardan yo‘qoldi.",

95: "Albatta, don va urug‘ni yoruvchi hamda tirikni o‘likdan, o‘likni tirikdan chiqaruvchi ALLAHdir. Ana shunday Zot bo‘lsa, qanday yuz o‘girasizlar?",

96: "U tongni yoruvchi Zotdir. U tunni orom uchun, quyosh va oyni hisob uchun qildi. Bu G‘olib va Biluvchi Zotning o‘lchovidir.",

97: "U sizlar uchun yulduzlarni quruqlik va dengiz zulmatlarida yo‘l topishingiz uchun yaratgan. Biladigan qavm uchun oyatlarni batafsil bayon qildik.",

98: "U sizlarni bir jondan yaratgan Zotdir. So‘ngra (sizlar uchun) bir joy va saqlanadigan joy bor. Anglaydigan qavm uchun oyatlarni batafsil bayon qildik.",

99: "U osmondan suv tushirgan Zotdir. Bas, u bilan har narsaning o‘simligini chiqardik. Undan yashil o‘simlik chiqardik, undan esa bir-birining ustiga chiqadigan donlarni chiqardik. Xurmo daraxtlarining gullaridan osilib turadigan shingillar, uzum bog‘lari, zaytun va anorlar — bir-biriga o‘xshash va o‘xshamagan holda chiqaramiz. Uning mevasiga, u meva berganida va pishganida qaranglar. Albatta, bunda iymon keltiradigan qavm uchun oyatlar bordir.",

100: "Ular jinlarni ALLAHga sherik qildilar, holbuki U ularni yaratgan. Bilimsiz holda Unga o‘g‘illar va qizlar nisbat berdilar. U pok va ular sifatlayotgan narsalardan yuksakdir.",
101: "U osmonlar va yerning yaratuvchisidir. Uning farzandi bo‘lmasa, qanday qilib farzandi bo‘lishi mumkin? Har narsani U yaratgan. U har narsani Biluvchidir.",

102: "Mana shu sizlarning Robbingiz bo‘lgan ALLAHdir. Undan o‘zga iloh yo‘qdir. U har narsaning Yaratuvchisidir. Bas, Unga ibodat qilinglar. U har narsaning vakilidir.",

103: "Ko‘zlar Uni idrok eta olmaydi, U esa ko‘zlarni idrok etadi. U Latif va Xabardordir.",

104: "Sizlarga Robbingizdan dalillar keldi. Bas, kim ko‘rsa, o‘zi uchun ko‘radi. Kim ko‘r bo‘lsa, o‘z zarariga bo‘ladi. Men sizlarga qo‘riqchi emasman.",

105: "Shunday qilib, Biz oyatlarni turlicha bayon qilamiz, toki ular: «Sen o‘rganding», desinlar va biladigan qavmga uni bayon qilamiz.",

106: "Robbingdan senga vahiy qilingan narsaga ergash. Undan o‘zga iloh yo‘qdir. Mushriklardan yuz o‘gir.",

107: "Agar ALLAH xohlaganida, ular shirk keltirmagan bo‘lardilar. Biz seni ular ustidan qo‘riqchi qilib qo‘ymadik va sen ular ustidan vakil emassan.",

108: "Ularning ALLAHdan boshqa duo qilayotganlarini so‘kmanglar. Aks holda, ular ham bilmasdan haddan oshib ALLAHni so‘kib qo‘yadilar. Shunday qilib, har bir ummatga o‘z amalini chiroyli ko‘rsatdik. So‘ngra ularning qaytishi Robblari huzurigadir. U ularga qilgan ishlarini xabar qiladi.",

109: "Ular ALLAH nomi bilan qattiq qasam ichdilar: «Agar ularga bir oyat kelsa, albatta unga iymon keltiradilar», deb. Ayting: «Oyatlar faqat ALLAH huzuridadir». Sizlarga u kelganida ham iymon keltirmasliklarini nima bildiradi?",

110: "Biz ularning qalblari va ko‘zlarini avval unga iymon keltirmaganlari sababli o‘zgartirib qo‘yamiz va ularni o‘z tug‘yonlarida sarson holda qoldiramiz.",

111: "Agar Biz ularga malaikalarni tushirsak, o‘liklar ular bilan gaplashsa va har narsani ularning oldiga jamlasak ham, agar ALLAH xohlamasa, ular iymon keltirmaydilar. Lekin ularning ko‘plari jaholat qiladilar.",

112: "Shunday qilib, har bir payg‘ambarga inson va jin shaytonlaridan bo‘lgan dushmanlar qildik. Ularning ba’zilari ba’zilariga aldov uchun bezatilgan so‘zlarni vahiy qiladilar. Agar Robbing xohlaganida, ular bunday qilmagan bo‘lardilar. Bas, ularni to‘qib chiqarayotgan narsalari bilan yolg‘iz qo‘y.",

113: "Oxiratga iymon keltirmaydiganlarning qalblari unga moyil bo‘lishi, undan rozi bo‘lishi va qilayotgan narsalarini qilishlari uchun.",

114: "Ayting: «ALLAHdan o‘zga hakam izlaymi? Holbuki, U sizlarga Kitobni batafsil bayon qilingan holda nozil qilgan Zotdir». Biz Kitob berganlar uni Robbingdan bo‘lgan haq ekanini biladilar. Bas, shubha qiluvchilardan bo‘lma.",

115: "Robbingning so‘zi rostlik va adolat jihatidan mukammal bo‘ldi. Uning so‘zlarini o‘zgartiruvchi yo‘qdir. U Eshituvchi va Biluvchidir.",

116: "Agar yer yuzidagilarning ko‘pchiligiga itoat qilsang, seni ALLAHning yo‘lidan adashtiradilar. Ular faqat gumonga ergashadilar va faqat taxmin qiladilar.",

117: "Albatta, Robbing Uning yo‘lidan kim adashganini ham, kim hidoyatda ekanini ham yaxshiroq biluvchidir.",

118: "Agar Uning oyatlariga iymon keltiruvchilar bo‘lsangizlar, ustiga ALLAHning nomi zikr qilingan narsalardan yenglar.",

119: "Sizlarga nima bo‘ldiki, ustiga ALLAHning nomi zikr qilingan narsalardan yemaysizlar? Holbuki, U sizlarga harom qilgan narsalarini batafsil bayon qilib bergan, faqat majbur bo‘lgan holatingiz bundan mustasno. Albatta, ko‘plar bilimsiz holda o‘z havoyi nafslariga ergashib adashtiradilar. Robbing haddan oshuvchilarni yaxshiroq biluvchidir.",

120: "Gunohning oshkorasini ham, yashirinini ham tark qilinglar. Albatta, gunoh qiluvchilar qilgan ishlari sababli jazolanadilar.",
121: "Ustiga ALLAHning nomi zikr qilinmagan narsalardan yemanglar. Albatta, bu fosiqlikdir. Shaytonlar sizlar bilan bahslashish uchun o‘z do‘stlariga vahiy qiladilar. Agar ularga itoat qilsangizlar, albatta mushriklardan bo‘lasizlar.",

122: "O‘lik bo‘lgan bir kishi Biz uni tiriltirib, unga odamlar orasida yuradigan nur berganimiz, zulmatlarda qolib undan chiqolmayotgan kishiga o‘xshaydimi? Kofirlarga qilayotgan ishlari shunday bezatilgan.",

123: "Shuningdek, har bir shaharda uning jinoyatchilarini u yerda makr qilishlari uchun kattalar qilib qo‘ydik. Ular faqat o‘zlariga makr qiladilar, lekin sezmaydilar.",

124: "Ularga bir oyat kelganida: «ALLAHning Rasulchilariga berilgan narsaga o‘xshashi bizga ham berilmaguncha aslo iymon keltirmaymiz», deydilar. ALLAH o‘z risolatini qayerga qo‘yishni yaxshiroq biluvchidir. Jinoyat qilganlarga qilgan makrlari sababli ALLAH huzurida xorlik va qattiq azob yetadi.",

125: "ALLAH kimni hidoyat qilishni istasa, uning ko‘ksini Islom uchun keng qiladi. Kimni adashtirishni istasa, uning ko‘ksini go‘yo osmonga ko‘tarilayotgandek tor va siqilgan qiladi. Shunday qilib, ALLAH iymon keltirmaydiganlarga nopoklikni qo‘yadi.",

126: "Bu Robbingning to‘g‘ri yo‘lidir. Biz eslatma oladigan qavm uchun oyatlarni batafsil bayon qildik.",

127: "Ular uchun Robblari huzurida tinchlik diyori bordir. U qilgan amallari sababli ularning do‘stidir.",

128: "Ularning barchasini jamlaydigan kunida: «Ey jinlar jamoasi! Sizlar insonlardan ko‘plarini oldingiz», deydi. Ularning insonlardan bo‘lgan do‘stlari: «Ey Robbimiz! Biz bir-birimizdan foydalandik va Sen biz uchun belgilagan muddatimizga yetdik», deydilar. U aytadi: «Sizlarning joyingiz do‘zaxdir. ALLAH xohlaganidan boshqa unda abadiy qoluvchisizlar». Albatta, Robbing Hikmat Egasi va Biluvchidir.",

129: "Shunday qilib, qilgan ishlari sababli ba’zi zolimlarni ba’zilariga do‘st qilib qo‘yamiz.",

130: "Ey jinlar va insonlar jamoasi! Sizlarga o‘zlaringizdan bo‘lgan Rasulchilar kelib, sizlarga oyatlarimni aytib, mana shu kuningizga ro‘baro‘ bo‘lishingizdan ogohlantirmadimi? Ular: «O‘zimizga qarshi guvohlik beramiz», deydilar. Ularni dunyo hayoti aldadi va ular kofir bo‘lganliklariga o‘zlari qarshi guvohlik berdilar.",

131: "Bu shundandirki, Robbing shaharlarni ahli bexabar holda zulm bilan halok qiluvchi emasdir.",

132: "Har birining qilgan amallariga yarasha darajalari bordir. Robbing ularning qilayotgan ishlaridan bexabar emas.",

133: "Robbing Boy va rahmat Egasi. Agar xohlasa, sizlarni ketkazib, o‘rningizga xohlagan kishilarini keltiradi, xuddi sizlarni boshqa qavm zurriyotidan yaratgani kabi.",

134: "Sizlarga va’da qilinayotgan narsa albatta keluvchidir. Sizlar uni to‘sa olmaysizlar.",

135: "Ayting: «Ey qavmim! O‘z holatingizcha amal qilinglar. Men ham amal qiluvchiman. Tez orada kim uchun oxirat diyori bo‘lishini bilib olasizlar. Albatta, zolimlar najot topmaydilar».",

136: "Ular ALLAH yaratgan ekin va chorvalardan Unga bir ulush ajratdilar va o‘z gumonlaricha: «Bu ALLAH uchun, bu esa sheriklarimiz uchundir», dedilar. Sheriklari uchun bo‘lgan narsa ALLAHga yetmaydi, ALLAH uchun bo‘lgan narsa esa sheriklariga yetadi. Qanday yomon hukm qiladilar!",

137: "Shuningdek, ularning sheriklari ko‘p mushriklarga farzandlarini o‘ldirishni chiroyli ko‘rsatdilar, toki ularni halok qilsinlar va dinlarini aralashtirib yuborsinlar. Agar ALLAH xohlaganida, ular bunday qilmagan bo‘lardilar. Bas, ularni to‘qib chiqarayotgan narsalari bilan yolg‘iz qo‘y.",

138: "Ular o‘z gumonlaricha: «Mana bu chorvalar va ekinlar haromdir, ularni faqat biz xohlagan kishilar yeydi», dedilar. Ba’zi chorvalarning ustiga minib bo‘lmaydi, ba’zilarining ustiga esa ALLAH nomini zikr qilmaydilar. Ularning bularni to‘qib chiqarishlari sababli U ularga jazo beradi.",

139: "Ular: «Bu chorvalarning qornidagi narsalar faqat erkaklarimiz uchun, xotinlarimizga esa haromdir», dedilar. Agar u o‘lik tug‘ilsa, ular bunga sherikdirlar. ALLAH ularning bu sifatlashlari sababli jazolaydi. Albatta, U Hikmat Egasi va Biluvchidir.",

140: "Bilimsizlik sababli o‘z farzandlarini o‘ldirgan va ALLAH bergan rizqni ALLAHga yolg‘on to‘qib harom qilganlar, albatta ziyon ko‘rdilar. Ular adashdilar va hidoyat topmadilar.",
141: "U panjarali va panjarasiz bog‘larni, ta’mlari turlicha xurmo va ekinlarni, zaytun va anorlarni — bir-biriga o‘xshash va o‘xshamagan holda yaratgan Zotdir. Mevasi pishganida undan yenglar va hosil kuni uning haqqini beringlar. Isrof qilmanglar. Albatta, U isrof qiluvchilarni sevmaydi.",

142: "U chorvalardan yuk tashiydigan va so‘yish uchun boqiladiganlarini yaratdi. ALLAH sizlarga bergan rizqlardan yenglar va shaytonning izlariga ergashmanglar. Albatta, u sizlarga ochiq dushmandir.",

143: "Sakkiz juftni yaratdi: qo‘ydan ikki va echkidan ikki. Ayting: «Ikki erkagini harom qildimi yoki ikki urg‘ochisini, yoki ikki urg‘ochining bachadonlari ichidagi narsani?» Agar rostgo‘y bo‘lsangizlar, ilm bilan menga xabar beringlar.",

144: "Tuyadan ikki va sigirdan ikki. Ayting: «Ikki erkagini harom qildimi yoki ikki urg‘ochisini, yoki ikki urg‘ochining bachadonlari ichidagi narsani? Yoki ALLAH sizlarga shuni buyurganida guvoh bo‘lganmidingizlar?» Bilimsiz holda odamlarni adashtirish uchun ALLAHga yolg‘on to‘qigan kishidan ham zolimroq kim bor? Albatta, ALLAH zolim qavmni hidoyat qilmaydi.",

145: "Ayting: «Menga vahiy qilingan narsada yeyuvchi uchun harom qilingan narsani topmayapman, faqat o‘lik hayvon, oqib chiqqan qon, cho‘chqa go‘shti — albatta u najosatdir — va ALLAHdan boshqasi uchun atab so‘yilgan fosiqlikdan boshqa». Kim majbur bo‘lsa, haddan oshmagan va tajovuz qilmagan holda, albatta Robbing Mag‘firat qiluvchi va Rahmlidir.",

146: "Yahudiy bo‘lganlarga barcha tirnoqli hayvonlarni harom qildik. Sigir va qo‘yning esa orqa, ichak yoki suyaklariga yopishganidan boshqa yog‘larini ularga harom qildik. Bu ularning zulmlari sababli ularga bergan jazomizdir. Albatta, Biz rostgo‘ymiz.",

147: "Agar seni yolg‘onchiga chiqarsalar, ayt: «Robbingiz keng rahmat Egasi, lekin Uning azobi jinoyatchi qavmdan qaytarilmaydi».",

148: "Mushriklar: «Agar ALLAH xohlaganida, biz ham, ota-bobolarimiz ham shirk keltirmagan va hech narsani harom qilmagan bo‘lardik», deydilar. Ulardan oldingilar ham shunday yolg‘on dedilar va oxiri Bizning azobimizni totib ko‘rdilar. Ayting: «Sizlarda bizga ko‘rsatadigan biror ilm bormi? Sizlar faqat gumonga ergashasizlar va faqat taxmin qilasizlar».",

149: "Ayting: «Mukammal hujjat ALLAH uchundir. Agar U xohlasa, barchangizni hidoyat qilgan bo‘lardi».",

150: "Ayting: «Guvohlaringizni olib kelinglar, ular ALLAH buni harom qilganiga guvohlik bersinlar». Agar ular guvohlik bersalar ham, ular bilan birga guvohlik bermang va oyatlarimizni yolg‘on degan hamda oxiratga iymon keltirmaganlarning havoyi nafslariga ergashmang. Ular Robbilariga tenglashtiradilar.",

151: "Ayting: «Kelinglar, Robbingiz sizlarga harom qilgan narsalarni o‘qib beraman: Unga hech narsani shirk keltirmanglar, ota-onaga yaxshilik qilinglar, kambag‘allik sabab farzandlaringizni o‘ldirmanglar — Biz sizlarni ham, ularni ham rizqlantiramiz — oshkora va yashirin buzuqliklarga yaqinlashmanglar, ALLAH harom qilgan jonni haqdan boshqa sabab bilan o‘ldirmanglar. Mana shular sizlarga buyurgan narsalaridir, shoyad aql yurgizsangizlar».",

152: "Yetimning moliga, u balog‘atiga yetmagunicha, faqat eng yaxshi yo‘l bilan yaqinlashinglar. O‘lchov va tarozini adolat bilan to‘liq qilinglar. Biz hech bir jonni imkonidan tashqari narsaga taklif qilmaymiz. Gapirganingizda, qarindosh bo‘lsa ham adolatli bo‘linglar. ALLAHning ahdiga vafo qilinglar. Mana shular U sizlarga buyurgan narsalardir, shoyad eslasangizlar.",

153: "Bu Mening to‘g‘ri yo‘limdir. Bas, unga ergashinglar. Boshqa yo‘llarga ergashmanglar, aks holda ular sizlarni Uning yo‘lidan ajratadi. Mana shular U sizlarga buyurgan narsalardir, shoyad taqvo qilsangizlar.",

154: "So‘ngra Biz Musoga Kitobni yaxshilik qilgan kishiga ne’matni to‘ldirish, barcha narsani batafsil bayon qilish, hidoyat va rahmat sifatida berdik. Shoyad ular Robbilariga ro‘baro‘ bo‘lishlariga iymon keltirsalar.",

155: "Bu Biz nozil qilgan muborak Kitobdir. Bas, unga ergashinglar va taqvo qilinglar, shoyad sizlarga rahm qilinsa.",

156: "«Kitob faqat bizdan oldingi ikki toifaga nozil qilingan edi, biz esa ularning o‘qishidan bexabar edik», demasligingiz uchun.",

157: "Yoki: «Agar bizga Kitob nozil qilinganida edi, ulardan ko‘ra ko‘proq hidoyatda bo‘lardik», demasligingiz uchun. Bas, sizlarga Robbingizdan ochiq dalil, hidoyat va rahmat keldi. ALLAHning oyatlarini yolg‘on degan va ulardan yuz o‘girgan kishidan ham zolimroq kim bor? Oyatlarimizdan yuz o‘girganlarni yuz o‘girganlari sababli yomon azob bilan jazolaymiz.",

158: "Ular faqat malaikalar kelishini yoki Robbing kelishini yoki Robbingning ba’zi oyatlari kelishini kutmoqdalar. Robbingning ba’zi oyatlari keladigan kuni ilgari iymon keltirmagan yoki iymonida yaxshilik qilmagan kishiga iymoni foyda bermaydi. Ayting: «Kutinglar, biz ham kutuvchilarmiz».",

159: "Dinlarini bo‘lib, guruhlarga ajralganlar bilan sening hech qanday aloqang yo‘qdir. Ularning ishi faqat ALLAHgadir. So‘ngra U ularga qilgan ishlarini xabar qiladi.",

160: "Kim bir yaxshilik bilan kelsa, unga o‘n barobar ko‘paytirib beriladi. Kim bir yomonlik bilan kelsa, faqat uning mislicha jazolanadi. Ularga zulm qilinmaydi.",
161: "Ayting: «Albatta, Robbim meni to‘g‘ri yo‘lga — haq dinga, to‘g‘ri yo‘lga moyil bo‘lgan Ibrohimning diniga hidoyat qildi. U mushriklardan emas edi».",

162: "Ayting: «Albatta, mening namozim, qurbonligim, hayotim va o‘limim olamlarning Robbi ALLAH uchundir».",

163: "«Uning sherigi yo‘qdir. Men shunga buyurildim va men musulmonlarning birinchisiman».",

164: "Ayting: «ALLAH har narsaning Robbi bo‘lsa ham, Undan boshqa Robb izlaymi? Har bir jon faqat o‘ziga qarshi bo‘lgan narsani kasb qiladi. Hech bir yuk ko‘taruvchi boshqa birining yukini ko‘tarmaydi. So‘ngra qaytishingiz Robbingiz huzurigadir. U sizlarga ixtilof qilgan narsalaringizni xabar qiladi».",

165: "U sizlarni yer yuzining xalifalari qilgan va sizlarga bergan narsalarida sinash uchun ba’zilaringizni ba’zilaridan daraja jihatidan ustun qilgan Zotdir. Albatta, Robbing jazosi tezdir va albatta, U Mag‘firat qiluvchi va Rahmlidir.",
      },
7: {
 1: "Alif, Lom, Mim, Sod.",

2: "Bu senga nozil qilingan Kitobdir. Bas, ko‘ksingda undan biror tanglik bo‘lmasin. U bilan ogohlantirishing va mo‘minlarga eslatma bo‘lishi uchundir.",

3: "Robbingizdan sizlarga nozil qilingan narsaga ergashinglar va Undan o‘zga do‘stlarga ergashmanglar. Qanchalar oz eslatma olasizlar.",

4: "Biz qancha shaharlarni halok qildik. Ularga azobimiz kechasi yoki kunduzgi orom paytlarida keldi.",

5: "Ularga azobimiz kelganida, ularning so‘zlari faqat: «Albatta, biz zolim bo‘lgan edik», deganlari bo‘ldi.",

6: "Albatta, Biz ularga Rasul yuborilganlarni ham, yuborilgan Rasulchilarni ham so‘raymiz.",

7: "Biz ularga ilm bilan bayon qilamiz. Biz ulardan g‘oyib bo‘lgan emas edik.",

8: "O‘sha kuni tarozi haqdir. Kimning tarozilari og‘ir kelsa, ana o‘shalar najot topuvchilardir.",

9: "Kimning tarozilari yengil kelsa, ana o‘shalar oyatlarimizga zulm qilganlari sababli o‘zlarini ziyon qilganlardir.",

10: "Albatta, Biz sizlarni yer yuzida joylashtirdik va sizlar uchun unda yashash vositalarini qildik. Qanchalar oz shukr qilasizlar.",

11: "Albatta, Biz sizlarni yaratdik, so‘ngra sizlarga shakl berdik. So‘ngra malaikalarga: «Odamga sajda qilinglar», dedik. Bas, Iblisdan boshqa barchalari sajda qildilar. U sajda qiluvchilardan bo‘lmadi.",

12: "U dedi: «Men undan yaxshiroqman. Meni olovdan yaratding, uni esa loydan yaratding».",

13: "U dedi: «Bas, undan tush. U yerda kibrlanishing senga loyiq emas. Chiq! Albatta, sen xor bo‘lganlardansan».",

14: "U dedi: «Menga ular tiriltiriladigan kungacha muhlat ber».",

15: "U dedi: «Sen muhlat berilganlardansan».",

16: "U dedi: «Meni adashtirganing sababli, albatta, men ular uchun Sening to‘g‘ri yo‘ling ustida o‘tiraman».",

17: "«So‘ngra ularga oldilaridan ham, orqalaridan ham, o‘nglaridan ham, chaplaridan ham kelaman. Ularning ko‘plarini shukr qiluvchi holda topmaysan».",

18: "U dedi: «Undan xor va quvilgan holda chiq. Ulardan kim senga ergashsa, albatta, sizlarning barchangizdan jahannamni to‘ldiraman».",

19: "Ey Odam! Sen va jufting jannatda yashanglar va xohlagan joyingizdan yenglar. Lekin bu daraxtga yaqinlashmanglar, aks holda zolimlardan bo‘lasizlar.",

20: "Bas, shayton ularga yashirin bo‘lgan joylarini ko‘rsatish uchun vasvasa qildi va dedi: «Robbingiz sizlarni bu daraxtdan faqat ikki malaika bo‘lib qolishingiz yoki abadiy yashovchilardan bo‘lishingiz uchun qaytardi».",
21: "Va u ikkoviga: «Albatta, men sizlarga chin nasihat qiluvchilardanman», deb qasam ichdi.",

22: "Shunday qilib, ularni aldab pastga tushirdi. Bas, ular daraxtni totganlarida, avratlari o‘zlariga ko‘rindi va ular jannat barglarini ustlariga yopishtira boshladilar. Robblari ularga nido qildi: «Men sizlarni bu daraxtdan qaytarmaganmidim va shayton sizlarga ochiq dushman ekanini aytmaganmidim?»",

23: "Ular dedilar: «Ey Robbimiz! Biz o‘zimizga zulm qildik. Agar Sen bizni mag‘firat qilmasang va bizga rahm qilmasang, albatta ziyon ko‘ruvchilardan bo‘lamiz».",

24: "U dedi: «Bir-biringizga dushman bo‘lgan holda tushinglar. Sizlar uchun yerda ma’lum vaqtgacha qarorgoh va foydalanish bor».",

25: "U dedi: «Unda yashaysizlar, unda o‘lasizlar va undan chiqarilasizlar».",

26: "Ey Odam farzandlari! Biz sizlarga avratlaringizni yopadigan kiyim va ziynat kiyimini tushirdik. Taqvo kiyimi esa yaxshiroqdir. Bu ALLAHning oyatlaridandir, shoyad eslasalar.",

27: "Ey Odam farzandlari! Shayton ota-onangizni jannatdan chiqargani kabi sizlarni ham fitnaga solmasin. U ikkovining avratlarini ularga ko‘rsatish uchun kiyimlarini yechgan edi. Albatta, u va uning qabilasi sizlarni ko‘rib turadi, sizlar esa ularni ko‘rmaysizlar. Albatta, Biz shaytonlarni iymon keltirmaydiganlarning do‘stlari qildik.",

28: "Ular biror buzuqlik qilganlarida: «Biz ota-bobolarimizni shunday qilayotgan holda topdik va ALLAH bizga buni buyurdi», deydilar. Ayting: «Albatta, ALLAH buzuqlikni buyurmaydi. ALLAH haqida bilmagan narsangizni gapiryapsizlarmi?»",

29: "Ayting: «Robbim adolatni buyurdi. Har bir sajda joyida yuzlaringizni Unga qaratib, dinni Unga xolis qilgan holda Unga duo qilinglar. U sizlarni avval yaratganidek, yana Unga qaytasizlar».",

30: "Bir guruhni hidoyat qildi, boshqa bir guruhga esa zalolat loyiq bo‘ldi. Chunki ular ALLAHni qo‘yib shaytonlarni do‘st tutdilar va o‘zlarini hidoyat topgan deb hisoblaydilar.",

31: "Ey Odam farzandlari! Har bir masjid oldida ziynatingizni olinglar. Yenglar, ichinglar, lekin isrof qilmanglar. Albatta, U isrof qiluvchilarni sevmaydi.",

32: "Ayting: «ALLAH bandalari uchun chiqargan ziynatni va pok rizqlarni kim harom qildi?» Ayting: «Ular dunyo hayotida iymon keltirganlar uchundir, qiyomat kunida esa faqat ular uchundir». Biladigan qavm uchun oyatlarni shunday batafsil bayon qilamiz.",

33: "Ayting: «Robbim faqat oshkora va yashirin buzuqliklarni, gunohni, nohaq tajovuzni, ALLAHga hech qanday dalil tushirmagan narsalarni sherik qilishni va ALLAH haqida bilmagan narsangizni gapirishni harom qildi».",

34: "Har bir ummat uchun muddat bor. Ularning muddati kelganda, uni bir soat ham kechiktira olmaydilar va oldinga ham sura olmaydilar.",

35: "Ey Odam farzandlari! Sizlarga orangizdan Rasulchilar kelib, oyatlarimni aytganlarida, kim taqvo qilsa va o‘zini isloh qilsa, ularga qo‘rquv yo‘qdir va ular g‘amgin bo‘lmaydilar.",

36: "Oyatlarimizni yolg‘on degan va ulardan kibrlanganlar — ana o‘shalar do‘zax ahlidirlar. Ular unda abadiy qoladilar.",

37: "ALLAHga yolg‘on to‘qigan yoki Uning oyatlarini yolg‘on degan kishidan ham zolimroq kim bor? Ularga Kitobdagi nasibalari yetadi. Nihoyat, Bizning elchilarimiz jonlarini olish uchun kelganlarida: «ALLAHdan boshqa duo qilganlaringiz qayerda?» deydilar. Ular: «Bizdan g‘oyib bo‘ldilar», deydilar va o‘zlarining kofir bo‘lganliklariga guvohlik beradilar.",

38: "U aytadi: «Sizlardan oldin o‘tgan jinlar va insonlardan bo‘lgan ummatlar qatorida do‘zaxga kiringlar». Har bir guruh kirganida, o‘zidan oldingi guruhni la’natlaydi. Nihoyat, barchalari unda jam bo‘lganlarida, keyingilari oldingilari haqida: «Ey Robbimiz! Mana bular bizni adashtirdilar. Bas, ularga do‘zaxdan ikki hissa azob ber», deydilar. U aytadi: «Har biringizga ikki hissa bordir, lekin bilmaysizlar».",

39: "Oldingilari keyingilariga: «Sizlarning bizdan ustunligingiz yo‘q. Bas, qilgan ishlaringiz sababli azobni totib ko‘ringlar», deydilar.",

40: "Albatta, oyatlarimizni yolg‘on degan va ulardan kibrlanganlarga osmon eshiklari ochilmaydi va tuya igna teshigidan o‘tmaguncha ular jannatga kirmaydilar. Jinoyatchilarni shunday jazolaymiz.",
41: "Ular uchun jahannamdan to‘shaklar va ustlaridan yopinchqlar bordir. Zolimlarni shunday jazolaymiz.",

42: "Iymon keltirgan va yaxshi amallar qilganlar — Biz hech bir jonni imkonidan tashqari narsaga taklif qilmaymiz — ana o‘shalar jannat ahlidirlar. Ular unda abadiy qoladilar.",

43: "Biz ularning ko‘ksilaridagi g‘ill-u g‘ashlarni chiqarib tashlaymiz. Ularning ostidan anhorlar oqadi. Ular: «Bizni bunga hidoyat qilgan ALLAHga hamd bo‘lsin. Agar ALLAH bizni hidoyat qilmaganida, biz hidoyat topmagan bo‘lardik. Robbimizning Rasulchilari haq bilan kelgan edilar», deydilar. Ularga: «Sizlarga meros qilib berilgan jannat mana shudir, qilgan amallaringiz sababli», deb nido qilinadi.",

44: "Jannat ahli do‘zax ahliga: «Biz Robbimiz bizga va’da qilgan narsani haq topdik. Sizlar ham Robbingiz va’da qilgan narsani haq topdingizlarmi?» deb nido qiladilar. Ular: «Ha», deydilar. So‘ngra ular orasida bir nido qiluvchi: «ALLAHning la’nati zolimlar ustiga bo‘lsin», deb e’lon qiladi.",

45: "Ular ALLAHning yo‘lidan to‘sadilar va uni egri qilishni xohlaydilar. Ular oxiratni inkor qiluvchilardir.",

46: "Ularning orasida parda bor. A’rof ustida esa har birini belgilaridan taniydigan kishilar bor. Ular jannat ahliga: «Sizlarga tinchlik bo‘lsin», deb nido qiladilar. Holbuki, ular hali unga kirmagan, lekin umid qiladilar.",

47: "Ko‘zlari do‘zax ahli tomonga burilganida: «Ey Robbimiz! Bizni zolim qavm bilan birga qilmagin», deydilar.",

48: "A’rof ahli belgilaridan tanigan kishilarga nido qilib: «Sizlarga jamlaganingiz va kibrlanganingiz foyda bermadi», deydilar.",

49: "Ana shular haqida sizlar: «ALLAH ularga rahmat yetkazmaydi», deb qasam ichgan edingizlarmi? Ularga: «Jannatga kiringlar. Sizlarga qo‘rquv yo‘q va sizlar g‘amgin bo‘lmaysizlar», deyiladi.",

50: "Do‘zax ahli jannat ahliga: «Bizlarga suvdan yoki ALLAH sizlarga bergan rizqdan to‘kinglar», deb nido qiladilar. Ular: «Albatta, ALLAH bularni kofirlarga harom qilgan», deydilar.",

51: "Ular dinlarini o‘yin va ko‘ngilxushlik qilib olganlar va dunyo hayoti aldab qo‘yganlardir. Bas, ular bugungi kunlari bilan uchrashuvni unutganlari va oyatlarimizni inkor qilganlari kabi, Biz ham ularni unutamiz.",

52: "Albatta, Biz ularga ilm bilan batafsil bayon qilingan Kitob keltirdik. U iymon keltiradigan qavm uchun hidoyat va rahmatdir.",

53: "Ular faqat uning ta’vilini kutmoqdalar. Uning ta’vili keladigan kuni oldin uni unutganlar: «Robbimizning Rasulchilari haq bilan kelgan ekan. Bizga shafoatchilar bormi, bizni shafoat qilsalar? Yoki ortga qaytarilsak, qilganimizdan boshqasini qilarmidik?» deydilar. Ular o‘zlarini ziyon qilganlar va to‘qigan narsalari ulardan yo‘qolgan.",

54: "Albatta, Robbingiz osmonlaru yerni olti kunda yaratgan, so‘ng Arsh ustida istivo qilgan ALLAHdir. U tunni kunduz bilan qoplaydi, u esa uni tezlik bilan quvadi. Quyosh, oy va yulduzlar Uning amriga bo‘ysundirilgandir. Ogoh bo‘linglar! Yaratish ham, buyurish ham Unikidir. Olamlarning Robbi ALLAH barakotlidir.",

55: "Robbingizga kamtarlik va maxfiy holda duo qilinglar. Albatta, U haddan oshuvchilarni sevmaydi.",

56: "Yer isloh qilinganidan keyin unda buzg‘unchilik qilmanglar. Unga qo‘rquv va umid bilan duo qilinglar. Albatta, ALLAHning rahmati yaxshilik qiluvchilarga yaqindir.",

57: "U shamollarni rahmati oldidan xushxabar qilib yuboradigan Zotdir. Nihoyat, ular og‘ir bulutlarni ko‘targanida, Biz uni o‘lik yerga haydaymiz va undan suv tushiramiz. So‘ngra u bilan har xil mevalarni chiqaramiz. O‘liklarni ham shunday chiqaramiz, shoyad eslasangizlar.",

58: "Yaxshi yer Robbining izni bilan o‘simligini chiqaradi. Yomon yer esa faqat qiyinchilik bilan chiqaradi. Shukr qiladigan qavm uchun oyatlarni shunday turlicha bayon qilamiz.",

59: "Albatta, Biz Nuhni o‘z qavmiga yubordik. U dedi: «Ey qavmim! ALLAHga ibodat qilinglar. Sizlar uchun Undan boshqa iloh yo‘qdir. Men sizlarga ulug‘ kun azobi kelishidan qo‘rqaman».",

60: "Qavmining boshliqlari: «Biz seni ochiq zalolatda ko‘ramiz», dedilar.",
81: "Albatta, sizlar ayollarni qo‘yib, shahvat bilan erkaklarga borasizlar. Yo‘q, sizlar haddan oshuvchi qavmsizlar.",

82: "Qavmining javobi faqat: «Ularni shahringizdan chiqarib yuboringlar. Albatta, ular poklanishni istaydigan kishilardir», deyish bo‘ldi.",

83: "Bas, Biz uni va uning oilasini najot berdik, faqat xotinidan boshqa. U qolib ketuvchilardan bo‘ldi.",

84: "Ularning ustiga yomg‘ir yog‘dirdik. Jinoyatchilarning oqibati qanday bo‘lganiga qaranglar.",

85: "Mad’yanga ularning birodari Shuaybni yubordik. U dedi: «Ey qavmim! ALLAHga ibodat qilinglar. Sizlar uchun Undan boshqa iloh yo‘qdir. Sizlarga Robbingizdan ochiq dalil keldi. Bas, o‘lchov va tarozini to‘liq qilinglar, odamlarning narsalarini kamaytirmanglar va yer isloh qilinganidan keyin unda buzg‘unchilik qilmanglar. Agar mo‘min bo‘lsangizlar, mana shu sizlar uchun yaxshiroqdir».",

86: "«Har yo‘lda qo‘rqitib o‘tirmanglar va ALLAHga iymon keltirganlarni Uning yo‘lidan to‘smanglar hamda uni egri qilishni istamanglar. Eslanglar, sizlar oz edingiz, U sizlarni ko‘paytirdi. Buzg‘unchilarning oqibati qanday bo‘lganiga qaranglar».",

87: "«Agar sizlardan bir guruhi men bilan yuborilgan narsaga iymon keltirsa, boshqa guruhi esa iymon keltirmasa, bas, ALLAH oramizda hukm qilgunicha sabr qilinglar. U hukm qiluvchilarning eng yaxshisidir».",

88: "Qavmining kibrlangan boshliqlari dedilar: «Ey Shuayb! Seni va sen bilan birga iymon keltirganlarni shahrimizdan chiqarib yuboramiz yoki bizning dinimizga qaytasizlar». U dedi: «Agar biz uni yomon ko‘rsak hammi?»",

89: "«Agar ALLAH bizni undan qutqarganidan keyin diningizga qaytsak, ALLAHga yolg‘on to‘qigan bo‘lamiz. Robbimiz ALLAH xohlamasa, unga qaytishimiz biz uchun mumkin emas. Robbimizning ilmi har narsani qamrab olgan. Biz ALLAHga tavakkul qildik. Ey Robbimiz! Biz bilan qavmimiz orasida haq ila hukm qilgin. Sen hukm qiluvchilarning eng yaxshisisan».",

90: "Qavmining kofir bo‘lgan boshliqlari dedilar: «Agar Shuaybga ergashsangizlar, albatta ziyon ko‘ruvchilardan bo‘lasizlar».",

91: "Bas, ularni zilzila tutdi va ular o‘z uylarida yuztuban holda halok bo‘ldilar.",

92: "Shuaybni yolg‘on deganlar go‘yo u yerda yashamaganlardek bo‘ldilar. Shuaybni yolg‘on deganlar ana o‘shalar ziyon ko‘ruvchilardir.",

93: "U ulardan yuz o‘girib dedi: «Ey qavmim! Men sizlarga Robbimning risolatlarini yetkazdim va sizlarga nasihat qildim. Kofir qavm uchun qanday qilib qayg‘uray?»",

94: "Biz biror shaharga payg‘ambar yuborsak, uning ahlini, shoyad yolvorgan bo‘lsalar, kamtarlik qilsinlar deb, qiyinchilik va zarar bilan tutdik.",

95: "So‘ng yomonlik o‘rniga yaxshilikni almashtirdik, hatto ular ko‘payib: «Ota-bobolarimizga ham shunday qiyinchilik va farovonlik yetgan edi», dedilar. Bas, ularni sezmagan holda to‘satdan ushladik.",

96: "Agar o‘sha shaharlarning ahli iymon keltirib, taqvo qilganlarida edi, albatta ularga osmon va yer barakotlarini ochib bergan bo‘lardik. Lekin ular yolg‘on dedilar, bas, ularni qilgan ishlari sababli ushladik.",

97: "Shaharlar ahli Bizning azobimiz ularga kechasi uxlab yotganlarida kelishidan xotirjammilar?",

98: "Yoki shaharlar ahli Bizning azobimiz ularga kunduzgi o‘yin paytlarida kelishidan xotirjammilar?",

99: "Yoki ular ALLAHning makridan xotirjam bo‘ldilarmi? ALLAHning makridan faqat ziyon ko‘ruvchi qavm xotirjam bo‘ladi.",

100: "Oldingi avlodlardan keyin yerga merosxo‘r bo‘lganlarga ma’lum bo‘lmadimi: Agar Biz xohlasak, ularni gunohlari sababli musibatga uchratamiz va qalblarini muhrlaymiz, ular esa eshitmaydilar.",
101: "Mana shu shaharlarning xabarlaridan senga aytib beramiz. Ularga Rasullarimiz ochiq dalillar bilan kelgan edilar. Lekin ular avval yolg‘on degan narsalariga iymon keltiradigan bo‘lmadilar. Shunday qilib, ALLAH kofirlarning qalblarini muhrlaydi.",

102: "Ularning ko‘pchiligida ahdga vafo topmadik. Albatta, ularning ko‘pchiligini fosiqlar deb topdik.",

103: "So‘ngra ulardan keyin Musoni oyatlarimiz bilan Fir’avn va uning boshliqlariga yubordik. Bas, ular ularga zulm qildilar. Buzg‘unchilarning oqibati qanday bo‘lganiga qarang.",

104: "Muso dedi: «Ey Fir’avn! Men olamlarning Robbi tomonidan yuborilgan Rasulman».",

105: "«ALLAH haqida faqat haqni aytishim vojibdir. Men sizlarga Robbingizdan ochiq dalil keltirdim. Bas, Bani Isroilni men bilan birga yuborgin».",

106: "U dedi: «Agar biror oyat keltirgan bo‘lsang, agar rostgo‘ylardan bo‘lsang, uni keltir».",

107: "Bas, u hassasini tashladi, birdan u ochiq ajdar bo‘ldi.",

108: "Va qo‘lini chiqardi, birdan u qarovchilar oldida oppoq bo‘lib ko‘rindi.",

109: "Fir’avn qavmining boshliqlari dedilar: «Albatta, bu bilimdon sehrgardir».",

110: "«U sizlarni yurtingizdan chiqarishni xohlaydi. Bas, nima buyurasizlar?»",

111: "Ular dedilar: «Uni va birodarini ushlab tur va shaharlarga to‘plovchilar yubor».",

112: "«Ular senga har bir bilimdon sehrgarni keltirsinlar».",

113: "Sehrgarlar Fir’avn huzuriga kelib: «Agar biz g‘olib bo‘lsak, albatta bizga mukofot bo‘ladimi?» dedilar.",

114: "U dedi: «Ha, sizlar albatta yaqinlardan bo‘lasizlar».",

115: "Ular dedilar: «Ey Muso! Sen tashlaysanmi yoki biz tashlovchilardan birinchi bo‘laylikmi?»",

116: "U dedi: «Tashinglar». Bas, ular tashlaganlarida, odamlarning ko‘zlarini sehrladilar, ularni qo‘rqitdilar va ulkan sehr keltirdilar.",

117: "Biz Musoga: «Asongni tashla», deb vahiy qildik. Bas, u ular uydirgan narsalarni yutib yubordi.",

118: "Shunday qilib, haq qaror topdi va ularning qilgan ishlari botil bo‘ldi.",

119: "Bas, ular u yerda mag‘lub bo‘ldilar va xor bo‘lgan holda qaytdilar.",

120: "Sehrgarlar esa sajda qilgan holda yiqildilar.",

121: "Ular dedilar: «Olamlarning Robbiga iymon keltirdik».",

122: "«Muso va Horunning Robbiga».",

123: "Fir’avn dedi: «Men sizlarga izn berishimdan oldin unga iymon keltirdingizmi? Albatta, bu sizlarning shaharda makr qilgan makringizdir, toki uning ahlini undan chiqarib yuboringlar. Tez orada bilib olasizlar».",

124: "«Albatta, qo‘llaringizni va oyoqlaringizni qarama-qarshi tomondan kesaman, so‘ngra barchangizni osaman».",

125: "Ular dedilar: «Albatta, biz Robbimizga qaytuvchilarmiz».",

126: "«Sen bizdan faqat Robbimizning oyatlari kelganida ularga iymon keltirganimiz uchun o‘ch olyapsan. Ey Robbimiz! Bizga sabr ato etgin va bizni musulmon holimizda vafot ettirgin».",

127: "Fir’avn qavmining boshliqlari dedilar: «Musoni va uning qavmini yer yuzida buzg‘unchilik qilishlari va seni hamda ilohlaringni tark etishlari uchun qo‘yib yuborasanmi?» U dedi: «Ularning o‘g‘illarini o‘ldiramiz, ayollarini tirik qoldiramiz. Albatta, biz ular ustidan g‘olibmiz».",

128: "Muso o‘z qavmiga dedi: «ALLAHdan yordam so‘ranglar va sabr qilinglar. Albatta, yer ALLAHnikidir. U bandalaridan xohlaganiga uni meros qiladi. Oqibat taqvo qiluvchilarnikidir».",

129: "Ular dedilar: «Sen kelishdan oldin ham, kelganingdan keyin ham biz ozorlandik». U dedi: «Robbingiz dushmaningizni halok qilishi va sizlarni yerda xalifa qilishi mumkin. So‘ng qanday amal qilishingizga qaraydi».",

130: "Albatta, Biz Fir’avn qavmini yillar qurg‘oqchilik va hosil kamayishi bilan ushladik, shoyad eslatma olsalar.",

131: "Ularga yaxshilik kelganida: «Bu biz uchundir», der edilar. Ularga yomonlik yetsa esa, Muso va u bilan birga bo‘lganlarni yomonlikka yo‘yardilar. Ogoh bo‘linglar! Ularning taqdiri faqat ALLAH huzuridadir, lekin ularning ko‘plari bilmaydilar.",

132: "Ular: «Bizni sehrlash uchun qanday oyat keltirsang ham, biz senga iymon keltiruvchilar emasmiz», dedilar.",

133: "Bas, Biz ularga to‘fon, chigirtkalar, bitlar, qurbaqalar va qon kabi batafsil oyatlarni yubordik. Lekin ular kibrlanib, jinoyatchi qavm bo‘ldilar.",

134: "Ularga azob tushganida: «Ey Muso! Robbingga biz uchun duo qil. Agar bizdan bu azobni ketkazsa, albatta senga iymon keltiramiz va Bani Isroilni sen bilan birga yuboramiz», der edilar.",

135: "Qachonki Biz ulardan belgilangan muddatgacha azobni ketkazsak, birdan ular ahdlarini buzardilar.",

136: "Bas, Biz ulardan intiqom oldik va ularni dengizga g‘arq qildik. Chunki ular oyatlarimizni yolg‘on degan va ulardan beparvo bo‘lgan edilar.",

137: "Zulm qilingan qavmni esa yerning sharq va g‘arb tomonlariga barakotli qilib qo‘ygan joylarimizga merosxo‘r qildik. Robbingning Bani Isroilga bergan go‘zal va’dasi, sabr qilganlari sababli amalga oshdi. Fir’avn va uning qavmi qilgan narsalarini va ko‘targan imoratlarini vayron qildik.",

138: "Bani Isroilni dengizdan o‘tkazdik. So‘ng ular butlariga bog‘langan bir qavm oldidan o‘tdilar. Ular: «Ey Muso! Bizga ham ularning ilohlari kabi bir iloh qilib ber», dedilar. U dedi: «Albatta, sizlar johil qavmsizlar».",

139: "«Albatta, ularning qilayotgan narsalari halokatga uchragandir va qilayotganlari botildir».",

140: "U dedi: «Sizlarni olamlardan ustun qilgan ALLAHdan o‘zgasini sizlarga iloh qilib beraymi?»",
141: "Eslanglar, Biz sizlarni Fir’avn qavmidan qutqardik. Ular sizlarni eng yomon azob bilan qiynar edilar: o‘g‘illaringizni o‘ldirar, ayollaringizni tirik qoldirar edilar. Bunda Robbingizdan ulkan sinov bor edi.",

142: "Muso bilan o‘ttiz kechaga va’dalashdik va uni yana o‘n kecha bilan to‘ldirdik. Shunday qilib, Robbisining belgilagan muddati qirq kecha bilan tugadi. Muso birodari Horunga dedi: «Qavmim orasida mening o‘rnimni egallagin, isloh qilgin va buzg‘unchilarning yo‘liga ergashmagin».",

143: "Muso belgilangan vaqtimizga kelganida va Robbi u bilan gaplashganida, u: «Ey Robbim! Menga O‘zingni ko‘rsatgin, Seni ko‘ray», dedi. U dedi: «Sen Meni ko‘ra olmaysan, lekin tog‘ga boq. Agar u o‘z joyida tursa, Meni ko‘rasan». Robbi tog‘ga tajalliy qilganida, uni parchalab tashladi va Muso hushsiz holda yiqildi. Hushiga kelganida: «Sen poksan! Senga tavba qildim va men mo‘minlarning birinchisiman», dedi.",

144: "U dedi: «Ey Muso! Men seni risolatlarim va so‘zlashim bilan odamlar ustidan tanladim. Bas, senga berganimni olgin va shukr qiluvchilardan bo‘l».",

145: "Biz unga lavhalarda har narsadan nasihat va barcha narsalarning batafsil bayonini yozdik: «Ularni mahkam tutgin va qavmingga ularning eng yaxshisini olishni buyurgin. Tez orada sizlarga fosiqlarning diyorini ko‘rsataman».",

146: "Yer yuzida nohaq kibrlanganlarni oyatlarimdan burib qo‘yaman. Ular har bir oyatni ko‘rsalar ham unga iymon keltirmaydilar. To‘g‘ri yo‘lni ko‘rsalar, uni yo‘l qilib olmaydilar. Agar zalolat yo‘lini ko‘rsalar, uni yo‘l qilib oladilar. Bu ularning oyatlarimizni yolg‘on deganlari va ulardan beparvo bo‘lganlari sababli.",

147: "Oyatlarimizni va oxirat uchrashuvini yolg‘on deganlarning amallari bekor bo‘ldi. Ular faqat qilgan ishlari sababli jazolanadilar.",

148: "Muso qavmi undan keyin o‘zlarining taqinchoqlaridan buzoq haykalini yasadilar. Unga ovoz chiqaradigan jasad shaklini berdilar. Ular uning gapirmasligini va ularga yo‘l ko‘rsatmasligini ko‘rmaganmidilar? Uni oldilar va zolimlardan bo‘ldilar.",

149: "Qachonki pushaymon bo‘lib, adashganliklarini ko‘rganlarida: «Agar Robbimiz bizga rahm qilmasa va bizni mag‘firat qilmasa, albatta ziyon ko‘ruvchilardan bo‘lamiz», dedilar.",

150: "Muso qavmiga g‘azablangan va qayg‘uli holda qaytganida: «Mendan keyin naqadar yomon ish qildingizlar! Robbingizning amri kelishini kutmay, shoshildingizlarmi?» dedi. Lavhalarni tashladi va birodarining boshidan ushlab o‘ziga tortdi. U dedi: «Ey onamning o‘g‘li! Albatta, qavm meni zaif ko‘rdi va meni o‘ldirishlariga oz qoldi. Dushmanlarni mendan kuldirma va meni zolim qavm bilan birga qilma».",

151: "U dedi: «Ey Robbim! Meni va birodarimni mag‘firat qilgin va bizni rahmatingga kiritgin. Sen rahm qiluvchilarning eng Rahmlisisan».",

152: "Albatta, buzoqni (iloh) qilib olganlarga Robbilaridan g‘azab va dunyo hayotida xorlik yetadi. To‘qib chiqaruvchilarni shunday jazolaymiz.",

153: "Yomonliklarni qilgan, so‘ngra undan keyin tavba qilib iymon keltirganlar esa, albatta, Robbing undan keyin Mag‘firat qiluvchi va Rahmlidir.",

154: "Muso g‘azabi bosilgach, lavhalarni oldi. Undagi yozuvda Robbilaridan qo‘rqadiganlar uchun hidoyat va rahmat bor edi.",

155: "Muso Bizning belgilagan vaqtimiz uchun qavmidan yetmish kishini tanladi. Ularni zilzila tutganida, u dedi: «Ey Robbim! Agar xohlaganingda, ularni ham, meni ham oldinroq halok qilgan bo‘larding. Oramizdagi ahmoqlarning qilganlari sababli bizni halok qilasanmi? Bu faqat Sening sinovingdir. U bilan xohlaganingni adashtirasan va xohlaganingni hidoyat qilasan. Sen bizning Valiymizsan. Bizni mag‘firat qilgin va bizga rahm qilgin. Sen mag‘firat qiluvchilarning eng yaxshisisan».",

156: "«Bizga bu dunyoda ham, oxiratda ham yaxshilik yozgin. Albatta, biz Senga yuzlandik». U dedi: «Azobimni xohlagan kishimga yetkazaman. Rahmatim esa barcha narsani qamrab olgan. Uni taqvo qiladigan, zakot beradigan va oyatlarimizga iymon keltiradiganlarga yozaman».",

157: "Ular o‘zlari huzuridagi Tavrot va Injilda yozilgan holda topadigan ummiy Payg‘ambarga ergashadiganlardir. U ularga yaxshilikni buyuradi, yomonlikdan qaytaradi, ularga pok narsalarni halol qiladi, nopok narsalarni harom qiladi va ularning og‘ir yuklarini hamda ustilaridagi kishanlarini olib tashlaydi. Bas, unga iymon keltirgan, uni ulug‘lagan, unga yordam bergan va u bilan tushirilgan nurga ergashganlar — ana o‘shalar najot topuvchilardir.",

158: "Ayting: «Ey insonlar! Men sizlarning barchangizga osmonlaru yer hukmronligi Uniki bo‘lgan ALLAHning Rasuliman. Undan boshqa iloh yo‘qdir. U tiriltiradi va o‘ldiradi. Bas, ALLAHga va Uning ummiy Payg‘ambariga iymon keltiringlar. U ALLAHga va Uning so‘zlariga iymon keltiradi. Unga ergashinglar, shoyad hidoyat topsangizlar».",

159: "Muso qavmidan haq bilan hidoyat qiladigan va u bilan adolat qiladigan bir ummat bor edi.",

160: "Biz ularni o‘n ikki qabila — ummatlarga ajratdik. Muso qavmi undan suv so‘raganida, unga: «Asong bilan toshga urgin», deb vahiy qildik. Undan o‘n ikki buloq otilib chiqdi. Har bir qabila o‘zining suv ichadigan joyini bildi. Ularning ustiga bulutni soya qildik va ularga mann va bedana tushirdik. «Sizlarga bergan pok narsalarimizdan yenglar». Ular Bizga zulm qilmadilar, balki o‘zlariga zulm qildilar.",
161: "Ular aytilganida: «Mana shu shaharga kiringlar va undan xohlagan joyingizdan yenglar. «Kechiring», deb aytinglar va darvozadan sajda qilgan holda kiringlar. Biz sizlarning xatolaringizni kechiramiz. Yaxshilik qiluvchilarga ziyoda qilamiz»,",

162: "Ularning orasidagi zolimlar ularga aytilgan so‘zni boshqa so‘zga almashtirdilar. Bas, qilgan zulmlari sababli ularga osmondan azob yubordik.",

163: "Ulardan dengiz bo‘yidagi shahar haqida so‘ra. Ular shanba kunida haddan oshar edilar. Shanba kunlari baliqlari ularga suv yuzida ko‘rinib kelardi, shanba bo‘lmagan kunlari esa kelmas edi. Biz ularni fosiqliklari sababli shunday sinardik.",

164: "Ularning orasidan bir jamoa: «ALLAH halok qiladigan yoki qattiq azoblaydigan qavmga nega nasihat qilasizlar?» deganida, ular: «Robbingiz huzurida uzr bo‘lishi uchun va shoyad ular taqvo qilsalar», dedilar.",

165: "Ular eslatilgan narsani unutganlarida, yomonlikdan qaytarganlarni najot berdik va zulm qilganlarni fosiqliklari sababli qattiq azob bilan tutdik.",

166: "Qachonki ular qaytarilgan narsadan kibrlanganlarida, ularga: «Xor bo‘lgan maymunlar bo‘linglar», dedik.",

167: "Robbing shunday e’lon qilgan edi: «Albatta, U qiyomat kunigacha ularga eng yomon azobni beradigan kishilarni yuboradi». Albatta, Robbing jazosi tezdir. Albatta, U Mag‘firat qiluvchi va Rahmlidir.",

168: "Ularni yer yuzida guruhlarga bo‘lib tarqatdik. Ularning orasida solihlar ham bor, bundan pastroq bo‘lganlari ham bor. Balki ular qaytishlari uchun ularni yaxshiliklar va yomonliklar bilan sinadik.",

169: "Ulardan keyin Kitobga merosxo‘r bo‘lgan avlod keldi. Ular bu dunyoning arzimas narsasini olib: «Bizga mag‘firat qilinadi», deydilar. Ularga shunga o‘xshash narsa kelsa, uni ham oladilar. Ulardan ALLAH haqida faqat haqni aytish borasida Kitob ahdi olinmaganmi? Undagi narsalarni o‘qimaganmidilar? Oxirat diyori taqvo qiluvchilar uchun yaxshiroqdir. Aql ishlatmaysizlarmi?",

170: "Kitobni mahkam tutadiganlar va namozni ado qiladiganlar — albatta, Biz isloh qiluvchilarning ajrini zoye qilmaymiz.",

171: "Eslanglar, Biz tog‘ni ularning ustiga ko‘tarib qo‘yganimizda, go‘yo u ustlariga tushadigandek bo‘ldi. Ularga: «Sizlarga bergan narsamizni mahkam tutinglar va undagi narsalarni eslanglar, shoyad taqvo qilsangizlar», dedik.",

172: "Robbing Odam farzandlarining bellaridan zurriyotlarini olib, ularni o‘zlariga guvoh qilganida: «Men sizlarning Robbingiz emasmanmi?» degan edi. Ular: «Ha, guvohmiz», dedilar. Bu qiyomat kuni: «Biz bundan bexabar edik», demasliklaringiz uchundir.",

173: "Yoki: «Oldin ota-bobolarimiz shirk keltirgan edi, biz esa ulardan keyingi zurriyot edik. Bizni botil qiluvchilarning qilganlari sababli halok qilasanmi?» demasliklaringiz uchundir.",

174: "Shunday qilib, Biz oyatlarni batafsil bayon qilamiz, shoyad ular qaytsalar.",

175: "Ularga Biz oyatlarimizni bergan kishining xabarini o‘qib ber. U ulardan chiqib ketdi. Bas, shayton unga ergashdi va u adashganlardan bo‘ldi.",

176: "Agar xohlaganimizda, uni shu oyatlar bilan yuksaltirgan bo‘lardik. Lekin u yerga yopishdi va havoyi nafsiga ergashdi. Uning misoli itga o‘xshaydi: uni haydasang ham tilini osiltiradi, tashlab qo‘ysang ham tilini osiltiradi. Bu oyatlarimizni yolg‘on degan qavmning misolidir. Bas, qissalarni aytib ber, shoyad ular tafakkur qilsalar.",

177: "Oyatlarimizni yolg‘on degan qavmning misoli naqadar yomondir! Ular faqat o‘zlariga zulm qildilar.",

178: "Kimni ALLAH hidoyat qilsa, u hidoyat topuvchidir. Kimni adashtirsa, ana o‘shalar ziyon ko‘ruvchilardir.",

179: "Albatta, Biz jahannam uchun ko‘plab jin va insonlarni yaratdik. Ularning qalblari bor, lekin ular bilan anglamaydilar. Ko‘zlari bor, lekin ular bilan ko‘rmaydilar. Quloqlari bor, lekin ular bilan eshitmaydilar. Ular chorvalarga o‘xshaydilar, balki yanada adashganroqdirlar. Ana o‘shalar g‘ofillardir.",

180: "Eng go‘zal ismlar ALLAHnikidir. Bas, Unga o‘sha ismlar bilan duo qilinglar. Uning ismlarida og‘ish qiladiganlarni tark qilinglar. Ular qilgan ishlari bilan jazolanadilar.",
 181: "Biz yaratganlarimiz orasida haq bilan hidoyat qiladigan va u bilan adolat qiladigan bir ummat bor.",

182: "Oyatlarimizni yolg‘on deganlarni esa, ular bilmagan holda asta-sekin halokatga yaqinlashtiramiz.",

183: "Men ularga muhlat beraman. Albatta, Mening tadbirim mustahkamdir.",

184: "Ular o‘zlarining hamrohi (Muhammad)da jinnilik bor deb o‘ylamaydilarmi? U faqat ochiq ogohlantiruvchidir.",

185: "Ular osmonlaru yer hukmronligi va ALLAH yaratgan narsalarga hamda ularning ajal muddati yaqinlashganiga qaramaydilarmi? Undan keyin qaysi so‘zga ishonadilar?",

186: "ALLAH kimni adashtirsa, unga hidoyat qiluvchi yo‘qdir. U ularni o‘z tug‘yonlarida sarson holda qo‘yadi.",

187: "Sendan qiyomat soati haqida so‘raydilar: «Qachon uning kelishi barqaror bo‘ladi?» Ayting: «Uning ilmi faqat Robbim huzuridadir. Uning vaqtini Undan boshqa hech kim oshkor qila olmaydi. U osmonlaru yerga og‘ir keladi. U sizlarga faqat to‘satdan keladi». Sendan uni xuddi undan xabardordek so‘raydilar. Ayting: «Uning ilmi faqat ALLAH huzuridadir, lekin odamlarning ko‘plari bilmaydilar».",

188: "Ayting: «Men o‘zim uchun ALLAH xohlaganidan boshqa na foyda va na zarar yetkazishga qodir emasman. Agar g‘aybni bilganimda edi, ko‘p yaxshiliklarni ko‘paytirgan bo‘lardim va menga yomonlik yetmagan bo‘lardi. Men faqat iymon keltiradigan qavm uchun ogohlantiruvchi va xushxabar beruvchiman».",

189: "U sizlarni bir jondan yaratgan va undan o‘ziga juft yaratgan Zotdir. U unga orom topishi uchun. U uni qoplaganida, u yengil yuk ko‘tardi va u bilan yurdi. Yuk og‘irlashganda, ikkovlari Robbilari ALLAHga duo qildilar: «Agar bizga solih farzand bersang, albatta shukr qiluvchilardan bo‘lamiz».",

190: "Bas, U ularga solih farzand berganida, U bergan narsada Unga sheriklar qildilar. ALLAH esa ularning shirk keltirayotgan narsalaridan yuksakdir.",

191: "Ular hech narsani yarata olmaydigan, o‘zlari yaratilgan narsalarni Unga sherik qiladilarmi?",

192: "Ular ularga yordam berishga qodir emaslar va o‘zlariga ham yordam bera olmaydilar.",

193: "Agar ularni hidoyatga chaqirsangizlar, ular sizlarga ergashmaydilar. Ularni chaqirishingiz ham, jim turishingiz ham sizlar uchun barobardir.",

194: "Albatta, ALLAHdan boshqa duo qilayotganlaringiz sizlar kabi bandalardir. Agar rostgo‘y bo‘lsangizlar, ularga duo qilinglar, ular sizlarga javob bersinlar.",

195: "Ularning yuradigan oyoqlari bormi? Ushlaydigan qo‘llari bormi? Ko‘radigan ko‘zlari bormi? Eshitadigan quloqlari bormi? Ayting: «Sheriklaringizni chaqiringlar, so‘ngra menga qarshi makr qilinglar va menga muhlat bermanglar».",

196: "Albatta, mening Valiym — Kitobni nozil qilgan ALLAHdir. U solihlarni do‘st tutadi.",

197: "Undan boshqa duo qilayotganlaringiz sizlarga yordam bera olmaydi va o‘zlariga ham yordam bera olmaydilar.",

198: "Agar ularni hidoyatga chaqirsangizlar, ular eshitmaydilar. Ularning sizga qarayotganlarini ko‘rasiz, lekin ular ko‘rmaydilar.",

199: "Afvni ol, yaxshilikka buyur va johillardan yuz o‘gir.",

200: "Agar shaytondan bir vasvasa seni qo‘zg‘atsa, darhol ALLAHdan panoh so‘ra. Albatta, U Eshituvchi va Biluvchidir.",

201: "Albatta, taqvo qiluvchilarga shaytondan bir vasvasa tegsa, eslaydilar va darhol (haqiqatni) ko‘ra boshlaydilar.",

202: "Ularning birodarlari esa ularni adashishda davom ettiradilar, so‘ngra (bundan) to‘xtamaydilar.",

203: "Agar ularga biror oyat keltirmasang, ular: «Uni o‘zing to‘qib olmadingmi?» deydilar. Ayting: «Men faqat Robbim tomonidan menga vahiy qilinayotgan narsaga ergashaman. Bu sizlarga Robbingizdan bo‘lgan dalillar, iymon keltiradigan qavm uchun hidoyat va rahmatdir».",

204: "Qur’on o‘qilganida unga quloq solinglar va jim turinglar, shoyad sizlarga rahm qilinsa.",

205: "Robbingni ichingda kamtarlik va qo‘rquv bilan, oshkora bo‘lmagan holda ertayu kech zikr qil va g‘ofillardan bo‘lma.",

206: "Albatta, Robbing huzuridagi zotlar Unga ibodat qilishdan kibrlanmaydilar. Unga tasbeh aytadilar va faqat Unga sajda qiladilar.",
     },    
8:{     
 1: "Sendan o‘ljalar haqida so‘raydilar. Ayting: «O‘ljalar ALLAH va Rasul uchundir. Bas, agar mo‘min bo‘lsangizlar, ALLAHdan qo‘rqinglar, orangizni isloh qilinglar va ALLAHga hamda Uning Rasuliga itoat qilinglar».",

2: "Albatta, mo‘minlar shunday kishilarki, qachon ALLAH zikr qilinsa, qalblari qo‘rqadi. Ularga Uning oyatlari o‘qilsa, iymonlari ziyoda bo‘ladi va ular Robblariga tavakkul qiladilar.",

3: "Ular namozni ado qiladilar va Biz ularga bergan rizqdan infoq qiladilar.",

4: "Ana o‘shalar haqiqiy mo‘minlardir. Ular uchun Robblari huzurida darajalar, mag‘firat va ulug‘ rizq bordir.",

5: "Xuddi Robbing seni uyingdan haq ila chiqarganida, mo‘minlardan bir guruhi bundan norozi bo‘lganidek.",

6: "Ular haq ochiq-ravshan bo‘lganidan keyin ham sen bilan bahslashadilar. Go‘yo ular ko‘zlari ko‘rib turgan holda o‘limga haydalayotgandek edilar.",

7: "Eslanglar, ALLAH sizlarga ikki guruhdan biri sizniki bo‘lishini va’da qilgan edi. Sizlar kuchsiz bo‘lgan guruh sizniki bo‘lishini istardingiz. ALLAH esa O‘z so‘zlari bilan haqni qaror toptirishni va kofirlarning ildizini kesishni xohlardi.",

8: "Toki U haqni qaror toptirsin va botilni, jinoyatchilar yoqtirmasa ham, bekor qilsin.",

9: "Eslanglar, Robbingizdan yordam so‘raganingizda, U sizlarga: «Men sizlarga ketma-ket keluvchi mingta malaika bilan yordam beruvchiman», deb javob berdi.",

10: "ALLAH buni faqat xushxabar va qalblaringiz taskin topishi uchun qildi. G‘alaba faqat ALLAH huzuridadir. Albatta, ALLAH G‘olib va Hikmat Egasi.",

11: "Eslanglar, U O‘z tomonidan sizlarga xotirjamlik uchun uyqu berdi, osmondan sizlarni poklash, shaytonning najosatini sizlardan ketkazish, qalblaringizni mustahkamlash va qadamlaringizni sobit qilish uchun suv tushirdi.",

12: "Eslanglar, Robbingiz malaikalarga vahiy qilgan edi: «Men sizlar bilan birgaman. Bas, iymon keltirganlarni sobit qilinglar. Men kofirlarning qalblariga qo‘rquv solaman. Bas, bo‘yinlar ustiga uringlar va ularning barcha barmoqlariga uringlar».",

13: "Bu ularning ALLAH va Uning Rasuliga qarshi chiqqanlari sababli bo‘ldi. Kim ALLAH va Uning Rasuliga qarshi chiqsa, albatta, ALLAHning jazosi qattiqdir.",

14: "Mana shu sizlarga totib ko‘ringlar. Kofirlar uchun do‘zax azobi bordir.",

15: "Ey iymon keltirganlar! Kofirlar bilan jang maydonida to‘qnashganingizda ularga orqa o‘girmanglar.",

16: "Kim o‘sha kuni ularga orqa o‘girsa — jang uchun burilish yoki boshqa bir guruhga qo‘shilish bundan mustasno — albatta, u ALLAHning g‘azabiga uchraydi. Uning joyi jahannamdir. U naqadar yomon qaytish joyidir.",

17: "Ularni sizlar o‘ldirmadingizlar, balki ALLAH o‘ldirdi. Sen otganingda ham sen otmading, balki ALLAH otdi. Bu mo‘minlarni O‘z tomonidan go‘zal sinov bilan sinash uchundir. Albatta, ALLAH Eshituvchi va Biluvchidir.",

18: "Mana shunday. Albatta, ALLAH kofirlarning hiylasini zaiflashtiruvchidir.",

19: "Agar g‘alaba istasangizlar, mana sizlarga g‘alaba keldi. Agar to‘xtasangizlar, bu sizlar uchun yaxshidir. Agar yana qaytsangizlar, Biz ham qaytamiz. Jamoangiz ko‘p bo‘lsa ham, sizlarga foyda bermaydi. Albatta, ALLAH mo‘minlar bilan birgadir.",

20: "Ey iymon keltirganlar! ALLAHga va Uning Rasuliga itoat qilinglar va eshitib turgan holda undan yuz o‘girmanglar.",
 21: "Eshitdik, deb aytadigan, lekin eshitmaydiganlar kabi bo‘lmanglar.",

22: "Albatta, ALLAH huzurida jonzotlarning eng yomoni — aql ishlatmaydigan kar va soqovlardir.",

23: "Agar ALLAH ularda yaxshilik borligini bilganida edi, albatta ularga eshittirgan bo‘lardi. Agar eshittirganida ham, ular yuz o‘girgan holda qaytgan bo‘lardilar.",

24: "Ey iymon keltirganlar! Sizlarni tiriltiradigan narsaga chaqirganida, ALLAHga va Rasulga javob beringlar. Bilinglarki, ALLAH inson bilan uning qalbi orasiga to‘siq bo‘ladi va sizlar Uning huzuriga jamlanasizlar.",

25: "Sizlardan faqat zolimlargagina yetib qolmaydigan fitnadan saqlaninglar. Bilinglarki, ALLAHning jazosi qattiqdir.",

26: "Eslanglar, sizlar yer yuzida oz va zaif edingizlar. Odamlar sizlarni olib ketishidan qo‘rqar edingizlar. U sizlarga joy berdi, O‘z yordami bilan quvvatladi va pok narsalardan rizq berdi, shoyad shukr qilsangizlar.",

27: "Ey iymon keltirganlar! ALLAHga va Rasulga xiyonat qilmanglar va bilgan holda omonatlaringizga xiyonat qilmanglar.",

28: "Bilinglarki, mollaringiz va farzandlaringiz faqat sinovdir. Ulug‘ mukofot esa ALLAH huzuridadir.",

29: "Ey iymon keltirganlar! Agar ALLAHdan qo‘rqsangizlar, U sizlarga furqon beradi, yomonliklaringizni o‘chiradi va sizlarni mag‘firat qiladi. ALLAH ulug‘ fazl Egasi.",

30: "Kofir bo‘lganlar seni tutib olish, o‘ldirish yoki chiqarib yuborish uchun senga qarshi makr qilgan paytlarini esla. Ular makr qiladilar, ALLAH ham tadbir qiladi. ALLAH tadbir qiluvchilarning eng yaxshisidir.",

31: "Ularga oyatlarimiz o‘qilganda: «Eshitdik. Agar xohlasak, biz ham shunga o‘xshashini aytgan bo‘lardik. Bu faqat oldingilarning afsonalaridir», deydilar.",

32: "Ular: «Ey ALLAH! Agar bu haq bo‘lsa va Sendan bo‘lsa, ustimizga osmondan tosh yog‘dir yoki bizga alamli azob keltir», deganlarida.",

33: "Holbuki, sen ularning orasida bo‘lganingda ALLAH ularni azoblamas edi. Ular mag‘firat so‘rab turganlarida ham ALLAH ularni azoblamas edi.",

34: "Ular Masjidul Haromdan to‘sib turgan holatlarida, nega ALLAH ularni azoblamasin? Ular uning egalari emaslar. Uning egalari faqat taqvo qiluvchilardir. Lekin ularning ko‘plari bilmaydilar.",

35: "Ularning Bayt oldidagi ibodatlari faqat hushtak chalish va chapak chalishdan iborat edi. Bas, kofir bo‘lganingiz sababli azobni totib ko‘ringlar.",

36: "Albatta, kofir bo‘lganlar mollarini ALLAH yo‘lidan to‘sish uchun sarflaydilar. Ular uni sarflaydilar, so‘ngra bu ular uchun hasrat bo‘ladi, keyin mag‘lub qilinadilar. Kofir bo‘lganlar jahannamga jamlanadilar.",

37: "Toki ALLAH nopokni pokdan ajratsin, nopokni bir-birining ustiga qo‘yib, hammasini jamlab jahannamga tashlasin. Ana o‘shalar ziyon ko‘ruvchilardir.",

38: "Kofir bo‘lganlarga ayt: agar to‘xtasalar, o‘tganlari kechiriladi. Agar yana qaytsalar, avvalgilarining sunnati o‘tgan.",

39: "Fitna qolmay, din butunlay ALLAHniki bo‘lgunicha ular bilan kurashinglar. Agar to‘xtasalar, albatta ALLAH ularning qilayotgan ishlarini ko‘ruvchidir.",

40: "Agar ular yuz o‘girsalar, bilinglarki, ALLAH sizlarning Valiyingizdir. U qanday yaxshi Valiy va qanday yaxshi yordamchidir.",
41: "Bilinglarki, o‘lja sifatida olgan narsangizning beshdan biri ALLAH, Rasul, qarindoshlar, yetimlar, miskinlar va yo‘lovchiga tegishlidir. Agar ALLAHga va ikki guruh uchrashgan kuni — Haq bilan botil ajralgan kuni — bandamizga nozil qilgan narsamizga iymon keltirgan bo‘lsangizlar. ALLAH har narsaga qodirdir.",

42: "Eslanglar, sizlar vodiyga yaqin tomonda edingizlar, ular esa uzoq tomonda edilar. Karvon esa sizlardan pastroqda edi. Agar oldindan kelishganingizda ham, vaqt haqida ixtilof qilgan bo‘lardingiz. Lekin ALLAH qilinishi kerak bo‘lgan ishni amalga oshirish uchun shunday qildi, toki halok bo‘ladigan kishi ochiq dalil bilan halok bo‘lsin, tirik qoladigan kishi ham ochiq dalil bilan tirik qolsin. Albatta, ALLAH Eshituvchi va Biluvchidir.",

43: "Eslang, ALLAH ularni tushingda senga oz ko‘rsatgan edi. Agar ularni senga ko‘p ko‘rsatganida edi, albatta qo‘rqib, ish haqida tortishgan bo‘lardingizlar. Lekin ALLAH saqladi. Albatta, U ko‘kslardagi narsalarni Biluvchidir.",

44: "Uchrashgan paytingizda U ularni sizlarning ko‘zingizda oz ko‘rsatdi va sizlarni ham ularning ko‘zlarida oz ko‘rsatdi, toki ALLAH qilinishi kerak bo‘lgan ishni amalga oshirsin. Ishlar ALLAHga qaytariladi.",

45: "Ey iymon keltirganlar! Bir guruh bilan to‘qnashganingizda sobit turinglar va ALLAHni ko‘p zikr qilinglar, shoyad najot topsangizlar.",

46: "ALLAHga va Uning Rasuliga itoat qilinglar va o‘zaro tortishmanglar, aks holda qo‘rqib ketasizlar va kuchingiz ketadi. Sabr qilinglar. Albatta, ALLAH sabr qiluvchilar bilan birgadir.",

47: "Yurtidan kibr bilan chiqqan va odamlar ko‘ziga ko‘rinish uchun chiqqanlar kabi bo‘lmanglar. Ular ALLAH yo‘lidan to‘sadilar. ALLAH ularning qilayotgan ishlarini qamrab oluvchidir.",

48: "Eslang, shayton ularga ishlarini chiroyli ko‘rsatib: «Bugun odamlar ichida sizlarga hech kim g‘olib bo‘la olmaydi, men sizlarga yordamchiman», degan edi. Ikki guruh bir-birini ko‘rganida esa, u orqaga qaytdi va: «Men sizlardan pokman. Men sizlar ko‘rmaydigan narsani ko‘ryapman. Men ALLAHdan qo‘rqaman. ALLAHning jazosi qattiqdir», dedi.",

49: "Munofiqlar va qalblarida kasallik bo‘lganlar: «Ularning dinlari aldab qo‘ydi», degan edilar. Kim ALLAHga tavakkul qilsa, albatta ALLAH G‘olib va Hikmat Egasi.",

50: "Agar kofir bo‘lganlarni malaikalar jonlarini olayotgan paytda ko‘rsang edi. Ular yuzlariga va orqalariga urib: «Kuydiruvchi azobni totib ko‘ringlar», deydilar.",

51: "Bu o‘z qo‘llaringiz bilan qilgan ishlaringiz sababli. Albatta, ALLAH bandalarga zulm qiluvchi emasdir.",

52: "Xuddi Fir’avn qavmi va ulardan oldingilarning odati kabi. Ular ALLAHning oyatlarini inkor qildilar. Bas, ALLAH ularni gunohlari sababli ushladi. Albatta, ALLAH Kuchli va jazosi qattiqdir.",

53: "Bu shundandirki, bir qavm o‘zlaridagi narsani o‘zgartirmaguncha, ALLAH ularga bergan ne’matini o‘zgartirmaydi. Albatta, ALLAH Eshituvchi va Biluvchidir.",

54: "Xuddi Fir’avn qavmi va ulardan oldingilarning odati kabi. Ular Robbilarining oyatlarini yolg‘on dedilar. Bas, Biz ularni gunohlari sababli halok qildik va Fir’avn qavmini g‘arq qildik. Ularning barchasi zolim edilar.",

55: "Albatta, ALLAH huzurida jonzotlarning eng yomoni — kofir bo‘lganlardir. Ular iymon keltirmaydilar.",

56: "Ular bilan ahd tuzganingdan keyin har safar ahdlarini buzadiganlardir. Ular taqvo qilmaydilar.",

57: "Agar jangda ularga duch kelsang, ular ortidagilarga ibrat bo‘lishi uchun ularni tarqatib yubor. Shoyad ular eslasalar.",

58: "Agar biror qavmning xiyonatidan qo‘rqsang, ularga ahdni teng ravishda bildirib qo‘y. Albatta, ALLAH xiyonat qiluvchilarni sevmaydi.",

59: "Kofir bo‘lganlar qochib qutulganlarini o‘ylamasinlar. Albatta, ular ojiz qoldiruvchilar emas.",

60: "Ularga qarshi imkoningiz boricha kuch va bog‘langan otlar tayyorlanglar. U bilan ALLAHning dushmanlarini, o‘z dushmanlaringizni va ulardan boshqa sizlar bilmagan, ALLAH biladiganlarni qo‘rqitasizlar. ALLAH yo‘lida nima sarflasangizlar, sizlarga to‘liq qaytariladi va sizlarga zulm qilinmaydi.",

61: "Agar ular tinchlikka moyil bo‘lsalar, sen ham unga moyil bo‘l va ALLAHga tavakkul qil. Albatta, U Eshituvchi va Biluvchidir.",

62: "Agar ular seni aldamoqchi bo‘lsalar, bas, senga ALLAH kifoyadir. U seni O‘z yordami va mo‘minlar bilan quvvatlagan Zotdir.",

63: "U ularning qalblarini birlashtirdi. Agar yer yuzidagi barcha narsani sarflaganingda ham, ularning qalblarini birlashtira olmagan bo‘larding. Lekin ALLAH ularni birlashtirdi. Albatta, U G‘olib va Hikmat Egasi.",

64: "Ey Payg‘ambar! Senga va senga ergashgan mo‘minlarga ALLAHning O‘zi kifoyadir.",

65: "Ey Payg‘ambar! Mo‘minlarni jangga undagin. Agar sizlardan yigirmata sabrli kishi bo‘lsa, ikki yuz kishini yengadilar. Agar sizlardan yuzta bo‘lsa, kofirlardan mingtasini yengadilar. Chunki ular tushunmaydigan qavmdirlar.",

66: "Endi ALLAH sizlarning zaifligingizni bildi va sizlardan yukni yengillashtirdi. Bas, agar sizlardan yuzta sabrli kishi bo‘lsa, ikki yuz kishini yengadi. Agar sizlardan mingta bo‘lsa, ALLAHning izni bilan ikki ming kishini yengadi. ALLAH sabr qiluvchilar bilan birgadir.",

67: "Hech bir payg‘ambarga yerda kuchli mag‘lubiyat yetkazmaguncha asirlar olish loyiq emas. Sizlar dunyo narsalarini xohlaysizlar, ALLAH esa oxiratni xohlaydi. ALLAH G‘olib va Hikmat Egasi.",

68: "Agar ALLAH tomonidan oldindan yozilgan hukm bo‘lmaganida edi, olgan narsangiz sababli sizlarga ulkan azob yetgan bo‘lardi.",

69: "Bas, o‘lja qilib olgan narsalaringizdan halol va pok holda yenglar va ALLAHdan qo‘rqinglar. Albatta, ALLAH Mag‘firat qiluvchi va Rahmlidir.",

70: "Ey Payg‘ambar! Qo‘llaringizdagi asirlarga ayt: «Agar ALLAH qalblaringizda yaxshilik borligini bilsa, sizlarga sizlardan olingan narsadan yaxshirog‘ini beradi va sizlarni mag‘firat qiladi. ALLAH Mag‘firat qiluvchi va Rahmlidir».",

71: "Agar ular senga xiyonat qilmoqchi bo‘lsalar, oldin ham ALLAHga xiyonat qilgan edilar. Bas, U ularga qarshi imkon berdi. ALLAH Biluvchi va Hikmat Egasi.",

72: "Albatta, iymon keltirgan, hijrat qilgan, ALLAH yo‘lida mollari va jonlari bilan jihod qilganlar hamda boshpana berib yordam qilganlar — ana o‘shalar bir-birlariga do‘stdirlar. Iymon keltirgan, lekin hijrat qilmaganlarga esa, hijrat qilmagunlaricha sizlarda ularning himoyasi yo‘qdir. Agar ular din haqida sizlardan yordam so‘rasalar, sizlar bilan ahdlashgan qavmga qarshi bo‘lmasa, ularga yordam berishingiz kerak. ALLAH qilayotgan ishlaringizni ko‘rib turuvchidir.",

73: "Kofir bo‘lganlar ham bir-birlarining do‘stlaridir. Agar buni qilmasangizlar, yer yuzida fitna va katta buzg‘unchilik bo‘ladi.",

74: "Iymon keltirgan, hijrat qilgan va ALLAH yo‘lida jihod qilganlar hamda boshpana berib yordam qilganlar — ana o‘shalar haqiqiy mo‘minlardir. Ular uchun mag‘firat va ulug‘ rizq bordir.",

75: "Ulardan keyin iymon keltirib, hijrat qilgan va sizlar bilan birga jihod qilganlar ham sizlardandir. Qarindoshlar esa ALLAHning Kitobida bir-birlariga yaqinroqdirlar. Albatta, ALLAH har narsani Biluvchidir.",
 },     
9: {
1: "Bu ALLAH va Uning Rasulidan mushriklardan bo‘lgan ahdlashganlarga berilgan ozodlikdir.",

2: "Bas, yer yuzida to‘rt oy yurib turinglar va bilinglarki, sizlar ALLAHni ojiz qila olmaysizlar. Albatta, ALLAH kofirlarni xor qiluvchidir.",

3: "Buyuk Haj kuni ALLAH va Uning Rasulidan odamlarga e’lon: «Albatta, ALLAH va Uning Rasuli mushriklardan pokdir. Agar tavba qilsangizlar, bu sizlar uchun yaxshidir. Agar yuz o‘girsangizlar, bilinglarki, sizlar ALLAHni ojiz qila olmaysizlar». Kofir bo‘lganlarga alamli azob haqida xushxabar ber.",

4: "Faqat mushriklardan sizlar bilan ahdlashgan, so‘ngra sizlarga hech narsada kamchilik qilmagan va sizlarga qarshi hech kimga yordam bermaganlar bundan mustasnodir. Bas, ular bilan ahdlarini muddati tugaguncha bajaringlar. Albatta, ALLAH taqvo qiluvchilarni sevadi.",

5: "Bas, hurmatli oylar tugaganida mushriklarni qayerda topsangizlar, o‘ldiringlar, tutinglar, qamal qilinglar va har bir kuzatish joyida poylanglar. Agar tavba qilsalar, namozni ado qilsalar va zakotni bersalar, ularning yo‘lini bo‘shatinglar. Albatta, ALLAH Mag‘firat qiluvchi va Rahmlidir.",

6: "Agar mushriklardan birortasi sendan panoh so‘rasa, unga panoh ber, toki u ALLAHning kalomini eshitsin. So‘ngra uni xavfsiz joyiga yetkaz. Bu ular bilmaydigan qavm bo‘lganlari uchundir.",

7: "Mushriklar bilan ALLAH va Uning Rasuli huzurida qanday ahd bo‘lishi mumkin? Masjidul Harom huzurida ahdlashganlaringiz bundan mustasno. Bas, ular sizlarga to‘g‘ri tursalar, sizlar ham ularga to‘g‘ri turinglar. Albatta, ALLAH taqvo qiluvchilarni sevadi.",

8: "Qanday qilib? Agar ular sizlardan ustun kelsalar, sizlarga nisbatan na qarindoshlikni va na ahdni saqlaydilar. Og‘izlari bilan sizlarni rozi qiladilar, lekin qalblari bosh tortadi. Ularning ko‘plari fosiqlardir.",

9: "Ular ALLAHning oyatlarini ozgina qiymatga almashtirdilar va Uning yo‘lidan to‘sdilar. Albatta, ularning qilgan ishlari naqadar yomondir.",

10: "Ular mo‘minlarga nisbatan na qarindoshlikni va na ahdni saqlaydilar. Ana o‘shalar tajovuzkorlardir.",

11: "Agar tavba qilsalar, namozni ado qilsalar va zakotni bersalar, ular din birodarlaringizdir. Biladigan qavm uchun oyatlarni batafsil bayon qilamiz.",

12: "Agar ular ahdlaridan keyin qasamlarini buzsalar va diningizga qarshi gapirsalar, kufr boshliqlariga qarshi kurashinglar. Albatta, ularning qasamlariga ishonch yo‘qdir. Shoyad ular to‘xtasalar.",

13: "Qasamlarini buzgan, Rasulni chiqarishga harakat qilgan va sizlarga qarshi birinchi bo‘lib boshlagan qavm bilan kurashmaysizlarmi? Ulardan qo‘rqasizlarmi? Agar mo‘min bo‘lsangizlar, qo‘rqishingizga ALLAH haqliroqdir.",

14: "Ular bilan kurashinglar, ALLAH ularni sizlarning qo‘llaringiz bilan azoblaydi, ularni xor qiladi, sizlarga ular ustidan g‘alaba beradi va mo‘min qavmning ko‘ksilarini shifo qiladi.",

15: "Ularning qalblaridagi g‘azabni ketkazadi. ALLAH xohlagan kishisining tavbasini qabul qiladi. ALLAH Biluvchi va Hikmat Egasi.",

16: "Yoki ALLAH sizlardan kim jihod qilganini va ALLAHdan, Uning Rasulidan va mo‘minlardan boshqani do‘st tutmaganini bilmasdan turib, tark etilaman deb o‘yladingizlarmi? ALLAH qilayotgan ishlaringizdan Xabardordir.",

17: "Mushriklar o‘zlarining kufrlariga guvoh bo‘lib turgan holda ALLAHning masjidlarini obod qilishlari mumkin emas. Ana o‘shalarning amallari bekor bo‘lgan va ular do‘zaxda abadiy qoluvchilardir.",

18: "ALLAHning masjidlarini faqat ALLAHga va oxirat kuniga iymon keltirgan, namozni ado qilgan, zakotni bergan va faqat ALLAHdan qo‘rqqan kishilar obod qiladilar. Ana o‘shalar hidoyat topuvchilardan bo‘lishlari umid qilinadi.",

19: "Sizlar hojilarga suv berish va Masjidul Haromni obod qilishni ALLAHga va oxirat kuniga iymon keltirgan hamda ALLAH yo‘lida jihod qilgan kishiga teng deb bildingizlarmi? ALLAH huzurida ular teng emaslar. ALLAH zolim qavmni hidoyat qilmaydi.",

20: "Iymon keltirgan, hijrat qilgan va ALLAH yo‘lida mollari va jonlari bilan jihod qilganlarning ALLAH huzuridagi darajalari ulug‘dir. Ana o‘shalar najot topuvchilardir.",
21: "Robbilari ularga O‘zidan rahmat, rozilik va ichida tuganmas ne’matlar bor jannatlar haqida xushxabar beradi.",

22: "Ular unda abadiy qoladilar. Albatta, ALLAH huzurida ulkan mukofot bordir.",

23: "Ey iymon keltirganlar! Agar ota-onalaringiz va aka-ukalaringiz iymondan ko‘ra kufrni sevsalar, ularni do‘st tutmanglar. Sizlardan kim ularni do‘st tutsa, ana o‘shalar zolimlardir.",

24: "Ayting: «Agar ota-onalaringiz, farzandlaringiz, aka-ukalaringiz, juftlaringiz, qarindoshlaringiz, topgan mollaringiz, kasod bo‘lishidan qo‘rqadigan savdolaringiz va yoqtirgan uylaringiz sizlarga ALLAHdan, Uning Rasulidan va Uning yo‘lida jihod qilishdan sevimliroq bo‘lsa, bas, ALLAH O‘z amrini keltirgunicha kutinglar. ALLAH fosiq qavmni hidoyat qilmaydi».",

25: "Albatta, ALLAH sizlarga ko‘p joylarda yordam berdi. Hunayn kuni ham, ko‘pligingiz sizlarni mag‘rur qilganida, u sizlarga hech foyda bermadi. Yer keng bo‘lsa ham sizlarga torlik qildi. So‘ngra ortga qochdingizlar.",

26: "So‘ngra ALLAH Rasuliga va mo‘minlarga O‘z xotirjamligini tushirdi va sizlar ko‘rmagan lashkarlarni tushirdi hamda kofirlarni azobga duchor qildi. Kofirlarning jazosi shudir.",

27: "So‘ngra ALLAH bundan keyin xohlagan kishisining tavbasini qabul qiladi. ALLAH Mag‘firat qiluvchi va Rahmlidir.",

28: "Ey iymon keltirganlar! Albatta, mushriklar najasdir. Bas, bu yillaridan keyin Masjidul Haromga yaqinlashmasinlar. Agar kambag‘allikdan qo‘rqsangizlar, ALLAH xohlasa, sizlarni O‘z fazli bilan boy qiladi. Albatta, ALLAH Biluvchi va Hikmat Egasi.",

29: "Kitob berilganlardan ALLAHga va oxirat kuniga iymon keltirmaydigan, ALLAH va Uning Rasuli harom qilgan narsalarni harom deb bilmaydigan va haq dinni qabul qilmaydiganlar bilan ular o‘z qo‘llari bilan jizya bergunlaricha va xor bo‘lgunlaricha kurashinglar.",

30: "Yahudiylar: «Uzayr ALLAHning o‘g‘li», dedilar. Nasroniylar: «Masih ALLAHning o‘g‘li», dedilar. Bu ularning og‘izlaridagi gaplaridir. Oldingi kofirlarning gaplariga o‘xshatadilar. ALLAH ularni halok qilsin! Qanday yuz o‘girdilar!",

31: "Ular ALLAHni qo‘yib olimlarini va rohiblarini hamda Maryam o‘g‘li Masihni Robblar qilib oldilar. Holbuki, ularga faqat yagona ilohga ibodat qilish buyurilgan edi. Undan boshqa iloh yo‘qdir. U ularning shirk keltirayotgan narsalaridan pokdir.",

32: "Ular ALLAHning nurini og‘izlari bilan o‘chirmoqchi bo‘ladilar. Kofirlar yomon ko‘rsalar ham, ALLAH O‘z nurini mukammal qiluvchidir.",

33: "U O‘z Rasulini hidoyat va haq din bilan yubordi, toki uni barcha dinlardan ustun qilsin. Mushriklar yomon ko‘rsalar ham.",

34: "Ey iymon keltirganlar! Albatta, ko‘p olimlar va rohiblar odamlarning mollarini botil yo‘l bilan yeydilar va ALLAH yo‘lidan to‘sadilar. Oltin va kumushni jamlab, uni ALLAH yo‘lida sarflamaydiganlarga alamli azob haqida xushxabar ber.",

35: "U kun u narsalar jahannam olovida qizdiriladi va ular bilan ularning peshonalari, yonlari va orqalari kuydiriladi. «Mana bu o‘zlaringiz uchun jamlagan narsalaringizdir. Bas, jamlagan narsalaringizni totib ko‘ringlar», deyiladi.",

36: "Albatta, ALLAH huzurida oylarning soni osmonlaru yerni yaratgan kunidan beri o‘n ikki oydir. Ulardan to‘rttasi hurmatli oylardir. Mana shu to‘g‘ri dindir. Bas, ularda o‘zlaringizga zulm qilmanglar va mushriklar sizlarga qarshi birgalikda kurashganidek, sizlar ham ularga qarshi birgalikda kurashinglar. Bilinglarki, ALLAH taqvo qiluvchilar bilan birgadir.",

37: "Nasiy’ (oylarni kechiktirish) faqat kufrda ziyoda bo‘lishdir. U bilan kofir bo‘lganlar adashtiriladi. Ular ALLAH harom qilgan oylar sonini to‘g‘ri qilish uchun uni bir yil halol, bir yil harom qiladilar. Ularning yomon ishlari ularga chiroyli ko‘rsatildi. ALLAH kofir qavmni hidoyat qilmaydi.",

38: "Ey iymon keltirganlar! Sizlarga nima bo‘ldiki, sizlarga: «ALLAH yo‘lida chiqinglar», deyilganda, yerga yopishib oldingizlar? Oxiratdan ko‘ra dunyo hayotiga rozi bo‘ldingizlarmi? Dunyo hayotining matosi oxirat oldida juda ozdir.",

39: "Agar chiqmasangizlar, U sizlarni alamli azob bilan azoblaydi va o‘rningizga boshqa qavmni keltiradi. Unga hech qanday zarar yetkaza olmaysizlar. ALLAH har narsaga qodirdir.",

40: "Agar unga yordam bermasangizlar ham, ALLAH unga yordam bergan. Kofirlar uni ikki kishining ikkinchisi bo‘lganida chiqarib yuborganlarida, ikkovlari g‘orda bo‘lganida, u o‘z hamrohiga: «G‘amgin bo‘lma, albatta, ALLAH biz bilan birgadir», degan edi. Bas, ALLAH unga xotirjamligini tushirdi va uni sizlar ko‘rmagan lashkarlar bilan quvvatladi hamda kofirlarning so‘zini past qildi. ALLAHning so‘zi esa eng oliydir. ALLAH G‘olib va Hikmat Egasi.",

41: "Yengil bo‘lsa ham, og‘ir bo‘lsa ham chiqinglar va ALLAH yo‘lida mollaringiz va jonlaringiz bilan jihod qilinglar. Agar bilsangizlar, bu sizlar uchun yaxshiroqdir.",

42: "Agar yaqin bir foyda va oson safar bo‘lganida edi, ular senga ergashgan bo‘lardilar. Lekin ularga masofa uzoq tuyuldi. Ular tez orada: «Agar imkonimiz bo‘lganida, albatta sizlar bilan birga chiqqan bo‘lardik», deb ALLAH nomi bilan qasam ichadilar. Ular o‘zlarini halok qiladilar. ALLAH ularning yolg‘onchi ekanini biladi.",

43: "ALLAH seni afv etdi. Nima uchun ularga ruxsat berding, toki rostgo‘ylar senga ayon bo‘lmaguncha va yolg‘onchilarni bilmaguncha?",

44: "ALLAHga va oxirat kuniga iymon keltirganlar mollarari va jonlari bilan jihod qilishdan qolish uchun sendan izn so‘ramaydilar. ALLAH taqvo qiluvchilarni Biluvchidir.",

45: "Sendan faqat ALLAHga va oxirat kuniga iymon keltirmaydigan, qalblari shubha qilgan va shubhalarida ikkilanib yurganlar izn so‘raydilar.",

46: "Agar ular chiqishni xohlaganlarida, albatta unga tayyorgarlik ko‘rgan bo‘lardilar. Lekin ALLAH ularning chiqishini yoqtirmadi va ularni sust qildi. Ularga: «O‘tiruvchilar bilan birga o‘tiringlar», deyildi.",

47: "Agar ular sizlar bilan chiqqanlarida, sizlarga faqat buzg‘unchilikni ziyoda qilgan va orangizda fitna izlab yuradigan bo‘lardilar. Orangizda ularga quloq soladiganlar ham bor. ALLAH zolimlarni Biluvchidir.",

48: "Ular ilgari ham fitna izlagan edilar va senga qarshi ishlarni ostin-ustun qilgan edilar, nihoyat haq keldi va ALLAHning amri zohir bo‘ldi, ular yomon ko‘rsalar ham.",

49: "Ulardan: «Menga izn ber, meni fitnaga solma», deganlar ham bor. Ogoh bo‘linglar! Ular fitnaga tushdilar. Albatta, jahannam kofirlarni qamrab oluvchidir.",

50: "Agar senga yaxshilik yetsa, bu ularni ranjitadi. Agar senga musibat yetsa, ular: «Biz ishimizni oldindan hal qilib qo‘ygan edik», deydilar va xursand bo‘lib qaytadilar.",

51: "Ayting: «Bizga faqat ALLAH biz uchun yozgan narsa yetadi. U bizning Valiymizdir. Mo‘minlar faqat ALLAHga tavakkul qilsinlar».",

52: "Ayting: «Sizlar biz uchun faqat ikki yaxshilikdan birini kutmoqdasizlar. Biz esa ALLAH sizlarni O‘z huzuridan yoki bizning qo‘llarimiz bilan azoblashini kutmoqdamiz. Bas, kutinglar, biz ham sizlar bilan birga kutuvchilarmiz».",

53: "Ayting: «Xohlasangizlar ham, xohlamasangizlar ham infoq qilinglar. Sizlardan aslo qabul qilinmaydi. Chunki sizlar fosiq qavm bo‘ldingizlar».",

54: "Ularning sarflagan narsalari qabul qilinishiga faqat ALLAHga va Uning Rasuliga kofir bo‘lganlari, namozga dangasalik bilan kelganlari va infoqni faqat xohlamagan holda qilganlari sabab bo‘ladi.",

55: "Ularning mollari va farzandlari seni hayratga solmasin. ALLAH ular bilan dunyo hayotida ularni azoblashni va kofir holida jonlari chiqishini xohlaydi.",

56: "Ular sizlardan ekanliklariga ALLAH nomi bilan qasam ichadilar. Holbuki, ular sizlardan emaslar. Lekin ular qo‘rqoq qavmdirlar.",

57: "Agar ular boshpana yoki g‘orlar yoki kiradigan joy topsalar, albatta shoshilib o‘sha tomonga buriladilar.",

58: "Ulardan sadaqalar taqsimotida seni ayblaydiganlar ham bor. Agar ularga undan berilsa, rozi bo‘ladilar, agar berilmasa, birdan g‘azab qiladilar.",

59: "Agar ular ALLAH va Uning Rasuli bergan narsaga rozi bo‘lib: «Bizga ALLAH kifoya qiladi. ALLAH va Uning Rasuli bizga O‘z fazlidan beradi. Biz faqat ALLAHga umid qiluvchilarmiz», deganlarida edi.",

60: "Sadaqalar faqat faqirlar, miskinlar, ularni yig‘uvchi xodimlar, qalblari yaqinlashtiriladiganlar, qullarni ozod qilish, qarzdorlar, ALLAH yo‘li va yo‘lovchilar uchundir. Bu ALLAH tomonidan farz qilingan narsadir. ALLAH Biluvchi va Hikmat Egasi.",
61: "Ulardan Payg‘ambarni ranjitadigan va: «U faqat quloq», deydiganlar bor. Ayting: «U sizlar uchun yaxshilik qulog‘idir. U ALLAHga iymon keltiradi, mo‘minlarga ishonadi va sizlardan iymon keltirganlar uchun rahmatdir». ALLAHning Rasulini ranjitadiganlar uchun alamli azob bordir.",

62: "Ular sizlarni rozi qilish uchun ALLAH nomi bilan qasam ichadilar. Agar mo‘min bo‘lsalar, ALLAH va Uning Rasulini rozi qilishlari haqliroqdir.",

63: "Ular bilmaydilarmi, kim ALLAH va Uning Rasuliga qarshi chiqsa, unga jahannam olovi bor. Unda abadiy qoladi. Bu ulkan xorlikdir.",

64: "Munofiqlar qalblaridagi narsalarni ularga xabar qiladigan bir sura tushishidan qo‘rqadilar. Ayting: «Masxara qilaveringlar. Albatta, ALLAH sizlar qo‘rqayotgan narsani chiqaruvchidir».",

65: "Agar ulardan so‘rasang: «Biz faqat gaplashib, hazillashayotgan edik», deydilar. Ayting: «ALLAH, Uning oyatlari va Uning Rasuli ustidan masxara qildingizlarmi?»",

66: "Uzr aytmanglar. Iymon keltirganingizdan keyin kofir bo‘ldingizlar. Agar sizlardan bir guruhni afv qilsak ham, boshqa guruhni jinoyatchi bo‘lganlari sababli azoblaymiz.",

67: "Munofiqlar erkaklari ham, ayollari ham bir-birlaridandir. Ular yomonlikka buyuradilar, yaxshilikdan qaytaradilar va qo‘llarini qisadilar. Ular ALLAHni unutdilar, bas, U ham ularni unutdi. Albatta, munofiqlar fosiqlardir.",

68: "ALLAH munofiq erkaklar, munofiq ayollar va kofirlarga jahannam olovini va’da qildi. Ular unda abadiy qoladilar. U ularga kifoyadir. ALLAH ularni la’natladi va ular uchun doimiy azob bordir.",

69: "Sizlardan oldingilarga o‘xshab: ular sizlardan ko‘ra kuchliroq, mollari va farzandlari ko‘proq edi. Ular o‘z nasibalaridan foydalandilar. Sizlar ham sizlardan oldingilar o‘z nasibalaridan foydalanganlari kabi o‘z nasibalaringizdan foydalandingizlar va ular botilga kirganlari kabi sizlar ham botilga kirdingizlar. Ana o‘shalarning amallari dunyoda ham, oxiratda ham bekor bo‘ldi. Ana o‘shalar ziyon ko‘ruvchilardir.",

70: "Ularga o‘zlaridan oldingilarning — Nuh qavmi, Od, Samud, Ibrohim qavmi, Mad’yanning va ag‘darilgan shaharlarning xabari kelmadimi? Ularga Rasulchilari ochiq dalillar bilan kelgan edi. Bas, ALLAH ularga zulm qiluvchi emas edi, lekin ular o‘zlariga zulm qildilar.",

71: "Mo‘min erkaklar va mo‘min ayollar bir-birlarining do‘stlaridirlar. Ular yaxshilikka buyuradilar, yomonlikdan qaytaradilar, namozni ado qiladilar, zakotni beradilar va ALLAHga hamda Uning Rasuliga itoat qiladilar. Ana o‘shalarga ALLAH rahm qiladi. Albatta, ALLAH G‘olib va Hikmat Egasi.",

72: "ALLAH mo‘min erkaklar va mo‘min ayollarga ostidan anhorlar oqadigan jannatlarni, ularda abadiy qolishni va Adn jannatlarida pok maskanlarni va’da qildi. ALLAHning roziligi esa eng ulug‘dir. Ana shu buyuk najotdir.",

73: "Ey Payg‘ambar! Kofirlar va munofiqlarga qarshi kurash va ularga qattiq bo‘l. Ularning joyi jahannamdir. U naqadar yomon qaytish joyidir.",

74: "Ular ALLAHga qasam ichadilarki, hech narsa demadik. Holbuki, ular kufr so‘zini aytdilar va Islomdan keyin kofir bo‘ldilar. Ular erisha olmagan narsalarini qasd qildilar. Ular faqat ALLAH va Uning Rasuli O‘z fazlidan ularni boy qilgani uchun g‘azab qildilar. Agar tavba qilsalar, ular uchun yaxshidir. Agar yuz o‘girsalar, ALLAH ularni dunyoda ham, oxiratda ham alamli azob bilan azoblaydi. Yer yuzida ular uchun na bir do‘st va na yordamchi bor.",

75: "Ulardan: «Agar ALLAH bizga O‘z fazlidan bersa, albatta sadaqa qilamiz va solihlardan bo‘lamiz», deb ALLAHga ahd qilganlar ham bor.",

76: "U ularga O‘z fazlidan berganida esa, baxillik qildilar va yuz o‘girgan holda ketdilar.",

77: "Bas, Ular ALLAHga bergan va’dalariga xilof qilganlari va yolg‘on gapirganlari sababli qalblarida Unga ro‘baro‘ bo‘ladigan kungacha davom etadigan nifoq paydo qildi.",

78: "Ular ALLAH ularning sirlarini va yashirin suhbatlarini bilishini bilmaydilarmi? Albatta, ALLAH g‘ayblarni Biluvchidir.",

79: "Mo‘minlardan ixtiyoriy sadaqa qiluvchilarni va kuchlari yetganidan boshqa topa olmaydiganlarni masxara qiladiganlarni ALLAH masxara qiladi. Ular uchun alamli azob bordir.",

80: "Ular uchun mag‘firat so‘rasang ham, so‘ramasang ham, hatto ular uchun yetmish marta mag‘firat so‘rasang ham, ALLAH ularni mag‘firat qilmaydi. Bu ularning ALLAH va Uning Rasuliga kofir bo‘lganlari sababli. ALLAH fosiq qavmni hidoyat qilmaydi.",
81: "Qolib ketganlar ALLAHning Rasuliga qarshi chiqib, o‘tirib qolganlaridan xursand bo‘ldilar va ALLAH yo‘lida mollari va jonlari bilan jihod qilishni yomon ko‘rdilar. Ular: «Bu issiqda chiqmanglar», dedilar. Ayting: «Jahannam olovi bundan ham issiqroqdir». Agar tushunsalar edi.",

82: "Bas, qilgan ishlari jazosi sifatida oz kulsinlar va ko‘p yig‘lasinlar.",

83: "Agar ALLAH seni ulardan bir guruhiga qaytarsa va ular sendan chiqishga ruxsat so‘rasalar, ayt: «Sizlar men bilan hech qachon chiqmaysizlar va men bilan birga hech qachon dushman bilan jang qilmaysizlar. Sizlar birinchi marta o‘tirishni tanladingizlar. Bas, qoluvchilar bilan birga o‘tiringlar».",

84: "Ulardan birortasi o‘lsa, uning ustida hech qachon namoz o‘qima va qabrining oldida turmagin. Chunki ular ALLAH va Uning Rasuliga kofir bo‘ldilar va fosiq holatda o‘ldilar.",

85: "Ularning mollari va farzandlari seni hayratga solmasin. ALLAH ular bilan dunyo hayotida ularni azoblashni va kofir holida jonlari chiqishini xohlaydi.",

86: "Ularga: «ALLAHga iymon keltiringlar va Uning Rasuli bilan birga jihod qilinglar», deb bir sura nozil qilinsa, ulardan boylik egalari: «Bizni qo‘y, o‘tiruvchilar bilan birga bo‘laylik», deb sendan ruxsat so‘raydilar.",

87: "Ular o‘tirib qoluvchilar bilan birga bo‘lishga rozi bo‘ldilar. Ularning qalblari muhrlandi. Bas, ular anglamaydilar.",

88: "Lekin Rasul va u bilan birga iymon keltirganlar mollari va jonlari bilan jihod qildilar. Ana o‘shalarga barcha yaxshiliklar bordir. Ana o‘shalar najot topuvchilardir.",

89: "ALLAH ular uchun ostidan anhorlar oqadigan jannatlarni tayyorladi. Ular unda abadiy qoladilar. Bu ulkan najotdir.",

90: "Uzr so‘rovchi a’robiylar kelishdi, Rasuldan ruxsat so‘rashdi. ALLAH va Uning Rasuliga yolg‘on gapirganlar esa o‘tirib qoldilar. Ulardan kofir bo‘lganlarga alamli azob yetadi.",

91: "Zaiflar, kasallar va sarf qiladigan narsasi yo‘qlar uchun — agar ular ALLAH va Uning Rasuliga samimiy bo‘lsalar — hech qanday gunoh yo‘qdir. Yaxshilik qiluvchilarga qarshi yo‘l yo‘q. ALLAH Mag‘firat qiluvchi va Rahmlidir.",

92: "Senga ularga ulov berishing uchun kelganlarida: «Sizlarni mindirish uchun hech narsa topolmayapman», deganingda, sarflashga hech narsasi yo‘qligi sababli ko‘zlari yoshga to‘lib qaytganlarga ham gunoh yo‘qdir.",

93: "Gunoh yo‘li faqat boy bo‘la turib sendan ruxsat so‘raganlardadir. Ular qoluvchilar bilan birga bo‘lishga rozi bo‘ldilar. ALLAH ularning qalblarini muhrladi. Bas, ular bilmaydilar.",

94: "Ularning oldiga qaytganingizda sizlarga uzr aytadilar. Ayting: «Uzr aytmanglar. Biz sizlarga aslo ishonmaymiz. ALLAH bizga sizlarning xabarlaringizni bildirdi. Endi ALLAH va Uning Rasuliga amalingizni ko‘rsatadi. So‘ngra g‘ayb va oshkorani Biluvchiga qaytarilasizlar. U sizlarga qilgan ishlaringizni xabar qiladi».",

95: "Ularning oldiga qaytganingizda sizlardan yuz o‘girishlaringiz uchun ALLAH nomi bilan qasam ichadilar. Bas, ulardan yuz o‘giringlar. Albatta, ular nopokdirlar. Qilgan ishlari jazosi sifatida ularning joyi jahannamdir.",

96: "Sizlardan rozi bo‘lishingiz uchun qasam ichadilar. Agar sizlar ulardan rozi bo‘lsangizlar ham, albatta, ALLAH fosiq qavmdan rozi bo‘lmaydi.",

97: "A’robiylar kufr va nifoqda qattiqroqdirlar va ALLAH O‘z Rasuliga nozil qilgan chegaralarni bilmaslikka ko‘proq moyildirlar. ALLAH Biluvchi va Hikmat Egasi.",

98: "A’robiylar orasida sarflagan narsasini zarar deb hisoblaydiganlar va sizlarga musibatlar kelishini kutadiganlar bor. Yomon aylanish ularning o‘zlariga bo‘lsin. ALLAH Eshituvchi va Biluvchidir.",

99: "A’robiylar orasida ALLAHga va oxirat kuniga iymon keltiradigan, sarflagan narsasini ALLAH huzurida yaqinlik va Rasulning duolariga sabab deb biladiganlar ham bor. Ogoh bo‘linglar! Bu ular uchun yaqinlikdir. ALLAH ularni O‘z rahmatiga kiritadi. Albatta, ALLAH Mag‘firat qiluvchi va Rahmlidir.",

100: "Muhojirlar va ansorlardan birinchi bo‘lib oldinga o‘tganlar hamda ularga chiroyli tarzda ergashganlardan ALLAH rozi bo‘ldi, ular ham Undan rozi bo‘ldilar. U ular uchun ostidan anhorlar oqadigan jannatlarni tayyorladi. Ular unda abadiy qoladilar. Bu ulkan najotdir.",

101: "Atrofingizdagi a’robiylar orasida ham, Madina ahlidan ham nifoqda davom etadiganlar bor. Sen ularni bilmaysan, Biz bilamiz. Biz ularni ikki marta azoblaymiz, so‘ngra ular ulkan azobga qaytariladilar.",

102: "Boshqa birlari gunohlarini e’tirof etdilar. Ular yaxshi amalni boshqa yomon amal bilan aralashtirdilar. Shoyad ALLAH ularning tavbalarini qabul qilsa. Albatta, ALLAH Mag‘firat qiluvchi va Rahmlidir.",

103: "Ularning mollaridan sadaqa olgin. U bilan ularni poklaysan va tozalaysan. Ular uchun duo qil. Albatta, sening duoying ular uchun taskindir. ALLAH Eshituvchi va Biluvchidir.",

104: "Ular bilmadilarmi, ALLAH bandalarining tavbasini qabul qiluvchi va sadaqalarni oluvchi Zotdir? Albatta, ALLAH Tavbalarni qabul qiluvchi va Rahmlidir.",

105: "Ayting: «Amal qilinglar. ALLAH, Uning Rasuli va mo‘minlar amalingizni ko‘radilar. Sizlar g‘aybni va oshkorani Biluvchiga qaytarilasizlar. U sizlarga qilgan ishlaringizni xabar qiladi».",

106: "Boshqa birlari esa ALLAHning amriga qoldirilganlar. U ularni azoblaydimi yoki tavbalarini qabul qiladimi — ALLAH Biluvchidir va Hikmat Egasi.",

107: "Zarar yetkazish, kufrni kuchaytirish, mo‘minlar orasini ajratish va oldin ALLAH va Uning Rasuliga qarshi urushgan kishiga kutish joyi qilish uchun masjid qurganlar ham bor. Ular: «Biz faqat yaxshilikni istadik», deb qasam ichadilar. ALLAH guvohlik beradiki, ular yolg‘onchilardir.",

108: "Unda hech qachon turmagin. Birinchi kundan taqvo asosida qurilgan masjidda turishing haqliroqdir. Unda poklanishni yaxshi ko‘radigan kishilar bor. ALLAH poklanuvchilarni sevadi.",

109: "Binosini ALLAHdan qo‘rqish va Uning roziligi asosiga qurgan kishi yaxshimi yoki binosini qulab tushayotgan jarlik chetiga qurib, u bilan jahannam oloviga qulagan kishimi? ALLAH zolim qavmni hidoyat qilmaydi.",

110: "Ularning qurgan binosi qalblari parcha-parcha bo‘lmaguncha qalblarida shubha bo‘lib qoladi. ALLAH Biluvchi va Hikmat Egasi.",

111: "Albatta, ALLAH mo‘minlardan jonlari va mollarini jannat evaziga sotib oldi. Ular ALLAH yo‘lida jang qiladilar, o‘ldiradilar va o‘ldiriladilar. Bu Tavrot, Injil va Qur’onda Uning zimmasidagi haq va’dadir. ALLAHdan ko‘ra ahdiga sodiqroq kim bor? Bas, qilgan savdolaringiz bilan xursand bo‘linglar. Bu ulkan najotdir.",

112: "Ular tavba qiluvchilar, ibodat qiluvchilar, hamd aytuvchilar, ro‘za tutuvchilar, ruku’ qiluvchilar, sajda qiluvchilar, yaxshilikka buyuruvchilar, yomonlikdan qaytaruvchilar va ALLAHning chegaralarini saqlovchilardir. Mo‘minlarga xushxabar ber.",

113: "Mushriklar jahannam egalari ekani ularga ayon bo‘lganidan keyin, Payg‘ambar va iymon keltirganlarga ular uchun mag‘firat so‘rashlari to‘g‘ri emasdir, hatto ular qarindoshlari bo‘lsa ham.",

114: "Ibrohimning otasi uchun mag‘firat so‘rashi faqat unga bergan va’dasi sababli edi. Qachonki unga u ALLAHning dushmani ekanligi ayon bo‘lgach, undan voz kechdi. Albatta, Ibrohim juda iltijochi va halim edi.",

115: "ALLAH bir qavmni hidoyat qilganidan keyin, ularga nimadan saqlanishlarini bayon qilmaguncha ularni adashtiruvchi emasdir. Albatta, ALLAH har narsani Biluvchidir.",

116: "Albatta, osmonlaru yerning mulki ALLAHnikidir. U tiriltiradi va o‘ldiradi. Sizlar uchun ALLAHdan boshqa na bir do‘st va na yordamchi bor.",

117: "Albatta, ALLAH Payg‘ambarni, muhojirlar va ansorlardan og‘ir soatda unga ergashganlarni kechirdi. Ulardan bir guruhning qalblari og‘ishga yaqin qolganidan keyin ham, ularning tavbasini qabul qildi. Albatta, U ularga mehribon va Rahmlidir.",

118: "Orqada qolgan uch kishining ham tavbasini qabul qildi. Hatto yer keng bo‘lsa ham ularga tor bo‘lib, o‘zlari ham siqilib qolganlarida va ALLAHdan boshqa panoh yo‘qligini bilganlarida, U ularga tavba qilishlari uchun qaytdi. Albatta, ALLAH Tavbalarni qabul qiluvchi va Rahmlidir.",

119: "Ey iymon keltirganlar! ALLAHdan qo‘rqinglar va rostgo‘ylar bilan birga bo‘linglar.",

120: "Madina ahli va uning atrofidagi a’robiylarga ALLAHning Rasulidan ortda qolish va uning jonidan ko‘ra o‘z jonlarini ustun qo‘yishlari loyiq emasdir. Chunki ular ALLAH yo‘lida qanday chanqoqlik, charchoq va ochlikka duch kelsalar, kofirlarni g‘azablantiradigan har qanday qadam bossalar va dushmandan biror narsa olsalar, albatta ular uchun solih amal yoziladi. Albatta, ALLAH yaxshilik qiluvchilarning ajrini zoye qilmaydi.",

121: "Ular ozgina yoki ko‘p biror nafaqa qilmasinlar va biror vodiyni bosib o‘tmasinlar, albatta, bu ular uchun yoziladi. Toki ALLAH ularni qilgan ishlarining eng go‘zali bilan mukofotlasin.",

122: "Mo‘minlarning hammasi birdaniga chiqishlari shart emas. Har bir guruhdan bir toifa chiqib, dinni chuqur o‘rganishlari va qavmlari oldiga qaytganlarida ularni ogohlantirishlari kerak. Shoyad ular saqlansalar.",

123: "Ey iymon keltirganlar! Sizlarga yaqin bo‘lgan kofirlar bilan kurashinglar va ular sizlarda qat’iyat topsinlar. Bilinglarki, ALLAH taqvo qiluvchilar bilan birgadir.",

124: "Qachonki biror sura nozil qilinsa, ulardan ba’zilari: «Bu qaysingizning iymoningizni ziyoda qildi?» deydilar. Iymon keltirganlarga esa u ularning iymonlarini ziyoda qiladi va ular xursand bo‘ladilar.",

125: "Ammo qalblarida kasallik bo‘lganlarga esa ularning nopokliklariga yana nopoklik qo‘shadi va ular kofir holida o‘ladilar.",

126: "Ular har yili bir yoki ikki marta sinov qilinayotganlarini ko‘rmaydilarmi? So‘ngra tavba ham qilmaydilar va eslatma ham olmaydilar.",

127: "Qachonki biror sura nozil qilinsa, ba’zilari ba’zilariga qarab: «Sizlarni biror kishi ko‘ryaptimi?» deydilar. So‘ngra yuz o‘girib ketadilar. ALLAH ularning qalblarini burib qo‘ydi, chunki ular tushunmaydigan qavmdirlar.",

128: "Albatta, sizlarga o‘zlaringizdan bo‘lgan bir Rasul keldi. Sizlarning qiynalishingiz unga og‘ir botadi. U sizlarga juda mehribon, mo‘minlarga esa rahmli va shafqatlidir.",

129: "Agar ular yuz o‘girsalar, ayting: «Menga ALLAH kifoyadir. Undan boshqa iloh yo‘qdir. Unga tavakkul qildim. U ulug‘ Arshning Robbidir».",
    },
 10: {    
1: "Alif, Lom, Ro.",

2: "Odamlarni ogohlantirgin va iymon keltirganlarga Robbilari huzurida ulug‘ maqom borligi haqida xushxabar bergin, deb ulardan bo‘lgan bir kishiga vahiy qilishimiz odamlar uchun ajablanarlimi? Kofirlar: «Bu ochiq sehrgardir», dedilar.",

3: "Albatta, Robbingiz osmonlaru yerni olti kunda yaratgan, so‘ng Arsh ustida istivo qilgan ALLAHdir. U barcha ishlarni boshqaradi. Uning iznisiz hech qanday shafoatchi yo‘qdir. Mana shu sizlarning Robbingiz — bas, Unga ibodat qilinglar. Nahotki eslatma olmasangizlar?",

4: "Barchangizning qaytishingiz Uning huzurigadir. Bu ALLAHning haq va’dasidir. Albatta, U yaratishni boshlaydi, so‘ngra iymon keltirgan va yaxshi amallar qilganlarni adolat bilan mukofotlash uchun uni qaytaradi. Kofir bo‘lganlarga esa kofirliklari sababli qaynoq ichimlik va alamli azob bordir.",

5: "U quyoshni ziyo, oyni nur qilgan va yillar soni hamda hisobni bilishingiz uchun unga manzillar belgilagan Zotdir. ALLAH buni faqat haq bilan yaratdi. Biladigan qavm uchun oyatlarni batafsil bayon qiladi.",

6: "Albatta, kecha va kunduzning almashinuvida hamda ALLAH osmonlaru yerda yaratgan narsalarda taqvo qiladigan qavm uchun oyatlar bordir.",

7: "Biz bilan uchrashishni umid qilmaydigan, dunyo hayotiga rozi bo‘lib, unga xotirjam bo‘lgan va oyatlarimizdan g‘ofil bo‘lganlar —",

8: "ana o‘shalarning joylari qilgan ishlari sababli do‘zaxdir.",

9: "Albatta, iymon keltirgan va yaxshi amallar qilganlarni Robblari iymonlari sababli ostidan anhorlar oqadigan ne’mat bog‘lariga hidoyat qiladi.",

10: "Ularning u yerdagi duolari: «Ey ALLAH! Sen poksan!» bo‘ladi. U yerdagi salomlashishlari: «Salom» bo‘ladi. Duolarining oxiri esa: «Hamd olamlarning Robbi ALLAHgadir», bo‘ladi.",

11: "Agar ALLAH odamlarga yomonlikni ular yaxshilikka shoshilganlari kabi tezlashtirganida edi, ularning ajal muddati tugagan bo‘lardi. Biz bilan uchrashishni umid qilmaydiganlarni o‘z tug‘yonlarida sarson holda qoldiramiz.",

12: "Insonga zarar yetganida, yonboshlab, o‘tirib yoki tik turgan holda Bizga duo qiladi. Qachonki undan zararini ketkazsak, go‘yo unga yetgan zarar uchun Bizga duo qilmagandek o‘tib ketadi. Haddidan oshuvchilarga qilgan ishlari shunday chiroyli ko‘rsatildi.",

13: "Albatta, Biz sizlardan oldingi avlodlarni ular zulm qilganlari sababli halok qildik. Ularga Rasulchilarimiz ochiq dalillar bilan kelgan edilar, lekin ular iymon keltirmadilar. Jinoyatchi qavmni shunday jazolaymiz.",

14: "So‘ngra ulardan keyin sizlarni yer yuzida xalifalar qildik, qanday amal qilishingizni ko‘rish uchun.",

15: "Ularga Bizning ochiq oyatlarimiz o‘qilganida, Biz bilan uchrashishni umid qilmaydiganlar: «Bundan boshqa Qur’on keltir yoki uni o‘zgartir», dedilar. Ayting: «Uni o‘zim tomondan o‘zgartirishim mumkin emas. Men faqat menga vahiy qilingan narsaga ergashaman. Agar Robbimga osiy bo‘lsam, ulug‘ kun azobidan qo‘rqaman».",

16: "Ayting: «Agar ALLAH xohlaganida, men uni sizlarga o‘qib bermagan va sizlarga uni bildirmagan bo‘lardim. Men undan oldin orangizda umr o‘tkazdim. Nahotki aql ishlatmasangizlar?»",

17: "ALLAHga yolg‘on to‘qigan yoki Uning oyatlarini yolg‘on degan kishidan ham zolimroq kim bor? Albatta, jinoyatchilar najot topmaydilar.",

18: "Ular ALLAHni qo‘yib, ularga na zarar, na foyda bera olmaydigan narsalarga ibodat qiladilar va: «Bular ALLAH huzurida bizning shafoatchilarimiz», deydilar. Ayting: «ALLAHga osmonlaru yerda U bilmaydigan narsani xabar berasizlarmi?» U pok va ularning shirk keltirayotgan narsalaridan yuksakdir.",

19: "Odamlar yagona ummat edilar. So‘ng ixtilof qildilar. Agar Robbingdan oldindan bir so‘z bo‘lmaganida edi, ular ixtilof qilgan narsalarida hukm qilingan bo‘lardi.",

20: "Ular: «Unga Robbidan bir oyat tushirilsa edi», deydilar. Ayting: «G‘ayb faqat ALLAHnikidir. Bas, kutinglar, men ham sizlar bilan birga kutuvchilardanman».",
 21: "Qachonki Biz odamlarga boshlariga yetgan zarardan keyin rahmatni tottirsak, birdan ular oyatlarimizga qarshi makr qiladilar. Ayting: «ALLAHning makri tezroqdir». Albatta, Bizning elchilarimiz sizlar qilayotgan makrlarni yozib boradilar.",

22: "U sizlarni quruqlikda va dengizda yurgizadigan Zotdir. Hatto sizlar kemalarda bo‘lganingizda, ular yaxshi shamol bilan suzib ketayotganlarida va ular bundan xursand bo‘lganlarida, birdan kuchli shamol kelib, har tomondan to‘lqinlar ularga yopirilganda va ular qamalib qolganlarini o‘ylaganlarida, dinni Unga xolis qilgan holda ALLAHga duo qiladilar: «Agar bizni bundan qutqarsang, albatta shukr qiluvchilardan bo‘lamiz».",

23: "U ularni qutqarganida esa, ular yer yuzida nohaq tajovuz qiladilar. Ey insonlar! Sizlarning tajovuzingiz faqat o‘zlaringizga zarardir. Bu dunyo hayotining foydalanishidir. So‘ngra qaytishingiz Bizning huzurimizga bo‘ladi. Bas, qilgan ishlaringizni sizlarga xabar qilamiz.",

24: "Dunyo hayotining misoli osmondan tushirgan suvimizga o‘xshaydi. U bilan odamlar va chorvalar yeydigan yer o‘simliklari aralashib ketadi. Nihoyat, yer o‘z ziynatini olib, bezanib, egalari uning ustidan qudratga ega bo‘ldik deb o‘ylaganlarida, kechasi yoki kunduzida unga Bizning amrimiz keladi. Bas, uni kecha bo‘lmagandek o‘rib tashlangan qilamiz. Tafakkur qiladigan qavm uchun oyatlarni shunday batafsil bayon qilamiz.",

25: "ALLAH tinchlik diyoriga chaqiradi va xohlagan kishisini to‘g‘ri yo‘lga hidoyat qiladi.",

26: "Yaxshilik qilganlarga go‘zal mukofot va undan ham ziyodasi bordir. Ularning yuzlarini na qorong‘ulik, na xorlik qoplaydi. Ana o‘shalar jannat ahlidirlar. Ular unda abadiy qoladilar.",

27: "Yomonliklar qilganlarning jazosi esa yomonlikning mislicha bo‘ladi. Ularni xorlik qoplaydi. Ular uchun ALLAHdan hech qanday himoyachi yo‘q. Ularning yuzlari go‘yo tunning qorong‘i parchalariga o‘ralgandek bo‘ladi. Ana o‘shalar do‘zax ahlidirlar. Ular unda abadiy qoladilar.",

28: "Ularning barchasini jamlaydigan kunimizda mushriklarga: «Sizlar ham, sheriklaringiz ham joyingizda turinglar», deymiz. So‘ngra ularning orasini ajratamiz. Ularning sheriklari: «Sizlar bizga ibodat qilmagan edingizlar».",

29: "«Biz bilan sizlarning orangizda guvoh sifatida ALLAHning O‘zi kifoyadir. Biz sizlarning ibodatingizdan bexabar edik».",

30: "U yerda har bir jon avval qilgan ishlarini sinaydi. Ular haqiqiy Ma’volari bo‘lgan ALLAH huzuriga qaytariladilar va to‘qib chiqargan narsalari ulardan yo‘qoladi.",

31: "Ayting: «Sizlarga osmondan va yerdan kim rizq beradi? Quloq va ko‘zlarga kim egalik qiladi? Tirikni o‘likdan va o‘likni tirikdan kim chiqaradi? Barcha ishni kim boshqaradi?» Ular: «ALLAH», deydilar. Bas, ayting: «Taqvo qilmayapsizlarmi?»",

32: "Mana shu sizlarning haqiqiy Robbingiz bo‘lgan ALLAHdir. Haqdan keyin zalolatdan boshqa nima bor? Qanday yuz o‘girasizlar?",

33: "Shunday qilib, Robbingning fosiqlar haqidagi so‘zi o‘z isbotini topdi. Chunki ular iymon keltirmaydilar.",

34: "Ayting: «Sizlarning sheriklaringiz orasida yaratishni boshlaydigan, so‘ngra uni qaytaradigan biror kishi bormi?» Ayting: «ALLAH yaratishni boshlaydi va uni qaytaradi. Bas, qanday aldanib ketasizlar?»",

35: "Ayting: «Sizlarning sheriklaringiz orasida haq yo‘lga hidoyat qiladigan biror kishi bormi?» Ayting: «Faqat ALLAH haq yo‘lga hidoyat qiladi. Hidoyat qiluvchi Zot ergashishga haqlimi yoki o‘zi hidoyat topmaguncha yo‘l topa olmaydigan zotmi? Sizlarga nima bo‘ldi? Qanday hukm qilasizlar?»",

36: "Ularning ko‘plari faqat gumonga ergashadilar. Albatta, gumon haqiqat o‘rnini bosa olmaydi. ALLAH ularning qilayotgan ishlarini Biluvchidir.",

37: "Bu Qur’on ALLAHdan o‘zga tomonidan to‘qib chiqarilgan emas. Balki u o‘zidan oldingi narsalarni tasdiqlovchi va Kitobni batafsil bayon qiluvchidir. Unda olamlarning Robbidan hech qanday shubha yo‘qdir.",

38: "Yoki ular: «Uni o‘zi to‘qib chiqardi», deydilarmi? Ayting: «Agar rostgo‘y bo‘lsangizlar, ALLAHdan boshqa chaqira oladiganlaringizni chaqiringlar va unga o‘xshash bir sura keltiringlar».",

39: "Yo‘q, ular ilmini qamrab olmagan va hali ta’vili kelmagan narsani yolg‘on dedilar. Ulardan oldingilar ham shunday yolg‘on degan edilar. Bas, zolimlarning oqibati qanday bo‘lganiga qaranglar.",

40: "Ularning orasida unga iymon keltiradiganlar ham bor, unga iymon keltirmaydiganlar ham bor. Robbing buzg‘unchilarni yaxshiroq Biluvchidir.",
41: "Agar ular seni yolg‘onchi qilsalar, ayt: «Mening amalim menga, sizlarning amalingiz sizlarga. Sizlar mening qilayotgan ishimdan poksizlar, men ham sizlar qilayotgan ishdan pokman».",

42: "Ularning orasida senga quloq soladiganlar bor. Sen karlarni, hatto ular aql ishlatmasalar ham, eshittira olasanmi?",

43: "Ularning orasida senga qaraydiganlar ham bor. Sen ko‘rlarni, hatto ular ko‘rmasalar ham, hidoyat qila olasanmi?",

44: "Albatta, ALLAH odamlarga hech qanday zulm qilmaydi, lekin odamlar o‘zlariga zulm qiladilar.",

45: "U ularni jamlaydigan kuni, ular go‘yo dunyoda kunduzning faqat bir soatigina turgandek bo‘ladilar. Ular bir-birlarini taniydilar. ALLAH bilan uchrashishni yolg‘on deganlar ziyon ko‘rdilar va hidoyat topmagan edilar.",

46: "Agar Biz ularga va’da qilgan narsamizning bir qismini senga ko‘rsatsak yoki seni vafot ettirsak ham, ularning qaytishi Bizning huzurimizgadir. So‘ngra ALLAH qilayotgan ishlariga guvohdir.",

47: "Har bir ummat uchun bir Rasul bor. Ularning Rasuli kelganida, ular orasida adolat bilan hukm qilinadi va ularga zulm qilinmaydi.",

48: "Ular: «Agar rostgo‘y bo‘lsangizlar, bu va’da qachon bo‘ladi?» deydilar.",

49: "Ayting: «Men o‘zim uchun ham ALLAH xohlaganidan boshqa na zarar yetkazishga va na foyda olishga qodirman. Har bir ummat uchun muddat bor. Ularning muddati kelganida, bir soat ham kechiktira olmaydilar va oldinga ham sura olmaydilar».",

50: "Ayting: «Uning azobi kechasi yoki kunduzda sizlarga kelib qolsa, jinoyatchilar undan nimani tezlashtirmoqdalar?»",

51: "U sodir bo‘lganidan keyin unga iymon keltirasizlarmi? Endi esa uni tezlashtirishni so‘rayapsizlarmi?",

52: "So‘ngra zulm qilganlarga: «Doimiy azobni totib ko‘ringlar. Sizlar faqat qilgan narsalaringiz sababli jazolanasizlar», deyiladi.",

53: "Sendan: «Bu haqmi?» deb so‘raydilar. Ayting: «Ha, Robbimga qasamki, bu haqiqatdir. Sizlar undan qochib qutula olmaysizlar».",

54: "Agar zulm qilgan har bir jon yer yuzidagi barcha narsaga ega bo‘lganida edi, uni fidya qilgan bo‘lardi. Azobni ko‘rganlarida ichlarida pushaymon bo‘ladilar. Ular orasida adolat bilan hukm qilinadi va ularga zulm qilinmaydi.",

55: "Ogoh bo‘linglar! Osmonlaru yerdagi narsalar ALLAHnikidir. Ogoh bo‘linglar! ALLAHning va’dasi haqdir, lekin ularning ko‘plari bilmaydilar.",

56: "U tiriltiradi va o‘ldiradi. Va sizlar Uning huzuriga qaytarilasizlar.",

57: "Ey insonlar! Sizlarga Robbingizdan nasihat, ko‘ksingizdagi narsalarga shifo, mo‘minlar uchun hidoyat va rahmat kelgan.",

58: "Ayting: «ALLAHning fazli va rahmati bilan, bas, ular shod bo‘lsinlar. Bu ularning jamlayotgan narsalaridan yaxshiroqdir».",

59: "Ayting: «ALLAH sizlarga tushirgan rizqlardan ba’zisini harom, ba’zisini halol qildingizlar. Ayting: «ALLAH sizlarga bunga izn berdimi yoki ALLAH haqida yolg‘on to‘qiyapsizlarmi?»",

60: "ALLAH haqida yolg‘on to‘qiydiganlarning qiyomat kuni haqidagi gumoni qanday bo‘ladi? Albatta, ALLAH odamlarga fazl sohibidir, lekin ularning ko‘plari shukr qilmaydilar.",
61: "Sen qanday ishda bo‘lma, Qur’ondan nimani o‘qima va sizlar qanday amal qilmanglar, Biz sizlar unga kirishayotganingizda ustingizda guvoh bo‘lamiz. Yerda ham, osmonda ham zarra misolicha narsa Robbingdan yashirin emas. Bundan kichigi ham, kattasi ham ochiq Kitobdadir.",

62: "Ogoh bo‘linglar! Albatta, ALLAHning do‘stlariga qo‘rquv yo‘qdir va ular g‘amgin bo‘lmaydilar.",

63: "Ular iymon keltirgan va taqvo qilganlardir.",

64: "Ular uchun dunyo hayotida ham, oxiratda ham xushxabar bordir. ALLAHning so‘zlari o‘zgarmaydi. Mana shu ulkan najotdir.",

65: "Ularning gaplari seni g‘amgin qilmasin. Albatta, barcha izzat ALLAHnikidir. U Eshituvchi va Biluvchidir.",

66: "Ogoh bo‘linglar! Osmonlardagi va yerdagi barcha mavjudotlar ALLAHnikidir. ALLAHni qo‘yib sheriklarni chaqirayotganlar nimaga ergashyaptilar? Ular faqat gumonga ergashadilar va faqat taxmin qiladilar.",

67: "U sizlar orom olishingiz uchun kechani va ko‘rishingiz uchun kunduzni yaratgan Zotdir. Albatta, bunda eshitadigan qavm uchun oyatlar bordir.",

68: "Ular: «ALLAH farzand tutdi», dedilar. U pokdir. U behojatdir. Osmonlaru yerdagi narsalar Unikidir. Sizlarda bunga hech qanday dalil yo‘q. ALLAH haqida bilmagan narsangizni aytyapsizlarmi?",

69: "Ayting: «ALLAH haqida yolg‘on to‘qiydiganlar najot topmaydilar».",

70: "Ular dunyoda ozgina foydalanadilar, so‘ngra Bizning huzurimizga qaytadilar. So‘ngra kufr qilganlari sababli ularga qattiq azobni tottiramiz.",

71: "Ularga Nuhning xabarini o‘qib ber. U o‘z qavmiga: «Ey qavmim! Agar mening turishim va ALLAHning oyatlarini eslatishim sizlarga og‘ir bo‘lsa, men faqat ALLAHga tavakkul qildim. Bas, ishlaringizni va sheriklaringizni jamlanglar, so‘ngra ishingiz sizlarga yashirin bo‘lmasin. Keyin menga nisbatan hukmingizni qilinglar va menga muhlat bermanglar», degan edi.",

72: "Agar yuz o‘girsangizlar, men sizlardan hech qanday haq so‘ramadim. Mening mukofotim faqat ALLAH huzuridadir. Menga musulmonlardan bo‘lish buyurilgan.",

73: "Bas, ular uni yolg‘onchi qildilar. Biz uni va u bilan birga kemada bo‘lganlarni najot berdik va ularni xalifalar qildik. Oyatlarimizni yolg‘on deganlarni esa g‘arq qildik. Ogohlantirilganlarning oqibati qanday bo‘lganiga qaranglar.",

74: "So‘ngra undan keyin o‘z qavmlariga Rasulchilar yubordik. Ular ularga ochiq dalillar bilan kelgan edilar. Lekin ular oldin yolg‘on degan narsalariga iymon keltiradigan bo‘lmadilar. Haddidan oshuvchilarning qalblarini shunday muhrlaymiz.",

75: "So‘ngra ulardan keyin Muso va Horunni Fir’avn va uning boshliqlariga oyatlarimiz bilan yubordik. Lekin ular kibrlanib, jinoyatchi qavm bo‘ldilar.",

76: "Ularga Bizning huzurimizdan haq kelganida: «Bu aniq sehrdir», dedilar.",

77: "Muso dedi: «Sizlar haq kelganida shunday deysizlarmi? Bu sehrmi? Sehrgarlar najot topmaydilar».",

78: "Ular dedilar: «Sen bizni ota-bobolarimizni topgan yo‘limizdan burish va yer yuzida ikkovingizga ulug‘lik bo‘lishi uchun keldingmi? Biz sizlarga iymon keltirmaymiz».",

79: "Fir’avn dedi: «Menga barcha bilimdon sehrgarlarni keltiringlar».",

80: "Sehrgarlar kelganida, Muso ularga: «Tashlaydigan narsangizni tashlanglar», dedi.",
81: "Ular tashlaganlarida, Muso dedi: «Sizlar keltirgan narsa sehrdir. Albatta, ALLAH uni botil qiladi. Albatta, ALLAH buzg‘unchilarning ishini isloh qilmaydi».",

82: "Jinoyatchilar yomon ko‘rsalar ham, ALLAH O‘z so‘zlari bilan haqni qaror toptiradi.",

83: "Fir’avn va uning boshliqlari ularga zulm qilishidan qo‘rqib, Musoga uning qavmidan faqat bir guruh zurriyotlari iymon keltirdi. Albatta, Fir’avn yer yuzida katta kibr egasi edi va u haddidan oshuvchilardan edi.",

84: "Muso dedi: «Ey qavmim! Agar ALLAHga iymon keltirgan bo‘lsangizlar va musulmon bo‘lgan bo‘lsangizlar, Unga tavakkul qilinglar».",

85: "Ular dedilar: «Biz faqat ALLAHga tavakkul qildik. Ey Robbimiz! Bizni zolim qavm uchun sinov qilib qo‘ymagin».",

86: "«Bizni rahmating bilan kofir qavmdan najot bergin».",

87: "Biz Muso va uning birodariga: «Qavmingiz uchun Misrda uylar tayyorlanglar, uylaringizni qiblaga aylantiringlar va namozni ado qilinglar. Mo‘minlarga xushxabar bergin», deb vahiy qildik.",

88: "Muso dedi: «Ey Robbimiz! Sen Fir’avn va uning boshliqlariga dunyo hayotida ziynat va mollar berding. Ey Robbimiz! Ular odamlarni Sening yo‘lingdan adashtirishlari uchunmi? Ey Robbimiz! Ularning mollarini yo‘q qilgin va qalblarini qattiq qilgin. Ular alamli azobni ko‘rmagunlaricha iymon keltirmaydilar».",

89: "U dedi: «Ikkovingizning duolaringiz qabul qilindi. Bas, to‘g‘ri turinglar va bilmaydiganlarning yo‘liga ergashmanglar».",

90: "Bani Isroilni dengizdan o‘tkazdik. Fir’avn va uning lashkarlari zulm va tajovuz bilan ularning ortidan quvdilar. Nihoyat, u g‘arq bo‘layotganida dedi: «Bani Isroil iymon keltirgan Zotdan boshqa iloh yo‘qligiga iymon keltirdim. Men musulmonlardanman».",

91: "Endi esa?! Holbuki, oldin isyon qilgan eding va buzg‘unchilardan bo‘lgan eding.",

92: "Bugun Biz seni jasading bilan najot qilamiz, toki sendan keyingilarga oyat bo‘lsin. Albatta, odamlarning ko‘pchiligi Bizning oyatlarimizdan g‘ofildirlar.",

93: "Bani Isroilni go‘zal joyga joylashtirdik va ularga pok narsalardan rizq berdik. Ular o‘zlariga ilm kelgunicha ixtilof qilmadilar. Albatta, Robbing qiyomat kuni ular ixtilof qilgan narsalarida ular orasida hukm qiladi.",

94: "Agar senga nozil qilgan narsamizdan shubhada bo‘lsang, sendan oldin Kitob o‘qiganlardan so‘ra. Albatta, senga Robbingdan haq keldi. Bas, shubha qiluvchilardan bo‘lma.",

95: "Va ALLAHning oyatlarini yolg‘on deganlardan bo‘lma, aks holda ziyon ko‘ruvchilardan bo‘lasan.",

96: "Albatta, Robbingning so‘zi ustilariga haq bo‘lganlar iymon keltirmaydilar.",

97: "Ularga barcha oyatlar kelsa ham, alamli azobni ko‘rmagunlaricha iymon keltirmaydilar.",

98: "Yunusning qavmi bundan mustasnodir. Ular iymon keltirganlarida va iymonlari ularga foyda berganida, Biz ulardan dunyo hayotidagi xorlik azobini ketkazdik va ularni bir muddatgacha foydalantirdik.",

99: "Agar Robbing xohlaganida, yer yuzidagi barcha kishilar jam bo‘lib iymon keltirgan bo‘lardi. Odamlarni mo‘min bo‘lishga sen majburlaysanmi?",

100: "ALLAHning iznisiz hech bir jon iymon keltira olmaydi. U aql ishlatmaydiganlarga najosatni qo‘yadi.",
101: "Ayting: «Osmonlaru yerda nimalar borligiga qaranglar». Iymon keltirmaydigan qavm uchun oyatlar va ogohlantirishlar foyda bermaydi.",

102: "Ular o‘zlaridan oldin o‘tgan kunlarga o‘xshash kunlarnigina kutmoqdalar. Ayting: «Bas, kutinglar, men ham sizlar bilan birga kutuvchilardanman».",

103: "So‘ngra Biz Rasulimizni va iymon keltirganlarni najot beramiz. Shunday qilib, mo‘minlarni najot berish Bizning zimmamizdagi haqiqatdir.",

104: "Ayting: «Ey insonlar! Agar mening dinim haqida shubhada bo‘lsangizlar, men sizlar ALLAHni qo‘yib ibodat qilayotgan narsalaringizga ibodat qilmayman. Lekin men sizlarni o‘ldiradigan ALLAHga ibodat qilaman va menga mo‘minlardan bo‘lish buyurilgan».",

105: "«Va yuzingni haq dinga xolis holda burgin va aslo mushriklardan bo‘lma».",

106: "«ALLAHni qo‘yib, senga na foyda, na zarar bera olmaydigan narsalarga duo qilma. Agar shunday qilsang, albatta, zolimlardan bo‘lasan».",

107: "Agar ALLAH senga biror zarar yetkazsa, Uni o‘zidan boshqa ketkazuvchi yo‘qdir. Agar senga yaxshilikni xohlasa, Uning fazlini qaytaruvchi yo‘qdir. U uni bandalaridan xohlaganiga yetkazadi. U Mag‘firat qiluvchi va Rahmlidir.",

108: "Ayting: «Ey insonlar! Sizlarga Robbingizdan haq keldi. Kim hidoyat topsa, faqat o‘zi uchun hidoyat topadi. Kim adashsa, faqat o‘z zarariga adashadi. Men sizlarga vakil emasman».",

109: "Senga vahiy qilingan narsaga ergashgin va ALLAH hukm qilgunicha sabr qilgin. U hukm qiluvchilarning eng yaxshisidir.",
    },
 11: {
1: "Alif, Lom, Ro. Bu shunday Kitobki, uning oyatlari mustahkam qilingan, so‘ngra Hikmat Egasi va Xabardor Zot tomonidan batafsil bayon qilingan.",

2: "Sizlar faqat ALLAHga ibodat qilishingiz uchun. Albatta, men sizlar uchun Undan yuborilgan ogohlantiruvchi va xushxabar beruvchiman.",

3: "Robbingizdan mag‘firat so‘ranglar, so‘ngra Unga tavba qilinglar. U sizlarni belgilangan muddatgacha yaxshi ne’matlar bilan bahramand qiladi va har bir fazl egasiga o‘z fazlini beradi. Agar yuz o‘girsangizlar, men sizlar uchun ulug‘ kun azobidan qo‘rqaman.",

4: "Sizlarning qaytishingiz ALLAH huzurigadir. U har narsaga qodirdir.",

5: "Ogoh bo‘linglar! Ular undan yashirinish uchun ko‘ksilarini buraydilar. Ogoh bo‘linglar! Ular kiyimlari bilan o‘ranganlarida ham, U ularning yashirganini ham, oshkor qilganini ham biladi. Albatta, U ko‘kslardagi narsalarni Biluvchidir.",

6: "Yer yuzida biror jonzot yo‘qki, uning rizqi ALLAH zimmasida bo‘lmasa. U uning qarorgohi va omonat joyini biladi. Bularning barchasi ochiq Kitobdadir.",

7: "U osmonlaru yerni olti kunda yaratgan Zotdir. Uning Arshi suv ustida edi. Bu sizlardan kimning amali chiroyliroq ekanini sinash uchundir. Agar ularga: «Sizlar o‘limdan keyin tiriltirilasizlar», desang, kofir bo‘lganlar: «Bu faqat ochiq sehrdir», deydilar.",

8: "Agar Biz ulardan azobni sanalgan bir muddatgacha kechiktirsak, ular: «Uni nima to‘sib turibdi?» deydilar. Ogoh bo‘linglar! U ularga kelgan kuni ulardan qaytarilmaydi va ular masxara qilgan narsa ularni qamrab oladi.",

9: "Agar Biz insonga O‘z rahmatimizni tottirsak, so‘ngra uni undan tortib olsak, albatta u noumid va noshukr bo‘lib qoladi.",

10: "Agar unga yetgan zarardan keyin ne’matni tottirsak, albatta: «Yomonliklar mendan ketdi», deydi. Albatta, u xursand va maqtanchoqdir.",

11: "Faqat sabr qilgan va yaxshi amallar qilganlar bundan mustasnodir. Ana o‘shalar uchun mag‘firat va ulug‘ mukofot bordir.",

12: "Balki sen: «Unga xazina tushirilsa edi yoki u bilan birga malaika kelsa edi», deganlari uchun senga vahiy qilinayotgan narsaning bir qismini tark etmoqchi bo‘larsan va ko‘ksing siqilar. Sen faqat ogohlantiruvchisan. ALLAH har narsaga Vakildir.",

13: "Yoki ular: «Uni o‘zi to‘qib chiqardi», deydilarmi? Ayting: «Agar rostgo‘y bo‘lsangizlar, ALLAHdan boshqa chaqira oladiganlaringizni chaqiringlar va unga o‘xshash o‘nta sura keltiringlar».",

14: "Agar ular sizlarga javob bermasalar, bilinglarki, u faqat ALLAHning ilmi bilan nozil qilingan va Undan boshqa iloh yo‘qligiga guvohlik beringlar. Bas, sizlar musulmon bo‘lasizlarmi?",

15: "Kim dunyo hayotini va uning ziynatini istasa, ularga amallarining mukofotini unda to‘liq beramiz va ular unda kamaytirilmaydi.",

16: "Ana o‘shalar uchun oxiratda faqat do‘zax bor. Ularning dunyoda qilganlari bekor bo‘ladi va qilgan ishlari botildir.",

17: "Robbisidan bo‘lgan ochiq dalilga ega bo‘lgan va undan oldin guvoh sifatida Musoning Kitobi bo‘lgan kishi hamda unga iymon keltirganlar — ana o‘shalar unga iymon keltiradilar. Guruhlardan kim unga kofir bo‘lsa, unga va’da qilingan joy do‘zaxdir. Bas, undan shubhada bo‘lma. Albatta, u Robbingdan bo‘lgan haqdir. Lekin odamlarning ko‘plari iymon keltirmaydilar.",

18: "ALLAH haqida yolg‘on to‘qigan kishidan ham zolimroq kim bor? Ana o‘shalar Robblari huzurida keltiriladilar va guvohlar: «Mana shular Robblari haqida yolg‘on gapirganlardir», deydilar. Ogoh bo‘linglar! ALLAHning la’nati zolimlar ustidadir.",

19: "Ular ALLAH yo‘lidan to‘sadilar va uni egri qilishni istaydilar. Ular oxiratga kofirdirlar.",
    
20: "Ular yer yuzida ALLAHni ojiz qila olmaydilar va ular uchun ALLAHdan boshqa do‘stlar ham yo‘qdir. Ularga azob ikki barobar qilinadi. Ular eshita olmas va ko‘ra olmas edilar.",
    
21: "Ana o‘shalar o‘zlarini ziyon qilganlardir va to‘qib chiqargan narsalari ulardan yo‘qolib ketadi.",

22: "Shubhasiz, ular oxiratda eng katta ziyon ko‘ruvchilardir.",

23: "Albatta, iymon keltirgan, yaxshi amallar qilgan va Robblariga bo‘ysunganlar — ana o‘shalar jannat ahlidirlar. Ular unda abadiy qoladilar.",

24: "Bu ikki guruhning misoli ko‘r va kar bilan ko‘ruvchi va eshituvchi kabidir. Ular misolda teng bo‘la oladilarmi? Nahotki eslatma olmasangizlar?",

25: "Albatta, Biz Nuhni o‘z qavmiga yubordik: «Men sizlar uchun ochiq ogohlantiruvchiman».",

26: "«Sizlar faqat ALLAHga ibodat qilinglar. Men sizlar uchun alamli kun azobidan qo‘rqaman».",

27: "Qavmining kofir bo‘lgan boshliqlari dedilar: «Biz seni faqat bizga o‘xshagan inson deb ko‘ryapmiz. Senga faqat oramizdagi eng past kishilar o‘ylamasdan ergashganini ko‘ryapmiz. Sizlarda bizdan ortiq fazilatni ko‘rmayapmiz. Balki sizlarni yolg‘onchilar deb o‘ylaymiz».",

28: "U dedi: «Ey qavmim! Agar men Robbimdan bo‘lgan ochiq dalilga ega bo‘lsam va U menga O‘z huzuridan rahmat bergan bo‘lsa-yu, sizlar buni ko‘rmayotgan bo‘lsangizlar, biz uni sizlarga majburlay olamizmi? Sizlar undan nafratlanayotgan bo‘lsangizlar ham».",

29: "«Ey qavmim! Men buning uchun sizlardan mol so‘ramayman. Mening mukofotim faqat ALLAH huzuridadir. Men iymon keltirganlarni haydab yubormayman. Albatta, ular Robbilari bilan uchrashuvga duch keladilar. Lekin men sizlarni johil qavm deb ko‘raman».",

30: "«Ey qavmim! Agar ularni haydasam, meni ALLAHdan kim himoya qiladi? Nahotki eslatma olmaysizlar?»",

31: "«Men sizlarga: “Menda ALLAHning xazinalari bor”, demayman. G‘aybni ham bilmayman. Men: “Men malaikaman”, ham demayman. Ko‘zlaringiz mensimagan kishilar haqida: “ALLAH ularga yaxshilik bermaydi”, demayman. Ularning qalblaridagi narsani ALLAH yaxshiroq biladi. Agar shunday desam, albatta, zolimlardan bo‘laman».",

32: "Ular dedilar: «Ey Nuh! Biz bilan bahslashding va juda ko‘p bahslashding. Agar rostgo‘ylardan bo‘lsang, bizga va’da qilayotgan narsangni keltir».",

33: "U dedi: «Uni sizlarga faqat ALLAH xohlasa keltiradi va sizlar ojiz qoldiruvchi emassizlar».",

34: "«Agar ALLAH sizlarni adashtirishni xohlasa, men sizlarga nasihat qilmoqchi bo‘lsam ham, nasihatim sizlarga foyda bermaydi. U sizlarning Robbingizdir va sizlar Uning huzuriga qaytarilasizlar».",

35: "Yoki ular: «Uni to‘qib chiqardi», deydilarmi? Ayting: «Agar uni to‘qib chiqargan bo‘lsam, gunohim o‘zimga. Men sizlar qilayotgan gunohlardan pokman».",

36: "Nuhga vahiy qilindi: «Qavmingdan oldin iymon keltirganlardan boshqa hech kim endi iymon keltirmaydi. Bas, ularning qilayotgan ishlaridan g‘amgin bo‘lma».",

37: "«Bizning ko‘z o‘ngimizda va vahiyimiz bilan kemani yasagin va zulm qilganlar haqida Menga murojaat qilma. Albatta, ular g‘arq qilinuvchilardir».",

38: "U kemani yasayotgan edi. Qavmining boshliqlari uning oldidan o‘tsalar, uni masxara qilar edilar. U dedi: «Agar bizni masxara qilsangizlar, biz ham sizlar masxara qilganimiz kabi sizlarni masxara qilamiz».",

39: "«Bas, tez orada bilib olasizlar: kimga xor qiluvchi azob keladi va kimga doimiy azob tushadi».",

40: "Nihoyat, Bizning amrimiz kelib, tandir qaynaganida, dedik: «Unga har biridan juft-juftdan va oila ahlingni — ularga nisbatan hukm o‘tganlardan boshqa — hamda iymon keltirganlarni joylashtir». U bilan birga iymon keltirganlar esa oz edi."    

41: "U dedi: «Unga mininglar. Uning yurishi ham, to‘xtashi ham ALLAH nomi bilandir. Albatta, Robbim Mag‘firat qiluvchi va Rahmlidir».",

42: "U ular bilan tog‘lar kabi to‘lqinlar orasida suzib borar edi. Nuh chetda turgan o‘g‘liga: «Ey o‘g‘lim! Biz bilan birga min va kofirlar bilan birga bo‘lma», deb chaqirdi.",

43: "U dedi: «Men o‘zimni suvdan saqlaydigan bir tog‘ga chiqaman». U dedi: «Bugun ALLAHning amridan faqat U rahm qilgan kishigina najot topadi». So‘ngra ikkovining orasiga to‘lqin tushdi va u g‘arq bo‘lganlardan bo‘ldi.",

44: "Va aytildi: «Ey yer! Suvingni yutgin. Ey osmon! To‘xtagin». Suv kamaydi, ish bitdi va kema Judi tog‘i ustiga qo‘ndi. Va: «Zolim qavm halok bo‘lsin», deyildi.",

45: "Nuh Robbisiga nido qilib dedi: «Ey Robbim! Albatta, o‘g‘lim mening oilamdan edi. Sening va’dang haqdir va Sen hukm qiluvchilarning eng Hikmatlisansan».",

46: "U dedi: «Ey Nuh! U sening oilangdan emas. Albatta, u solih bo‘lmagan amal egasidir. Bas, bilmagan narsangni Mendan so‘rama. Men seni johillardan bo‘lib qolishingdan ogohlantiraman».",

47: "U dedi: «Ey Robbim! Bilmagan narsamni Sendan so‘rashdan Senga panoh tilayman. Agar meni mag‘firat qilmasang va menga rahm qilmasang, ziyon ko‘ruvchilardan bo‘laman».",

48: "Aytildi: «Ey Nuh! Biz tomondan bo‘lgan salom va barakotlar bilan tushgin. Senga va sen bilan birga bo‘lgan ummatlardan bo‘lganlarga (barakotlar bo‘lsin). Ba’zi ummatlarga esa vaqtincha bahramandlik beramiz, so‘ngra ularga Biz tomondan alamli azob yetadi».",

49: "Bu g‘ayb xabarlaridandir. Biz uni senga vahiy qilmoqdamiz. Sen ham, qavming ham bundan oldin buni bilmas edingizlar. Bas, sabr qilgin. Albatta, yaxshi oqibat taqvo qiluvchilarnikidir.",

50: "Od qavmiga ularning birodari Hudni yubordik. U dedi: «Ey qavmim! ALLAHga ibodat qilinglar. Sizlar uchun Undan boshqa iloh yo‘qdir. Sizlar faqat yolg‘on to‘qiyapsizlar».",

51: "«Ey qavmim! Men buning uchun sizlardan mukofot so‘ramayman. Mening mukofotim faqat meni yaratgan Zotning zimmasidadir. Nahotki aql ishlatmasangizlar?»",

52: "«Ey qavmim! Robbingizdan mag‘firat so‘ranglar, so‘ngra Unga tavba qilinglar. U sizlarga osmondan mo‘l yomg‘ir yuboradi va kuchingizga yana kuch qo‘shadi. Jinoyatchilar bo‘lib yuz o‘girmanglar».",

53: "Ular dedilar: «Ey Hud! Sen bizga ochiq dalil keltirmading. Biz sening so‘zing bilan ilohlarimizni tark qilmaymiz va senga iymon keltirmaymiz».",

54: "«Biz faqat shuni aytamizki, ilohlarimizdan ba’zilari seni yomonlik bilan tutgan». U dedi: «Men ALLAHni guvoh qilaman va sizlar ham guvoh bo‘linglar: men sizlar shirk keltirayotgan narsalardan pokman».",

55: "«Undan boshqa barchangizdan. Bas, menga qarshi hammangiz hiyla qilinglar va menga muhlat bermanglar».",

56: "«Men o‘zimning ham, sizlarning ham Robbingiz bo‘lgan ALLAHga tavakkul qildim. Yer yuzida biror jonzot yo‘qki, Uning peshonasidan tutib turmagan bo‘lsa. Albatta, Robbim to‘g‘ri yo‘ldadir».",

57: "«Agar yuz o‘girsangizlar, men sizlarga yuborilgan narsani sizlarga yetkazdim. Robbim sizlardan boshqa bir qavmni o‘rningizga keltiradi. Sizlar Unga hech qanday zarar yetkaza olmaysizlar. Albatta, Robbim har narsani Qo‘riqlovchidir».",

58: "Amrimiz kelganida, Hudni va u bilan birga iymon keltirganlarni Bizdan bo‘lgan rahmat bilan najot berdik. Biz ularni og‘ir azobdan qutqardik.",

59: "Mana shu Od qavmidir. Ular Robbilarining oyatlarini inkor etdilar, Rasuliga osiy bo‘ldilar va har bir o‘jar zolimning amriga ergashdilar.",

60: "Bu dunyoda ham, qiyomat kuni ham ularga la’nat ergashtirildi. Ogoh bo‘linglar! Od qavmi o‘z Robbilarini inkor qildi. Ogoh bo‘linglar! Hudning qavmi — Od halok bo‘lsin.",
61: "Samud qavmiga ularning birodari Solihni yubordik. U dedi: «Ey qavmim! ALLAHga ibodat qilinglar. Sizlar uchun Undan boshqa iloh yo‘qdir. U sizlarni yerdan yaratdi va unda sizlarni obod qiluvchi qildi. Bas, Undan mag‘firat so‘ranglar, so‘ngra Unga tavba qilinglar. Albatta, Robbim yaqin va duolarni qabul qiluvchidir».",

62: "Ular dedilar: «Ey Solih! Bundan oldin sen bizning oramizda umid qilingan kishi eding. Endi ota-bobolarimiz ibodat qilgan narsalarga ibodat qilishimizdan bizni qaytarasanmi? Albatta, biz sen chaqirayotgan narsangdan katta shubhadamiz».",

63: "U dedi: «Ey qavmim! Agar men Robbimdan bo‘lgan ochiq dalilga ega bo‘lsam va U menga O‘zidan rahmat bergan bo‘lsa, bas, agar Unga osiy bo‘lsam, meni ALLAHdan kim himoya qiladi? Sizlar menga faqat ziyonni ziyoda qilasizlar».",

64: "«Ey qavmim! Mana bu ALLAHning tuyasi sizlar uchun oyatdir. Bas, uni ALLAHning yerida yeb-ichishiga qo‘yib yuboringlar va unga yomonlik bilan tegmanglar, aks holda sizlarni yaqin azob tutadi».",

65: "Lekin ular uni so‘ydilar. U dedi: «Yurtingizda uch kun yashab turinglar. Bu yolg‘on qilinmaydigan va’dadir».",

66: "Amrimiz kelganida, Solihni va u bilan birga iymon keltirganlarni Bizdan bo‘lgan rahmat bilan najot berdik va o‘sha kunning xorligidan qutqardik. Albatta, Robbing Kuchli va G‘olibdir.",

67: "Zulm qilganlarni esa dahshatli ovoz tutdi va ular o‘z uylarida yuztuban holda halok bo‘ldilar.",

68: "Go‘yo u yerda yashamagandek bo‘ldilar. Ogoh bo‘linglar! Samud Robbilarini inkor qildilar. Ogoh bo‘linglar! Samud halok bo‘lsin.",

69: "Albatta, elchilarimiz Ibrohimga xushxabar bilan kelganlarida: «Salom», dedilar. U: «Salom», dedi va ko‘p o‘tmay ularga qovurilgan buzoq keltirdi.",

70: "U ularning qo‘llari unga uzatilmayotganini ko‘rganida, ulardan shubhalandi va ichida qo‘rquv sezdi. Ular: «Qo‘rqma! Biz Lut qavmiga yuborilganmiz», dedilar.",

71: "Uning xotini turgan edi va kuldi. Bas, Biz unga Ishoq haqida va Ishoqdan keyin Ya’qub haqida xushxabar berdik.",

72: "U dedi: «Voy holim! Men qarib qolganimda va bu erim ham qarib qolganida tug‘amanmi? Bu juda ajablanarli narsa!»",

73: "Ular dedilar: «ALLAHning amridan ajablanasanmi? Ey uy ahli! ALLAHning rahmati va barakotlari sizlarga bo‘lsin. Albatta, U Hamdga loyiq va Ulug‘dir».",

74: "Ibrohimdan qo‘rquv ketib, unga xushxabar kelganida, u Biz bilan Lut qavmi haqida bahslasha boshladi.",

75: "Albatta, Ibrohim halim, ko‘p iltijo qiluvchi va tavba qiluvchi edi.",

76: "Ey Ibrohim! Bundan voz kech. Albatta, Robbingning amri keldi. Ularga qaytarib bo‘lmaydigan azob keladi.",

77: "Elchilarimiz Lutning oldiga kelganlarida, u ular sababli tashvishga tushdi va ko‘ngli siqildi. U dedi: «Bu og‘ir kundir».",

78: "Uning qavmi shoshilib uning oldiga keldi. Oldindan ham yomon ishlar qilgan edilar. U dedi: «Ey qavmim! Mana bu qizlarim sizlar uchun pokroqdir. Bas, ALLAHdan qo‘rqinglar va mehmonlarim oldida meni sharmanda qilmanglar. Orangizda to‘g‘ri yo‘lga kirgan biror kishi yo‘qmi?»",

79: "Ular dedilar: «Sen bilasanki, bizning qizlaringga ehtiyojimiz yo‘q. Sen biz nimani xohlayotganimizni yaxshi bilasan».",

80: "U dedi: «Qani edi, sizlarga qarshi kuchim bo‘lsa yoki kuchli tayanchga suyansam edi!»",
81: "Ular dedilar: «Ey Lut! Biz Robbingning elchilarimiz. Ular senga hech qachon zarar yetkaza olmaydilar. Bas, kechaning bir qismida oilang bilan chiqib ket. Sizlardan hech kim ortiga qaramasin. Faqat xotining bundan mustasno. Albatta, unga ularga yetgan narsa yetadi. Ularning va’dalangan vaqti tongdir. Tong yaqin emasmi?»",

82: "Amrimiz kelganida, Biz uning ustini ostiga aylantirdik va ustiga pishirilgan loydan bo‘lgan toshlarni ketma-ket yog‘dirdik.",

83: "Ular Robbing huzurida belgilangan edi. Bu (azob) zolimlardan uzoq emasdir.",

84: "Mad’yanga ularning birodari Shuaybni yubordik. U dedi: «Ey qavmim! ALLAHga ibodat qilinglar. Sizlar uchun Undan boshqa iloh yo‘qdir. O‘lchov va tarozini kamaytirmanglar. Men sizlarni yaxshilik ichida ko‘rmoqdaman va sizlarga qamrab oluvchi kun azobidan qo‘rqaman».",

85: "«Ey qavmim! O‘lchov va tarozini adolat bilan to‘liq qilinglar. Odamlarning narsalarini kamaytirmanglar va yer yuzida buzg‘unchilik qilib yurmanglar».",

86: "«Agar mo‘min bo‘lsangizlar, ALLAHning qoldirgan halol narsasi sizlar uchun yaxshiroqdir. Men sizlar ustingizda qo‘riqchi emasman».",

87: "Ular dedilar: «Ey Shuayb! Namozing seni ota-bobolarimiz ibodat qilgan narsalarni tark etishimizni yoki mollarimizda xohlaganimizni qilmasligimizni buyuradimi? Albatta, sen juda halim va to‘g‘ri yo‘ldagi kishisan».",

88: "U dedi: «Ey qavmim! Agar men Robbimdan bo‘lgan ochiq dalilga ega bo‘lsam va U menga O‘z huzuridan go‘zal rizq bergan bo‘lsa, men sizlarga qarshi chiqishni xohlamayman. Men faqat imkonim boricha isloh qilishni xohlayman. Muvaffaqiyatim faqat ALLAH bilandir. Unga tavakkul qildim va Unga qaytaman».",

89: "«Ey qavmim! Menga qarshi chiqishingiz Nuh qavmi, Hud qavmi yoki Solih qavmiga yetgan narsa kabi sizlarga ham yetishiga sabab bo‘lmasin. Lut qavmi sizlardan uzoq emas».",

90: "«Robbingizdan mag‘firat so‘ranglar, so‘ngra Unga tavba qilinglar. Albatta, Robbim Rahmli va Mehribondir».",

91: "Ular dedilar: «Ey Shuayb! Sen aytayotgan narsalarning ko‘pini tushunmaymiz. Seni oramizda zaif deb ko‘ramiz. Agar qabilang bo‘lmaganida, seni toshbo‘ron qilgan bo‘lardik. Sen biz uchun hurmatli emassan».",

92: "U dedi: «Ey qavmim! Mening qabilam sizlar uchun ALLAHdan ko‘ra azizroqmi? Sizlar Uni ortingizga tashlab qo‘ydingizlar. Albatta, Robbim qilayotgan ishlaringizni qamrab oluvchidir».",

93: "«Ey qavmim! O‘z holingizda amal qilinglar, men ham amal qiluvchiman. Tez orada bilib olasizlar: kimga xor qiluvchi azob kelishini va kim yolg‘onchi ekanini. Kutinglar, men ham sizlar bilan birga kutuvchiman».",

94: "Amrimiz kelganida, Shuaybni va u bilan birga iymon keltirganlarni Bizdan bo‘lgan rahmat bilan najot berdik. Zulm qilganlarni esa dahshatli ovoz tutdi va ular o‘z uylarida yuztuban holda halok bo‘ldilar.",

95: "Go‘yo u yerda yashamagandek bo‘ldilar. Ogoh bo‘linglar! Samud uzoqlashganidek, Mad’yan ham uzoqlashsin.",

96: "Albatta, Biz Musoni oyatlarimiz va ochiq dalil bilan yubordik.",

97: "Fir’avn va uning boshliqlariga. Ular Fir’avnning amriga ergashdilar. Fir’avnning amri to‘g‘ri emas edi.",

98: "U qiyomat kuni qavmining oldida boradi va ularni olovga olib kiradi. U olib kiriladigan joy naqadar yomondir.",

99: "Ular bu dunyoda ham, qiyomat kunida ham la’natga ergashtirildilar. Berilgan narsa naqadar yomon berilgandir.",

100: "Bu Biz senga aytib berayotgan shaharlarning xabarlaridandir. Ulardan ba’zilari hali turibdi, ba’zilari esa o‘rilib ketgandir.",
101: "Biz ularga zulm qilmadik, lekin ular o‘zlariga zulm qildilar. Robbingning amri kelganida, ALLAHni qo‘yib chaqirgan ilohlari ularga hech qanday foyda bermadi va ular halokatdan boshqa narsani ziyoda qilmadilar.",

102: "Mana shunday, Robbing shaharlarni zulm qilganlarida ushlaydi. Albatta, Uning ushlashi alamli va qattiqdir.",

103: "Albatta, bunda oxirat azobidan qo‘rqadiganlar uchun oyat bordir. U shunday kundirki, unda barcha insonlar jamlanadi va u guvoh bo‘linadigan kundir.",

104: "Biz uni faqat sanalgan muddatgacha kechiktiramiz.",

105: "U kun kelganida, hech bir jon Uning iznisiz gapira olmaydi. Ulardan ba’zilari baxtsiz, ba’zilari baxtli bo‘ladi.",

106: "Bas, baxtsiz bo‘lganlar do‘zaxdadirlar. Ular unda nafas olish va ingrashga o‘xshash ovoz chiqaradilar.",

107: "Ular unda osmonlaru yer turguncha qoladilar, faqat Robbing xohlagan narsa bundan mustasno. Albatta, Robbing xohlagan narsasini qiluvchidir.",

108: "Baxtli bo‘lganlar esa jannatdadirlar. Ular unda osmonlaru yer turguncha qoladilar, faqat Robbing xohlagan narsa bundan mustasno. Bu uzilmaydigan ne’matdir.",

109: "Bas, ular ibodat qilayotgan narsalar haqida shubhada bo‘lma. Ular faqat ota-bobolari ibodat qilganidek ibodat qilmoqdalar. Albatta, Biz ularga nasibalarini kamaytirmay to‘liq beramiz.",

110: "Albatta, Biz Musoga Kitob berdik, so‘ngra u haqida ixtilof qilindi. Agar Robbingdan oldindan bir so‘z bo‘lmaganida edi, ular orasida hukm qilingan bo‘lardi. Albatta, ular undan chuqur shubhadadirlar.",

111: "Albatta, Robbing ularning har biriga qilgan amallariga yarasha to‘liq beradi. Albatta, U ularning qilayotgan ishlaridan Xabardordir.",

112: "Bas, sen va sen bilan birga tavba qilganlar buyurilganidek to‘g‘ri turinglar. Haddan oshmanglar. Albatta, U qilayotgan ishlaringizni Ko‘ruvchidir.",

113: "Zulm qilganlarga moyil bo‘lmanglar, aks holda sizlarga olov tegadi. Sizlar uchun ALLAHdan boshqa do‘stlar yo‘qdir. So‘ngra sizlarga yordam berilmaydi.",

114: "Kunning ikki tomonida va kechaning yaqin vaqtlarida namozni ado qil. Albatta, yaxshiliklar yomonliklarni ketkazadi. Bu eslatma oluvchilar uchun eslatmadir.",

115: "Sabr qilgin. Albatta, ALLAH yaxshilik qiluvchilarning ajrini zoye qilmaydi.",

116: "Sizlardan oldingi avlodlarda yer yuzida buzg‘unchilikdan qaytaradigan fazilat egalari bo‘lishi kerak emasmi edi? Ulardan Biz najot bergan ozchilik bundan mustasno. Zulm qilganlar esa ularga berilgan farovonlikka ergashdilar va jinoyatchi bo‘ldilar.",

117: "Robbing shaharlarni ahli isloh qiluvchi bo‘lib turganida, zulm bilan halok qiluvchi emasdir.",

118: "Agar Robbing xohlaganida, odamlarni yagona ummat qilgan bo‘lardi. Lekin ular doimo ixtilofdadirlar.",

119: "Faqat Robbing rahm qilgan kishilar bundan mustasno. Ularni shuning uchun yaratdi. Robbingning: «Albatta, jahannamni jinlar va insonlardan barchasi bilan to‘ldiraman», degan so‘zi to‘ldi.",

120: "Rasullarning xabarlaridan qalbingni sobit qiladiganlarini senga aytib beramiz. Bu orqali senga haq, mo‘minlarga esa eslatma va nasihat keldi.",

121: "Iymon keltirmaydiganlarga ayt: «O‘z holingizda amal qilinglar, biz ham amal qiluvchilarmiz».",

122: "«Kutib turinglar, biz ham kutib turuvchilarmiz».",

123: "Osmonlaru yerning g‘aybi ALLAHga tegishlidir. Barcha ish Unga qaytariladi. Bas, Unga ibodat qilgin va Unga tavakkul qilgin. Robbing qilayotgan ishlaringizdan g‘ofil emasdir.",
    },
 12: {
1: "Alif, Lam, Ro. Bular ochiq-oydin Kitobning oyatlaridir.",

2: "Albatta, Biz uni arabiy Qur’on qilib nozil qildik, shoyad aql ishlatsangizlar.",

3: "Biz senga ushbu Qur’onni vahiy qilishimiz bilan qissalarning eng go‘zalini aytib beramiz. Holbuki, sen bundan oldin bexabarlardan eding.",

4: "Eslang, Yusuf otasiga dedi: «Ey otajonim! Men tushimda o‘n bir yulduzni, quyoshni va oyni ko‘rdim. Ularning menga sajda qilayotganini ko‘rdim».",

5: "U dedi: «Ey o‘g‘lim! Tushingni birodarlaringga aytma, aks holda ular senga qarshi hiyla qiladilar. Albatta, shayton inson uchun ochiq dushmandir».",

6: "Shunday qilib, Robbing seni tanlaydi, senga tushlarning ta’birini o‘rgatadi va ilgari ota-bobolaring Ibrohim va Ishoqka bergani kabi, senga va Ya’qub avlodiga O‘z ne’matini to‘liq qiladi. Albatta, Robbing Biluvchi va Hikmat Egasi.",

7: "Albatta, Yusuf va uning birodarlarida so‘rovchilar uchun oyatlar bordir.",

8: "Ular dedilar: «Yusuf va uning ukasi otamizga bizdan ko‘ra sevimliroq, holbuki biz bir guruhmiz. Albatta, otamiz ochiq xatodadir».",

9: "«Yusufni o‘ldiringlar yoki uni biror yerga tashlab yuboringlar, shunda otangizning mehri faqat sizlarga qoladi. Undan keyin solih qavm bo‘lasizlar».",

10: "Ulardan biri dedi: «Yusufni o‘ldirmanglar. Agar bir ish qilmoqchi bo‘lsangizlar, uni quduq tubiga tashlanglar. Yo‘lovchilardan biri uni olib ketadi».",

11: "Ular dedilar: «Ey otamiz! Nima uchun Yusuf haqida bizga ishonmaysan? Holbuki, biz unga albatta yaxshilik istovchilarmiz».",

12: "«Ertaga uni biz bilan yuborgin, yayrab o‘ynaydi va biz uni albatta qo‘riqlaymiz».",

13: "U dedi: «Uni olib ketishingiz meni g‘amga soladi va sizlar undan bexabar bo‘lgan paytingizda bo‘ri uni yeb qo‘yishidan qo‘rqaman».",

14: "Ular dedilar: «Agar biz bir guruh bo‘la turib, uni bo‘ri yesa, unda biz albatta ziyon ko‘ruvchilardan bo‘lamiz».",

15: "Bas, ular uni olib ketganlarida va uni quduq tubiga tashlashga qaror qilganlarida, Biz unga vahiy qildik: «Albatta, sen ularga bu qilgan ishlarini o‘zlari bilmagan holda xabar qilasan».",

16: "Kechqurun otalarining oldiga yig‘lab kelishdi.",

17: "Ular dedilar: «Ey otamiz! Biz yugurish musobaqasi qilgan edik va Yusufni narsalarimiz yonida qoldirgan edik. Uni bo‘ri yeb ketibdi. Garchi rostgo‘y bo‘lsak ham, sen bizga ishonmaysan».",

18: "Ular uning ko‘ylagiga soxta qon surib keldilar. U dedi: «Yo‘q, nafslaringiz sizlarga bir ishni chiroyli ko‘rsatdi. Bas, chiroyli sabr qilaman. Sizlar aytayotgan narsangizga qarshi yordam so‘raladigan Zot faqat ALLAHdir».",

19: "Bir karvon keldi va suvchisini yubordi. U chelakni tushirganda: «Xushxabar! Bu bir bola-ku», dedi. Uni savdo qilinadigan mol sifatida yashirdilar. ALLAH esa ularning qilayotgan ishlarini biluvchi edi.",

20: "Uni arzimas bahoga, bir necha dirhamga sotdilar. Ular uni qadrlamaydiganlardan edilar.",

21: "Uni Misrdan sotib olgan kishi xotiniga dedi: «Unga yaxshi joy ber. Balki bizga foyda keltirar yoki uni farzand qilib olarmiz». Shunday qilib, Biz Yusufni yer yuzida joylashtirdik va unga tushlarning ta’birini o‘rgatishimiz uchun. ALLAH O‘z ishida g‘olibdir, lekin odamlarning ko‘pchiligi bilmaydilar.",

22: "U balog‘at yoshiga yetganida, Biz unga hikmat va ilm berdik. Yaxshilik qiluvchilarni shunday mukofotlaymiz.",

23: "U yashayotgan uyda bo‘lgan ayol uni o‘ziga choradi va eshiklarni yopib: «Kel», dedi. U: «ALLAH saqlasin! Albatta, u mening xo‘jayinimdir, u menga yaxshi joy berdi. Zolimlar najot topmaydilar», dedi.",

24: "Albatta, u ayol unga moyil bo‘ldi. Agar Robbisining dalilini ko‘rmaganida, u ham unga moyil bo‘lardi. Biz undan yomonlik va buzuqlikni qaytardik. Albatta, u Bizning ixlosli bandalarimizdandir.",

25: "Ikkovlari eshik tomon yugurdilar. Ayol uning ko‘ylagini orqa tomonidan yirtib yubordi. Eshik oldida uning xo‘jayiniga duch keldilar. Ayol dedi: «Sening oilangga yomonlik istagan kishining jazosi qamoq yoki alamli azobdan boshqa nima bo‘lishi mumkin?»",

26: "U dedi: «U meni o‘ziga chorladi». Ayolning oilasidan bo‘lgan bir guvoh: «Agar uning ko‘ylagi old tomonidan yirtilgan bo‘lsa, ayol rost gapirgan va u yolg‘onchilardandir».",

27: "«Agar uning ko‘ylagi orqa tomonidan yirtilgan bo‘lsa, ayol yolg‘on gapirgan va u rostgo‘ylardandir», dedi.",

28: "U uning ko‘ylagi orqa tomonidan yirtilganini ko‘rganida: «Bu siz ayollarning hiylangizdir. Albatta, sizlarning hiylangiz ulkandir», dedi.",

29: "«Ey Yusuf! Bundan yuz o‘girgin. Sen esa gunohing uchun mag‘firat so‘ra. Albatta, sen xato qiluvchilardan bo‘lding».",

30: "Shahardagi ayollar: «Azizning xotini o‘z xizmatkorini o‘ziga chorlarkan. Unga muhabbat qalbini egallabdi. Biz uni ochiq xatoda deb bilamiz», dedilar.",

31: "Ularning g‘iybatini eshitganida, ularni chaqirdi va ular uchun suyanadigan joy tayyorladi. Har biriga pichoq berdi va Yusufga: «Ularning oldiga chiq», dedi. Uni ko‘rganlarida, uni ulug‘ladilar va qo‘llarini kesib oldilar. Ular: «ALLAH pok! Bu inson emas, bu faqat ulug‘ bir malaika», dedilar.",

32: "U dedi: «Mana shu sizlar meni ayblagan kishidir. Men uni o‘zimga chorlashga urindim, lekin u o‘zini saqladi. Agar mening amrimni bajarmasa, albatta qamoqqa tashlanadi va xor bo‘lganlardan bo‘ladi».",

33: "U dedi: «Ey Robbim! Menga qamoq ular meni chaqirayotgan narsadan sevimliroqdir. Agar ularning hiylasini mendan qaytarmasang, ularga moyil bo‘lib, johillardan bo‘lib qolishim mumkin».",

34: "Bas, Robbisi uning duosini qabul qildi va ularning hiylasini undan qaytardi. Albatta, U Eshituvchi va Biluvchidir.",

35: "So‘ngra ular dalillarni ko‘rganlaridan keyin ham uni bir muddat qamoqqa tashlashni ma’qul ko‘rdilar.",

36: "U bilan birga qamoqqa ikki yigit kirdi. Ulardan biri dedi: «Men tushimda sharob siqayotganimni ko‘rdim». Ikkinchisi dedi: «Men boshimda non ko‘tarib yurgan ekanman, undan qushlar yeyayotgan ekan». «Bizga buning ta’birini ayt. Albatta, biz seni yaxshilik qiluvchilardan deb bilamiz».",

37: "U dedi: «Sizlarga beriladigan taom kelishidan oldin uning ta’birini sizlarga aytib beraman. Bu Robbim menga o‘rgatgan narsalardandir. Men ALLAHga iymon keltirmaydigan va oxiratga kofir bo‘lgan qavmning dinini tark qildim».",

38: "«Men ota-bobolarim Ibrohim, Ishoq va Ya’qubning diniga ergashdim. Biz uchun ALLAHga hech narsani sherik qilish mumkin emas. Bu ALLAHning bizga va insonlarga bergan fazlidandir, lekin odamlarning ko‘pchiligi shukr qilmaydilar».",

39: "«Ey qamoqdagi ikki hamroh! Turli-tuman ko‘p ilohlar yaxshimi yoki yagona va G‘olib ALLAHmi?»",

40: "«Sizlar Unga emas, faqat o‘zingiz va ota-bobolaringiz nomlab qo‘ygan ismlarga ibodat qilmoqdasizlar. ALLAH ular haqida hech qanday dalil tushirmagan. Hukm faqat ALLAHnikidir. U faqat O‘zigagina ibodat qilishingizni buyurgan. Mana shu to‘g‘ri dindir, lekin odamlarning ko‘pchiligi bilmaydilar».",

41: "Ey qamoqdagi ikki hamroh! Biringiz o‘z xo‘jayiniga sharob ichiradi. Ikkinchingiz esa osiladi va qushlar uning boshidan yeydi. Sizlar so‘ragan ish hukmi qilindi.",

42: "U ikkisidan najot topadiganiga: «Xo‘jayining oldida meni esla», dedi. Lekin shayton unga xo‘jayinini eslashni unuttirdi va u qamoqda bir necha yil qoldi.",

43: "Podshoh dedi: «Men tushimda yetti semiz sigirni yetti ozg‘in sigir yeyayotganini va yetti yashil boshoq hamda boshqa quruq boshoqlarni ko‘rdim. Ey boshliqlar! Agar tush ta’birini bilsangizlar, mening tushim haqida menga javob beringlar».",

44: "Ular dedilar: «Bu aralash tushlardandir. Biz bunday tushlarning ta’birini bilmaymiz».",

45: "Haligi ikki kishidan qutulgan va uzoq vaqt o‘tib eslagani dedi: «Men sizlarga uning ta’birini aytaman, meni yuboringlar».",

46: "«Ey Yusuf, ey rostgo‘y! Bizga yetti semiz sigirni yetti ozg‘in sigir yeyayotgani va yetti yashil boshoq hamda boshqa quruq boshoqlar haqida ta’bir ber. Shoyad odamlarga qaytib borarman va ular bilib olurlar».",

47: "U dedi: «Yetti yil odatdagidek ekasizlar. O‘rib olgan narsalaringizni boshoqlarida qoldiringlar, ozgina yeb qo‘yadiganingiz bundan mustasno».",

48: "«So‘ngra bundan keyin yetti qattiq yil keladi. Ular uchun oldindan tayyorlagan narsalaringizni yeb tugatadi, ozgina saqlab qo‘yganingiz bundan mustasno».",

49: "«So‘ngra bundan keyin bir yil keladi, unda odamlarga yomg‘ir beriladi va unda siqib olinadi».",

50: "Podshoh dedi: «Uni oldimga olib kelinglar». Elchi uning oldiga kelganida, u dedi: «Xo‘jayining oldiga qayt va undan qo‘llarini kesgan ayollarning holini so‘ra. Albatta, Robbim ularning hiylasini biluvchidir».",

51: "U dedi: «Yusufni o‘ziga chorlash paytingizda holingiz qanday edi?» Ular dedilar: «ALLAH pok! Biz undan hech qanday yomonlik bilmadik». Azizning xotini dedi: «Endi haqiqat oshkor bo‘ldi. Uni men o‘zim chorlaga edim va albatta u rostgo‘ylardandir».",

52: "«Bu mening u yo‘qligida unga xiyonat qilmaganimni va ALLAH xiyonat qiluvchilarning hiylasini muvaffaqiyatli qilmasligini bilishi uchundir».",

53: "«Men o‘zimni oqlamayman. Albatta, nafs yomonlikka ko‘p buyuruvchidir, faqat Robbim rahm qilgan kishilar bundan mustasno. Albatta, Robbim Mag‘firat qiluvchi va Rahmlidir».",

54: "Podshoh dedi: «Uni menga olib kelinglar, uni o‘zim uchun tanlab olaman». U bilan gaplashgach, dedi: «Bugun sen bizning huzurimizda ishonchli va martabali kishisan».",

55: "U dedi: «Meni yer xazinalari ustiga qo‘y. Albatta, men saqlovchi va bilimdonman».",

56: "Shunday qilib, Biz Yusufni yer yuzida joylashtirdik. U undan xohlagan joyida istiqomat qilar edi. Biz rahmatimizni xohlaganimizga yetkazamiz va yaxshilik qiluvchilarning ajrini zoye qilmaymiz.",

57: "Iymon keltirgan va taqvo qilganlar uchun oxirat mukofoti yaxshiroqdir.",

58: "Yusufning birodarlari kelib, uning huzuriga kirdilar. U ularni tanidi, ular esa uni tanimadilar.",

59: "U ularning yuklarini tayyorlaganida dedi: «Otangiz tomondan bo‘lgan birodaringizni menga olib kelinglar. Ko‘rmayapsizlarmi, men o‘lchovni to‘liq beraman va men eng yaxshi mehmon qiluvchilardanman».",

60: "«Agar uni menga olib kelmasangizlar, mendan boshqa o‘lchov ololmaysizlar va menga yaqinlashmanglar».",
61: "Ular dedilar: «Biz uning otasidan so‘rab ko‘ramiz. Albatta, biz buni qiluvchilarmiz».",

62: "Yusuf xizmatkorlariga dedi: «Ularning almashadigan narsalarini yuklariga solib qo‘yinglar. Shoyad ular oilalariga qaytganlarida uni tanib, yana qaytib kelsalar».",

63: "Otalarining oldiga qaytganlarida dedilar: «Ey otamiz! Bizga o‘lchov berish man qilindi. Bas, ukamizni biz bilan yuborgin, shunda o‘lchov olamiz. Biz uni albatta qo‘riqlaymiz».",

64: "U dedi: «Avval uning birodari haqida sizlarga ishonganim kabi, bunga ham ishonaymi? ALLAH eng yaxshi Qo‘riqlovchidir va U rahm qiluvchilarning eng Rahmlisidir».",

65: "Yuklarini ochganlarida, almashgan narsalari o‘zlariga qaytarilganini ko‘rdilar. Ular dedilar: «Ey otamiz! Yana nimani istaymiz? Mana, almashgan narsalarimiz ham bizga qaytarilibdi. Oilamizni ta’minlaymiz, birodarimizni qo‘riqlaymiz va bir tuya yukini ortiqcha olamiz. Bu ozgina o‘lchovdir».",

66: "U dedi: «Uni sizlar bilan yubormayman, toki ALLAH nomi bilan menga qat’iy ahd bermaguningizcha — agar sizlar qurshab olinmasangizlar, uni albatta menga qaytarasizlar». Ular unga ahd berganlarida, u dedi: «ALLAH aytayotganimizga Vakildir».",

67: "U dedi: «Ey o‘g‘illarim! Bir eshikdan kirmanglar, turli eshiklardan kiringlar. Men sizlardan ALLAHning hukmiga qarshi hech narsani qaytara olmayman. Hukm faqat ALLAHnikidir. Unga tavakkul qildim. Tavakkul qiluvchilar faqat Unga tavakkul qilsinlar».",

68: "Ular otalari buyurgan joydan kirganlarida, bu ulardan ALLAHning hukmiga qarshi hech narsani qaytarmadi, faqat Ya’qubning ko‘nglidagi bir ehtiyojni ado etdi. Albatta, u Biz unga o‘rgatgan narsa sababli ilm egasi edi, lekin odamlarning ko‘pchiligi bilmaydilar.",

69: "Ular Yusufning huzuriga kirganlarida, u birodarini o‘z yoniga oldi va dedi: «Men sening birodaringman. Ularning qilgan ishlaridan g‘amgin bo‘lma».",

70: "Ularning yuklarini tayyorlaganida, ichimlik idishini birodarining yukiga solib qo‘ydi. So‘ngra bir jarchi: «Ey karvon egalari! Sizlar o‘g‘risizlar», deb chaqirdi.",

71: "Ular ularga yuzlanib: «Nimani yo‘qotdingizlar?» dedilar.",

72: "Ular dedilar: «Podshohning idishini yo‘qotdik. Kim uni keltirsa, unga bir tuya yuk mukofot bor. Men bunga kafolat beraman».",

73: "Ular dedilar: «ALLAHga qasamki, sizlar bilasizlarki, biz yer yuzida buzg‘unchilik qilish uchun kelmadik va biz o‘g‘ri ham emasmiz».",

74: "Ular dedilar: «Agar yolg‘onchi bo‘lsangizlar, uning jazosi nima?»",

75: "Ular dedilar: «Uning jazosi — kimning yukida topilsa, o‘sha uning jazosi bo‘ladi. Biz zolimlarni shunday jazolaymiz».",

76: "Bas, u birodarining yukidan oldin ularning yuklarini tekshirdi, so‘ngra uni birodarining yukidan chiqardi. Shunday qilib, Biz Yusuf uchun hiyla qildik. Podshohning qonuniga ko‘ra, agar ALLAH xohlamasa, u o‘z birodarini olib qololmas edi. Biz xohlagan kishilarimizning darajalarini ko‘taramiz. Har bir bilim egasidan ustunroq Biluvchi bor.",

77: "Ular dedilar: «Agar u o‘g‘rilik qilgan bo‘lsa, uning oldin bir birodari ham o‘g‘rilik qilgan edi». Yusuf buni ichida yashirdi va ularga oshkor qilmadi. U dedi: «Sizlarning holatingiz yomonroqdir. ALLAH sizlar aytayotgan narsani yaxshiroq biluvchidir».",

78: "Ular dedilar: «Ey aziz! Uning keksa otasi bor. Bas, bizlardan birimizni uning o‘rniga olgin. Albatta, biz seni yaxshilik qiluvchilardan deb bilamiz».",

79: "U dedi: «ALLAH saqlasin! Biz narsamizni kimning oldidan topgan bo‘lsak, faqat o‘shani ushlab qolamiz. Aks holda, albatta, zolimlardan bo‘lamiz».",

80: "Undan umidlarini uzganlarida, chetga chiqib maslahatlashdilar. Ularning kattasi dedi: «Otangizdan ALLAH nomi bilan ahd olganingizni va bundan oldin Yusuf haqida qilgan xatongizni bilmaysizlarmi? Bas, otam menga ruxsat bermaguncha yoki ALLAH men uchun hukm qilmaguncha bu yerdan ketmayman. U hukm qiluvchilarning eng yaxshisidir».",

81: "Otangizning oldiga qaytinglar va aytinglar: «Ey otamiz! Albatta, o‘g‘lingiz o‘g‘rilik qildi. Biz faqat bilganimizga guvohlik berdik. Biz g‘aybni biluvchilar emas edik».",

82: "«Biz bo‘lgan shahardan va biz bilan birga kelgan karvondan so‘ranglar. Albatta, biz rostgo‘ylarmiz».",

83: "U dedi: «Yo‘q, nafslaringiz sizlarga bir ishni chiroyli ko‘rsatdi. Bas, chiroyli sabr qilaman. Shoyad ALLAH ularning barchasini menga qaytarar. Albatta, U Biluvchi va Hikmat Egasi».",

84: "U ulardan yuz o‘girdi va: «Voy, Yusufim!» dedi. G‘amdan uning ko‘zlari oqardi. U g‘amini ichiga yutuvchi edi.",

85: "Ular dedilar: «ALLAHga qasamki, sen Yusufni eslayverib, oxiri holsizlanib qolasan yoki halok bo‘lasan».",

86: "U dedi: «Men faqat dardu hasratimni va g‘amimni ALLAHga arz qilaman. Men ALLAH tomonidan sizlar bilmagan narsalarni bilaman».",

87: "«Ey o‘g‘illarim! Borib Yusuf va uning birodari haqida xabar topinglar. ALLAHning rahmatidan noumid bo‘lmanglar. Albatta, ALLAHning rahmatidan faqat kofir qavm noumid bo‘ladi».",

88: "Ular uning huzuriga kirib dedilar: «Ey aziz! Bizga va oilamizga qiyinchilik yetdi. Biz ozgina mol bilan keldik. Bas, bizga o‘lchovni to‘liq ber va bizga sadaqa qil. Albatta, ALLAH sadaqa qiluvchilarni mukofotlaydi».",

89: "U dedi: «Sizlar johil bo‘lgan paytingizda Yusuf va uning birodariga nima qilganingizni bilasizlarmi?»",

90: "Ular dedilar: «Nahotki sen o‘zing Yusuf bo‘lsang?» U dedi: «Men Yusufman, bu esa mening birodarimdir. ALLAH bizga marhamat qildi. Albatta, kim taqvo qilsa va sabr qilsa, bas, ALLAH yaxshilik qiluvchilarning ajrini zoye qilmaydi».",

91: "Ular dedilar: «ALLAHga qasamki, ALLAH seni bizdan afzal qildi. Biz esa albatta xato qilgan edik».",

92: "U dedi: «Bugun sizlarga tanbeh yo‘q. ALLAH sizlarni mag‘firat qilsin. U rahm qiluvchilarning eng Rahmlisidir».",

93: "«Mana bu ko‘ylagimni olib boringlar va uni otamning yuziga tashlanglar, u ko‘ra boshlaydi. So‘ngra barcha oilangiz bilan oldimga kelinglar».",

94: "Karvon yo‘lga chiqqanida, otalari dedi: «Agar meni aqlsiz demasangizlar, men Yusufning hidini sezayapman».",

95: "Ular dedilar: «ALLAHga qasamki, sen hali ham eski xatongdasan».",

96: "Xushxabar keltiruvchi kelib, ko‘ylakni uning yuziga tashlaganida, u yana ko‘ra boshladi. U dedi: «Men sizlarga aytmaganmidim? Men ALLAH tomonidan sizlar bilmagan narsalarni bilaman».",

97: "Ular dedilar: «Ey otamiz! Bizning gunohlarimiz uchun mag‘firat so‘ra. Albatta, biz xato qilganlardan bo‘ldik».",

98: "U dedi: «Tez orada Robbimdan sizlar uchun mag‘firat so‘rayman. Albatta, U Mag‘firat qiluvchi va Rahmlidir».",

99: "Ular Yusufning huzuriga kirganlarida, u ota-onasini quchog‘iga oldi va dedi: «Misrga kiringlar, ALLAH xohlasa, omonlikda bo‘lasizlar».",

100: "U ota-onasini taxtga chiqardi va ular uning oldida sajda qilib yiqildilar. U dedi: «Ey otajonim! Bu ilgari ko‘rgan tushimning ta’biridir. Robbim uni haqiqatga aylantirdi. U menga yaxshilik qildi: meni qamoqdan chiqardi va shayton men bilan birodarlarim orasini buzganidan keyin sizlarni sahrodan keltirdi. Albatta, Robbim xohlagan narsasiga lutf qiladi. Albatta, U Biluvchi va Hikmat Egasi». ",

101: "Ey Robbim! Sen menga podshohlikdan berding va menga tushlarning ta’birini o‘rgatding. Ey osmonlaru yerning Yaratuvchisi! Dunyo va oxiratda Sen mening Valiymsan. Meni musulmon holimda vafot ettirgin va meni solihlar qatoriga qo‘shgin.",

102: "Bu senga vahiy qilayotgan g‘ayb xabarlarimizdandir. Ular o‘z ishlarini jamlaganlarida va hiyla qilganlarida sen ularning huzurida emas eding.",

103: "Sen qanchalik istasang ham, odamlarning ko‘pchiligi mo‘min bo‘lmaydi.",

104: "Sen buning uchun ulardan biror haq so‘ramaysan. U faqat olamlar uchun eslatmadir.",

105: "Osmonlaru yerda qancha oyatlar bordirki, ular ularning yonidan yuz o‘girgan holda o‘tadilar.",

106: "Ularning ko‘plari ALLAHga faqat shirk keltirgan holda iymon keltiradilar.",

107: "Ular ALLAHning qamrab oluvchi azobi kelishidan yoki qiyomat soati to‘satdan kelib qolishidan o‘zlarini xotirjam his qilyaptimi?",

108: "Ayting: «Mana shu mening yo‘limdir. Men va menga ergashganlar ochiq dalil bilan ALLAHga da’vat qilamiz. ALLAH pokdir. Men mushriklardan emasman».",

109: "Sendan oldin ham shaharliklardan bo‘lgan, Biz ularga vahiy qilgan erkaklarni yubordik. Ular yer yuzida yurib, o‘zlaridan oldingilarning oqibati qanday bo‘lganiga qaramaydilarmi? Taqvo qilganlar uchun oxirat diyori yaxshiroqdir. Nahotki aql ishlatmasangizlar?",

110: "Nihoyat, Rasulchilar noumid bo‘lib qolganlarida va ular yolg‘onchi qilingan deb o‘ylaganlarida, ularga Bizning yordamimiz keldi. Bas, Biz xohlagan kishilar najot topdilar. Jinoyatchi qavmdan Bizning azobimiz qaytarilmaydi.",

111: "Albatta, ularning qissalarida aql egalari uchun ibrat bordir. Bu to‘qib chiqarilgan so‘z emas, balki o‘zidan oldingi narsalarni tasdiqlovchi, barcha narsalarni batafsil bayon qiluvchi va iymon keltirgan qavm uchun hidoyat va rahmatdir.",
},
13: {

1: "Alif, Lam, Mim, Ro. Bular Kitobning oyatlaridir. Senga Robbingdan nozil qilingan narsa haqdir, lekin odamlarning ko‘pchiligi iymon keltirmaydilar.",

2: "ALLAH osmonlarni sizlar ko‘rib turganingizdek ustunsiz ko‘targan, so‘ng Arsh ustida istivo qilgan Zotdir. U quyosh va oyni bo‘ysundirdi. Har biri belgilangan muddatgacha yuradi. U ishlarni boshqaradi va oyatlarni batafsil bayon qiladi, shoyad Robbingiz bilan uchrashishga ishonsangizlar.",

3: "U yerni yoygan, unda mustahkam tog‘lar va daryolar yaratgan Zotdir. U unda barcha mevalardan juft-juft qilib yaratdi. U kechani kunduz bilan qoplaydi. Albatta, bunda tafakkur qiladigan qavm uchun oyatlar bordir.",

4: "Yerda bir-biriga qo‘shni bo‘lgan bo‘laklar, uzumzorlar, ekinlar, shoxli va shoxsiz xurmo daraxtlari borki, ular bir suv bilan sug‘oriladi. Biz ba’zilarini ta’mda ba’zilaridan afzal qilamiz. Albatta, bunda aql ishlatadigan qavm uchun oyatlar bordir.",

5: "Agar ajablansang, ularning: «Tuproq bo‘lganimizdan keyin yangidan yaratilamizmi?» degan so‘zlari ajablanarlidir. Ana o‘shalar Robblariga kofir bo‘lganlardir. Ana o‘shalarning bo‘yinlarida kishanlar bordir. Ana o‘shalar do‘zax ahlidirlar. Ular unda abadiy qoladilar.",

6: "Ular yaxshilikdan oldin yomonlikni tezlashtirishingni so‘raydilar. Holbuki, ulardan oldin ibratli jazolar o‘tgan edi. Albatta, Robbing odamlarning zulmlariga qaramay, mag‘firat sohibidir. Albatta, Robbingning jazosi qattiqdir.",

7: "Kofir bo‘lganlar: «Unga Robbidan bir oyat tushirilsa edi», deydilar. Sen faqat ogohlantiruvchisan. Har bir qavm uchun hidoyat qiluvchi bordir.",

8: "ALLAH har bir urg‘ochining nimani ko‘tarayotganini va bachadonlar nimani kamaytirishini va nimani ziyoda qilishini biladi. Har bir narsa Uning huzurida o‘lchov bilandir.",

9: "U g‘aybni ham, oshkorani ham Biluvchidir. U Ulug‘ va Oliy Zotdir.",

10: "Sizlardan kim so‘zni yashirsa ham, kim uni oshkor qilsa ham, kechada yashiringan yoki kunduzda yurgan ham Uning uchun barobardir.",

11: "Uning oldida va orqasida ALLAHning amri bilan uni qo‘riqlaydigan kuzatuvchilar bor. Albatta, bir qavm o‘zlaridagi narsani o‘zgartirmaguncha, ALLAH ulardagi narsani o‘zgartirmaydi. Agar ALLAH bir qavmga yomonlikni iroda qilsa, uni qaytaruvchi yo‘qdir. Ular uchun Undan boshqa yordamchi yo‘qdir.",

12: "U sizlarga qo‘rquv va umid uchun chaqmoqni ko‘rsatadigan va og‘ir bulutlarni paydo qiladigan Zotdir.",

13: "Momaqaldiroq Uni hamd bilan poklaydi, malaikalar ham Uning qo‘rquvidan. U momaqaldiroqlarni yuboradi va ular ALLAH haqida tortishayotgan holatlarida kimni xohlasa, unga yetkazadi. U hiylasi kuchli Zotdir.",

14: "Haqiqiy duo faqat Ungadir. Ularni Undan boshqa chaqirayotganlar esa ularga hech qanday javob bera olmaydilar. Ularning holati og‘ziga suv yetishi uchun kaftlarini suvga uzatgan, lekin unga yetkaza olmaydigan kishiga o‘xshaydi. Kofirlarning duosi faqat adashishdadir.",

15: "Osmonlaru yerdagi barcha narsalar xohlagan-xohlamagan holda ALLAHga sajda qiladi. Ularning soyalar ham ertalab va kechqurun sajda qiladi.",

16: "Ayting: «Osmonlaru yerning Robbi kim?» Ayting: «ALLAH». Ayting: «Undan boshqa o‘zlariga na foyda, na zarar bera oladigan do‘stlar oldingizlarmi?» Ayting: «Ko‘r bilan ko‘ruvchi teng bo‘ladimi? Yoki zulmatlar bilan nur teng bo‘ladimi?» Yoki ular ALLAHga U yaratganidek yaratadigan sheriklar topdilarmi? Yaratish ular uchun o‘xshash bo‘lib qoldimi? Ayting: «ALLAH barcha narsaning Yaratuvchisidir. U yagona va Qahhor Zotdir».",

17: "U osmondan suv tushirdi va vodiylar o‘z o‘lchovicha oqdi. Oqim yuzaga chiqqan ko‘pikni olib ketadi. Odamlar ziynat yoki buyum tayyorlash uchun olovda qizdiradigan narsalarda ham shunga o‘xshash ko‘pik bor. ALLAH haq va botilni shunday misol qiladi. Ko‘pik esa yo‘q bo‘lib ketadi, odamlarga foyda beradigan narsa esa yerda qoladi. ALLAH misollarni shunday keltiradi.",

18: "Robbilariga javob berganlar uchun go‘zal mukofot bordir. Unga javob bermaganlar esa, agar yer yuzidagi barcha narsa va yana shuncha narsa ularniki bo‘lsa ham, uni fidya qilgan bo‘lardilar. Ana o‘shalar uchun yomon hisob bordir. Ularning joyi jahannamdir. U naqadar yomon joydir.",

19: "Robbingdan senga nozil qilingan narsaning haq ekanini bilgan kishi ko‘r kishi bilan teng bo‘ladimi? Faqat aql egalari eslatma oladilar.",

20: "Ular ALLAHga bergan ahdlariga va’dalarini bajaradilar va ahdlarni buzmaydilar.",
21: "Ular ALLAH bog‘lashni buyurgan narsalarni bog‘laydilar, Robbilaridan qo‘rqadilar va yomon hisobdan xavfsiraydilar.",

22: "Ular Robbilarining roziligini istab sabr qiladilar, namozni ado qiladilar, Biz ularga bergan narsalardan yashirin va oshkora sarflaydilar va yomonlikni yaxshilik bilan qaytaradilar. Ana o‘shalar uchun oxirat diyori bordir.",

23: "Ular Adn jannatlariga kiradilar. Ular bilan birga ota-bobolaridan, juftlaridan va zurriyotlaridan solih bo‘lganlar ham kiradi. Malaikalar har bir eshikdan ularning huzuriga kiradilar.",

24: "«Sabr qilganingiz sababli sizlarga salom bo‘lsin. Bu oxirat diyorining naqadar yaxshi oqibatidir», deydilar.",

25: "ALLAH bilan bergan ahdlarini buzadigan, ALLAH bog‘lashni buyurgan narsalarni uzadigan va yer yuzida buzg‘unchilik qiladiganlar — ana o‘shalar uchun la’nat bordir va ular uchun yomon diyor bordir.",

26: "ALLAH xohlagan kishining rizqini keng qiladi va toraytiradi. Ular dunyo hayotidan xursand bo‘ldilar. Holbuki, dunyo hayoti oxirat oldida faqat ozgina foydalanishdir.",

27: "Kofir bo‘lganlar: «Unga Robbisidan bir oyat tushirilsa edi», deydilar. Ayting: «Albatta, ALLAH xohlagan kishisini adashtiradi va O‘ziga qaytgan kishini hidoyat qiladi».",

28: "Ular iymon keltirgan va qalblari ALLAHning zikri bilan orom topadiganlardir. Ogoh bo‘linglar! Qalblar faqat ALLAHning zikri bilan orom topadi.",

29: "Iymon keltirgan va yaxshi amallar qilganlar uchun go‘zal hayot va yaxshi qaytish joyi bordir.",

30: "Shunday qilib, Biz seni sendan oldin ko‘plab ummatlar o‘tgan bir ummat orasiga yubordik, ularga Biz senga vahiy qilgan narsani o‘qib berishing uchun. Holbuki, ular Rahmonga kofir bo‘ladilar. Ayting: «U mening Robbimdir. Undan boshqa iloh yo‘q. Unga tavakkul qildim va qaytishim Uning huzurigadir».",

31: "Agar Qur’on bilan tog‘lar yuritilsa, yer yorilsa yoki o‘liklar gapirtirilsa ham, barchasi ALLAHning irodasidandir. Iymon keltirganlar bilmadilarmi, agar ALLAH xohlasa, barcha insonlarni hidoyat qilgan bo‘lardi? Kofir bo‘lganlarga esa qilgan ishlari sababli doimiy musibat yetishda davom etadi yoki ularning uylariga yaqin tushadi. Nihoyat, ALLAHning va’dasi keladi. Albatta, ALLAH va’daga xilof qilmaydi.",

32: "Sendan oldingi Rasulchilar ham masxara qilingan edilar. Men kofirlarga muhlat berdim, so‘ngra ularni ushladim. Mening jazom qanday bo‘lganini ko‘rgin.",

33: "Har bir jonning qilgan ishini kuzatib turuvchi Zot Unga teng bo‘lishi mumkinmi? Ular ALLAHga sheriklar qo‘shdilar. Ayting: «Ularning nomlarini aytinglar. Yoki sizlar Unga yerda bilmaydigan narsani xabar qilyapsizlarmi? Yoki faqat so‘zning tashqi ko‘rinishigagina ergashyapsizlarmi?» Yo‘q, kofirlarga hiylalari chiroyli ko‘rsatildi va ular yo‘ldan to‘sildilar. Kimni ALLAH adashtirsa, unga hidoyat qiluvchi yo‘qdir.",

34: "Ular uchun dunyo hayotida azob bordir. Oxirat azobi esa yanada og‘irdir. Ularni ALLAHdan himoya qiluvchi yo‘qdir.",

35: "Taqvo qiluvchilarga va’da qilingan jannatning misoli: uning ostidan anhorlar oqadi, rizqi va soyasi doimiydir. Bu taqvo qilganlarning oqibatidir. Kofirlarning oqibati esa do‘zaxdir.",

36: "Biz Kitob berganlardan ba’zilari senga nozil qilingan narsadan xursand bo‘ladilar. Guruhlardan ba’zilari esa uning ayrim qismlarini inkor qiladilar. Ayting: «Menga faqat ALLAHga ibodat qilish va Unga hech narsani sherik qilmaslik buyurilgan. Men faqat Unga da’vat qilaman va qaytishim Uning huzurigadir».",

37: "Shunday qilib, Biz uni arabiy hukm qilib nozil qildik. Agar senga kelgan ilmdan keyin ularning havolariga ergashsang, ALLAHdan senga na bir do‘st va na himoyachi bo‘ladi.",

38: "Albatta, Biz sendan oldin ham Rasulchilar yubordik va ularga juftlar hamda zurriyotlar berdik. Biror Rasulga ALLAHning iznisiz oyat keltirish imkoni bo‘lmagan. Har bir muddat uchun bir yozuv bordir.",

39: "ALLAH xohlagan narsasini o‘chiradi va xohlagan narsasini sobit qiladi. Asosiy Kitob Uning huzuridadir.",

40: "Agar Biz ularga va’da qilgan narsaning bir qismini senga ko‘rsatsak yoki seni vafot ettirsak ham, senga faqat yetkazish vazifasi bor. Hisob qilish Bizning zimmamizdadir.",

41: "Ular Biz yerga kelib, uni chetlaridan kamaytirayotganimizni ko‘rmaydilarmi? ALLAH hukm qiladi. Uning hukmini qaytaruvchi yo‘qdir. U hisobni tez qiluvchidir.",

42: "Ulardan oldingilar ham makr qilgan edilar. Barcha makrlar ALLAHning ixtiyoridadir. U har bir jon nima qilayotganini biladi. Kofirlar oxirat diyori kimga tegishli ekanini bilib oladilar.",

43: "Kofir bo‘lganlar: «Sen Rasul emassan», deydilar. Ayting: «Men bilan sizlarning orangizda guvoh sifatida ALLAH va Kitob ilmini bilgan kishi kifoyadir».",
    
};
// GLOBAL SURA LIST (MUHIM!)
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
