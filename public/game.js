// ═══════════════════════════════════════════════════════════════
// KARDO: ŞEHRİN GÖLGELERİ — v3.0  (Skill + Memory + Endings)
// ═══════════════════════════════════════════════════════════════

const GEMINI_KEY = 'AIzaSyC6EWtl3NfAeje30-AWdvKiYt3qdK70kNY';

// ── ROL TANIMLARI + SKILL BONUSLARI ──────────────────────────────
const ROLES = {
  detective: {
    name: 'DEDEKTİF', icon: '🔍', startMoney: 400, startRep: 80, startRisk: 10,
    bg: 'Şehrin en zeki dedektiflerinden birisin. Kanıt toplamak, şüphelileri sorgulamak ve gerçeği bulmak senin işin.',
    style: 'Analitik, soğukkanlı, her detayı fark eden biri olarak konuş.',
    skills: { investigate: { repBonus: 10, riskBonus: -5 }, interrogate: { repBonus: 8, riskBonus: 0 }, arrest: { repBonus: 5, riskBonus: 0 } },
    endingPath: 'justice',
  },
  police: {
    name: 'POLİS', icon: '👮', startMoney: 500, startRep: 70, startRisk: 15,
    bg: 'Şehrin sokaklarında düzeni sağlayan bir komisersin. Güç kullanmaktan çekinmezsin ama halkın güvenini de önemsersin.',
    style: 'Otoriter, direkt, kararlı biri olarak konuş.',
    skills: { arrest: { repBonus: 10, riskBonus: -5 }, call_backup: { repBonus: 8, riskBonus: -8 }, negotiate: { repBonus: 5, riskBonus: 0 } },
    endingPath: 'order',
  },
  thief: {
    name: 'HIRSIZ', icon: '🦹', startMoney: 200, startRep: 30, startRisk: 40,
    bg: 'Şehrin en yetenekli hırsızlarından birisin. Gölgede hareket eder, iz bırakmadan kaybolursun.',
    style: 'Kurnaz, hesapçı, her durumdan çıkar sağlamaya çalışan biri olarak konuş.',
    skills: { infiltrate: { repBonus: 5, riskBonus: -10 }, flee: { repBonus: 0, riskBonus: -15 }, bribe: { repBonus: 3, riskBonus: -5 } },
    endingPath: 'shadow',
  },
  criminal: {
    name: 'SUÇLU', icon: '💀', startMoney: 300, startRep: 20, startRisk: 60,
    bg: 'Şehrin karanlık dünyasında hayatta kalmayı öğrenmiş sert bir suçlusun.',
    style: 'Sert, tehditkâr, para ve güç odaklı biri olarak konuş.',
    skills: { bribe: { repBonus: 0, riskBonus: -12 }, infiltrate: { repBonus: 8, riskBonus: -5 }, negotiate: { repBonus: 3, riskBonus: -8 } },
    endingPath: 'underworld',
  },
  informant: {
    name: 'MUHBİR', icon: '🕵️', startMoney: 350, startRep: 50, startRisk: 30,
    bg: 'Hem polis hem suç örgütü için bilgi satan tehlikeli bir muhbirsin.',
    style: 'İkiyüzlü, manipülatif, her zaman çıkarını düşünen biri olarak konuş.',
    skills: { negotiate: { repBonus: 10, riskBonus: -8 }, investigate: { repBonus: 6, riskBonus: 0 }, flee: { repBonus: 0, riskBonus: -10 } },
    endingPath: 'ghost',
  },
};

// ── 20 OLAY ──────────────────────────────────────────────────────
const ALL_EVENTS = [
  {
    id: 'bank_robbery',
    badge: 'ACİL', location: '📍 Merkez Bankası', image: '🏦',
    text: 'Sabahın erken saatlerinde merkez bankasına silahlı soygun girişimi. 3 kişilik ekip kasayı zorlarken alarm devreye girdi. Birisi kaçarken bir çanta para bıraktı. Güvenlik kameraları devre dışı.',
    npc: { name: 'Ali Rıza', role: 'Yaralı soyguncu', avatar: '🩸', mood: 'panikleyen',
      backstory: 'İlk kez böyle büyük bir soygun yapmak zorunda kalan, borçları yüzünden çaresiz kalmış 34 yaşında bir adam. Arkadaşları onu bırakıp kaçtı.' },
    actions: ['arrest','negotiate','bribe','investigate','flee'],
    outcomes: {
      arrest:      { rep:+20, risk:+15, money:+100, text:'Ali Rıza\'yı gözaltına aldın. Sorgu sırasında çete lideri hakkında kritik bilgi verdi.', quality:'good' },
      negotiate:   { rep:+8,  risk:-5,  money:+200, text:'Para çantasını geri alman karşılığında Ali Rıza\'nın kaçmasına göz yumdu.', quality:'neutral' },
      bribe:       { rep:-15, risk:-20, money:-200, text:'200$ karşılığında Ali Rıza\'yı serbest bıraktın. Kimse görmedi... ya da öyle sandın.', quality:'bad' },
      investigate: { rep:+12, risk:+5,  money:0,    text:'Çanta içinde kripto cüzdanı ve bir liste buldun. Büyük bir ağın izine ulaştın.', quality:'good' },
      flee:        { rep:-8,  risk:-30, money:0,    text:'Ortalık karışmadan önce uzaklaştın. Ama fırsatı kaçırdın.', quality:'bad' },
    }
  },
  {
    id: 'drug_deal',
    badge: 'İSTİHBARAT', location: '📍 Liman Ambarı No:7', image: '🚢',
    text: 'Limanın ıssız ambarında gece yarısı gizli buluşma. İstihbarat kaynaklarına göre şehre 50 kg uyuşturucu giriyor. Alıcı ve satıcı tanınmış figürler. Yanlış hamle her şeyi mahvedebilir.',
    npc: { name: 'Deniz Karahan', role: 'Orta düzey uyuşturucu kurye', avatar: '😤', mood: 'gergin ve şüpheci',
      backstory: 'İstanbul\'dan gelen, bu işte 8 yıldır olan, ailesi için para kazanmaya çalışan ama artık bıkmak isteyen biri. Patronundan çekiniyor.' },
    actions: ['arrest','investigate','bribe','infiltrate','flee'],
    outcomes: {
      arrest:      { rep:+18, risk:+25, money:0,    text:'Deniz\'i kıstırdın. Direndi ama sonunda teslim oldu. Ağın üst isimlerine anahtar tanık.', quality:'good' },
      investigate: { rep:+10, risk:+10, money:0,    text:'Mal numunesi ve alıcı listesini ele geçirdin. Büyük balıklara uzanan iz.', quality:'good' },
      bribe:       { rep:-20, risk:-15, money:-300, text:'Deniz parayı aldı ve seni ağa tanıttı. Bu dünyaya girdikçe çıkması zorlaşıyor.', quality:'bad' },
      infiltrate:  { rep:+5,  risk:+35, money:+400, text:'Organizasyona sızdın. Riskli ama büyük kazanç. Deniz seni şimdilik güvenilir gördü.', quality:'neutral' },
      flee:        { rep:-5,  risk:-25, money:0,    text:'Geri çekildin. Bugün değil.', quality:'bad' },
    }
  },
  {
    id: 'murder_mystery',
    badge: 'CİNAYET', location: '📍 Terk Edilmiş Fabrika', image: '🏭',
    text: 'Fabrikada kimliği belirsiz ceset. Yanında şifreli not, kırık telefon ve solmuş bir fotoğraf. Kan izleri dışarıya uzanıyor. Otopsi raporuna göre ölüm 48 saat önce gerçekleşmiş.',
    npc: { name: 'Komisyon Üyesi Vural', role: 'Mafya orta kademesi', avatar: '👔', mood: 'soğuk ve tehditkâr',
      backstory: '20 yıldır bu şehrin kirli işlerini organize eden, görünürde saygın bir iş insanı. Birçok polisi satın almış, birçok tanığı susturmuş. Ama son olaydan sonra kendisi de tehlikede.' },
    actions: ['investigate','interrogate','bribe','flee','call_backup'],
    outcomes: {
      investigate: { rep:+15, risk:+10, money:0,    text:'Cesedin kimliğini tespit ettin: örgütün eski kasiyeri. Vural\'ın işi bu.', quality:'good' },
      interrogate: { rep:+10, risk:+20, money:0,    text:'Vural sıkıştı. Küçük bir ipucu kaçırdı ama hemen topladı kendini.', quality:'neutral' },
      bribe:       { rep:-25, risk:-10, money:-400, text:'Vural parayı aldı ve dosyayı kapattırdı. Bu şehirde para her şeyi çözüyor.', quality:'bad' },
      flee:        { rep:-10, risk:-20, money:0,    text:'Bu işe bulaşmaman belki daha iyiydi. Ama cinayet çözümsüz kaldı.', quality:'bad' },
      call_backup: { rep:+8,  risk:-15, money:0,    text:'Ekip geldi. Vural avukatını aradı. Deliller tartışmalı hale geldi ama süreç başladı.', quality:'neutral' },
    }
  },
  {
    id: 'car_chase',
    badge: 'TAKİP', location: '📍 Kuzey Otoyolu E-5', image: '🚗',
    text: 'Çalıntı BMW ile kuzey otoyolunda 200 km/s kaçış. Araçta rehine olduğu ihbarı var. Yol kapatıldı. 3 polis arabası takipte ama yaklaşamıyor. Karar sende.',
    npc: { name: 'Kemal "Duman" Aydın', role: 'Çaresiz kaçak', avatar: '😰', mood: 'panik içinde',
      backstory: '22 yaşında, suç örgütüne borçlu genç. Borcu ödemek için zorla bu işe soktular. Araçtaki rehine aslında kendi küçük kardeşi.' },
    actions: ['negotiate','arrest','bribe','flee','call_backup'],
    outcomes: {
      negotiate:   { rep:+20, risk:-10, money:0,    text:'Kemal\'i sakinleştirdin. Kardeşi serbest bıraktı ve teslim oldu. Örgüt hakkında bilgi vermeye hazır.', quality:'good' },
      arrest:      { rep:+10, risk:+30, money:0,    text:'Aracı patlak lastiği ile durdurdun. Yaralanma olmadı ama Kemal travma geçiriyor.', quality:'neutral' },
      bribe:       { rep:-10, risk:-25, money:-250, text:'Kemal parayı aldı ve kaçtı. Kardeşini bıraktı. Örgüt onu bir şekilde bulacak.', quality:'bad' },
      flee:        { rep:-15, risk:-30, money:0,    text:'Kendi canını kurtardın. Ama o araçta olan her şey senin vicdanında.', quality:'bad' },
      call_backup: { rep:+5,  risk:-20, money:0,    text:'Helikopter geldi. Kovalama bitti. Ama Kemal tehlikeli bir manevra yaptı.', quality:'neutral' },
    }
  },
  {
    id: 'heist_planning',
    badge: 'FIRSAT', location: '📍 Yeraltı Kulübü "Çelik Kasa"', image: '🎰',
    text: 'Bu gece kumarhaneye 2 milyon dolarlık nakit transferi var. İçeriden bir kaynak güvenlik açığını satıyor. Ekip hazır, plan masada. Ama bir şeyler çok kolay görünüyor.',
    npc: { name: 'Şirin Demirtaş', role: 'İçerideki ajan', avatar: '🤫', mood: 'sinsi ve hesapçı',
      backstory: 'Kumarhane güvenliğinde çalışan, aslında birden fazla gruba bilgi satan tehlikeli bir çift ajan. Güvenmek tehlikeli.' },
    actions: ['infiltrate','bribe','investigate','negotiate','flee'],
    outcomes: {
      infiltrate:  { rep:+5,  risk:+40, money:+600, text:'İçeri girdin. Plan işe yaradı... ya da Şirin öyle istedi. Paranın bir kısmı sende.', quality:'neutral' },
      bribe:       { rep:-5,  risk:+10, money:-350, text:'Şirin daha fazla para istedi. Verdikten sonra bilgilerin yarısının yanlış olduğunu anladın.', quality:'bad' },
      investigate: { rep:+15, risk:+5,  money:0,    text:'Şirin\'in aslında polise ihbarcı olduğunu öğrendin. Tuzaktan son anda çıktın.', quality:'good' },
      negotiate:   { rep:+8,  risk:-10, money:+100, text:'Şirin ile anlaşma yaptın. Küçük pay karşılığında güvenilir bilgi aldın.', quality:'neutral' },
      flee:        { rep:0,   risk:-35, money:0,    text:'İçgüdülerine güvendin. Doğruydu — gece baskın yapıldı.', quality:'good' },
    }
  },
  {
    id: 'hostage',
    badge: 'REHİNE', location: '📍 Mavi Tower 18. Kat', image: '🏢',
    text: '18. katta 8 rehine. Silahlı grup şirket yöneticilerini tutuyor. Talep: 3 yıl önce hapsedilen ağ liderleri serbest bırakılsın. Müzakere ekibi dışarıda, ama içeriye sen girebilirsin.',
    npc: { name: 'Fırtına', role: 'Rehine alıcısı lider', avatar: '💣', mood: 'kararlı ama yıpranmış',
      backstory: 'Aslen idealist bir aktivist, devlet tarafından haksız yere hapsedilen kardeşini kurtarmak için bu yola girdi. Öldürmek istemiyor ama seçenekleri tükeniyor.' },
    actions: ['negotiate','investigate','call_backup','bribe','flee'],
    outcomes: {
      negotiate:   { rep:+25, risk:-5,  money:0,    text:'Fırtına ile bağ kurdun. Rehineleri bırakmayı kabul etti. Kardeşi için söz verdin.', quality:'good' },
      investigate: { rep:+10, risk:+15, money:0,    text:'Bina planlarını buldun. Arka çıkış var. Ama Fırtına bunu fark etti.', quality:'neutral' },
      call_backup: { rep:+5,  risk:+20, money:0,    text:'Özel tim geldi. Fırtına sıkıştı. Sonuç belirsiz.', quality:'neutral' },
      bribe:       { rep:-15, risk:+10, money:-500, text:'Grubun içinden birini satın aldın. Fırtına ihaneti öğrendi, işler kötüye gitti.', quality:'bad' },
      flee:        { rep:-20, risk:-30, money:0,    text:'Binadan çıktın. Rehinelerin kaderi başkalarına kaldı.', quality:'bad' },
    }
  },
  {
    id: 'corrupt_cop',
    badge: 'İHANET', location: '📍 Polis Karakolu', image: '🚓',
    text: 'Kıdemli bir komiser rüşvet alırken görüntülendi. Video sızdı ama kim sızdırdı bilinmiyor. Komiser şimdi sana baskı yapıyor: videoyu yok etmeni istiyor.',
    npc: { name: 'Komiser Tarık Yıldız', role: 'Yolsuz polis amiri', avatar: '😤', mood: 'tehditkâr ve paranoyak',
      backstory: '25 yıllık polislik kariyerinde sistemi kendi çıkarına kullanan biri. Karısı hastanede, borçları var. Videonun çıkması her şeyini mahvedecek.' },
    actions: ['investigate','negotiate','bribe','arrest','flee'],
    outcomes: {
      investigate: { rep:+18, risk:+20, money:0,    text:'Videonun kim tarafından sızdırıldığını buldun. Şehirde büyük bir iç savaşın fitili.', quality:'good' },
      negotiate:   { rep:+5,  risk:-10, money:+300, text:'Tarık ile anlaştın. Video senin kasanda, güvencen var. Ama bu tehlikeli bir denge.', quality:'neutral' },
      bribe:       { rep:-20, risk:-15, money:-250, text:'Parayı alıp videoyu sildirdin. Tarık\'a borçlusun artık.', quality:'bad' },
      arrest:      { rep:+30, risk:+35, money:0,    text:'Kendi komiserini tutukladın. Karakolda fırtına koptu. Kariyerin ya zirveye çıkacak ya bitecek.', quality:'good' },
      flee:        { rep:-8,  risk:-25, money:0,    text:'Bu pisliğe bulaşmak istemeden uzaklaştın.', quality:'bad' },
    }
  },
  {
    id: 'underground_fight',
    badge: 'YASADIŞI', location: '📍 Bodrum Dövüş Kulübü', image: '🥊',
    text: 'Şehrin en büyük yasadışı dövüş kulübü bu gece açık. Bahisler çılgın, para büyük. Ama örgüt sahibi kayıp ve kasayı kim tutacağı belli değil.',
    npc: { name: 'Büyük Recep', role: 'Kulüp patronu yardımcısı', avatar: '💪', mood: 'güçlü ama kontrolü kaybetmiş',
      backstory: 'Patronu kaybolan ve şimdi hem polise hem rakip örgütlere karşı tek başına mücadele eden biri. Sadık ama çaresiz.' },
    actions: ['investigate','infiltrate','bribe','negotiate','flee'],
    outcomes: {
      investigate: { rep:+12, risk:+15, money:0,    text:'Patronun aslında kaçmadığını, rakip örgüt tarafından tutulduğunu öğrendin.', quality:'good' },
      infiltrate:  { rep:0,   risk:+30, money:+350, text:'Kasaya ulaştın. Para senin. Ama kulübün içinde yabancı yüz fark edildi.', quality:'neutral' },
      bribe:       { rep:-10, risk:-10, money:-200, text:'Recep\'e güvenlik karşılığı ödeme yaptın. Geceyi geçirdin.', quality:'bad' },
      negotiate:   { rep:+15, risk:-5,  money:+150, text:'Recep\'le anlaşma yaptın. Patronu bulmana yardım ediyor, sen de kulübü koruyorsun.', quality:'good' },
      flee:        { rep:-5,  risk:-20, money:0,    text:'Bu kaos ortamından çekildin. Akıllıca.', quality:'neutral' },
    }
  },
  {
    id: 'art_theft',
    badge: 'SOYGUN', location: '📍 Modern Sanat Müzesi', image: '🖼️',
    text: 'Müzeden 50 milyon dolarlık tablo çalındı. Hırsız hâlâ içeride. Güvenlik sistemleri çevrimdışı. Bir güvenlik görevlisi yaralı, diğeri kayıp.',
    npc: { name: 'Mavi Eldivenli Kadın', role: 'Profesyonel sanat hırsızı', avatar: '🎭', mood: 'soğukkanlı ve zeki',
      backstory: 'Avrupa\'da 12 yıllık geçmişi olan, asla yakalanmamış bir sanat hırsızı. Bu tabloyu kişisel bir nedenle çaldı — satmıyor, geri istiyor.' },
    actions: ['negotiate','arrest','investigate','bribe','flee'],
    outcomes: {
      negotiate:   { rep:+15, risk:-5,  money:+200, text:'Hikayesini dinledin. Tablo aslında onun ailesinden çalınmıştı. Geri verdin.', quality:'good' },
      arrest:      { rep:+20, risk:+15, money:+150, text:'Yakaladın. Ama müzede başka sırlar olduğunu fark ettin.', quality:'good' },
      investigate: { rep:+18, risk:+5,  money:0,    text:'Müze yönetiminin sigortadan para almak için tabloyu bizzat çaldırdığını keşfettin.', quality:'good' },
      bribe:       { rep:-15, risk:-10, money:+300, text:'Tablonun nereye gittiğini öğrenmek için para aldın. Ama bu bilgi tehlikeli.', quality:'bad' },
      flee:        { rep:-5,  risk:-20, money:0,    text:'Bu karmaşaya karışmadın.', quality:'bad' },
    }
  },
  {
    id: 'witness_protection',
    badge: 'KRİTİK', location: '📍 Gizli Güvenli Ev', image: '🏠',
    text: 'Koruduğun tanık yarın mahkemede ifade verecek. Ama bu gece adres sızdırıldı. Suikastçılar yolda. Tanığı kurtarmak için 3 saat var.',
    npc: { name: 'Tanık: Serhan Koç', role: 'Kritik ifade tanığı', avatar: '😨', mood: 'ölüm korkusuyla paramparça',
      backstory: 'Mafya kasiyeri olarak çalışırken vicdanı sızlayan, ailesini düşünerek ihbarcı olan 40 yaşında biri. Şimdi pişman ama geri dönüş yok.' },
    actions: ['investigate','call_backup','negotiate','bribe','flee'],
    outcomes: {
      investigate: { rep:+15, risk:+20, money:0,    text:'Adresi sızdıran kişiyi buldun: içeride ajan var. Ama Serhan\'ı kurtarmak için zamanın azaldı.', quality:'good' },
      call_backup: { rep:+10, risk:-10, money:0,    text:'Güvenli nakil organize ettin. Serhan mahkemede ifade verdi.', quality:'good' },
      negotiate:   { rep:+8,  risk:-5,  money:+150, text:'Suikastçı grupla irtibat kurarak Serhan\'ın değeri olmadığını ikna ettin.', quality:'neutral' },
      bribe:       { rep:-20, risk:-20, money:-400, text:'Suikastçılara "göz yum" parası verdin. Vicdanın ne diyecek?', quality:'bad' },
      flee:        { rep:-30, risk:-30, money:0,    text:'Tanığı bırakıp kaçtın. Serhan\'a ne oldu bilinmiyor.', quality:'bad' },
    }
  },
  {
    id: 'blackmail',
    badge: 'ŞANTAJ', location: '📍 Lüks Otel Lobisi', image: '🏨',
    text: 'Şehrin en güçlü iş insanı şantaj kurbanı. Şantajcı otel odasında, dosyalar elinde. Asıl sır dosyalarda ne var?',
    npc: { name: 'Şantajcı: Taner Aslan', role: 'Eski gazeteci, şimdi şantajcı', avatar: '📋', mood: 'kendinden emin ama tedirgin',
      backstory: 'Gerçek bir skandalı haber yapmaya çalışırken işten kovulan gazeteci. Dosyalar gerçek ve yayınlanırsa şehri sarsacak.' },
    actions: ['negotiate','investigate','arrest','bribe','flee'],
    outcomes: {
      negotiate:   { rep:+10, risk:-5,  money:+200, text:'Taner ile anlaştın. Dosyalar güvende, ama bir kopyası sende.', quality:'neutral' },
      investigate: { rep:+20, risk:+10, money:0,    text:'Dosyaları okudun. Şehrin yarısını içine alan bir yolsuzluk ağı. Artık hedeftesin.', quality:'good' },
      arrest:      { rep:+15, risk:+15, money:0,    text:'Taner tutuklandı. Ama dosyalar mahkemeye girdi ve şehir sallandı.', quality:'good' },
      bribe:       { rep:-20, risk:-10, money:-350, text:'Taner\'e ödeme yaptın. İş insanı sana borçlu. Ama Taner bir kopya daha almış.', quality:'bad' },
      flee:        { rep:-8,  risk:-15, money:0,    text:'Bu işe bulaşmadın. Ama şantaj devam ediyor.', quality:'bad' },
    }
  },
  {
    id: 'gang_war',
    badge: 'SAVAŞ', location: '📍 Doğu Yakası Depo Bölgesi', image: '💥',
    text: 'İki büyük çete kontrolü için savaşıyor. Çapraz ateş ortasında bir semt mahalle halkını etkiliyor. Yerel esnaf korunma istiyor.',
    npc: { name: 'Çete Lideri Ferhat', role: 'Bölgeyi ele geçirmek isteyen genç lider', avatar: '😤', mood: 'hırslı ve öngörülemez',
      backstory: 'Sokakta büyümüş, haksızlığa karşı çıkmak isterken sistemin içinde kaybolmuş 28 yaşında biri. Halkı korumak istiyor ama yolu yanlış.' },
    actions: ['negotiate','investigate','arrest','bribe','infiltrate'],
    outcomes: {
      negotiate:   { rep:+18, risk:-10, money:0,    text:'Ferhat\'ı ateşkes için ikna ettin. Halk şimdilik güvende.', quality:'good' },
      investigate: { rep:+12, risk:+15, money:0,    text:'Çatışmanın arkasında üçüncü bir oyuncunun olduğunu buldun. Büyük resim netleşiyor.', quality:'good' },
      arrest:      { rep:+20, risk:+30, money:0,    text:'Ferhat\'ı tutukladın. Ama boşluk daha tehlikeli biriyle dolacak.', quality:'neutral' },
      bribe:       { rep:-15, risk:-15, money:-300, text:'Her iki çeteye de para verdin. Geçici ateşkes sağlandı.', quality:'bad' },
      infiltrate:  { rep:+5,  risk:+35, money:+250, text:'Örgüte sızdın. Büyük bilgilere ulaştın ama tehlike arttı.', quality:'neutral' },
    }
  },
  {
    id: 'hacker_chase',
    badge: 'SİBER', location: '📍 Teknoloji Parkı', image: '💻',
    text: 'Şehrin tüm trafik sistemini hackleyen anonim hacker. Şehir felç. Talep: 3 saat içinde 10 milyon dolar kripto. Hacker\'ın yerini sadece bir kişi biliyor.',
    npc: { name: 'Anonim kaynak "Ghost"', role: 'Hacker arkadaşını koruyan programcı', avatar: '👤', mood: 'suçlu ama sadık',
      backstory: 'Hacker\'ın çocukluk arkadaşı. Sisteme sızdırmasının arkasındaki sebebi biliyor: şehrin gizli fon aktarımlarını ifşa etmek istiyor.' },
    actions: ['negotiate','investigate','bribe','arrest','flee'],
    outcomes: {
      negotiate:   { rep:+15, risk:-5,  money:0,    text:'Ghost iş birliği yaptı. Hacker bulundu. Sistem kurtarıldı, gerçek sebebi anlarsın.', quality:'good' },
      investigate: { rep:+20, risk:+10, money:0,    text:'Hacker\'ın şehir belediyesinin kara para aklamasını ifşa etmeye çalıştığını buldun.', quality:'good' },
      bribe:       { rep:-10, risk:-20, money:-300, text:'Ghost\'a para verdin. Konum aldın ama bilgi eksik çıktı.', quality:'bad' },
      arrest:      { rep:+10, risk:+20, money:0,    text:'Ghost tutuklandı. Hacker hâlâ kayıp. Şehir karanlıkta kalmaya devam ediyor.', quality:'neutral' },
      flee:        { rep:-5,  risk:-15, money:0,    text:'Bu işe girmedin. Sistem çöküşe devam etti.', quality:'bad' },
    }
  },
  {
    id: 'arms_deal',
    badge: 'TEHLİKE', location: '📍 Köhne Tersane', image: '⚓',
    text: 'Tersanede büyük çaplı silah ticareti. Alıcı belirsiz, ama silahlar şehirde kalmayacak. Konteyner tam dolmadan operasyon başlatılması gerekiyor.',
    npc: { name: 'Satıcı: Yılmaz Usta', role: 'Silah kaçakçısı orta adam', avatar: '🔫', mood: 'sert ve güvensiz',
      backstory: 'Eski askeri teçhizat deposu çalışanı, sistem tarafından haksız yere ihraç edilmiş. İntikam ve para için bu işe girdi.' },
    actions: ['arrest','investigate','infiltrate','negotiate','flee'],
    outcomes: {
      arrest:      { rep:+25, risk:+25, money:0,    text:'Yılmaz ve alıcıları yakaladın. Büyük operasyon. Ama silahların bir kısmı dağıtılmış.', quality:'good' },
      investigate: { rep:+18, risk:+10, money:0,    text:'Silahların nereye gideceğini öğrendin. Ağın içine giren bir iz buldun.', quality:'good' },
      infiltrate:  { rep:+5,  risk:+40, money:+500, text:'Takasa katıldın. Büyük risk, büyük kazanç. Ama artık kayıtlardasın.', quality:'neutral' },
      negotiate:   { rep:+8,  risk:-5,  money:+200, text:'Yılmaz\'ı durdurman karşılığında ağ hakkında bilgi aldın.', quality:'neutral' },
      flee:        { rep:-5,  risk:-30, money:0,    text:'Bu kadar büyük risk alamazdın. Geri çekildin.', quality:'bad' },
    }
  },
  {
    id: 'kidnapping',
    badge: 'KAÇIRMA', location: '📍 Sanayi Bölgesi', image: '🏗️',
    text: 'Bir bankacının çocuğu 6 saattir kayıp. Fidye mesajı geldi: 500.000 dolar, 4 saat içinde. Polis habersiz tutulsun isteniyor.',
    npc: { name: 'Kaçıranlar adına: Sako', role: 'Fidye görüşmecisi', avatar: '📞', mood: 'mesafeli ve kontrollü',
      backstory: 'Aslında çocuğun durumundan rahatsız olan, grupta en vicdanlı olan kişi. Yanlış yapmak istemiyor ama korku içinde.' },
    actions: ['negotiate','investigate','bribe','call_backup','flee'],
    outcomes: {
      negotiate:   { rep:+22, risk:-5,  money:-100, text:'Sako\'yu ikna ettin. Çocuk serbest bırakıldı. Sako kendini teslim etmeyi düşünüyor.', quality:'good' },
      investigate: { rep:+15, risk:+15, money:0,    text:'Konumu tespit ettin. Baskın için hazırlık başladı.', quality:'good' },
      bribe:       { rep:-10, risk:-20, money:-500, text:'Fidyeyi ödedin. Çocuk geldi ama kaçıranlar serbest.', quality:'bad' },
      call_backup: { rep:+10, risk:+20, money:0,    text:'Ekip geldi. Operasyon başladı. Sonuç belirsiz.', quality:'neutral' },
      flee:        { rep:-30, risk:-25, money:0,    text:'Yardım etmedin. Aile yalnız kaldı.', quality:'bad' },
    }
  },
  {
    id: 'money_laundering',
    badge: 'MALİ SUÇ', location: '📍 Sahte Kuaför Zinciri', image: '💈',
    text: 'Sıradan bir kuaför zinciri aslında kara para aklama merkezi. Bir muhasebeci içeriden belge sızdırmak istiyor ama korkuyor.',
    npc: { name: 'Muhasebeci Selin', role: 'Şirkette hapsedilmiş muhbir adayı', avatar: '📊', mood: 'korkmuş ve kararlı',
      backstory: 'İş bulma umuduyla bu şirkete giren, sonra içinden çıkamayan 29 yaşında biri. Vicdanı baskın çıktı ama hayatı tehlikede.' },
    actions: ['investigate','negotiate','call_backup','bribe','flee'],
    outcomes: {
      investigate: { rep:+18, risk:+10, money:0,    text:'Belgeler ele geçirildi. Şehrin önde gelen 12 ismi ağda yer alıyor.', quality:'good' },
      negotiate:   { rep:+12, risk:-5,  money:0,    text:'Selin\'e güvenlik garantisi verdin. Tüm belgeleri aldın.', quality:'good' },
      call_backup: { rep:+8,  risk:+15, money:0,    text:'Ekip ile koruma altına alındı. Mali suç birimi devreye girdi.', quality:'neutral' },
      bribe:       { rep:-15, risk:-15, money:-250, text:'Şirket yöneticilerine para ödedin. Selin güvende ama belgeler yok.', quality:'bad' },
      flee:        { rep:-10, risk:-20, money:0,    text:'Selin yalnız kaldı. Bu sistemi değiştiremeyeceksin.', quality:'bad' },
    }
  },
  {
    id: 'prison_break',
    badge: 'KAÇIŞ', location: '📍 Yüksek Güvenlikli Cezaevi', image: '⛓️',
    text: 'Şehrin en güvenli cezaevinden firar planı var. İçerideki kişi sana mesaj bıraktı: "Beni çıkar, karşılığında şehrin sırlarını veririm."',
    npc: { name: 'Mahkum: Doktor Kerem', role: 'İçeride gömülü sırlara sahip eski ajan', avatar: '🔬', mood: 'soğuk ve stratejik',
      backstory: 'Devletin karanlık operasyonlarında görev almış, sonra kullanılıp hapsedilmiş bir bilim insanı. Elindekiler gerçekse şehri sarsacak.' },
    actions: ['investigate','negotiate','bribe','flee','call_backup'],
    outcomes: {
      investigate: { rep:+15, risk:+20, money:0,    text:'Kerem\'in elindekiler gerçek. Ama firar planı aslında seni tuzağa çekmek için kurulmuş.', quality:'good' },
      negotiate:   { rep:+10, risk:-5,  money:+300, text:'Kerem ile anlaştın. Bilgileri sana sızdırdı, sen de yasal yolları araştıracaksın.', quality:'neutral' },
      bribe:       { rep:-15, risk:+10, money:-350, text:'Gardiyanlar satın alındı. Kerem çıktı. Ama seni de içeri aldılar.', quality:'bad' },
      flee:        { rep:-5,  risk:-25, money:0,    text:'Bu tuzağa düşmedin. Akıllı karar.', quality:'neutral' },
      call_backup: { rep:+8,  risk:-10, money:0,    text:'Yetkililere bildirdin. Firar planı engellendi. Kerem\'in bilgileri inceleniyor.', quality:'good' },
    }
  },
  {
    id: 'assassination_attempt',
    badge: 'SUİKAST', location: '📍 Belediye Meydanı', image: '🏛️',
    text: 'Şehir başkanına suikast girişimi 2 saat içinde gerçekleşecek. Bir ihbarcı sana bilgi verdi ama delil yok. Resmi kanallar çok yavaş.',
    npc: { name: 'İhbarcı: Anonim', role: 'Suikast organizasyonundan kaçan biri', avatar: '🤐', mood: 'panikleyen ve güvenilmez',
      backstory: 'Organizasyona sonradan katılmış, suikastı onaylamayan biri. Ama kim olduğunu açıklayamıyor, yoksa kendisi de hedef olur.' },
    actions: ['investigate','call_backup','negotiate','arrest','flee'],
    outcomes: {
      investigate: { rep:+20, risk:+20, money:0,    text:'Suikastçının kimliğini ve konumunu tespit ettin. Son anda durduruldu.', quality:'good' },
      call_backup: { rep:+12, risk:-5,  money:0,    text:'Güvenlik takviye edildi. Suikast engellendi ama ihbarcı kayıp.', quality:'good' },
      negotiate:   { rep:+8,  risk:-10, money:0,    text:'İhbarcıya güvenli geçiş garantisi verdin. Tüm bilgileri aldın.', quality:'neutral' },
      arrest:      { rep:+15, risk:+25, money:0,    text:'Şüpheliyi gözaltına aldın. Organizasyonun sadece bir parçası bu.', quality:'neutral' },
      flee:        { rep:-25, risk:-20, money:0,    text:'Harekete geçmedin. Sonuçları ağır oldu.', quality:'bad' },
    }
  },
  {
    id: 'undercover_blown',
    badge: 'DEŞIFRE', location: '📍 Mafya Lokali', image: '🍷',
    text: 'Aylarca sürdürdüğün sızma operasyonu deşifre oldu. Örgüt seni biliyor ama henüz hareket etmedi. Neden? Bu bir tuzak mı, yoksa seni kullanmak mı istiyorlar?',
    npc: { name: 'Örgüt Adamı: Cesur Bey', role: 'Örgütün en akıllı stratejisti', avatar: '🎩', mood: 'bilen birinin soğukkanlılığıyla',
      backstory: 'Devlet içinde de bağlantıları olan, her hamleyi 10 adım öncesinden hesaplayan zeki ve tehlikeli biri.' },
    actions: ['negotiate','investigate','flee','bribe','infiltrate'],
    outcomes: {
      negotiate:   { rep:+10, risk:-15, money:+400, text:'Cesur Bey sana iş teklifi yaptı. Kabul etmek nereye götürür bilinmez.', quality:'neutral' },
      investigate: { rep:+18, risk:+25, money:0,    text:'Tuzaktan son anda çıktın. Örgütün içindeki çatlağı gördün.', quality:'good' },
      flee:        { rep:+5,  risk:-40, money:0,    text:'Hızlı davrandın. Operasyon bitti ama sen hayattasın.', quality:'neutral' },
      bribe:       { rep:-20, risk:-20, money:-300, text:'Örgüte para verip güvenini kazanmaya çalıştın. Riskli denge.', quality:'bad' },
      infiltrate:  { rep:0,   risk:+45, money:+600, text:'Oyunu oynadın. Örgüte tamamen girdin. Artık dönüş zor.', quality:'neutral' },
    }
  },
  {
    id: 'election_fraud',
    badge: 'SİYASİ', location: '📍 Seçim Merkezi', image: '🗳️',
    text: 'Yerel seçimde usulsüzlük yapıldığına dair somut deliller var. Oy sayım sistemi manipüle edilmiş. Belgeleri ele geçirmek için 1 saatin var.',
    npc: { name: 'Sistem Yöneticisi Ertan', role: 'Usulsüzlüğü bilen ama korkan teknisyen', avatar: '🖥️', mood: 'vicdanıyla savaşan',
      backstory: 'Baskı altında sistemi manipüle etmek zorunda bırakılan, ailesi tehdit altında olan bir teknisyen. Yardım istiyor ama açıkça söyleyemiyor.' },
    actions: ['investigate','negotiate','bribe','call_backup','flee'],
    outcomes: {
      investigate: { rep:+22, risk:+15, money:0,    text:'Delilleri ele geçirdin. Şehrin siyasi dengesi sarsılacak.', quality:'good' },
      negotiate:   { rep:+15, risk:-5,  money:0,    text:'Ertan ile anlaştın. Tüm log kayıtlarını aldın.', quality:'good' },
      bribe:       { rep:-10, risk:-15, money:-200, text:'Ertan\'a para verdin. Bilgi aldın ama delil zayıf.', quality:'bad' },
      call_backup: { rep:+10, risk:+10, money:0,    text:'Soruşturma başladı. Uzun süreç ama doğru yol.', quality:'neutral' },
      flee:        { rep:-10, risk:-20, money:0,    text:'Geri çekildin. Usulsüzlük örtbas edildi.', quality:'bad' },
    }
  },
];

const ACTION_DEFS = {
  arrest:      { icon: '🚔', name: 'TUTUKLAMA',  desc: 'Gözaltına al' },
  negotiate:   { icon: '🤝', name: 'MÜZAKERE',   desc: 'Anlaşmaya çalış' },
  bribe:       { icon: '💰', name: 'RÜŞVET',     desc: 'Para teklif et' },
  investigate: { icon: '🔎', name: 'İNCELE',     desc: 'Kanıt topla' },
  flee:        { icon: '🏃', name: 'ÇEKİL',      desc: 'Uzaklaş' },
  infiltrate:  { icon: '🕶️', name: 'SIZDIR',    desc: 'İçine sız' },
  interrogate: { icon: '💬', name: 'SORGU',      desc: 'Sorgula' },
  call_backup: { icon: '📡', name: 'TAKVİYE',    desc: 'Yardım çağır' },
};

// ── OYUN DURUMU ───────────────────────────────────────────────────
let state = {
  role: null,
  rep: 70, money: 500, risk: 20,
  turn: 1, maxTurns: 12,
  currentEvent: null,
  chatHistory: [],
  actionUsed: false,
  eventQueue: [],
  totalScore: 0,
  // Skill & memory sistemi
  npcMemory: {},       // { npcName: { metBefore, lastAction, lastMood, relationScore } }
  goodActions: 0,
  badActions: 0,
  neutralActions: 0,
  skillUsed: {},       // { actionKey: count }
  npcCurrentMood: 'normal', // tırmanır: normal > hostile > aggressive
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

// ── NAVIGATION ───────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });
  const el = document.getElementById(id);
  el.classList.add('active');
  el.style.display = 'flex';
}

function showRoleSelect() { showScreen('screen-role'); }

function selectRole(roleKey) {
  document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`[data-role="${roleKey}"]`).classList.add('selected');
  setTimeout(() => {
    const r = ROLES[roleKey];
    state = {
      role: roleKey,
      rep: r.startRep, money: r.startMoney, risk: r.startRisk,
      turn: 1, maxTurns: 12,
      currentEvent: null, chatHistory: [], actionUsed: false,
      eventQueue: shuffle(ALL_EVENTS),
      totalScore: 0,
      npcMemory: {}, goodActions: 0, badActions: 0, neutralActions: 0,
      skillUsed: {}, npcCurrentMood: 'normal',
    };

    document.getElementById('hud-role-icon').textContent = r.icon;
    document.getElementById('hud-role-name').textContent = r.name;
    document.getElementById('hud-turn-max').textContent = state.maxTurns;

    showScreen('screen-game');
    updateHUD();
    loadNextEvent();
  }, 300);
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
  state.npcCurrentMood = 'normal';

  document.getElementById('event-badge').textContent = evt.badge;
  document.getElementById('event-location').textContent = evt.location;
  document.getElementById('event-text').textContent = evt.text;
  document.getElementById('event-image').textContent = evt.image;
  document.getElementById('npc-panel').style.display = 'none';
  document.getElementById('chat-box').innerHTML = '';
  document.getElementById('outcome-banner').style.display = 'none';

  // NPC hafıza rozetini göster
  const mem = state.npcMemory[evt.npc.name];
  if (mem && mem.metBefore) {
    addChatMessage('system', `📎 ${evt.npc.name} ile daha önce karşılaştın — ilişki skoru: ${mem.relationScore > 0 ? '+' : ''}${mem.relationScore}`);
  }

  renderActionCards(evt.actions);
  addLog(`Tur ${state.turn}: ${evt.badge} — ${evt.location}`, 'neutral');
}

// ── SKILL HESAPLA ────────────────────────────────────────────────
function applySkillBonus(actionKey, outcome) {
  const roleSkills = ROLES[state.role].skills;
  if (!roleSkills[actionKey]) return { ...outcome };

  const bonus = roleSkills[actionKey];
  const used = state.skillUsed[actionKey] || 0;
  // Aynı aksiyonu çok kullanınca bonus azalır (diminishing returns)
  const factor = Math.max(0.3, 1 - used * 0.15);

  const bonusRep = Math.round((bonus.repBonus || 0) * factor);
  const bonusRisk = Math.round((bonus.riskBonus || 0) * factor);

  state.skillUsed[actionKey] = used + 1;

  if (bonusRep !== 0 || bonusRisk !== 0) {
    const skillMsg = `[${ROLES[state.role].name} Yeteneği: İtibar ${bonusRep >= 0 ? '+' : ''}${bonusRep}, Risk ${bonusRisk >= 0 ? '+' : ''}${bonusRisk}]`;
    setTimeout(() => addLog(skillMsg, bonusRep > 0 ? 'good' : 'neutral'), 300);
  }

  return {
    ...outcome,
    rep: outcome.rep + bonusRep,
    risk: outcome.risk + bonusRisk,
  };
}

// ── ACTION CARDS ─────────────────────────────────────────────────
function renderActionCards(actionKeys) {
  const row = document.getElementById('card-row');
  row.innerHTML = '';
  const roleSkills = ROLES[state.role].skills;

  actionKeys.forEach(key => {
    const def = ACTION_DEFS[key];
    if (!def) return;
    const card = document.createElement('div');
    card.className = 'action-card';
    card.dataset.action = key;
    const outcome = state.currentEvent.outcomes[key];
    const hasSkill = !!roleSkills[key];
    const sign = v => v > 0 ? `+${v}` : `${v}`;

    card.innerHTML = `
      <div class="action-card-icon">${def.icon}</div>
      <div class="action-card-name">${def.name}${hasSkill ? ' <span class="skill-badge">★</span>' : ''}</div>
      <div class="action-card-desc">${def.desc}</div>
      <div class="action-card-effects">
        ${outcome.rep !== 0 ? `<span class="${outcome.rep > 0 ? 'eff-pos' : 'eff-neg'}">İtibar ${sign(outcome.rep)}</span>` : ''}
        ${outcome.risk !== 0 ? `<span class="${outcome.risk < 0 ? 'eff-pos' : 'eff-neg'}">Risk ${sign(outcome.risk)}</span>` : ''}
        ${outcome.money !== 0 ? `<span class="${outcome.money > 0 ? 'eff-pos' : 'eff-neg'}">${sign(outcome.money)}$</span>` : ''}
      </div>`;
    card.onclick = () => useAction(key, card);
    row.appendChild(card);
  });

  const talkCard = document.createElement('div');
  talkCard.className = 'action-card talk-card';
  talkCard.innerHTML = `<div class="action-card-icon">💬</div><div class="action-card-name">NPC KONUŞ</div><div class="action-card-desc">AI ile diyalog</div>`;
  talkCard.onclick = openNPCPanel;
  row.appendChild(talkCard);
}

function useAction(key, cardEl) {
  if (state.actionUsed) { addLog('Bu turda zaten aksiyon kullandın!', 'bad'); return; }
  const rawOutcome = state.currentEvent.outcomes[key];
  if (!rawOutcome) return;

  const outcome = applySkillBonus(key, rawOutcome);

  state.rep   = Math.max(0, Math.min(100, state.rep   + outcome.rep));
  state.risk  = Math.max(0, Math.min(100, state.risk  + outcome.risk));
  state.money = Math.max(0, state.money + outcome.money);
  state.actionUsed = true;
  state.totalScore += outcome.rep - Math.abs(outcome.risk * 0.3);

  // İstatistik takibi
  if (outcome.quality === 'good') state.goodActions++;
  else if (outcome.quality === 'bad') state.badActions++;
  else state.neutralActions++;

  // NPC hafızasını güncelle
  const npc = state.currentEvent.npc;
  const prev = state.npcMemory[npc.name] || { metBefore: false, lastAction: null, relationScore: 0 };
  state.npcMemory[npc.name] = {
    metBefore: true,
    lastAction: key,
    lastMood: npc.mood,
    relationScore: prev.relationScore + (outcome.rep > 0 ? 1 : outcome.rep < 0 ? -1 : 0),
  };

  document.querySelectorAll('.action-card').forEach(c => { c.classList.add('used'); c.onclick = null; });

  const bannerType = outcome.quality === 'good' ? 'good' : outcome.quality === 'bad' ? 'bad' : 'neutral';
  showOutcomeBanner(outcome.text, bannerType);
  addLog(`${ACTION_DEFS[key].icon} ${ACTION_DEFS[key].name}: ${outcome.text.substring(0, 65)}...`, bannerType);
  updateHUD();

  if (state.risk >= 100) { setTimeout(() => endGame('caught'), 2200); return; }
  if (state.rep <= 0)    { setTimeout(() => endGame('reputation'), 2200); return; }
  if (state.money <= 0 && state.turn > 4) { setTimeout(() => endGame('bankrupt'), 2200); return; }

  setTimeout(() => {
    state.turn++;
    loadNextEvent();
    updateHUD();
  }, 2600);
}

function showOutcomeBanner(text, type) {
  const banner = document.getElementById('outcome-banner');
  banner.textContent = text;
  banner.className = `outcome-banner ${type}`;
  banner.style.display = 'block';
}

// ── NPC / GEMINI AI ──────────────────────────────────────────────
function openNPCPanel() {
  const npc = state.currentEvent?.npc;
  if (!npc) return;

  document.getElementById('npc-avatar').textContent = npc.avatar;
  document.getElementById('npc-name').textContent = npc.name;
  document.getElementById('npc-role-tag').textContent = npc.role;
  document.getElementById('npc-panel').style.display = 'flex';

  if (state.chatHistory.length === 0) {
    getAIOpeningLine(npc, state.currentEvent, ROLES[state.role]);
  }
}

async function getAIOpeningLine(npc, evt, role) {
  const systemPrompt = buildNPCPrompt(npc, evt, role);
  const mem = state.npcMemory[npc.name];
  const memContext = mem && mem.metBefore
    ? `NOT: Oyuncu ile daha önce karşılaştın. O zaman ${mem.lastAction} yapmıştı. İlişki skoru: ${mem.relationScore}. Bu geçmişe hafifçe değin.`
    : '';
  const openingRequest = `Sahne: ${evt.location}. ${role.name} seninle karşı karşıya. ${memContext} Karakterine uygun, gerilimli ve özgün bir açılış cümlesi söyle. 1-2 cümle max.`;

  document.getElementById('ai-thinking').style.display = 'flex';
  try {
    const reply = await callGemini(systemPrompt, [{ role: 'user', parts: [{ text: openingRequest }] }]);
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
    ? `\nGEÇMİŞ: Oyuncu ile daha önce karşılaştın. Geçen sefer ${mem.lastAction} yapmıştı ve ilişki skoru ${mem.relationScore}. Bunu içselleştir.`
    : '';

  const moodLine = state.npcCurrentMood === 'hostile'
    ? '\nDİKKAT: Oyuncuya artık düşmanca yaklaşıyorsun. Sinirli, kısa cevaplar ver.'
    : state.npcCurrentMood === 'aggressive'
    ? '\nDİKKAT: Tehdit sınırına dayandın. Her an patlayabilirsin.'
    : '';

  return `Sen "${npc.name}" adlı bir karaktersin. Rolün: ${npc.role}.

KİŞİLİK: ${npc.backstory}
RUH HALİ: ${npc.mood}${moodLine}${memLine}

SAHNE: ${evt.text}
KARŞINDAKI: ${role.name} — ${role.bg}

KURALLAR:
1. Karakterine %100 sadık kal. Gerçekçi ve insan gibi konuş.
2. Her yanıt farklı, klişesiz, 2-4 cümle.
3. Türkçe. Tırnak işareti, parantez, açıklama YASAK.
4. Oyuncunun rolüne göre farklı tepki ver.
5. Zaman zaman bilgi sızdır, zaman zaman gizle.
6. Oyuncunun itibarı ${state.rep}/100 | para $${state.money} | risk ${state.risk}/100.
7. Baskı arttıkça gerçek karakterini ortaya çıkar.`;
}

async function callGemini(systemPrompt, contents) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents,
      generationConfig: { maxOutputTokens: 300, temperature: 1.0, topP: 0.95 }
    }),
  });
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
  const evt = state.currentEvent;
  const role = ROLES[state.role];

  state.chatHistory.push({ role: 'user', parts: [{ text }] });

  document.getElementById('ai-thinking').style.display = 'flex';
  document.getElementById('chat-input').disabled = true;

  try {
    const systemPrompt = buildNPCPrompt(npc, evt, role);
    const reply = await callGemini(systemPrompt, state.chatHistory);

    state.chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    addChatMessage('npc', reply);

    // Diyalog sonucu mood tırmanması
    const lower = text.toLowerCase();
    const replyLower = reply.toLowerCase();

    let repDelta = 0;
    let moodEscalated = false;

    if (lower.includes('tehdit') || lower.includes('öldür') || lower.includes('ezerim')) {
      if (state.npcCurrentMood === 'normal') state.npcCurrentMood = 'hostile';
      else if (state.npcCurrentMood === 'hostile') state.npcCurrentMood = 'aggressive';
      moodEscalated = true;
    }
    if (lower.includes('anlaştık') || lower.includes('yardım') || lower.includes('güven')) repDelta = +3;
    if (replyLower.includes('güvenmiyorum') || replyLower.includes('yalancı')) repDelta = -3;
    if (replyLower.includes('tamam') || replyLower.includes('anlıyorum') || replyLower.includes('doğru')) repDelta = +2;

    if (moodEscalated && state.npcCurrentMood === 'aggressive') {
      addChatMessage('system', '⚠️ NPC agresif hale geldi! Risk artıyor...');
      state.risk = Math.min(100, state.risk + 5);
    }

    if (repDelta) { state.rep = Math.max(0, Math.min(100, state.rep + repDelta)); updateHUD(); }

  } catch (e) {
    addChatMessage('system', '⚠️ Bağlantı hatası: ' + e.message);
  } finally {
    document.getElementById('ai-thinking').style.display = 'none';
    document.getElementById('chat-input').disabled = false;
    document.getElementById('chat-input').focus();
  }
}

// ── LOG ──────────────────────────────────────────────────────────
function addLog(text, type = '') {
  const log = document.getElementById('game-log');
  const entry = document.createElement('div');
  entry.className = `log-entry ${type}`;
  entry.textContent = text;
  log.appendChild(entry);
  log.scrollLeft = log.scrollWidth;
  while (log.children.length > 40) log.removeChild(log.firstChild);
}

// ── OYUN BİTİŞİ — 5 FARKLI SON ──────────────────────────────────
function endGame(reason) {
  const r = ROLES[state.role];
  let icon, title, desc, endClass = '';

  if (reason === 'caught') {
    icon = '🚨'; title = 'YAKALANDIN'; endClass = 'end-bad';
    desc = `Risk sınırı aşıldı. ${r.name} olarak iz bıraktın, şehir seni buldu. Hücre numarasını öğrenmek istiyor musun?`;
  } else if (reason === 'reputation') {
    icon = '💀'; title = 'İTİBAR SIFIR'; endClass = 'end-bad';
    desc = `Artık kimse sana güvenmiyor. ${r.name} kimliğin şehrin hafızasından silindi.`;
  } else if (reason === 'bankrupt') {
    icon = '💸'; title = 'İFLAS'; endClass = 'end-bad';
    desc = `Para bitti. ${r.name} olarak şehirde ayakta kalamazsın. Hayatta kalma savaşı kaybedildi.`;
  } else {
    // Alınan kararlara göre 3 farklı normal son
    const goodRatio = state.goodActions / Math.max(1, state.goodActions + state.badActions + state.neutralActions);
    const endingPath = r.endingPath;
    const score = Math.round(state.rep * 0.5 + state.money * 0.04 - state.risk * 0.4 + state.totalScore);

    if (state.goodActions >= state.badActions * 2 && state.rep >= 70) {
      // Kahraman sonu
      const endings = {
        justice: { icon:'⚖️', title:'ADALET SAĞLANDI', desc:`${r.name} olarak şehrin en karanlık köşelerini dolaştın ve her seferinde doğruyu seçtin. Şehir seni efsane olarak hatırlayacak.` },
        order:   { icon:'🏅', title:'DÜZENİN BEKÇİSİ', desc:`${r.name} kimliğinle sokakları temizledin. Şehir halkı seni gerçek kahraman olarak tanıyor.` },
        shadow:  { icon:'🌟', title:'GÖLGE KAHRAMAN', desc:`${r.name} olarak kendi kurallarını koydun. Kimse seni tam anlayamadı ama şehir daha güvenli.` },
        underworld: { icon:'👑', title:'YERİN ALTINDAKİ KRAL', desc:`${r.name} olarak şehrin karanlık tarafında bile bir düzen kurdun. İnsanlar senden çekiniyor ama saygı duyuyor.` },
        ghost:   { icon:'🕊️', title:'İZ BIRAKMA', desc:`${r.name} olarak her iki tarafı da dengelemeyi başardın. Kimse bilmiyor ama şehir daha iyi bir yer.` },
      };
      const e = endings[endingPath] || endings.justice;
      icon = e.icon; title = e.title; desc = e.desc; endClass = 'end-good';
    } else if (state.badActions > state.goodActions) {
      // Kötü son
      const dark = {
        justice: { icon:'🖤', title:'YOZLAŞMIŞ ADALET', desc:`${r.name} olarak aradığın şeyi buldun: kendi çıkarını. Şehir seni tanımaz ama sistemi tanıyor.` },
        order:   { icon:'🪖', title:'KABA KUVVET', desc:`${r.name} olarak kuralları çiğnedin. Düzen var, ama bedeli ağır.` },
        shadow:  { icon:'🐍', title:'GÖLGEDE KALAN', desc:`${r.name} olarak büyük vurgun yaptın. Ama arkanda ne kadar enkaz var?` },
        underworld: { icon:'☠️', title:'KARANLIĞIN EFENDİSİ', desc:`${r.name} kimliğinle şehrin en kirli işlerine bulandın. Güçlüsün, ama ne kadar sürer?` },
        ghost:   { icon:'🕷️', title:'HER İKİ TARAFA İHANET', desc:`${r.name} olarak kimseye gerçeği söylemedin. Şimdi ne polis güveniyor, ne de suç örgütü.` },
      };
      const e = dark[endingPath] || dark.justice;
      icon = e.icon; title = e.title; desc = e.desc; endClass = 'end-neutral';
    } else {
      // Karma son
      if (score > 60)       { icon = '⭐'; title = 'ŞEHRIN GÖZLEMCISI'; endClass = 'end-neutral'; }
      else if (score > 30)  { icon = '😐'; title = 'KARIŞIK SONUÇ'; endClass = 'end-neutral'; }
      else                  { icon = '🌫️'; title = 'GÖLGELERİN İÇİNDE'; endClass = 'end-neutral'; }
      desc = `${r.name} olarak ${state.maxTurns} tur boyunca şehrin iki yüzünü gördün. Doğru mu yanlış mı — şehir hâlâ karar veremedi.`;
    }
  }

  document.getElementById('end-icon').textContent = icon;
  document.getElementById('end-title').textContent = title;
  document.getElementById('end-desc').textContent = desc;
  document.getElementById('end-stats').innerHTML = `
    <div class="end-stat"><div class="end-stat-val">${state.rep}</div><div class="end-stat-label">İTİBAR</div></div>
    <div class="end-stat"><div class="end-stat-val">$${state.money}</div><div class="end-stat-label">PARA</div></div>
    <div class="end-stat"><div class="end-stat-val">${state.risk}</div><div class="end-stat-label">RİSK</div></div>
    <div class="end-stat"><div class="end-stat-val">${state.goodActions}</div><div class="end-stat-label">İYİ KARAR</div></div>
  `;

  const endContent = document.querySelector('.end-content');
  if (endContent) { endContent.className = `end-content ${endClass}`; }

  showScreen('screen-end');
}

function restartGame() { showScreen('screen-intro'); }
