// ═══════════════════════════════════════════════════════════════
// CIPHER: ŞEHRİN ŞİFRESİ — v3.0
// M. FURKAN TAM tarafından yapılmıştır
// ═══════════════════════════════════════════════════════════════

const GEMINI_KEY = 'AIzaSyC6EWtl3NfAeje30-AWdvKiYt3qdK70kNY';

const TIMES = ['02:14','03:47','00:38','04:22','01:55','23:11','22:50','03:03','01:17','04:55','00:05','02:38'];

// ── ROLLER ───────────────────────────────────────────────────────
const ROLES = {
  detective: {
    name:'DEDEKTİF', icon:'🔍', startMoney:400, startRep:80, startRisk:10,
    bg:'Şehrin en zeki dedektiflerinden birisin. Kanıt toplamak ve gerçeği ortaya çıkarmak senin doğan.',
    style:'Analitik, soğukkanlı, sorgulayıcı.',
    skills:{ investigate:{repBonus:12,riskBonus:-5}, interrogate:{repBonus:10,riskBonus:0}, arrest:{repBonus:6,riskBonus:0} },
    endingPath:'justice',
  },
  police: {
    name:'KOMİSER', icon:'👮', startMoney:500, startRep:70, startRisk:15,
    bg:'Vartan City sokaklarında düzeni sağlayan bir komisersin. Güç ve otorite senin araçların.',
    style:'Otoriter, kararlı, direkt.',
    skills:{ arrest:{repBonus:12,riskBonus:-6}, call_backup:{repBonus:10,riskBonus:-10}, negotiate:{repBonus:6,riskBonus:0} },
    endingPath:'order',
  },
  thief: {
    name:'HIRSIZ', icon:'🦹', startMoney:200, startRep:30, startRisk:40,
    bg:'Vartan City\'nin en yetenekli hırsızı. Gölgede hareket et, iz bırakma, büyük vurgun yap.',
    style:'Kurnaz, hesapçı, soğuk.',
    skills:{ infiltrate:{repBonus:6,riskBonus:-12}, flee:{repBonus:0,riskBonus:-18}, bribe:{repBonus:4,riskBonus:-6} },
    endingPath:'shadow',
  },
  criminal: {
    name:'SUÇLU', icon:'💀', startMoney:300, startRep:20, startRisk:60,
    bg:'Şehrin en tehlikeli oyuncularından birisin. Kural tanımaz, güç ve para her şey.',
    style:'Sert, tehditkâr, acımasız.',
    skills:{ bribe:{repBonus:0,riskBonus:-14}, infiltrate:{repBonus:10,riskBonus:-6}, negotiate:{repBonus:4,riskBonus:-10} },
    endingPath:'underworld',
  },
  informant: {
    name:'MUHBİR', icon:'🕵️', startMoney:350, startRep:50, startRisk:30,
    bg:'Hem polise hem suç örgütüne bilgi satan tehlikeli bir çift ajan. Tek amacın hayatta kalmak.',
    style:'Manipülatif, kurnaz, ikiyüzlü.',
    skills:{ negotiate:{repBonus:12,riskBonus:-10}, investigate:{repBonus:7,riskBonus:0}, flee:{repBonus:0,riskBonus:-12} },
    endingPath:'ghost',
  },
};

// ── OLAYLAR (20 adet, zengin hikaye metinleriyle) ─────────────────
const ALL_EVENTS = [
  {
    id:'bank_robbery',
    badge:'ACİL', location:'📍 Merkez Bankası', image:'🏦',
    story:'Vartan City Merkez Bankası, Saat 03:21',
    text:'Alarmlar susuyor, kameralar kör. Gece bekçisi yerde bağlı. Kasanın önünde çanta — içi dolu. Ve köşede, omzundan kan akan bir adam. Gözlerin seni buluyor. "Senden başka kimse yok burada" diyor. Sesi titremiyor ama elleri titriyor. Arkadaşları onu bırakmış.',
    npc:{ name:'Ali Rıza Demircan', role:'Soyguncu — terk edilmiş', avatar:'🩸', mood:'panikleyen ve çaresiz',
      backstory:'34 yaşında, iki çocuklu biri. Kumarbaz abisinin borcunu ödemek için bu çılgınlığa sürüklendi. İlk kez silah tuttu. Arkadaşları onu bırakıp kaçtı. Tek çıkış yolunu arıyor.' },
    actions:['arrest','negotiate','bribe','investigate','flee'],
    outcomes:{
      arrest:     {rep:+20,risk:+15,money:+100,text:'Ali Rıza\'yı gözaltına aldın. Sorgu sırasında çete liderinin ismini verdi. Bu şehirde büyük bir domino taşı devrilmek üzere.',quality:'good'},
      negotiate:  {rep:+10,risk:-8, money:+200,text:'Para çantası sende kalsın, sen de görmezden gel. Ali Rıza karanlığa karıştı. Suç mu yaptın? Belki. Ama bugün kimse ölmedi.',quality:'neutral'},
      bribe:      {rep:-15,risk:-20,money:-200,text:'200$ verdin, adam gitti. Gece bekçisi uyandı, seni hatırlıyor. Kimse görmedi — ya da öyle sandın.',quality:'bad'},
      investigate:{rep:+14,risk:+5, money:0,   text:'Çantada kripto cüzdanı, şifreli bir not ve 7 isimlik liste. Şehrin finansal damarlarına giden bir yol buldun.',quality:'good'},
      flee:       {rep:-8, risk:-30,money:0,   text:'Ortalık karışmadan çıktın. Ama Ali Rıza\'nın gözleri aklından çıkmıyor. Fırsat çantasıyla birlikte kapandı.',quality:'bad'},
    }
  },
  {
    id:'drug_deal',
    badge:'İSTİHBARAT', location:'📍 Liman Ambarı No:7', image:'🚢',
    story:'Vartan Limanı Güney Bölgesi, Saat 01:44',
    text:'Rutubetli bir ambarda rutin mal transferinin maskesi altında 50 kilogram uyuşturucu. Alıcı Vartan City\'nin en iyi korunan sırlarından biri. Satıcı ise gözlerinde ömür tüketmiş biri gibi görünüyor. Her ses dışarıdan geliyor — polisten mi, rakipten mi, bilinmiyor. Herkes herkesten şüpheli.',
    npc:{ name:'Deniz Karahan', role:'Kurye — sıkışmış', avatar:'😤', mood:'gergin ve şüpheci',
      backstory:'8 yıldır bu işin içinde. Ailesini İstanbul\'da bıraktı, patronunun dediğini yapıyor. Ama son zamanlarda gördükleri onu rahatsız ediyor. Çıkmak istiyor ama nasıl çıkacağını bilmiyor.' },
    actions:['arrest','investigate','bribe','infiltrate','flee'],
    outcomes:{
      arrest:     {rep:+18,risk:+25,money:0,   text:'Deniz sıkıştı. Direndi, sonra yıkıldı. Elinde üst kademeye giden bağlantılar var — büyük balıkları avlamak için anahtar tanık olabilir.',quality:'good'},
      investigate:{rep:+12,risk:+10,money:0,   text:'Mal numunesi ve alıcı listesini çektirdin. Liste şehrin en güvenilir yüzlerini gösteriyor. Bu bilgi çok tehlikeli.',quality:'good'},
      bribe:      {rep:-20,risk:-15,money:-300,text:'Deniz parayı aldı ve seni ağa tanıttı. Kirli suda bir adım daha attın. Çıkış noktasını unuttun mu?',quality:'bad'},
      infiltrate: {rep:+5, risk:+35,money:+400,text:'Organizasyona sızdın. Deniz seni güvenilir buldu — şimdilik. İçeriden gördüklerin hem büyüleyici hem ürkütücü.',quality:'neutral'},
      flee:       {rep:-5, risk:-25,money:0,   text:'Bugün değil. Geri çekildin. Ama bu ağ yarın da burada olacak.',quality:'bad'},
    }
  },
  {
    id:'murder_mystery',
    badge:'CİNAYET', location:'📍 Terk Edilmiş Fabrika', image:'🏭',
    story:'Eski Çelik Fabrikası, Saat 04:08',
    text:'Kimliği belirsiz ceset. Yanında şifreli not, kırık telefon, bir defa katlanmış solmuş fotoğraf. Kan izleri çıkışa doğru uzanıyor ama hiç yerde bitmeden kayboluyor. Otopsi 48 saat. Ve bu fabrikada tek başına olmadığını hissediyorsun — biri seni izliyor.',
    npc:{ name:'Komisyon Üyesi Vural', role:'Mafya orta kademesi', avatar:'👔', mood:'soğuk ve tehditkâr',
      backstory:'20 yıldır şehrin kirli işlerini görünmez yönetiyor. Onlarca polisi satın aldı. Ama son olay kontrolden çıktı — kendi adamı onu tehdit etmeye başladı. Şimdi o da köşeye sıkışmış.' },
    actions:['investigate','interrogate','bribe','flee','call_backup'],
    outcomes:{
      investigate:{rep:+16,risk:+10,money:0,   text:'Cesedin kimliği: örgütün eski kasiyeri. Vural\'ın elinden çıkan bir iş. Şimdi hem delil hem hedefsin.',quality:'good'},
      interrogate:{rep:+11,risk:+22,money:0,   text:'Vural sıkıştı, küçük bir ip ucu kaçırdı. Ama hızla topladı kendini. Bir sonraki hamleni çok dikkatli seç.',quality:'neutral'},
      bribe:      {rep:-25,risk:-10,money:-400,text:'Vural parayı aldı, dosyayı kapattırdı. Bu şehirde her şeyin bir fiyatı var — bu sefer sen ödedin.',quality:'bad'},
      flee:       {rep:-10,risk:-20,money:0,   text:'Çıktın. Cinayet dosyası açık kaldı. Ama sen sağsın — şimdilik.',quality:'bad'},
      call_backup:{rep:+8, risk:-15,money:0,   text:'Ekip geldi, Vural avukatını aradı. Deliller tartışmalı ama süreç başladı. Sabır gerekiyor.',quality:'neutral'},
    }
  },
  {
    id:'car_chase',
    badge:'TAKİP', location:'📍 Kuzey Otoyolu E-5', image:'🚗',
    story:'E-5 Kuzeybağlantı, Saat 02:33',
    text:'Siyah BMW, 200 km/s. Kaçak çalıntı araçta ama içinde rehine var — ihbara göre. Yol kapatıldı. Helikopter geliyor. Ama sen aracı görebiliyorsun ve arabada ağlayan bir ses duyuldu radyodan. Karar vermek için saniyeler var.',
    npc:{ name:'Kemal "Duman" Aydın', role:'Kaçak — çaresiz', avatar:'😰', mood:'panik içinde',
      backstory:'22 yaşında, suç örgütünün borcunu ödeyemeyince bu işe sürüklendi. Araçtaki "rehine" aslında kendi küçük kardeşi — borç karşılığı alıkonulmuş, çıkış koşulu bu kaçış.' },
    actions:['negotiate','arrest','bribe','flee','call_backup'],
    outcomes:{
      negotiate:  {rep:+22,risk:-10,money:0,   text:'Kemal\'i sakinleştirdin, kardeşini bıraktı, teslim oldu. Gözlerinde hem korku hem teşekkür vardı. Örgüt hakkında konuşmaya hazır.',quality:'good'},
      arrest:     {rep:+10,risk:+30,money:0,   text:'Patlak lastikle durdurdun. Kimse yaralanmadı ama Kemal şok geçiriyor. Kardeşine ne olacak?',quality:'neutral'},
      bribe:      {rep:-10,risk:-25,money:-250,text:'Kemal parayı alıp gazladı, kardeşini bıraktı. Örgüt onu zaten buluyor. Sen sadece süreyi uzattın.',quality:'bad'},
      flee:       {rep:-15,risk:-30,money:0,   text:'Çıkış yaptın. Ama radyodaki ağlama sesi hâlâ kulaklarında.',quality:'bad'},
      call_backup:{rep:+5, risk:-20,money:0,   text:'Helikopter geldi, kovalama bitti. Kemal tehlikeli bir manevra yaptı — sonuç belirsiz.',quality:'neutral'},
    }
  },
  {
    id:'heist_planning',
    badge:'FIRSAT', location:'📍 Yeraltı Kulübü "Çelik Kasa"', image:'🎰',
    story:'Çelik Kasa Kulübü — Alt Kat, Saat 23:50',
    text:'Bu gece kumarhane kasasına 2 milyon dolarlık nakit transferi var. İçeriden bir kaynak güvenlik açığını satıyor. Ekip hazır, plan masa üzerinde. Ama bir şeyler fazla mükemmel görünüyor. Bu kadar mı kolay olmalıydı?',
    npc:{ name:'Şirin Demirtaş', role:'Çift ajan — tehlikeli', avatar:'🤫', mood:'sinsi ve hesapçı',
      backstory:'Kumarhane güvenliğinde çalışıyor ama aynı zamanda polise ihbarcılık yapıyor. Her gruptan para alıyor. Bu geceyi de kurgulayan o olabilir.' },
    actions:['infiltrate','bribe','investigate','negotiate','flee'],
    outcomes:{
      infiltrate: {rep:+5, risk:+40,money:+600,text:'İçeri girdin. Plan işe yaradı — ya da Şirin öyle istedi. Para senin ama biri seni gördü.',quality:'neutral'},
      bribe:      {rep:-5, risk:+10,money:-350,text:'Şirin daha fazla para istedi. Aldıktan sonra bilgilerin yarısının yanlış olduğunu öğrendin.',quality:'bad'},
      investigate:{rep:+16,risk:+5, money:0,   text:'Şirin\'in polise ihbarcı olduğunu keşfettin. Tuzaktan son anda çıktın — bu bir operasyondu.',quality:'good'},
      negotiate:  {rep:+9, risk:-10,money:+100,text:'Şirin ile anlaşma: küçük pay karşılığında güvenilir bilgi. Dengelerin içinde devam ediyorsun.',quality:'neutral'},
      flee:       {rep:0,  risk:-35,money:0,   text:'İçgüdüne güvendin. Gece baskın yapıldı. Doğruydu.',quality:'good'},
    }
  },
  {
    id:'hostage',
    badge:'REHİNE', location:'📍 Mavi Tower 18. Kat', image:'🏢',
    story:'Mavi Tower — Gökyüzü Katı, Saat 01:22',
    text:'8 rehine. 18. katta. Ekip aşağıda bekliyor ama içeriye sadece sen girebilirsin. Lider şu an sana bakıyor. Gözlerinde öldürme niyeti yok — ama çaresizlik var. En tehlikeli insanlar çaresiz insanlardır.',
    npc:{ name:'Fırtına', role:'Rehine alıcısı lider', avatar:'💣', mood:'kararlı ama yıpranmış',
      backstory:'Aslen hukuk okumuş, idealist biri. Kardeşi devlet operasyonunda haksız yere hapsedildi. Her yasal yolu denedi, kapılar kapandı. Bu onun son hamlesi.' },
    actions:['negotiate','investigate','call_backup','bribe','flee'],
    outcomes:{
      negotiate:  {rep:+26,risk:-5, money:0,   text:'Fırtına\'ya ulaştın. Hikayesini dinledin, söz verdin. Rehineler serbest. Bu şehirde adalet bazen yasanın dışında bulunuyor.',quality:'good'},
      investigate:{rep:+11,risk:+16,money:0,   text:'Bina planlarını buldun. Arka çıkış var. Ama Fırtına bunu fark etti — gözlerindeki güven yok oldu.',quality:'neutral'},
      call_backup:{rep:+5, risk:+22,money:0,   text:'Tim geldi. Fırtına sıkıştı. Sonuç belirsiz — ama bazı kararlar geri alınamaz.',quality:'neutral'},
      bribe:      {rep:-15,risk:+12,money:-500,text:'İçerideki birini satın aldın. Fırtına ihaneti öğrendi. Her şey karardı.',quality:'bad'},
      flee:       {rep:-20,risk:-30,money:0,   text:'18. kattaki 8 kişiyi bırakıp aşağıya indın. Asansörde aynana bakamıyorsun.',quality:'bad'},
    }
  },
  {
    id:'corrupt_cop',
    badge:'İHANET', location:'📍 Polis Karakolu — Arka Oda', image:'🚓',
    story:'7. Polis Karakolu, Saat 22:47',
    text:'Kıdemli komiser rüşvet alırken kameraya yakalandı. Video internete sızdı — kim sızdırdı bilinmiyor. Şimdi bu komiser sana geliyor: videoyu yok et. Tehdidi açık değil ama gözlerinde ne kadar gidebileceği yazıyor.',
    npc:{ name:'Komiser Tarık Yıldız', role:'Yolsuz polis amiri', avatar:'😤', mood:'tehditkâr ve paranoyak',
      backstory:'25 yıllık kariyer. Karısı kanser, hastane borçları dağ gibi. Sistemi çıkarına kullandı ama kendini haklı gördü — ailesi için yaptı. Şimdi her şey yıkılmak üzere.' },
    actions:['investigate','negotiate','bribe','arrest','flee'],
    outcomes:{
      investigate:{rep:+19,risk:+22,money:0,   text:'Videonun kaynağını buldun. Karakolun içinde bir yerler çatlıyor. Bu şehirde büyük bir iç hesaplaşma geliyor.',quality:'good'},
      negotiate:  {rep:+6, risk:-10,money:+300,text:'Tarık ile anlaştın. Video senin kasanda. Tehlikeli bir denge kuruldu — ne kadar sürer?',quality:'neutral'},
      bribe:      {rep:-20,risk:-15,money:-250,text:'Videoyu sildirdin, parayı aldın. Tarık\'a borçlusun artık. Bu şehirde her borç bir gün isteniyor.',quality:'bad'},
      arrest:     {rep:+32,risk:+38,money:0,   text:'Kendi komiserini tutukladın. Karakolda fırtına koptu. Kariyer ya zirveye çıkacak ya yıkılacak. İkisi de aynı anda.',quality:'good'},
      flee:       {rep:-8, risk:-25,money:0,   text:'Bu pisliğe bulaşmadın. Ama Tarık\'ın videosu yarın başka biri için koz olacak.',quality:'bad'},
    }
  },
  {
    id:'underground_fight',
    badge:'YASADIŞI', location:'📍 Bodrum Dövüş Kulübü', image:'🥊',
    story:'Eski Depo — 3. Alt Kat, Saat 00:15',
    text:'Şehrin en büyük yasadışı dövüş kulübü bu gece karanlıkta. Para elden ele geçiyor. Ama patron kayıp. Kasayı kim tutacak bilinmiyor. Kulübün en sadık adamı köşede elleri titreyerek sigara içiyor.',
    npc:{ name:'Büyük Recep', role:'Patronun sağ kolu', avatar:'💪', mood:'güçlü ama kontrolü kaybetmiş',
      backstory:'Patronuna kör bir sadakatle bağlı. Patronun kaybolmasının arkasında rakip örgütün olduğunu biliyor ama kanıtı yok. Yalnız ve çaresiz.' },
    actions:['investigate','infiltrate','bribe','negotiate','flee'],
    outcomes:{
      investigate:{rep:+13,risk:+16,money:0,   text:'Patronun kaçmadığını, rakip örgüt tarafından tutulduğunu öğrendin. Ve tutulma nedeni çok daha büyük bir sırrı işaret ediyor.',quality:'good'},
      infiltrate: {rep:0,  risk:+32,money:+350,text:'Kasaya ulaştın. Para senin. Ama içeride tanınmayan bir yüz — sen — fark edildi.',quality:'neutral'},
      bribe:      {rep:-10,risk:-10,money:-200,text:'Recep\'e ödeme yaptın, geceyi geçirdin. Bir sonraki sayfaya döndün ama hiçbir şey çözülmedi.',quality:'bad'},
      negotiate:  {rep:+16,risk:-5, money:+150,text:'Recep ile anlaştın: sen patronu bul, o da kulübü koru. Şehirde yeni bir ittifak.',quality:'good'},
      flee:       {rep:-5, risk:-20,money:0,   text:'Kaos ortamından çektin. Akıllıca mıydı?',quality:'neutral'},
    }
  },
  {
    id:'art_theft',
    badge:'SOYGUN', location:'📍 Modern Sanat Müzesi', image:'🖼️',
    story:'Vartan Sanat Müzesi — Gece Yarısı',
    text:'50 milyon dolarlık tablo kayıp. Güvenlik sistemi devre dışı. Bir bekçi yaralı, diğeri bulunamıyor. Ve müzenin içinde, eldiven giyen bir kadın sessizce bekliyor — sanki seni bekliyordu.',
    npc:{ name:'Mavi Eldivenli Kadın', role:'Sanat hırsızı', avatar:'🎭', mood:'soğukkanlı ve zeki',
      backstory:'Avrupa\'da 12 yıllık geçmiş, hiç yakalanmamış. Bu tabloyu para için çalmadı. Büyükbabasından devlet müsaderesiyle alınan o tablo — onu geri istiyor.' },
    actions:['negotiate','arrest','investigate','bribe','flee'],
    outcomes:{
      negotiate:  {rep:+16,risk:-5, money:+200,text:'Hikayesini dinledin. Tablo gerçekten onun ailesinin mirası. Geri verdin — bu adalet mi, yoksa suç mu?',quality:'good'},
      arrest:     {rep:+21,risk:+16,money:+150,text:'Yakaladın. Ama dava açılınca müze yönetimi de sanık sandalyesine oturdu. Bu dava bitmedi.',quality:'good'},
      investigate:{rep:+19,risk:+6, money:0,   text:'Müze yönetiminin sigortadan para almak için tabloyu kendisinin çaldırdığını öğrendin. Tablo sadece bir parça.',quality:'good'},
      bribe:      {rep:-15,risk:-10,money:+300,text:'Para aldın, bilgiyi sattın. Tablo nereye gidecek hiç merak etmedin mi?',quality:'bad'},
      flee:       {rep:-5, risk:-20,money:0,   text:'Karmaşaya girmedin. Tablo kayboldu, sır kaldı.',quality:'bad'},
    }
  },
  {
    id:'witness_protection',
    badge:'KRİTİK', location:'📍 Gizli Güvenli Ev', image:'🏠',
    story:'Güvenli Konut 7B — Saat 03:55',
    text:'Tanık yarın mahkemede. Bu gece adres sızdırıldı. Suikastçılar yolda. Serhan Koç yıllarca büyük örgütün kasiyerliğini yaptı, sonra vicdanı kazandı. Şimdi 3 saat var. Ve sen tek kişisin.',
    npc:{ name:'Tanık: Serhan Koç', role:'İhbarcı tanık', avatar:'😨', mood:'ölüm korkusuyla paramparça',
      backstory:'40 yaşında, iki çocuk babası. Örgütün içindeyken oğlunun sorduğu "baba, sen iyi biri misin?" sorusu her şeyi değiştirdi. İhbar etti, şimdi hayatı tehlikede.' },
    actions:['investigate','call_backup','negotiate','bribe','flee'],
    outcomes:{
      investigate:{rep:+16,risk:+22,money:0,   text:'Adresi sızdıran kişiyi buldun: içeride ajan var. Serhan\'ı kurtarmak için zaman daralıyor.',quality:'good'},
      call_backup:{rep:+11,risk:-10,money:0,   text:'Güvenli nakil organize ettin. Serhan mahkemede ifade verdi. Şehir sallanacak.',quality:'good'},
      negotiate:  {rep:+9, risk:-5, money:+150,text:'Suikastçı grupla irtibat kurdun: "değeri yok artık" dedin. İkna oldular — bu sefer.',quality:'neutral'},
      bribe:      {rep:-20,risk:-20,money:-400,text:'Suikastçılara para verdin. Serhan ne oldu bilmiyorsun. Ve bilmek istemiyorsun.',quality:'bad'},
      flee:       {rep:-30,risk:-30,money:0,   text:'Serhan\'ı bıraktın. Çocuklarına ne söyleyecek?',quality:'bad'},
    }
  },
  {
    id:'blackmail',
    badge:'ŞANTAJ', location:'📍 Grand Vartan Oteli', image:'🏨',
    story:'Grand Vartan — Penthouse Katı, Saat 22:18',
    text:'Şehrin en güçlü iş insanı şantaj kurbanı. Eski gazeteci otel odasında dosyalarla bekliyor. Ne istiyor? Para değil. Gerçeğin yayınlanmasını istiyor. Ama şehrin güçlüleri bunu istemiyor.',
    npc:{ name:'Taner Aslan', role:'Eski gazeteci — şantajcı', avatar:'📋', mood:'kendinden emin ama tedirgin',
      backstory:'Şehrin en büyük yolsuzluğunu haber yapmak üzereydi, kovuldu. Dosyalar gerçek. Yayınlanırsa 40 kişi tutuklanır. Ama o kadar beklemekten yoruldu.' },
    actions:['negotiate','investigate','arrest','bribe','flee'],
    outcomes:{
      negotiate:  {rep:+11,risk:-5, money:+200,text:'Taner ile anlaştın. Dosyalar güvende — ve bir kopyası sende. Şimdi en tehlikeli adamsın.',quality:'neutral'},
      investigate:{rep:+21,risk:+12,money:0,   text:'Dosyaları okudun. 40 isim, 20 yıllık kir. Artık hedeftesin ama gerçeği biliyorsun.',quality:'good'},
      arrest:     {rep:+16,risk:+16,money:0,   text:'Taner tutuklandı. Dosyalar mahkemeye girdi. Şehir sallandı. Ve sen ortada kaldın.',quality:'good'},
      bribe:      {rep:-20,risk:-10,money:-350,text:'Taner parayı aldı. Ama zaten bir kopya daha almıştı. Para bitti, sorun bitmedi.',quality:'bad'},
      flee:       {rep:-8, risk:-15,money:0,   text:'Bu işe girmedin. Şantaj devam ediyor, şehir uyuyor.',quality:'bad'},
    }
  },
  {
    id:'gang_war',
    badge:'SAVAŞ', location:'📍 Doğu Yakası — Depo Bölgesi', image:'💥',
    story:'Doğu Vartan, Saat 01:08',
    text:'İki büyük çete aynı depoyu istiyor. Çapraz ateş ortasında insanlar var. Yerel esnaf çok korkmuş kapıları açmıyor. Ve genç bir lider şu an sana "bu bölge benim" diyor — ama sesinde tereddüt var.',
    npc:{ name:'Çete Lideri Ferhat', role:'Genç lider — kaybolmuş', avatar:'😤', mood:'hırslı ama öngörülemez',
      backstory:'Sokakta büyüdü, adaletsizliğe karşı çıkarken sistemin içinde kayboldu. 28 yaşında. Halkı korumak istiyor ama şiddetten başka araç bilmiyor.' },
    actions:['negotiate','investigate','arrest','bribe','infiltrate'],
    outcomes:{
      negotiate:  {rep:+19,risk:-10,money:0,   text:'Ferhat\'ı ateşkes için ikna ettin. "Başka yol var mı?" diye sordu. "Evet" dedin. Ve buna inanmasını sağladın.',quality:'good'},
      investigate:{rep:+13,risk:+16,money:0,   text:'Çatışmanın arkasında üçüncü bir oyuncu var. Bu savaş yanlışlıkla başlatılmış. Ama kim yanlış anlaştı?',quality:'good'},
      arrest:     {rep:+21,risk:+32,money:0,   text:'Ferhat yakalandı. Boşluk daha tehlikeli biriyle dolacak. Bu şehirde boşluklar doldurulur.',quality:'neutral'},
      bribe:      {rep:-15,risk:-15,money:-300,text:'Her iki çeteye de para verdin. Geçici ateşkes. Hesabı er ya da geç ödenecek.',quality:'bad'},
      infiltrate: {rep:+5, risk:+36,money:+250,text:'Örgüte sızdın. Büyük bilgilere ulaştın ama tehlike çarpan kez arttı.',quality:'neutral'},
    }
  },
  {
    id:'hacker_chase',
    badge:'SİBER', location:'📍 Teknoloji Parkı', image:'💻',
    story:'Vartan Dijital Merkezi, Saat 03:14',
    text:'Tüm trafik sistemi felç. 10 milyon dolar kripto, 3 saat. Anonim hacker ama birinin bunu bilen tek bir arkadaşı var. Ve o arkadaş şu an önünde oturuyor, sana bakarken gözleri dolu.',
    npc:{ name:'"Ghost" — Kod adı', role:'Hacker\'ın kalan bağı', avatar:'👤', mood:'suçlu ama sadık',
      backstory:'Hacker\'ın çocukluktan arkadaşı. Saldırının neden yapıldığını biliyor: belediye 200 milyon dolar kayıt dışı fon akıttı. Şehrin en büyük gizemi.' },
    actions:['negotiate','investigate','bribe','arrest','flee'],
    outcomes:{
      negotiate:  {rep:+16,risk:-5, money:0,   text:'Ghost iş birliği yaptı. Hacker bulundu. Sistem kurtarıldı. Ve ardındaki gerçek ortaya çıktı.',quality:'good'},
      investigate:{rep:+21,risk:+11,money:0,   text:'Hacker belediye fon akışını ifşa etmek istemiş. 200 milyon dolarlık bir iz buldun.',quality:'good'},
      bribe:      {rep:-10,risk:-20,money:-300,text:'Ghost parayı aldı. Eksik konum verdi. Para bitti, hacker hâlâ serbest.',quality:'bad'},
      arrest:     {rep:+11,risk:+22,money:0,   text:'Ghost tutuklandı. Hacker hâlâ kayıp. Şehir karanlıkta.',quality:'neutral'},
      flee:       {rep:-5, risk:-15,money:0,   text:'Bu işe girmedin. Sistem çöküşe devam etti.',quality:'bad'},
    }
  },
  {
    id:'arms_deal',
    badge:'TEHLİKE', location:'📍 Köhne Tersane', image:'⚓',
    story:'Vartan Güney Tersanesi, Saat 00:41',
    text:'Eski tersanede silah ticareti. Alıcı bilinmiyor. Satıcı ise eski askeri, sisteme kızgın biri — elindekiler sadece silah değil. Belgeler de var. Ve bu gece tek şans bu.',
    npc:{ name:'Yılmaz Usta', role:'Silah kaçakçısı', avatar:'🔫', mood:'sert ve güvensiz',
      backstory:'27 yıl orduda çalıştı, haksız yere ihraç edildi. İntikamı için bu yola girdi. Elindeki belgeler devletin karanlık operasyonlarını gösteriyor — silahlar sadece koz.' },
    actions:['arrest','investigate','infiltrate','negotiate','flee'],
    outcomes:{
      arrest:     {rep:+26,risk:+27,money:0,   text:'Yılmaz ve alıcılar yakalandı. Belgeler ele geçirildi. Bu şehirde bomba gibi bir davayı başlattın.',quality:'good'},
      investigate:{rep:+19,risk:+11,money:0,   text:'Silahların nereye gideceğini buldun. Ve belgelerdeki isimleri gördün — tanıdık yüzler.',quality:'good'},
      infiltrate: {rep:+5, risk:+42,money:+500,text:'Takasa katıldın. Büyük kazanç, büyük kayıt. Artık sistemin içinde bir isimsin.',quality:'neutral'},
      negotiate:  {rep:+9, risk:-5, money:+200,text:'Yılmaz\'la anlaştın: belgeleri karşılığında ağ bilgisi. Tehlikeli takas.',quality:'neutral'},
      flee:       {rep:-5, risk:-30,money:0,   text:'Bu kadar büyüğe bulaşmadın. Belki doğruydu.',quality:'bad'},
    }
  },
  {
    id:'kidnapping',
    badge:'KAÇIRMA', location:'📍 Sanayi Bölgesi — Terk Edilmiş Depo', image:'🏗️',
    story:'Vartan Sanayi, Saat 04:17',
    text:'Bankacının 8 yaşındaki çocuğu 6 saattir kayıp. Fidye: 500.000 dolar, 4 saat içinde. Polis habersiz tutulsun deniyor. Aile sana geldi çünkü başka yolu yok. Ve telefonun diğer ucunda biri var — sesi titremiyor.',
    npc:{ name:'Sako', role:'Fidye görüşmecisi', avatar:'📞', mood:'kontrollü ama içinde çöküyor',
      backstory:'Çocuğun durumundan rahatsız. Grupta en vicdanlı kişi. Yanlış yapmak istemiyor ama çıkış yolu göremedi. Belki birisi yol gösterse...' },
    actions:['negotiate','investigate','bribe','call_backup','flee'],
    outcomes:{
      negotiate:  {rep:+23,risk:-5, money:-100,text:'Sako\'yu ikna ettin. Çocuk serbest bırakıldı. Sako kendini teslim etmek istiyor. Bu şehirde bile vicdan bazen kazanıyor.',quality:'good'},
      investigate:{rep:+16,risk:+16,money:0,   text:'Konumu tespit ettin. Baskın hazır. Sako\'nun sesi telefonda değişti — anladı.',quality:'good'},
      bribe:      {rep:-10,risk:-20,money:-500,text:'Fidyeyi ödedin. Çocuk geldi. Kaçıranlar serbest. Bir dahaki fidye ne zaman?',quality:'bad'},
      call_backup:{rep:+11,risk:+22,money:0,   text:'Ekip geldi. Operasyon başladı. Çocuğun güvende olduğunu ümit ediyorsun.',quality:'neutral'},
      flee:       {rep:-30,risk:-25,money:0,   text:'Gittin. Aile yalnız kaldı. 8 yaşında bir çocuk yalnız kaldı.',quality:'bad'},
    }
  },
  {
    id:'money_laundering',
    badge:'MALİ SUÇ', location:'📍 Sahte Kuaför Zinciri', image:'💈',
    story:'Altın Makas Kuaförü No:12, Saat 21:33',
    text:'Şehrin her köşesinde bir şubesi olan kuaför zinciri. Aslında kara para aklama merkezi. Milyonlar temizleniyor, sistem şikâyet etmiyor. Ama genç bir muhasebeci bunu değiştirmek istiyor — ve çok korkuyor.',
    npc:{ name:'Muhasebeci Selin', role:'Muhbir adayı', avatar:'📊', mood:'korkmuş ama kararlı',
      backstory:'29 yaşında, iş bulma umuduyla bu şirkete girdi. Bir yıl içinde gerçeği öğrendi. Oğlunun fotoğrafı masasında. "Bu para kirli" diye düşünüyor her sabah.' },
    actions:['investigate','negotiate','call_backup','bribe','flee'],
    outcomes:{
      investigate:{rep:+19,risk:+11,money:0,   text:'Belgeler ele geçti. 12 önemli isim ağda. Şehrin finansal sistemi bu belgelerde çözülüyor.',quality:'good'},
      negotiate:  {rep:+13,risk:-5, money:0,   text:'Selin\'e güvenlik garantisi verdin. Tüm belgeleri aldın. O da nefes aldı ilk kez.',quality:'good'},
      call_backup:{rep:+9, risk:+16,money:0,   text:'Ekip koruma altına aldı. Mali suç birimi devreye girdi. Uzun ama doğru yol.',quality:'neutral'},
      bribe:      {rep:-15,risk:-15,money:-250,text:'Şirket yöneticilerine ödeme yaptın. Selin güvende ama belgeler yok. Sistem devam ediyor.',quality:'bad'},
      flee:       {rep:-10,risk:-20,money:0,   text:'Selin yalnız kaldı. Bu sistem yarın da aynı şeyi yapacak.',quality:'bad'},
    }
  },
  {
    id:'prison_break',
    badge:'KAÇIŞ', location:'📍 Yüksek Güvenlikli Cezaevi', image:'⛓️',
    story:'Vartan Merkez Cezaevi — Gece Yarısı',
    text:'Şehrin en güvenli cezaevinden şifreli mesaj geldi: "Beni çıkar, şehrin tüm sırlarını sana veririm." İmzasız. Ama gönderenin kim olduğunu tahmin ediyorsun. Ve şüphe ettiğin kadar da çekici geliyor teklif.',
    npc:{ name:'Mahkum: Dr. Kerem Asal', role:'Hapsedilmiş eski ajan', avatar:'🔬', mood:'stratejik ve soğuk',
      backstory:'Devletin karanlık biyolojik araştırma biriminde çalıştı, sonra kullanılıp hapsedildi. Elindeki bilgiler gerçekse şehri değil, ülkeyi sarsar.' },
    actions:['investigate','negotiate','bribe','flee','call_backup'],
    outcomes:{
      investigate:{rep:+16,risk:+22,money:0,   text:'Bilgiler gerçek. Ama firar planı seni tuzağa çekmek için kurulmuş. Kim kurdu?',quality:'good'},
      negotiate:  {rep:+11,risk:-5, money:+300,text:'Kerem ile anlaştın. Bilgileri sızdırdı, sen yasal yolları araştıracaksın. Tehlikeli denge.',quality:'neutral'},
      bribe:      {rep:-15,risk:+12,money:-350,text:'Gardiyanlar satın alındı. Kerem çıktı. Ve sen içeri girdin.',quality:'bad'},
      flee:       {rep:-5, risk:-25,money:0,   text:'Tuzağa düşmedin. Akıllı karar. Ama bilgiler hâlâ içeride.',quality:'neutral'},
      call_backup:{rep:+9, risk:-10,money:0,   text:'Yetkililere bildirdin. Plan engellendi. Kerem\'in bilgileri inceleniyor.',quality:'good'},
    }
  },
  {
    id:'assassination_attempt',
    badge:'SUİKAST', location:'📍 Vartan Meydanı', image:'🏛️',
    story:'Vartan Büyük Meydanı, Saat 14:00\'e 2 saat kala',
    text:'Şehir başkanına meydanda suikast. 2 saat. Bir ihbarcı sana geldi, adını söylemiyor, yüzünü göstermiyor. Delil yok ama gözlerinde korku gerçek. Resmi kanallar çok yavaş. Sen ne yapacaksın?',
    npc:{ name:'İhbarcı — Anonim', role:'Organizasyondan kaçan', avatar:'🤐', mood:'panikleyen',
      backstory:'Organizasyona para için katıldı. Sonra kim olduklarını gördü. Suikastı durdurmak istiyor ama kim olduğunu söylerse kendisi de hedef olur.' },
    actions:['investigate','call_backup','negotiate','arrest','flee'],
    outcomes:{
      investigate:{rep:+21,risk:+22,money:0,   text:'Suikastçının kimliğini ve konumunu tespit ettin. Son dakikada durduruldu. Ama örgüt hâlâ var.',quality:'good'},
      call_backup:{rep:+13,risk:-5, money:0,   text:'Güvenlik takviye edildi. Suikast engellendi. İhbarcı kayıp — ümit ediyorsun iyi yerde.',quality:'good'},
      negotiate:  {rep:+9, risk:-10,money:0,   text:'İhbarcıya güvenli geçiş garantisi verdin. Tüm bilgileri aldın.',quality:'neutral'},
      arrest:     {rep:+16,risk:+27,money:0,   text:'Şüpheliyi gözaltına aldın. Bu örgütün sadece bir bacağı.',quality:'neutral'},
      flee:       {rep:-25,risk:-20,money:0,   text:'Harekete geçmedin. Meydanda ne oldu haberlerde çıktı.',quality:'bad'},
    }
  },
  {
    id:'undercover_blown',
    badge:'DEŞIFRE', location:'📍 Mafya Lokali', image:'🍷',
    story:'Vartan Mafya Lokali — Özel Salon, Saat 23:40',
    text:'Aylarca sürdürdüğün sızma operasyonu deşifre oldu. Örgüt biliyor. Ama seni öldürmediler — neden? Örgütün en zeki adamı karşında oturuyor, şarap içiyor, gülümsüyor. Bu hiç iyi işaret değil.',
    npc:{ name:'Cesur Bey', role:'Örgüt stratejisti', avatar:'🎩', mood:'her şeyi bilen soğukkanlılık',
      backstory:'Devlet, yargı, suç örgütü — üçünde de bağlantısı var. Her hamleyi 10 adım öncesinden görüyor. Seni öldürmedi çünkü işe yarayabilirsin. Ya da başka bir planı var.' },
    actions:['negotiate','investigate','flee','bribe','infiltrate'],
    outcomes:{
      negotiate:  {rep:+11,risk:-15,money:+400,text:'Cesur Bey sana iş teklifi yaptı. Kabul etmek mi? Bu kapıdan giren kolay çıkmaz.',quality:'neutral'},
      investigate:{rep:+19,risk:+27,money:0,   text:'Tuzaktan son anda çıktın. Örgütün içindeki çatlağı gördün. Birisi seni uyardı — kim?',quality:'good'},
      flee:       {rep:+6, risk:-42,money:0,   text:'Hızlı davrandın. Hayattasın. Operasyon kapandı.',quality:'neutral'},
      bribe:      {rep:-20,risk:-22,money:-300,text:'Örgüte para verip güven kazanmaya çalıştın. Cesur Bey güldü sadece.',quality:'bad'},
      infiltrate: {rep:0,  risk:+48,money:+600,text:'Oyunu oynadın. Artık çok içeridesin. Dönüş yolu var mı?',quality:'neutral'},
    }
  },
  {
    id:'election_fraud',
    badge:'SİYASİ', location:'📍 Vartan Seçim Merkezi', image:'🗳️',
    story:'Vartan Seçim Koordinasyon Merkezi, Saat 02:50',
    text:'Yerel seçim. Oy sayım sistemi manipüle edilmiş — somut delil var. Belgeler için 1 saat. Güvenlik sıkı. Ve içeride bir teknisyen sana bakıyor, elindeki kâğıdı tutamıyor titremekten.',
    npc:{ name:'Sistem Yöneticisi Ertan', role:'Baskı altındaki teknisyen', avatar:'🖥️', mood:'vicdanıyla savaşan',
      backstory:'Ailesi tehdit altında, kendisi baskı altında. Bu sistemi manipüle etmek zorunda bırakıldı. Ama her gece uyuyamıyor. Birinin yardım etmesini bekliyor.' },
    actions:['investigate','negotiate','bribe','call_backup','flee'],
    outcomes:{
      investigate:{rep:+23,risk:+16,money:0,   text:'Delilleri aldın. Şehrin siyasi dengesi sarsılacak. Bu dosya şehri değiştirebilir.',quality:'good'},
      negotiate:  {rep:+16,risk:-5, money:0,   text:'Ertan ile anlaştın. Tüm log kayıtları sende. Ve o ilk kez rahat nefes aldı.',quality:'good'},
      bribe:      {rep:-10,risk:-15,money:-200,text:'Ertan\'a para verdin. Bilgi aldın ama delil zayıf. Şüphe yok artık.',quality:'bad'},
      call_backup:{rep:+11,risk:+11,money:0,   text:'Soruşturma başladı. Uzun yol ama doğru yol.',quality:'neutral'},
      flee:       {rep:-10,risk:-20,money:0,   text:'Geri çekildin. Usulsüzlük örtbas edildi. Seçim "temiz" sayıldı.',quality:'bad'},
    }
  },
];

const ACTION_DEFS = {
  arrest:      { icon:'🚔', name:'TUTUKLAMA',  hint:'Gözaltına al' },
  negotiate:   { icon:'🤝', name:'MÜZAKERE',   hint:'Anlaşmaya çalış' },
  bribe:       { icon:'💰', name:'RÜŞVET',     hint:'Para teklif et' },
  investigate: { icon:'🔎', name:'İNCELE',     hint:'Kanıt topla' },
  flee:        { icon:'🏃', name:'ÇEKİL',      hint:'Uzaklaş' },
  infiltrate:  { icon:'🕶️', name:'SIZDIR',    hint:'İçine sız' },
  interrogate: { icon:'💬', name:'SORGU',      hint:'Sorgula' },
  call_backup: { icon:'📡', name:'TAKVİYE',    hint:'Yardım çağır' },
};

// ── OYUN DURUMU ───────────────────────────────────────────────────
let state = {
  role: null,
  rep: 70, money: 500, risk: 20,
  turn: 1, maxTurns: 20,
  currentEvent: null,
  chatHistory: [],
  actionUsed: false,
  eventQueue: [],
  totalScore: 0,
  npcMemory: {},
  goodActions: 0, badActions: 0, neutralActions: 0,
  skillUsed: {},
  npcMoodLevel: 0, // 0=normal 1=hostile 2=aggressive
};

// ── YARDIMCI ─────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomTime() {
  return TIMES[Math.floor(Math.random() * TIMES.length)];
}

// ── NAVİGASYON ───────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  const el = document.getElementById(id);
  el.classList.add('active');
  el.style.display = 'flex';
}

// ── INTRO → HİKAYE ───────────────────────────────────────────────
function showStory() {
  showScreen('screen-story');
  const lines = [
    'Vartan City. 2031.',
    '',
    'Bu şehir asla uyumaz.',
    'Gece yarısı bile sokakların her köşesinde',
    'birileri hesap görüyor, birileri gözetliyor,',
    'birileri kaçıyor.',
    '',
    'Sen bu şehre yeni geldin.',
    'Geçmişin var — ve şehir onu biliyor.',
    '',
    'Önünde 20 dosya var.',
    'Her dosya bir karar.',
    'Her karar seni başka bir sona götürür.',
    '',
    'Adalet mi, güç mü, hayatta kalmak mı?',
    'Cevap sende.',
  ];

  const el = document.getElementById('story-text');
  const btn = document.getElementById('story-btn');
  el.textContent = '';
  btn.style.display = 'none';

  let lineIdx = 0;
  let charIdx = 0;
  let full = '';

  function typeNext() {
    if (lineIdx >= lines.length) {
      btn.style.display = 'inline-block';
      return;
    }
    const line = lines[lineIdx];
    if (charIdx < line.length) {
      full += line[charIdx];
      el.textContent = full;
      charIdx++;
      setTimeout(typeNext, line === '' ? 0 : 28);
    } else {
      full += '\n';
      el.textContent = full;
      lineIdx++;
      charIdx = 0;
      setTimeout(typeNext, line === '' ? 80 : 160);
    }
  }
  typeNext();
}

function showRoleSelect() { showScreen('screen-role'); }

// ── ROL SEÇ ───────────────────────────────────────────────────────
function selectRole(roleKey) {
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`[data-role="${roleKey}"]`).classList.add('selected');

  setTimeout(() => {
    const r = ROLES[roleKey];
    state = {
      role: roleKey,
      rep: r.startRep, money: r.startMoney, risk: r.startRisk,
      turn: 1, maxTurns: 20,
      currentEvent: null, chatHistory: [], actionUsed: false,
      eventQueue: shuffle(ALL_EVENTS),
      totalScore: 0,
      npcMemory: {}, goodActions: 0, badActions: 0, neutralActions: 0,
      skillUsed: {}, npcMoodLevel: 0,
    };

    document.getElementById('hud-role-icon').textContent = r.icon;
    document.getElementById('hud-role-name').textContent = r.name;
    document.getElementById('hud-turn-max').textContent = state.maxTurns;

    showScreen('screen-game');
    updateHUD();
    loadNextEvent();
  }, 350);
}

// ── HUD ──────────────────────────────────────────────────────────
function updateHUD() {
  document.getElementById('val-rep').textContent = state.rep;
  document.getElementById('val-money').textContent = '$' + state.money;
  document.getElementById('val-risk').textContent = state.risk;
  document.getElementById('hud-turn').textContent = state.turn;
  document.getElementById('bar-rep').style.width = Math.max(0, Math.min(100, state.rep)) + '%';
  document.getElementById('bar-risk').style.width = Math.max(0, Math.min(100, state.risk)) + '%';
}

// ── EVENTS ───────────────────────────────────────────────────────
function loadNextEvent() {
  if (state.turn > state.maxTurns) { endGame(); return; }

  if (state.eventQueue.length === 0) state.eventQueue = shuffle(ALL_EVENTS);
  const evt = state.eventQueue.shift();
  state.currentEvent = evt;
  state.chatHistory = [];
  state.actionUsed = false;
  state.npcMoodLevel = 0;

  document.getElementById('event-badge').textContent = evt.badge;
  document.getElementById('event-location').textContent = evt.location;
  document.getElementById('event-time').textContent = '🕐 ' + randomTime();
  document.getElementById('event-story').textContent = evt.story || '';
  document.getElementById('event-text').textContent = evt.text;
  document.getElementById('event-image').textContent = evt.image;
  document.getElementById('npc-panel').style.display = 'none';
  document.getElementById('chat-box').innerHTML = '';
  document.getElementById('outcome-banner').style.display = 'none';

  renderActionCards(evt.actions);
  addLog(`▸ Dosya ${state.turn}: ${evt.badge} — ${evt.location}`, 'neutral');
}

// ── SKİLL BONUS ───────────────────────────────────────────────────
function applySkillBonus(actionKey, outcome) {
  const skills = ROLES[state.role].skills;
  if (!skills[actionKey]) return { ...outcome };

  const bonus = skills[actionKey];
  const used = state.skillUsed[actionKey] || 0;
  const factor = Math.max(0.3, 1 - used * 0.15);

  const bRep = Math.round((bonus.repBonus || 0) * factor);
  const bRisk = Math.round((bonus.riskBonus || 0) * factor);
  state.skillUsed[actionKey] = used + 1;

  if (bRep !== 0 || bRisk !== 0) {
    const r = ROLES[state.role];
    setTimeout(() => addLog(
      `★ ${r.name} yeteneği: ${bRep >= 0 ? '+' : ''}${bRep} itibar, ${bRisk >= 0 ? '+' : ''}${bRisk} risk`,
      bRep > 0 ? 'good' : 'neutral'
    ), 400);
  }

  return { ...outcome, rep: outcome.rep + bRep, risk: outcome.risk + bRisk };
}

// ── AKSİYON KARTLARI ─────────────────────────────────────────────
function renderActionCards(actionKeys) {
  const row = document.getElementById('card-row');
  row.innerHTML = '';
  const skills = ROLES[state.role].skills;

  actionKeys.forEach(key => {
    const def = ACTION_DEFS[key];
    if (!def) return;
    const outcome = state.currentEvent.outcomes[key];
    const hasSkill = !!skills[key];

    const card = document.createElement('div');
    card.className = 'action-card';
    card.dataset.action = key;

    // Sadece hint metni — sayı yok
    card.innerHTML = `
      <div class="action-card-icon">${def.icon}</div>
      <div class="action-card-name">
        ${def.name}
        ${hasSkill ? '<span class="skill-badge">★</span>' : ''}
      </div>
      <div class="action-card-hint">${def.hint}</div>`;

    card.onclick = () => useAction(key);
    row.appendChild(card);
  });

  // NPC konuş kartı
  const talk = document.createElement('div');
  talk.className = 'action-card talk-card';
  talk.innerHTML = `
    <div class="action-card-icon">💬</div>
    <div class="action-card-name">KONUŞ</div>
    <div class="action-card-hint">AI diyalog</div>`;
  talk.onclick = openNPCPanel;
  row.appendChild(talk);
}

function useAction(key) {
  if (state.actionUsed) { addLog('Bu dosyada zaten hamle yaptın.', 'bad'); return; }
  const raw = state.currentEvent.outcomes[key];
  if (!raw) return;

  const outcome = applySkillBonus(key, raw);

  state.rep   = Math.max(0, Math.min(100, state.rep   + outcome.rep));
  state.risk  = Math.max(0, Math.min(100, state.risk  + outcome.risk));
  state.money = Math.max(0, state.money + outcome.money);
  state.actionUsed = true;
  state.totalScore += outcome.rep - Math.abs(outcome.risk * 0.3);

  if (outcome.quality === 'good') state.goodActions++;
  else if (outcome.quality === 'bad') state.badActions++;
  else state.neutralActions++;

  // NPC hafızası
  const npc = state.currentEvent.npc;
  const prev = state.npcMemory[npc.name] || { metBefore: false, relationScore: 0 };
  state.npcMemory[npc.name] = {
    metBefore: true,
    lastAction: key,
    relationScore: prev.relationScore + (outcome.rep > 0 ? 1 : outcome.rep < 0 ? -1 : 0),
  };

  document.querySelectorAll('.action-card').forEach(c => {
    c.classList.add('used');
    c.onclick = null;
  });

  const type = outcome.quality === 'good' ? 'good' : outcome.quality === 'bad' ? 'bad' : 'neutral';
  showOutcomeBanner(outcome.text, type);
  addLog(`${ACTION_DEFS[key].icon} ${ACTION_DEFS[key].name}: ${outcome.text.substring(0, 70)}...`, type);
  updateHUD();

  if (state.risk >= 100) { setTimeout(() => endGame('caught'), 2200); return; }
  if (state.rep  <= 0)   { setTimeout(() => endGame('reputation'), 2200); return; }
  if (state.money <= 0 && state.turn > 5) { setTimeout(() => endGame('bankrupt'), 2200); return; }

  setTimeout(() => {
    state.turn++;
    loadNextEvent();
    updateHUD();
  }, 2800);
}

function showOutcomeBanner(text, type) {
  const b = document.getElementById('outcome-banner');
  b.textContent = text;
  b.className = `outcome-banner ${type}`;
  b.style.display = 'block';
}

// ── NPC / GEMINI ─────────────────────────────────────────────────
function openNPCPanel() {
  const npc = state.currentEvent?.npc;
  if (!npc) return;

  document.getElementById('npc-avatar').textContent = npc.avatar;
  document.getElementById('npc-name').textContent = npc.name;
  document.getElementById('npc-role-tag').textContent = npc.role;
  updateNPCMoodBar();
  document.getElementById('npc-panel').style.display = 'flex';

  if (state.chatHistory.length === 0) {
    getAIOpeningLine(npc, state.currentEvent, ROLES[state.role]);
  }
}

function closeNPCPanel() {
  document.getElementById('npc-panel').style.display = 'none';
}

function updateNPCMoodBar() {
  const fill = document.getElementById('npc-mood-fill');
  const status = document.getElementById('npc-status');
  const pct = Math.max(10, 100 - state.npcMoodLevel * 40);
  fill.style.width = pct + '%';
  if (state.npcMoodLevel === 0) {
    fill.style.background = 'linear-gradient(90deg,var(--accent3),var(--accent))';
    status.style.background = 'var(--accent3)';
  } else if (state.npcMoodLevel === 1) {
    fill.style.background = 'linear-gradient(90deg,var(--accent5),orange)';
    status.style.background = 'orange';
  } else {
    fill.style.background = 'linear-gradient(90deg,var(--accent2),#ff0050)';
    status.style.background = 'var(--accent2)';
  }
}

async function getAIOpeningLine(npc, evt, role) {
  const mem = state.npcMemory[npc.name];
  const memCtx = mem && mem.metBefore
    ? `NOT: Oyuncu ile daha önce karşılaştın (geçen sefer ${mem.lastAction} yapmıştı, ilişki: ${mem.relationScore}). Buna hafifçe değin.`
    : '';
  const req = `Sahne: ${evt.location}. ${role.name} seninle yüz yüze. ${memCtx} Karakterine uygun, gerilimli, özgün 1-2 cümle söyle. Tırnak, parantez, açıklama yasak.`;

  document.getElementById('ai-thinking').style.display = 'flex';
  try {
    const reply = await callGemini(buildNPCPrompt(npc, evt, role), [
      { role: 'user', parts: [{ text: req }] }
    ]);
    state.chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    addChatMessage('npc', reply);
  } catch(e) {
    addChatMessage('system', 'Bağlantı kuruluyor...');
  } finally {
    document.getElementById('ai-thinking').style.display = 'none';
  }
}

function buildNPCPrompt(npc, evt, role) {
  const mem = state.npcMemory[npc.name];
  const memLine = mem && mem.metBefore
    ? `\nGEÇMİŞ: Oyuncu ile daha önce karşılaştın. ${mem.lastAction} yapmıştı. İlişki skoru: ${mem.relationScore}.`
    : '';
  const moodLine = ['', '\nRUH HALİ YÜKSELME: Oyuncuya artık düşmanca yaklaşıyorsun.',
    '\nRUH HALİ KRİTİK: Patlama noktasındasın. Her an her şey olabilir.'][state.npcMoodLevel] || '';

  return `Sen "${npc.name}" adlı bir karaktersin. Rol: ${npc.role}.
KİŞİLİK: ${npc.backstory}
MEVCUT HAL: ${npc.mood}${moodLine}${memLine}
SAHNE: ${evt.text}
KARŞINDAKI: ${role.name} — ${role.bg}
KURALLAR: Türkçe konuş. 2-4 cümle. Tırnak/parantez/açıklama yasak. Gerçekçi, klişesiz. Oyuncunun yaklaşımına göre tepki ver. İtibar:${state.rep} Para:${state.money} Risk:${state.risk}.`;
}

async function callGemini(systemPrompt, contents) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 280, temperature: 1.0, topP: 0.95 }
      }),
    }
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || 'API hatası');
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '...';
}

function addChatMessage(sender, text) {
  const box = document.getElementById('chat-box');
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  msg.textContent = text;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  addChatMessage('player', text);
  const npc = state.currentEvent?.npc;
  state.chatHistory.push({ role: 'user', parts: [{ text }] });

  document.getElementById('ai-thinking').style.display = 'flex';
  document.getElementById('chat-input').disabled = true;

  try {
    const reply = await callGemini(
      buildNPCPrompt(npc, state.currentEvent, ROLES[state.role]),
      state.chatHistory
    );
    state.chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    addChatMessage('npc', reply);

    // Mood tırmanması
    const lower = text.toLowerCase();
    if ((lower.includes('tehdit') || lower.includes('öldür') || lower.includes('ezer')) && state.npcMoodLevel < 2) {
      state.npcMoodLevel++;
      updateNPCMoodBar();
      if (state.npcMoodLevel === 2) {
        addChatMessage('system', '⚠ NPC agresif — risk artıyor');
        state.risk = Math.min(100, state.risk + 6);
        updateHUD();
      }
    }

    // Küçük itibar etkisi
    const r = reply.toLowerCase();
    let d = 0;
    if (r.includes('anlıyorum') || r.includes('haklısın') || r.includes('tamam')) d = +2;
    if (r.includes('güvenmiyorum') || r.includes('yalancı') || r.includes('kandıramazsın')) d = -2;
    if (d) { state.rep = Math.max(0, Math.min(100, state.rep + d)); updateHUD(); }

  } catch(e) {
    addChatMessage('system', '⚠ Bağlantı hatası: ' + e.message);
  } finally {
    document.getElementById('ai-thinking').style.display = 'none';
    document.getElementById('chat-input').disabled = false;
    document.getElementById('chat-input').focus();
  }
}

// ── LOG ──────────────────────────────────────────────────────────
function addLog(text, type = '') {
  const log = document.getElementById('game-log');
  const e = document.createElement('div');
  e.className = `log-entry ${type}`;
  e.textContent = text;
  log.appendChild(e);
  log.scrollLeft = log.scrollWidth;
  while (log.children.length > 50) log.removeChild(log.firstChild);
}

// ── SONUÇ ─────────────────────────────────────────────────────────
function endGame(reason) {
  const r = ROLES[state.role];
  let icon, title, desc, verdict, endClass = '';

  if (reason === 'caught') {
    icon = '🚨'; title = 'YAKALANDIN'; endClass = 'end-bad';
    desc = `Risk sınırı aşıldı. ${r.name} kimliğinle Vartan City\'de çok iz bıraktın. Şehrin gölgeleri seni buldu.`;
    verdict = `${state.turn - 1} dosyada ${state.goodActions} doğru, ${state.badActions} yanlış karar. Hayatta kalmak yetmedi.`;
  } else if (reason === 'reputation') {
    icon = '💀'; title = 'İTİBAR SIFIR'; endClass = 'end-bad';
    desc = `Artık kimse sana güvenmiyor. ${r.name} kimliğin Vartan City\'nin hafızasında çürüdü.`;
    verdict = `İtibar sıfırlandı. Şehirde bir isim olmak için önce güven kazanmak gerekir.`;
  } else if (reason === 'bankrupt') {
    icon = '💸'; title = 'İFLAS'; endClass = 'end-bad';
    desc = `Para bitti, güç bitti. ${r.name} olarak Vartan City\'de ayakta kalamazsın.`;
    verdict = `Para sadece araçtır ama araçsız hiçbir yere gidilemez.`;
  } else {
    const score = Math.round(state.rep * 0.5 + state.money * 0.04 - state.risk * 0.4 + state.totalScore);
    const path = r.endingPath;

    if (state.goodActions >= state.badActions * 2 && state.rep >= 65) {
      const good = {
        justice:    { icon:'⚖️', title:'ADALET SAĞLANDI',       desc:`${r.name} olarak 20 dosyayı kapattın. Her seferinde zor olanı seçtin. Vartan City senin adını biliyor.` },
        order:      { icon:'🏅', title:'DÜZENİN SÜTUNU',        desc:`${r.name} kimliğinle şehre düzen getirdin. İnsanlar geceleri biraz daha güvende uyuyor.` },
        shadow:     { icon:'🌟', title:'GÖLGENİN KAHRAMANI',    desc:`${r.name} olarak kimse seni anlamadı. Ama şehir daha iyi bir yer — sen yüzünden.` },
        underworld: { icon:'👑', title:'YERİN ALTINDAKİ KRAL',  desc:`${r.name} olarak karanlıkta bile bir düzen kurdun. Saygı korkudan doğdu ama gerçek.` },
        ghost:      { icon:'🕊️', title:'İZ BIRAKMA',            desc:`${r.name} olarak iki tarafı dengelemeyi başardın. Kimse bilmiyor ama şehir daha iyi.` },
      };
      const e = good[path] || good.justice;
      icon = e.icon; title = e.title; desc = e.desc; endClass = 'end-good';
      verdict = `${state.goodActions} iyi karar, ${state.badActions} kötü karar. Skor: ${score}. Vartan City efsane bir isim kazandı.`;
    } else if (state.badActions > state.goodActions) {
      const dark = {
        justice:    { icon:'🖤', title:'YOZLAŞMIŞ ADALET',       desc:`${r.name} olarak aradığını buldun — ama o şey adalet değildi.` },
        order:      { icon:'🪖', title:'KABA KUVVET',             desc:`${r.name} düzeni sağladı. Ama bedeli ağır.` },
        shadow:     { icon:'🐍', title:'GÖLGENİN İÇİNDE',        desc:`${r.name} olarak büyük vurgun yaptın. Arkanda ne bıraktın?` },
        underworld: { icon:'☠️', title:'KARANLIĞIN EFENDİSİ',    desc:`${r.name} olarak şehrin en kirli işlerine bulandın. Güçlüsün — ama ne kadar sürer?` },
        ghost:      { icon:'🕷️', title:'HER İKİ TARAFA İHANET',  desc:`${r.name} olarak kimseye doğruyu söylemedin. Şimdi yalnızsın.` },
      };
      const e = dark[path] || dark.justice;
      icon = e.icon; title = e.title; desc = e.desc; endClass = 'end-neutral';
      verdict = `${state.goodActions} iyi, ${state.badActions} kötü karar. Vartan City seni hatırlıyor — ama iyi şeylerle değil.`;
    } else {
      icon = score > 50 ? '⭐' : '🌫️';
      title = score > 50 ? 'ŞEHRİN TANIKÇISI' : 'GÖLGELERİN İÇİNDE';
      desc = `${r.name} olarak 20 dosyayı kapattın. Ne kahraman ne kötü adam. Vartan City hâlâ karar veremiyor.`;
      endClass = 'end-neutral';
      verdict = `Skor: ${score}. ${state.goodActions} iyi, ${state.badActions} kötü, ${state.neutralActions} karma karar.`;
    }
  }

  document.getElementById('end-icon').textContent = icon;
  document.getElementById('end-title').textContent = title;
  document.getElementById('end-desc').textContent = desc;
  document.getElementById('end-verdict').textContent = verdict;
  document.getElementById('end-stats').innerHTML = `
    <div class="end-stat">
      <div class="end-stat-val">${state.rep}</div>
      <div class="end-stat-label">İTİBAR</div>
    </div>
    <div class="end-stat">
      <div class="end-stat-val">$${state.money}</div>
      <div class="end-stat-label">PARA</div>
    </div>
    <div class="end-stat">
      <div class="end-stat-val">${state.risk}</div>
      <div class="end-stat-label">RİSK</div>
    </div>
    <div class="end-stat">
      <div class="end-stat-val">${state.goodActions}</div>
      <div class="end-stat-label">İYİ KARAR</div>
    </div>
  `;

  const ec = document.querySelector('.end-content');
  if (ec) ec.className = `end-content ${endClass}`;

  showScreen('screen-end');
}

function restartGame() {
  showScreen('screen-intro');
}
