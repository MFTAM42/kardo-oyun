// ═══════════════════════════════════════════════════════════════
// CIPHER: KARANLIK DOSYA — v4.0
// M. FURKAN TAM tarafından yapılmıştır
// Tek hikaye · 28 bölüm · Cinayet davası
// ═══════════════════════════════════════════════════════════════

const GEMINI_KEY = 'AIzaSyC6EWtl3NfAeje30-AWdvKiYt3qdK70kNY';

// ── TEK OYUNCU: DEDEKTİF ────────────────────────────────────────
// Artık rol seçimi yok — sen kıdemli dedektif Mert Aslan'sın.
const PLAYER = {
  name: 'Dedektif Mert Aslan',
  icon: '🕵️',
  bg: 'Vartan City\'nin en deneyimli dedektiflerinden birisin. 15 yıllık kariyer, çözülmemiş tek dava yok. Ta ki bu geceye kadar.',
};

// ── HİKAYE: "GECE YARISI KONTRATÖRÜ" ────────────────────────────
// Şehrin en büyük iş insanı Viktor Saran, villasında ölü bulundu.
// Resmi açıklama: kalp krizi. Ama kanıtlar farklı bir şey söylüyor.
// Sen bu davayı kapatmak için 28 bölümde gerçeği bulmalısın —
// ya da gömmek için 28 fırsat yakalarsın.

// ── DAVA DOSYASI: 28 sıralı sahne ────────────────────────────────
const CASE_CHAPTERS = [
  // ─── ACT I: İLK SAHNE (1-7) ───────────────────────────────────
  {
    chapter: 1,
    badge: 'DOSYA AÇILDI', location: '📍 Viktor Saran\'ın Villası', image: '🏚️',
    time: '02:34',
    story: 'Bölüm 1 — Ölüm Sahnesi',
    text: 'Saat 02:34. Telefon çaldı, uyandın. Viktor Saran — şehrin en büyük gayrimenkul imparatoru — villasında ölü bulunmuş. Resmi açıklama: kalp krizi. Ama seni bu saatte arayan şef, "görünce anlarsın" dedi. Villanın kapısında ayaktasın. Kapı aralık. İçeriden soğuk hava geliyor.',
    clue: null,
    npc: {
      name: 'Şef Komiseri Doğan', role: 'Üstün — bir şeyleri saklıyor', avatar: '👮',
      mood: 'gergin ve aceleci',
      backstory: 'Viktor Saran ile eski bağlantıları olan, bu davayı hızlıca kapatmak isteyen bir komisyon üyesi. Seni neden bu davaya atadığı belirsiz.',
    },
    actions: ['investigate', 'interrogate', 'observe', 'call_backup'],
    outcomes: {
      investigate:  { rep:+15, risk:+5,  money:0,    text: 'Odayı inceliyorsun. Bir şey dikkatini çekiyor: Viktor\'un masasında şarap kadehi — ama şarap içmezdi. Dosyanda bir not açtın.', clue: 'KADEH', quality: 'good' },
      interrogate:  { rep:+10, risk:+10, money:0,    text: 'Şef Doğan\'ı sıkıştırdın. "Aileden birinin burada olmasını istiyoruz" dedi ve göz kaçırdı. Bir şeyler biliyor.', clue: 'ŞEFIN_TAVRI', quality: 'good' },
      observe:      { rep:+8,  risk:0,   money:0,    text: 'Sessizce gözlemledin. Villanın güvenlik kamerası sökümlü — taze izler var. Bunu not ettin.', clue: 'KAMERA', quality: 'good' },
      call_backup:  { rep:+5,  risk:-5,  money:0,    text: 'Ekip geldi. Ama Şef Doğan herkesi dışarı gönderdi. "Bu dava hassas" dedi. Neden?', clue: null, quality: 'neutral' },
    }
  },
  {
    chapter: 2,
    badge: 'TIP RAPORu', location: '📍 Olay Yeri — Çalışma Odası', image: '📋',
    time: '03:10',
    story: 'Bölüm 2 — Otopsi Öncesi',
    text: 'Cenaze alındı ama çalışma odasında adli tıp ekibi hâlâ çalışıyor. Masanın altında ezilmiş bir kâğıt, çöp kutusunda yanmış not, şöminede taze kül. Biri buradaki her şeyi imha etmeye çalışmış. Ama aceleyle yapılmış — izler kalmış.',
    clue: 'YAKILAN_NOT',
    npc: {
      name: 'Dr. Cemile Arslan', role: 'Adli tıp uzmanı', avatar: '🔬',
      mood: 'profesyonel ama rahatsız',
      backstory: 'İşini çok iyi yapan, baskıya boyun eğmeyen bir doktor. Viktor\'un ölümündeki anormalliği fark etti ama raporu açıklamaktan çekiniyor.',
    },
    actions: ['investigate', 'interrogate', 'bribe', 'observe'],
    outcomes: {
      investigate:  { rep:+18, risk:+8,  money:0,    text: 'Ezilmiş kâğıdı düzelttik. Üzerinde bir adres: "Liman Cd. No:7, saat 00:00." Dün gecenin adresi mi?', clue: 'ADRESİ_BULDUN', quality: 'good' },
      interrogate:  { rep:+14, risk:+12, money:0,    text: 'Dr. Cemile fısıldadı: "Kalp krizi değil. Potasyum klorür. Ama raporu değiştirmemi istiyorlar." Kim istiyor?', clue: 'ZEHİR', quality: 'good' },
      bribe:        { rep:-10, risk:-5,  money:-200, text: 'Dr. Cemile parayı reddetti. "Ben bu işi para için yapmıyorum." Güvenini kaybettin.', clue: null, quality: 'bad' },
      observe:      { rep:+10, risk:+5,  money:0,    text: 'Şöminedeki külü inceliyorsun. Küçük bir metal klips kaldı — Vartan Hukuk Bürosu\'nun evrak klipsi.', clue: 'KLİPS', quality: 'good' },
    }
  },
  {
    chapter: 3,
    badge: 'TANIK', location: '📍 Villa Bahçesi', image: '🌿',
    time: '03:45',
    story: 'Bölüm 3 — Gece Bekçisi',
    text: 'Villanın gece bekçisi Hamza, bahçe kulübesinde bekliyor. Çağırılmayı bekliyormuş gibi hazır oturuyor. Gözleri yorgun ama bakışları zinde. Bu adam bu geceyle ilgili bir şeyler gördü — belki de çok şey.',
    clue: null,
    npc: {
      name: 'Hamza Demir', role: 'Gece bekçisi — 8 yıldır', avatar: '🔦',
      mood: 'korkmuş ama anlatmak istiyor',
      backstory: '8 yıldır bu villada çalışıyor. Viktor\'u iyi tanırdı. Dün gece garip bir araba gördü — kimseye söylememesini tembihlediler. Ama vicdan ağır basmaya başlıyor.',
    },
    actions: ['interrogate', 'negotiate', 'investigate', 'observe'],
    outcomes: {
      interrogate:  { rep:+16, risk:+10, money:0,    text: 'Hamza anlatmaya başladı: "Gece 23:50\'de siyah araba geldi. İçinde iki kişi. Birini tanıdım — Viktor\'un avukatı." İsim aldın.', clue: 'AVUKAT', quality: 'good' },
      negotiate:    { rep:+12, risk:+5,  money:-100, text: 'Hamza\'ya güvence verdin. "Av. Kerem Işık. Saran\'ın tüm işlerini yürütüyor. Ve o gece içeri girdi." Kritik bilgi.', clue: 'AVUKAT', quality: 'good' },
      investigate:  { rep:+10, risk:+8,  money:0,    text: 'Kulübede gizlenmiş eski bir defter buldun. Viktor\'un not defteri — içi rakamlar ve kodlarla dolu.', clue: 'DEFTER', quality: 'good' },
      observe:      { rep:+6,  risk:+5,  money:0,    text: 'Hamza\'nın ellerini gözlemledin — titriyor. Bu korku ölümden sonra gelmedi. Ölümden önce başladı.', clue: 'HAMZANIN_KORKUSU', quality: 'neutral' },
    }
  },
  {
    chapter: 4,
    badge: 'GEÇMİŞ', location: '📍 Viktor\'un Ofisi — Şehir Merkezi', image: '🏢',
    time: '09:15',
    story: 'Bölüm 4 — Sabahın İlk Işığında',
    text: 'Sabah oldu. Viktor\'un ofisine geldin. Sekreteri Nisan seni bekliyor — gözleri şişmiş ama elleri masayı toplayan tuhaf bir robotik hareketle devam ediyor işine. Ofis çoktan temizlenmiş gibi steril. Viktor\'un masasında hiçbir şey yok. Sadece bir çerçeveli fotoğraf kaldı.',
    clue: null,
    npc: {
      name: 'Nisan Çelik', role: 'Viktor\'un kişisel sekreteri — 12 yıl', avatar: '👩‍💼',
      mood: 'soğuk ve savunmacı',
      backstory: '12 yıldır Viktor\'un her sırrına tanıklık etti. Viktor\'u belki de herkesten iyi tanıyordu. Ve Viktor\'un ölümünden birkaç saat önce birlikte tartıştıklarını kimse bilmiyor.',
    },
    actions: ['interrogate', 'investigate', 'negotiate', 'observe'],
    outcomes: {
      interrogate:  { rep:+14, risk:+12, money:0,    text: '"Dün öğleden sonra Viktor çok gergin geldi. Bir zarf bıraktı: ‘Eğer bir şey olursa Aslan\'a ver’ dedi. Seni kastetmiş." Zarf nerede?', clue: 'ZARF_VAR', quality: 'good' },
      investigate:  { rep:+16, risk:+8,  money:0,    text: 'Çöp kutusunda imha edilmemiş bir e-posta çıktısı. Gönderen: anonim@cipher.net. "Bu gece ya imzalarsın ya da dosya açılır." Tehdit mi?', clue: 'TEHDIT_EPOSTASI', quality: 'good' },
      negotiate:    { rep:+10, risk:+5,  money:0,    text: 'Nisan güvendi: "Viktor son 3 aydır Meclis Üyesi Kaplan\'la görüşüyordu. Ve her görüşmeden sonra çok korkuyordu."', clue: 'MECLİS_ÜYESİ', quality: 'good' },
      observe:      { rep:+8,  risk:0,   money:0,    text: 'Fotoğrafa baktın — Viktor ve genç bir kadın, liman kenarında. Arkada yat. Tarihi 3 ay önce.', clue: 'FOTOĞRAF', quality: 'neutral' },
    }
  },
  {
    chapter: 5,
    badge: 'ŞÜPHELI', location: '📍 Vartan Hukuk Bürosu', image: '⚖️',
    time: '11:00',
    story: 'Bölüm 5 — Avukat',
    text: 'Av. Kerem Işık seni şimdiden bekliyor gibi masasında oturuyor. Gülümsüyor — o soğuk, hesaplı avukat gülüşü. "Dedektif Aslan, Viktor\'un ölümü hepimizi üzdü" diyor. Dün gece villada olduğunu biliyor musun biliyor musun diye merak ediyorsun.',
    clue: null,
    npc: {
      name: 'Av. Kerem Işık', role: 'Viktor\'un baş avukatı', avatar: '🧑‍⚖️',
      mood: 'soğuk, kontrollü, tehlikeli',
      backstory: 'Viktor\'un tüm kirli işlerini temizleyen avukat. Şirketteki tüm ortaklıkları, offshore hesapları, kara para düzenlerini biliyor. Ve şimdi Viktor\'un vasiyetini o yönetiyor.',
    },
    actions: ['interrogate', 'investigate', 'negotiate', 'bluff'],
    outcomes: {
      interrogate:  { rep:+12, risk:+20, money:0,    text: '"Dün gece burada değildim." Yalan söylüyor. Hamza\'nın ifadesini yüzüne vurdun. Rengi attı — ama toparladı. "Avukatım." dedi.', clue: 'KEREM_YALANI', quality: 'good' },
      investigate:  { rep:+18, risk:+15, money:0,    text: 'Bürodaki evrak listesine bakma iznini zorla aldın. Viktor adına son 30 gün içinde 3 adet imza yetkisi devredilmiş — kime?', clue: 'İMZA_DEVRİ', quality: 'good' },
      negotiate:    { rep:+6,  risk:+8,  money:0,    text: '"Viktor\'un vasiyeti bende. Açıklama zamanı ben belirlerim." Dedi ve konuşmayı kesti. Bir şeyleri saklıyor.', clue: 'VASİYET', quality: 'neutral' },
      bluff:        { rep:+20, risk:+18, money:0,    text: '"Dün gece yazdığın mesajları elimde" dedin. Yalanın işe yaradı — "Ne mesajları?" dedi ve durdu. Bir mesaj var.', clue: 'KEREM_MESAJLARI', quality: 'good' },
    }
  },
  {
    chapter: 6,
    badge: 'GİZEM', location: '📍 Liman Caddesi No:7', image: '🚢',
    time: '14:00',
    story: 'Bölüm 6 — Adresteki Depo',
    text: 'Ezilmiş kâğıttaki adres: Liman Cd. No:7. Burası ıssız bir depo — kapı kilitli ama kilit yeni. Kilitler taze kırılmış gibi. Pencereden içeri bakıyorsun: paketler, kasalar, ve bir köşede dün gece orada biri olmuş gibi görünen izler.',
    clue: 'ADRESİ_BULDUN',
    npc: {
      name: 'Liman Muhbiri "Çakır"', role: 'Serbest bilgi satıcısı', avatar: '🎣',
      mood: 'fırsatçı ve dikkatli',
      backstory: 'Limanda onlarca yıldır her şeyi gören, bilgi satan biri. Viktor\'un bu depoyu kullandığını biliyor. Ve dün gece burada neler olduğunu da.',
    },
    actions: ['investigate', 'negotiate', 'bribe', 'infiltrate'],
    outcomes: {
      investigate:  { rep:+20, risk:+12, money:0,    text: 'Depoda kasaların altında gizli bir bölme: içinde 3 pasaport, nakit döviz ve bir USB bellek. Viktor burayı kaçış için mi hazırlamıştı?', clue: 'USB_BELLEK', quality: 'good' },
      negotiate:    { rep:+14, risk:+8,  money:0,    text: 'Çakır anlattı: "Dün gece siyah araba geldi. Birisi paketleri aldı. Birisi bıraktı. Ve birisi aramak istedi ama bulamadı."', clue: 'DEPODAKİ_ADAM', quality: 'good' },
      bribe:        { rep:-5,  risk:+5,  money:-300, text: 'Çakır parayı aldı: "Gece burada Meclis Üyesi Kaplan\'ın adamları vardı." İsim doğrulandı.', clue: 'MECLİS_ÜYESİ', quality: 'neutral' },
      infiltrate:   { rep:+10, risk:+25, money:+200, text: 'Depoya sızdın. İçeride biri vardı — kaçtı. Geride bir cüzdan düşürdü.', clue: 'CÜZDAN', quality: 'neutral' },
    }
  },
  {
    chapter: 7,
    badge: 'TEHDİT', location: '📍 Kendi Ofisin', image: '📞',
    time: '16:30',
    story: 'Bölüm 7 — Uyarı',
    text: 'Ofisine döndün. Masanda bir zarf var — kimse görmemiş nasıl geldiğini. İçinde tek bir cümle: "Aslan, bu dosyayı kapat. Yoksa dosyan seni kapatır." Altında imza yok. Telefon çalıyor.',
    clue: null,
    npc: {
      name: 'Anonim Ses', role: 'Kim olduğu bilinmiyor', avatar: '📵',
      mood: 'soğuk ve emin',
      backstory: 'Bu ses Viktor\'un ölümüyle bağlantılı birisinden geliyor. Senin dosyandaki kanıtları biliyor demek ki içeride birisi var.',
    },
    actions: ['investigate', 'negotiate', 'bluff', 'call_backup'],
    outcomes: {
      investigate:  { rep:+12, risk:+15, money:0,    text: 'Zarfın parmak izini aldırdın — silinmiş. Ama kâğıt türü Vartan Belediyesi antetli kâğıdı. Belediyenin içinden biri.', clue: 'BELEDİYE_BAĞI', quality: 'good' },
      negotiate:    { rep:+8,  risk:+10, money:0,    text: 'Telefonu cevapladın: "Kim olduğunu biliyorum" dedin. Karşı taraf duraksadı. "Hayır bilmiyorsun. Henüz." dedi ve kapattı.', clue: 'SES_İZİ', quality: 'neutral' },
      bluff:        { rep:+16, risk:+20, money:0,    text: '"Viktor\'un USB\'si elimde" dedin. Uzun sessizlik. "O USB\'de ne olduğunu bilmiyorsun. Ama öğrenirsen dön." İlk gerçek tepki.', clue: 'USB_ÖNEMİ', quality: 'good' },
      call_backup:  { rep:+6,  risk:-10, money:0,    text: 'Güvendiğin bir meslektaşı aradın. "Bu dava büyük, Mert. Dikkatli ol. Kaplan\'ın eli her yerde." dedi.', clue: 'KAPLAN_UYARISI', quality: 'good' },
    }
  },

  // ─── ACT II: KARANLIK DERINLEŞIYOR (8-14) ────────────────────
  {
    chapter: 8,
    badge: 'GEÇMİŞ', location: '📍 Vartan Belediyesi — Arşiv', image: '🗃️',
    time: '18:00',
    story: 'Bölüm 8 — Geçmişte Saklanmış',
    text: 'Belediye arşivine girdin. Viktor\'un son 5 yılda imzaladığı inşaat projeleri. Hepsi onaylı, hepsi temiz görünüyor. Ama bir şey gözüne çarpıyor: her projenin tek bir ortak imzası var — Meclis Üyesi Rüştü Kaplan. Ve bu projelerden sonra Kaplan\'ın serveti kayıtlara göre 3 kat artmış.',
    clue: 'MECLİS_ÜYESİ',
    npc: {
      name: 'Arşiv Memuru Fatma', role: 'Arşivci — 20 yıllık', avatar: '📚',
      mood: 'meraklı ve korkmuş',
      backstory: 'Her dosyayı bilen yaşlı bir memur. Kaplan\'ın baskısıyla bazı dosyaların imha edildiğini fark etti ama sessiz kaldı. Belki bugün konuşur.',
    },
    actions: ['interrogate', 'investigate', 'negotiate', 'observe'],
    outcomes: {
      interrogate:  { rep:+18, risk:+15, money:0,    text: 'Fatma fısıldadı: "6 ay önce bir dosya geldi — imza Kaplan\'dan. İçindekiler yerine şeffaf kâğıt konulmuştu. Dosyalar değiştirildi."', clue: 'DOSYA_DEĞİŞTİ', quality: 'good' },
      investigate:  { rep:+22, risk:+12, money:0,    text: '2019 tarihli tek bir proje dosyası eksik. Sadece numarası var: PRJ-2019-0047. Bu proje nerede?', clue: 'EKSİK_PROJE', quality: 'good' },
      negotiate:    { rep:+14, risk:+8,  money:0,    text: '"PRJ-2019-0047. O dosyayı soran ilk sen değilsin. Geçen ay Viktor\'un ofisinden biri de sordu." Kim sormuş?', clue: 'PROJE_SORUŞTURMASI', quality: 'good' },
      observe:      { rep:+8,  risk:+5,  money:0,    text: 'Kaplan\'ın imzalarını inceliyorsun. 2021 sonrası tüm imzalar aynı — ama 2019 öncesiyle el yazısı farklı. Sahte imza?', clue: 'SAHTE_İMZA', quality: 'good' },
    }
  },
  {
    chapter: 9,
    badge: 'ŞÜPHELI', location: '📍 Meclis Üyesi Kaplan\'ın Makamı', image: '🏛️',
    time: '10:00',
    story: 'Bölüm 9 — Güçlü Düşman',
    text: 'Meclis Üyesi Rüştü Kaplan seni makamında kabul etti. Arkasında şehrin tablosu asılı. Güçlü, rahat, hiç panik yok. "Genç dedektifler bazen büyük resmi göremez" diyor. "Viktor benim dostumdur. Ölümü beni de üzdü." Sen şüphelen.',
    clue: null,
    npc: {
      name: 'Meclis Üyesi Rüştü Kaplan', role: 'Güçlü siyasetçi — muhtemel fail', avatar: '🤵',
      mood: 'tehditkâr ama kibar',
      backstory: '25 yıllık siyasi kariyeri var. Viktor\'la kara para ortaklığı kurmuş, ama son dönemde Viktor onu şantaj yapmaya başlamış. Cinayeti planlamış olabilir — ya da planlatmış.',
    },
    actions: ['interrogate', 'bluff', 'investigate', 'negotiate'],
    outcomes: {
      interrogate:  { rep:+10, risk:+25, money:0,    text: '"Dün gece neredeydiniz?" "Evimde, ailemin yanında." Alibi sorgulanabilir. "Bu sorguyu resmen sormak istiyorsanız avukatımı arayın." İlk duvar.', clue: 'KAPLAN_ALİBİ', quality: 'neutral' },
      bluff:        { rep:+22, risk:+30, money:0,    text: '"PRJ-2019-0047\'yi biliyorum" dedin. Kaplan\'ın yüzündeki kaslar gerildi — sadece bir an. "O dosya yok oldu" dedi. Ama sen gördün o gerilmeyi.', clue: 'KAPLAN_TEPKİSİ', quality: 'good' },
      investigate:  { rep:+16, risk:+18, money:0,    text: 'Makamında bir şey dikkatini çekti: masanın üstündeki takvimde dün gece saat 23:00 için silinmiş bir not. "V.S." yazıyor.', clue: 'TAKVİM_NOTU', quality: 'good' },
      negotiate:    { rep:+8,  risk:+10, money:0,    text: 'Kaplan yumuşadı: "Viktor duygusal kararlar vermeye başlamıştı. Bu işlere böyle insanlar lazım değil." Nefret mi, suçluluk mu?', clue: 'KAPLAN_DUYGUSU', quality: 'neutral' },
    }
  },
  {
    chapter: 10,
    badge: 'ANAHTAR', location: '📍 USB Bellek Analizi', image: '💾',
    time: '13:00',
    story: 'Bölüm 10 — Dijital Sır',
    text: 'Depoda bulunan USB belleği siber suç birimine götürdün. Şifreli. Ama şifreleme algoritması tanıdık — Vartan Belediyesi\'nin kullandığı standart. Ve içinde ne olduğunu merak ederken kapı çalındı.',
    clue: 'USB_BELLEK',
    npc: {
      name: 'Siber Uzman "Pixel"', role: 'Freelance hacker — güvenilir', avatar: '💻',
      mood: 'meraklı ve heyecanlı',
      backstory: 'Devlet için zaman zaman çalışan, bağımsız siber güvenlik uzmanı. Bu USB\'nin ne olduğunu görünce "Bu büyük bir şey" dedi.',
    },
    actions: ['investigate', 'negotiate', 'infiltrate', 'call_backup'],
    outcomes: {
      investigate:  { rep:+20, risk:+15, money:0,    text: 'USB açıldı: 47 proje dosyası, 200\'den fazla ses kaydı ve bir video. Video açılınca gördüğün şey ellerini titretti.', clue: 'VİDEO_BULGU', quality: 'good' },
      negotiate:    { rep:+16, risk:+10, money:0,    text: 'Pixel USB\'yi çözdü: "İçinde belediyenin kara para akış kayıtları var. Viktor bunları biriktirmiş — belki şantaj için, belki korunma için."', clue: 'KARA_PARA_KAYITLARI', quality: 'good' },
      infiltrate:   { rep:+12, risk:+20, money:0,    text: 'Kendi yöntemlerinle USB\'ye girdin. İçinde şifreli mesajlaşma geçmişi: Viktor ve "X" arasında. X kimdir?', clue: 'X_KİMLİĞİ', quality: 'good' },
      call_backup:  { rep:+8,  risk:-5,  money:0,    text: 'Dijital suç birimi geldi. USB el konuldu. Ama bir kopyasını almayı unutmadın.', clue: 'KOPYA_USB', quality: 'neutral' },
    }
  },
  {
    chapter: 11,
    badge: 'TANIK', location: '📍 Fotoğraftaki Kadın', image: '📸',
    time: '15:30',
    story: 'Bölüm 11 — Yat Sahibi',
    text: 'Viktor\'un masasındaki fotoğraftaki kadın: Selin Yıldız. Vartan City\'nin genç iş dünyasından bir isim. Seninle görüşmeyi kabul etti — aceleyle. Gözlerinin altında mor halkalar var, ağlamış olmalı. "Viktor\'la ilişkimiz sadece iş ortaklığıydı" dedi daha sormadan.',
    clue: 'FOTOĞRAF',
    npc: {
      name: 'Selin Yıldız', role: 'Viktor\'un gizli iş ortağı', avatar: '👩‍💼',
      mood: 'savunmacı ve korkmuş',
      backstory: 'Viktor\'un gizli bir projesinde partner. O yattaki toplantılarda kara para akışının belgelenmesine tanıklık etti. Şimdi hem tanık hem hedef.',
    },
    actions: ['interrogate', 'negotiate', 'observe', 'investigate'],
    outcomes: {
      interrogate:  { rep:+18, risk:+12, money:0,    text: '"Viktor beni o toplantıya zorla götürdü. Kaplan ve bir başkası vardı. Hesaplar aktarılıyordu. Ben sadece orada olmak zorunda kaldım."', clue: 'TOPLANTI_TANIKI', quality: 'good' },
      negotiate:    { rep:+22, risk:+8,  money:0,    text: 'Güven verdin. Selin anlattı: "Viktor son haftada çok korkmuştu. Bana dedi: \'Eğer bir şey olursa Dedektif Aslan\'ı ara.\'" Seni tanıyordu.', clue: 'VIKTOR_SANA_GÜVENDI', quality: 'good' },
      observe:      { rep:+10, risk:+6,  money:0,    text: 'Selin\'in çantasında yeni bir telefon — eski telefonunu değiştirmiş. Neden? "Biri dinliyor olabilir" dedi.', clue: 'DİNLEME', quality: 'neutral' },
      investigate:  { rep:+14, risk:+15, money:0,    text: '"O yatta bir kayıt cihazı vardı. Viktor her şeyi kayıt altına alıyordu. O kayıtlar nerede şimdi?"', clue: 'YAT_KAYDI', quality: 'good' },
    }
  },
  {
    chapter: 12,
    badge: 'ÇATIŞMA', location: '📍 Şef Doğan\'ın Ofisi', image: '🚔',
    time: '17:00',
    story: 'Bölüm 12 — İçerideki Düşman',
    text: 'Şef Doğan seni çağırdı. Kapıyı kapattı. "Aslan, bu davada çok ileri gittin. Kaplan\'ın ofisine gitmen bir şikayet doğurdu. Dava resmi olarak kalp krizi olarak kapandı." Masasında imzalanmış bir dosya var: KAPAT — ÖL. İkisi arasında bir çizgi var.',
    clue: null,
    npc: {
      name: 'Şef Komiseri Doğan', role: 'Üstün — artık açık düşman', avatar: '👮',
      mood: 'sert ve tehditkâr',
      backstory: 'Kaplan\'ın adamı olduğu anlaşıldı. Viktor\'un ölümünü örtbas etmesi için talimat almış. Ama Mert\'in bulduklarını görmeden bu işi kapatamaz.',
    },
    actions: ['bluff', 'negotiate', 'investigate', 'call_backup'],
    outcomes: {
      bluff:        { rep:+20, risk:+25, money:0,    text: '"Video\'yu izledim. Seni de gördüm orada" dedin. Doğan soluk kesti. "Hangi video?" "Biliyorsun hangisi." İlk kırılma.', clue: 'DOĞAN_VİDEODA', quality: 'good' },
      negotiate:    { rep:+10, risk:+15, money:0,    text: '"Dosyayı kapatmam için ne gerekiyor?" Doğan düşündü: "Her şeyi bırak ve git." Reddediyorsun.', clue: null, quality: 'neutral' },
      investigate:  { rep:+16, risk:+18, money:0,    text: 'Doğan\'ın masasında imzalanmayı bekleyen kâğıtlar: Viktor\'un ölüm raporu + Selin Yıldız için "tehdit" dosyası. İkisini de fotoğrafladın.', clue: 'DOĞAN_BELGELERİ', quality: 'good' },
      call_backup:  { rep:+12, risk:-8,  money:0,    text: 'Güvendiğin üst amiri aradın — Doğan\'ı atla geçerek. "Bu konuştuğunu bileceğim, Aslan" dedi Doğan. Tehdit.', clue: 'ÜST_AMİR', quality: 'good' },
    }
  },
  {
    chapter: 13,
    badge: 'KRIZ', location: '📍 Hamza\'nın Evi', image: '🏠',
    time: '20:00',
    story: 'Bölüm 13 — Tanık Tehlikede',
    text: 'Hamza seni aradı: "Dedektif bey, biri beni takip ediyor. Bugün kapımı çaldılar. Söylediğim için pişman değilim ama korktum." Sesinde titreme var. Bu adam senin en önemli tanığın — ve şimdi hedef.',
    clue: null,
    npc: {
      name: 'Hamza Demir', role: 'Tanık — tehlike altında', avatar: '🔦',
      mood: 'panikleyen',
      backstory: 'Dün anlattıkları onun için çok büyük bir risk. Artık tanık koruma altına alınması şart.',
    },
    actions: ['call_backup', 'investigate', 'negotiate', 'observe'],
    outcomes: {
      call_backup:  { rep:+18, risk:-10, money:0,    text: 'Hamza tanık koruma altına alındı. Ama taşınmadan önce son bir bilgi verdi: "O gece arabadan inen ikinci kişi — sarı kravatlıydı. Kaplan hep sarı kravat takar."', clue: 'SARI_KRAVAT', quality: 'good' },
      investigate:  { rep:+14, risk:+10, money:0,    text: 'Hamza\'nın evini inceliyorsun — kapı önünde sigara izmariti. Marka: Özel İtalyan sigarası. Sadece belirli bir çevrenin içtiği.', clue: 'SİGARA_İZİ', quality: 'good' },
      negotiate:    { rep:+16, risk:+5,  money:0,    text: 'Hamza\'ya güvence verdin. "Bir şey daha var dedektif. O gece arabadan biri çıktı ve şunu söyledi: ‘Viktor son nefesini verdi mi?’ Türkçe değildi ama anladım."', clue: 'YABANCI_SES', quality: 'good' },
      observe:      { rep:+8,  risk:+8,  money:0,    text: 'Sokağa baktın — gerçekten takip var. Gri Honda, plakalı 06-ALP serisi. Devlet aracı mı?', clue: 'TAKİP_ARACI', quality: 'neutral' },
    }
  },
  {
    chapter: 14,
    badge: 'SÜRPRIZ', location: '📍 Viktor\'un Özel Kasası — Banka', image: '🏦',
    time: '10:00',
    story: 'Bölüm 14 — Vasiyetin İçinde',
    text: 'Viktor\'un vasiyetinde özel bir madde var: "Eğer doğal olmayan bir ölüm gerçekleşirse, kasam Dedektif Mert Aslan\'a açılacak." Banka yöneticisi seni bekliyordu. Av. Kerem Işık da oraya geliyor — senden önce gelip engellemeye çalışıyor.',
    clue: 'VASİYET',
    npc: {
      name: 'Banka Yöneticisi Orhan', role: 'Hukuki süreç yöneticisi', avatar: '🏦',
      mood: 'kararsız ve baskı altında',
      backstory: 'Hem yasaları uygulamak hem de güçlülerin baskısından korunmak arasında sıkışmış bir yönetici.',
    },
    actions: ['investigate', 'bluff', 'negotiate', 'call_backup'],
    outcomes: {
      investigate:  { rep:+24, risk:+20, money:0,    text: 'Kasayı açtırdın. İçinde: tüm kara para belgelerinin orijinali, Kaplan\'la yapılan sözleşmeler ve... Viktor\'un el yazısıyla bir itiraf mektubu. Her şey orada.', clue: 'KASA_BELGELERİ', quality: 'good' },
      bluff:        { rep:+18, risk:+15, money:0,    text: '"Kerem Işık\'ın yetkisi bu dava için iptal edildi" dedin. Banka yöneticisi yasal dayanağı istedi. Ama Işık çekildi — çok hızlı çekildi. Neden?', clue: 'KEREM_ÇEKİLDİ', quality: 'good' },
      negotiate:    { rep:+14, risk:+10, money:0,    text: 'Orhan saatlerce direnidi. Sonunda: "Viktor bu kasayı 3 ay önce güncelledi. Ve seni bu vasiyete ekledi. Sizi tanıyordu."', clue: 'VIKTOR_PLANI', quality: 'good' },
      call_backup:  { rep:+10, risk:-5,  money:0,    text: 'Savcı eşliğinde geldin. Kasa yasal olarak açıldı. Işık içeriye giremedi. Belgeler güvende.', clue: 'KASA_BELGELERİ', quality: 'good' },
    }
  },

  // ─── ACT III: GERÇEK ORTAYA ÇIKIYOR (15-21) ──────────────────
  {
    chapter: 15,
    badge: 'KARA PARA', location: '📍 Mali Suç Birimi', image: '💰',
    time: '13:30',
    story: 'Bölüm 15 — Para İzleri',
    text: 'Kasa belgelerini mali suç birimine getirdin. Uzman Şerife hesapları inceliyor. Rakamlar şehri sarsar nitelikte. Ama bir şeyin farkındasın: bu belgeleri kim biliyorsa, Viktor\'u neden öldürmek istesin? Ya da tam tersine — neden saklamak istesin?',
    clue: 'KARA_PARA_KAYITLARI',
    npc: {
      name: 'Uzman Şerife Kaya', role: 'Mali suç uzmanı', avatar: '📊',
      mood: 'şaşkın ve kararlı',
      backstory: '5 yıldır kara para davalarını takip ediyor. Bu belgelerin büyüklüğü karşısında bile sakin kalmayı biliyor. Ama bugün eli titriyor.',
    },
    actions: ['investigate', 'interrogate', 'negotiate', 'observe'],
    outcomes: {
      investigate:  { rep:+20, risk:+12, money:0,    text: '"Bu belgeler gösteriyor ki Viktor, Kaplan\'a şantaj yapıyordu. 3 aydır aylık ödeme alıyordu. Ama son ödeme gelmemiş — tam cinayetten 2 gün önce."', clue: 'ŞANTAJ_DÜŞÜRDÜ', quality: 'good' },
      interrogate:  { rep:+16, risk:+8,  money:0,    text: '"Para bir ara hesapta duruyor. Hesap sahibi: Vartan Belediyesi Sosyal Yardım Vakfı. Kaplan\'ın kurumu."', clue: 'VAKIF_BAĞI', quality: 'good' },
      negotiate:    { rep:+14, risk:+10, money:0,    text: 'Şerife: "Ama bak şuna — Viktor\'un da temiz olmadığı açık. Bu para trafiğine ortak olmuş. Kurban mı, suç ortağı mı?"', clue: 'VİKTOR_DE_SUÇLU', quality: 'good' },
      observe:      { rep:+10, risk:+5,  money:0,    text: 'Şerife\'nin ekranındaki rakamları incelerken bir şeye takıldın: son transferler şehir dışına değil, bir yurt içi hesaba. Kimin?', clue: 'YURTİÇİ_HESAP', quality: 'neutral' },
    }
  },
  {
    chapter: 16,
    badge: 'VİDEO', location: '📍 Dijital Suç Birimi', image: '🎬',
    time: '15:00',
    story: 'Bölüm 16 — Görüntüler Yalan Söylemez',
    text: 'USB\'deki video çözüldü. Ekranda yatın salonu görünüyor. Masa etrafında 4 kişi: Viktor, Kaplan, Kerem Işık ve tanımadığın biri — yüzü kameraya dönmüyor. Ama konuşmalar net.',
    clue: 'VİDEO_BULGU',
    npc: {
      name: 'Siber Uzman "Pixel"', role: 'Görüntü analisti', avatar: '💻',
      mood: 'heyecanlı ve ciddi',
      backstory: 'Videoyu analiz ederken dördüncü kişinin yüzünü yakalamaya çalışıyor.',
    },
    actions: ['investigate', 'interrogate', 'observe', 'call_backup'],
    outcomes: {
      investigate:  { rep:+22, risk:+18, money:0,    text: 'Video diyaloğu: "Viktor, imzalamazsan bu biter." "Hayır bitmez, benim elimde her şey var." 3 gün sonra Viktor ölü bulundu.', clue: 'VİDEO_DİYALOĞU', quality: 'good' },
      interrogate:  { rep:+18, risk:+15, money:0,    text: 'Pixel 4. kişinin yüzünü yakaladı: yansıma üzerinden. "Tanıyor musun bunu?" diye sordu. Tanıyorsun — ama inanamıyorsun.', clue: 'DÖRDÜNCÜ_KİŞİ', quality: 'good' },
      observe:      { rep:+14, risk:+10, money:0,    text: 'Videonun arka planında bir ayrıntı: duvardaki tablo — aynısını Şef Doğan\'ın ofisinde gördün. Bu yat kime ait?', clue: 'YAT_SAHİBİ', quality: 'good' },
      call_backup:  { rep:+10, risk:-5,  money:0,    text: 'Savcılığa bildirdin. Video resmi delil sayıldı. Ama sabah sistemden silinmeye çalışılmış — kopyaları sakladın.', clue: 'VİDEO_KOPYASI', quality: 'neutral' },
    }
  },
  {
    chapter: 17,
    badge: 'ŞÜPHELI', location: '📍 Dördüncü Kişi — Kimlik Tespiti', image: '🔍',
    time: '18:00',
    story: 'Bölüm 17 — Son Parça',
    text: 'Pixel\'in yüz tespiti tamamlandı. Dördüncü kişi: Emekli General Rıfkı Demirtaş. Devletle bağlantıları olan, şu an özel güvenlik şirketi yöneten biri. Ve Viktor\'un şirketinin en büyük sigorta müşterisi. Bu üçlü bir yapı: siyaset, hukuk, güvenlik.',
    clue: 'DÖRDÜNCÜ_KİŞİ',
    npc: {
      name: 'Emekli General Rıfkı Demirtaş', role: 'Ağın üçüncü ayağı', avatar: '🎖️',
      mood: 'küçümseyici ve güçlü',
      backstory: 'Devlet bağlantılarını ticarete çevirmiş emekli general. Viktor\'un ölümünü organize edenin o olduğuna dair güçlü şüpheler var.',
    },
    actions: ['bluff', 'interrogate', 'investigate', 'negotiate'],
    outcomes: {
      bluff:        { rep:+24, risk:+35, money:0,    text: '"General, videonuzu savcılığa ilettim" dedin. İlk kez gülümsemesi kayboldu. "Sen büyük bir hata yaptın, oğlum." Bu bir tehdit.', clue: 'GENERAL_TEHDİT', quality: 'good' },
      interrogate:  { rep:+18, risk:+28, money:0,    text: 'Genel resmi inkar. Ama bir noktada: "Viktor sözünde durmadı" dedi — sonra durdu. Sözünde durmadı derken ne kastediyordu?', clue: 'SÖZE_İHANET', quality: 'good' },
      investigate:  { rep:+20, risk:+20, money:0,    text: 'Demirtaş\'ın şirketini araştırdın. Viktor\'un ölümünden 3 gün önce şirket büyük bir devlet ihalesi aldı. Neden tam o zaman?', clue: 'İHALE_BAĞI', quality: 'good' },
      negotiate:    { rep:+10, risk:+15, money:0,    text: '"Bana ne verirsen bu dosyayı kaparım" dedin. General güldü: "Her şeyi veririm. Ama önce ne istediğini söyle." Test ediyordu seni.', clue: null, quality: 'neutral' },
    }
  },
  {
    chapter: 18,
    badge: 'KRİTİK', location: '📍 Selin\'in Sakladığı Kayıt', image: '🎙️',
    time: '20:30',
    story: 'Bölüm 18 — Gizli Kayıt',
    text: 'Selin seni aradı: "Viktor bana bir ses kaydı bıraktı. Ölümünden 3 gün önce. ‘Eğer bir şey olursa Aslan\'a ver, ama sadece gerçeği bildiğinde ver’ dedi." Ve "gerçeği bildiğini" düşünüyor. Kayıtı dinlemeye hazır mısın?',
    clue: 'YAT_KAYDI',
    npc: {
      name: 'Selin Yıldız', role: 'Son tanık', avatar: '👩‍💼',
      mood: 'kararlı ve üzgün',
      backstory: 'Viktor\'un ona bu kaydı emanet etmesi, Selin\'in güvenilir biri olduğunu gösteriyor. Bu kayıt her şeyi değiştirebilir.',
    },
    actions: ['investigate', 'negotiate', 'observe', 'call_backup'],
    outcomes: {
      investigate:  { rep:+26, risk:+20, money:0,    text: 'Kaydı dinledin. Viktor\'un sesi: "Mert, bunu dinliyorsan öldüm. Kaplan, Işık ve Demirtaş. Üçü birlikte. Ama içlerinden biri bu işe zorla girdi. Dosyayı açarsan anlarsın kimi kastettiğimi."', clue: 'ZORLANAN_KİŞİ', quality: 'good' },
      negotiate:    { rep:+20, risk:+15, money:0,    text: '"Viktor senden neden bu kadar emindi?" diye sordun. Selin: "Çünkü senin tek bir davanda bile suç ortaklığı yapmadığını biliyordu. Bu şehirde nadir."', clue: 'VİKTOR_GÜVENI', quality: 'good' },
      observe:      { rep:+14, risk:+10, money:0,    text: 'Selin\'in gözleri kayıt oynarken değişiyor. "Kerem Işık zorla mı girdi bu işe?" diye sordun. Gözleri yaşardı.', clue: 'KEREM_ZORLANDI', quality: 'good' },
      call_backup:  { rep:+10, risk:-5,  money:0,    text: 'Kayıt güvenli ortama alındı. Selin de koruma altına girdi. Dosya artık savcılıkta.', clue: null, quality: 'neutral' },
    }
  },
  {
    chapter: 19,
    badge: 'YÜZLEŞME', location: '📍 Av. Kerem Işık — Son Görüşme', image: '⚖️',
    time: '22:00',
    story: 'Bölüm 19 — Zincirin Zayıf Halkası',
    text: 'Viktor\'un kaydında "zorla giren biri" var. Ve Selin\'in bakışları Kerem\'e işaret etti. Avukatı buluyorsun — bu sefer kendi ofisinde değil, gece yarısı boş bir kafede. Yüzü harap, kravatsız. Bu adam karar vermek üzere.',
    clue: 'KEREM_ZORLANDI',
    npc: {
      name: 'Av. Kerem Işık', role: 'Zorlanmış suç ortağı', avatar: '🧑‍⚖️',
      mood: 'yıkılmış ve pişman',
      backstory: 'Ailesinin tehdit edilmesiyle bu işe sürüklendi. Viktor\'un ölümünü planlamadı ama bildi. Ve bu bilgiyle yaşamak onu mahvediyor.',
    },
    actions: ['negotiate', 'interrogate', 'bluff', 'observe'],
    outcomes: {
      negotiate:    { rep:+28, risk:+10, money:0,    text: 'Kerem konuştu. Her şeyi. Kaplan\'ın nasıl baskı yaptığını, Demirtaş\'ın nasıl organize ettiğini, Viktor\'un nasıl öldürüldüğünü. Ve katili.', clue: 'KATİL_İSMİ', quality: 'good' },
      interrogate:  { rep:+20, risk:+18, money:0,    text: '"Viktor öldürülmeden önce beni aradı. \'Kerem bu işten çıkmamın zamanı geldi\' dedi. O gece onu durduramadım."', clue: 'SON_ARAMA', quality: 'good' },
      bluff:        { rep:+22, risk:+15, money:0,    text: '"Savcı şu an seni arıyor" dedin. Kerem ayağa kalktı — sonra çöktü. "Zaten bitmiştim" dedi. Ve anlatmaya başladı.', clue: 'KATİL_İSMİ', quality: 'good' },
      observe:      { rep:+12, risk:+8,  money:0,    text: 'Kerem\'in elindeki kâğıda dikkat ettin: üzerinde bir isim yazılı, defalarca. Sanki kendini ikna etmeye çalışıyor gibi.', clue: 'KATİL_İSMİ', quality: 'good' },
    }
  },
  {
    chapter: 20,
    badge: 'KATİL KİM?', location: '📍 Tüm İpuçları Masada', image: '🗂️',
    time: '00:00',
    story: 'Bölüm 20 — Gece Yarısı Hesabı',
    text: 'Ofisinde yalnızsın. Gece yarısı. Masada tüm kanıtlar yığılı. Kadeh, zehir, USB, video, ses kaydı, Kerem\'in ifadesi. Her şey birbiriyle örtüşüyor. Ama tetikçi kim? Kaplan emir verdi, Demirtaş organize etti. Ama o geceye giren, potasyum klorürü kim uyguladı?',
    clue: 'KATİL_İSMİ',
    npc: {
      name: 'İç Ses — Dedektif Aslan', role: 'Kendi muhakemen', avatar: '🧠',
      mood: 'keskin ve kararlı',
      backstory: 'Bu bölümde NPC yok — sadece sen, kanıtlar ve mantığın var.',
    },
    actions: ['investigate', 'bluff', 'call_backup', 'negotiate'],
    outcomes: {
      investigate:  { rep:+30, risk:+15, money:0,    text: 'Buldun. Tüm ipuçları tek bir isimde buluşuyor: Viktor\'un özel doktoru Dr. Ferit Avcı. Potasyum klorürü temin edebilecek tek kişi. Ve Demirtaş\'ın eski tıp subayı.', clue: 'DR_FERİT', quality: 'good' },
      bluff:        { rep:+22, risk:+20, money:0,    text: 'Dr. Ferit\'i aradın: "Her şeyi biliyorum." Uzun sessizlik. Sonra: "Ne istiyorsun?" Bu bir itiraf.', clue: 'DR_FERİT', quality: 'good' },
      call_backup:  { rep:+18, risk:-5,  money:0,    text: 'Güvendiğin savcıyı aradın. Tüm dosyayı aktardın. "Gözaltı emri çıkarmak için 4 isim: Kaplan, Demirtaş, Doğan, Dr. Ferit."', clue: 'DR_FERİT', quality: 'good' },
      negotiate:    { rep:+14, risk:+10, money:0,    text: 'Kerem\'i tekrar aradın. "Ferit mi?" dedin. Uzun sessizlik. "Viktor\'u hiç acıtmadı dedi. Sanki bunu iyi bir şeymiş gibi söyledi."', clue: 'DR_FERİT', quality: 'good' },
    }
  },

  // ─── ACT IV: FINAL (21-28) ────────────────────────────────────
  {
    chapter: 21,
    badge: 'OPERASYON', location: '📍 Dr. Ferit Avcı\'nın Kliniği', image: '🏥',
    time: '06:00',
    story: 'Bölüm 21 — Şafakta Operasyon',
    text: 'Şafak söküyor. Dr. Ferit\'in kliniğinin önündesin. İçeride hâlâ ışık yanıyor — ya kaçmıyor ya kaçamıyor. Arka çıkış kilitli. Ekip etrafı sardı. Sen kapıyı çalıyorsun.',
    clue: 'DR_FERİT',
    npc: {
      name: 'Dr. Ferit Avcı', role: 'Tetikçi — son savunma', avatar: '🩺',
      mood: 'köşeye sıkışmış ve çaresiz',
      backstory: 'Askeri doktor olarak Demirtaş\'a bağlı. Viktor\'u öldürmesi emredildi. Ret edebilecek cesaret mi yoktu, yoksa başka bir nedeni mi var?',
    },
    actions: ['interrogate', 'negotiate', 'bluff', 'call_backup'],
    outcomes: {
      interrogate:  { rep:+24, risk:+15, money:0,    text: '"Emri Demirtaş verdi. Reddetsem ailem tehlikedeydi." Gözaltı. İfade alındı. Dosya büyüdü.', clue: 'FERİT_İFADESİ', quality: 'good' },
      negotiate:    { rep:+28, risk:+8,  money:0,    text: 'Ferit kapıyı açtı. "Zaten bekliyordum seni." Masada hazır oturmuş, ifadesini yazmış. "Sadece ailem güvende kalsın."', clue: 'FERİT_İFADESİ', quality: 'good' },
      bluff:        { rep:+20, risk:+20, money:0,    text: '"Demirtaş seni feda etti zaten. Sabah açıklaması hazır: ‘Tek başına hareket etti.’" Ferit güldü acıyla. "Tabii etti." ve teslim oldu.', clue: 'FERİT_İFADESİ', quality: 'good' },
      call_backup:  { rep:+14, risk:-5,  money:0,    text: 'Ekip içeri girdi. Ferit direnmedi. "Dosyamda her şey var" dedi ve bir klasörü uzattı. Hazırlamış.', clue: 'FERİT_İFADESİ', quality: 'good' },
    }
  },
  {
    chapter: 22,
    badge: 'KAÇIŞ', location: '📍 Kaplan\'ın Arabası — Şehir Dışı Yol', image: '🚗',
    time: '08:30',
    story: 'Bölüm 22 — Kaçanı Yakalamak',
    text: 'Ferit\'in gözaltı haberi sızdı. Kaplan şehirden kaçmaya çalışıyor. Özel arabasıyla sınır kapısına doğru. Ama sen 20 dakika önce öğrendin bunu. Kavşakta bekliyorsun.',
    clue: null,
    npc: {
      name: 'Meclis Üyesi Rüştü Kaplan', role: 'Kaçmaya çalışan fail', avatar: '🤵',
      mood: 'panikleyen ve tehlikeli',
      backstory: 'Köşeye sıkışmış, güç kaybediyor. Bu durumda öngörülmez.',
    },
    actions: ['arrest', 'negotiate', 'bluff', 'call_backup'],
    outcomes: {
      arrest:       { rep:+30, risk:+25, money:0,    text: 'Aracı durdurdun. Kaplan direndi ama ekip geldi. "Bu bitmedi" dedi. "Senin için bitti" dedin.', clue: 'KAPLAN_TUTUKLANDI', quality: 'good' },
      negotiate:    { rep:+20, risk:+15, money:0,    text: '"İfade verirsen aileni koruyabilirim." Kaplan düşündü. "Demirtaş\'ı verirsem?" "Anlat bakalım."', clue: 'KAPLAN_İFADE', quality: 'good' },
      bluff:        { rep:+24, risk:+20, money:0,    text: '"Sınır kapatıldı" dedin. Kaplan frene bastı. "Ne zaman?" "Haberi sen duymadan önce." Teslim oldu.', clue: 'KAPLAN_TUTUKLANDI', quality: 'good' },
      call_backup:  { rep:+18, risk:-5,  money:0,    text: 'Jandarma devreye girdi. Kaplan yakalandı. Ama arabada bir dosya çantası bulundu — içindekiler daha da büyük bir davayı açabilir.', clue: 'KAPLAN_TUTUKLANDI', quality: 'good' },
    }
  },
  {
    chapter: 23,
    badge: 'SON SAVAŞ', location: '📍 Emekli General Demirtaş — Konutu', image: '🎖️',
    time: '11:00',
    story: 'Bölüm 23 — Son Kale',
    text: 'Kaplan tutuklandı, Ferit ifade verdi. Geriye Demirtaş kaldı. Konutunun önünde özel güvenliği var. İçeriye girmek için resmi izin gerekiyor. Ama Demirtaş şu an dosya imha ediyor olabilir.',
    clue: null,
    npc: {
      name: 'Emekli General Rıfkı Demirtaş', role: 'Ana koordinatör', avatar: '🎖️',
      mood: 'soğuk ve hesaplı — henüz panik yok',
      backstory: 'En deneyimli, en tehlikeli. Kaplan tutuklanınca planını zaten hazırlamış olabilir.',
    },
    actions: ['bluff', 'investigate', 'call_backup', 'arrest'],
    outcomes: {
      bluff:        { rep:+26, risk:+30, money:0,    text: '"İçeride ne yaktığınızı biliyorum General. Ama kopyalar bende." Demirtaş durdu. "Kaç tane kopya?" "Yeterince." İlk çatlak.', clue: 'GENERAL_ÇATLADI', quality: 'good' },
      investigate:  { rep:+22, risk:+22, money:0,    text: 'Bahçe duvarından gördüğün şey: yakıcı kâğıt — belgeler imha ediliyor. Acil arama emirle içeri girdin.', clue: 'BELGE_İMHASI', quality: 'good' },
      call_backup:  { rep:+20, risk:-10, money:0,    text: 'Savcılık ve ordu iç denetim birlikte geldi. Demirtaş\'ın konutu mühürlendi. Kıl payı imhayı engelledin.', clue: 'DEMIRTAŞ_KUŞATILDI', quality: 'good' },
      arrest:       { rep:+28, risk:+35, money:0,    text: 'Gözaltı emriyle içeri girdin. Demirtaş direnmedi. "Sen kazandın, dedektif. Bu sefer." Bu sefer.', clue: 'DEMIRTAŞ_TUTUKLANDI', quality: 'good' },
    }
  },
  {
    chapter: 24,
    badge: 'HESAP', location: '📍 Şef Doğan\'la Final', image: '🚔',
    time: '14:00',
    story: 'Bölüm 24 — İçerideki Hain',
    text: 'Kaplan, Demirtaş, Dr. Ferit. Üçü de gözaltında. Şimdi sıra Şef Doğan\'da. O ki seni durdurmaya çalıştı, davayı kapattırmak istedi. Kendi komiserini tutuklamak için savcılıktan yazı aldın. Koridorda yürüyorsun.',
    clue: 'DOĞAN_BELGELERİ',
    npc: {
      name: 'Şef Komiseri Doğan', role: 'İçerideki hain — son karşılaşma', avatar: '👮',
      mood: 'bitmiş ve kabullenmiş',
      backstory: 'Her şeyin çöktüğünü gördü. Kaçacak yeri yok. Belki bir şeyler söyleyecek.',
    },
    actions: ['arrest', 'interrogate', 'negotiate', 'observe'],
    outcomes: {
      arrest:       { rep:+30, risk:+10, money:0,    text: '"Komiser Doğan, tutuklusunuz." Doğan ellerini uzattı. "Haklısın oğlum. Ama bu sistemin içinde herkes bir gün bu masanın karşısına geçer." Belki haklı.', clue: 'DOĞAN_TUTUKLANDI', quality: 'good' },
      interrogate:  { rep:+24, risk:+8,  money:0,    text: '"Neden bunu yaptın?" "Para için başladım. Sonra çıkamadım." En eski hikaye. En gerçek hikaye.', clue: 'DOĞAN_İFADE', quality: 'good' },
      negotiate:    { rep:+20, risk:+5,  money:0,    text: '"İfade verirsen hafifletici sebepler sayılır." Doğan düşündü. "Bu sistemde daha büyükleri var. Onları verebilirim." Beklenmiyordu.', clue: 'DAHA_BÜYÜK', quality: 'good' },
      observe:      { rep:+14, risk:0,   money:0,    text: 'Doğan masasını topluyor — sanki çoktan hazır. Çekmeceyi açtı, bir zarf çıkardı. "Bunu bekliyor olmalısın" dedi. Sana uzattı.', clue: 'DOĞAN_ZARFI', quality: 'good' },
    }
  },
  {
    chapter: 25,
    badge: 'VİKTOR\'UN SIRRI', location: '📍 Viktor\'un Gerçek Hikayesi', image: '📖',
    time: '17:00',
    story: 'Bölüm 25 — Kurban mı, Suç Ortağı mı?',
    text: 'Dava neredeyse kapandı. Ama bir şey aklını kurcalıyor: Viktor gerçekten masum muydu? Dosyalar onu hem kurban hem suç ortağı olarak gösteriyor. Nisan\'ı buluyorsun. "Gerçek Viktor\'u anlatayım mı?" diyor.',
    clue: 'VİKTOR_DE_SUÇLU',
    npc: {
      name: 'Nisan Çelik', role: 'Viktor\'un son sırdaşı', avatar: '👩‍💼',
      mood: 'rahatlamış ve açık',
      backstory: 'Artık korkmak için nedeni kalmadı. Viktor\'u gerçekten tanıyan biriydi. Hem karanlık hem aydınlık yüzünü.',
    },
    actions: ['interrogate', 'negotiate', 'observe', 'investigate'],
    outcomes: {
      interrogate:  { rep:+20, risk:0,   money:0,    text: '"Viktor başta para için girdi bu işe. Sonra çıkış yolu aradı ama kapılar kapandı. Sana o kasayı bırakması — bu onun pişmanlığıydı."', clue: 'VİKTOR_PIŞMANLIĞI', quality: 'good' },
      negotiate:    { rep:+18, risk:0,   money:0,    text: '"Viktor seni neden seçti biliyor musun? Çünkü sen hiç satılmadın. Bu şehirde bu nadir. Çok nadir."', clue: 'ASLAN_SEÇILDI', quality: 'good' },
      observe:      { rep:+14, risk:0,   money:0,    text: 'Nisan\'ın gözleri hem üzgün hem rahat. "Viktor\'un en büyük hatasını biliyor musun? İnsanlara güvenmek istedi ama kime güveneceğini bilemedi."', clue: null, quality: 'neutral' },
      investigate:  { rep:+16, risk:+5,  money:0,    text: '"Viktor\'un gizli bir dosyası daha var. Sana vermesini istedi. Ama önce haklı olduğunu kanıtlamanı istedi." Zarfı verdi.', clue: 'SON_DOSYA', quality: 'good' },
    }
  },
  {
    chapter: 26,
    badge: 'BASKI', location: '📍 Medya ve Kamuoyu', image: '📺',
    time: '09:00',
    story: 'Bölüm 26 — Gerçeği Anlatmak',
    text: 'Gözaltılar medyaya yansıdı. Kaplan\'ın avukatları saldırıda: "Dedektif Aslan sahte kanıt üretti." General\'in bağlantıları devreye giriyor. Bir gazeteci seni arıyor: "Size güveniyorum, gerçeği anlatmak ister misiniz?"',
    clue: null,
    npc: {
      name: 'Gazeteci Merve Sarı', role: 'Bağımsız araştırmacı gazeteci', avatar: '📰',
      mood: 'kararlı ve dürüst',
      backstory: 'Yıllardır bu şehrin kirini araştırıyor. Aslan\'ı takip etti, dosyayı gördü. Gerçeği kamuoyuyla paylaşmak istiyor.',
    },
    actions: ['negotiate', 'investigate', 'observe', 'call_backup'],
    outcomes: {
      negotiate:    { rep:+26, risk:+15, money:0,    text: 'Merve\'ye dosyayı verdin. Haber patladı. Kaplan\'ın avukatlarının saldırısı boşa çıktı. Kamuoyu desteği kritik.', clue: 'MEDYA_DESTEĞİ', quality: 'good' },
      investigate:  { rep:+20, risk:+10, money:0,    text: 'Merve sana bir şey verdi: "Bu haberi yapmak isteyen başka gazeteciler baskıyla susturuldu. İşte listesi."', clue: 'SUSTURULANLAR', quality: 'good' },
      observe:      { rep:+14, risk:+8,  money:0,    text: 'Merve\'nin ofisinde daha büyük bir dosya var — bu dava tek değil. Bu şehirde düzine böyle dava var.', clue: 'BÜYÜK_RESİM', quality: 'neutral' },
      call_backup:  { rep:+16, risk:-5,  money:0,    text: 'Savcılık basın açıklaması yaptı. Resmi kanal devreye girdi. Aslan\'a yönelik saldırılar yavaşladı.', clue: null, quality: 'good' },
    }
  },
  {
    chapter: 27,
    badge: 'VASİYET', location: '📍 Viktor\'un Son Mesajı', image: '✉️',
    time: '20:00',
    story: 'Bölüm 27 — Ölünün Sesi',
    text: 'Nisan\'ın verdiği zarfı açıyorsun. Viktor\'un el yazısıyla: "Mert, bunu okuyorsan gerçeği buldun. Bu şehrin 20 yıllık kiri bu dosyada. Ama asıl dosyayı hâlâ bulamadın. Oğluma sor. Sadece oğluma."',
    clue: 'SON_DOSYA',
    npc: {
      name: 'Viktor\'un Oğlu — Arda Saran', role: 'Genç, bilgisiz görünen', avatar: '👦',
      mood: 'şaşkın ve üzgün',
      backstory: 'Babasının gerçek yüzünü bilmiyor gibi görünüyor. Ama Viktor\'un bu zarfı oğluna yönlendirmesi tesadüf değil.',
    },
    actions: ['interrogate', 'negotiate', 'observe', 'investigate'],
    outcomes: {
      interrogate:  { rep:+22, risk:+8,  money:0,    text: 'Arda ağladı: "Babam bana 3 ay önce bir anahtar verdi. ‘Zamanı gelince vereceksin’ dedi. İşte." Anahtar küçük, metal — kasa anahtarı.', clue: 'ASIL_KASA', quality: 'good' },
      negotiate:    { rep:+28, risk:+5,  money:0,    text: '"Baban sana güvendi. Anahtarı sana neden verdiğini biliyor musun?" Arda: "Çünkü ben bu pisliğin dışındaydım. Temiz tek kişi bendim dedi."', clue: 'ASIL_KASA', quality: 'good' },
      observe:      { rep:+18, risk:0,   money:0,    text: 'Arda\'nın boynunda küçük bir kolye — anahtara benzer şekilde. Ona dokundun mu diye sormadan önce elini uzattı.', clue: 'ASIL_KASA', quality: 'good' },
      investigate:  { rep:+20, risk:+10, money:0,    text: 'Arda\'nın odasında Viktor\'un son bıraktığı şeyleri incelyorsun. Bir fotoğraf: "Oğlum, benden özür dilerim. Ama bu ülkede doğru olanı yaptım."', clue: 'ASIL_KASA', quality: 'good' },
    }
  },
  {
    chapter: 28,
    badge: 'FİNAL', location: '📍 Viktor\'un Asıl Kasası', image: '🔐',
    time: '23:59',
    story: 'Bölüm 28 — Gece Yarısı Gerçeği',
    text: 'Şehrin eski mahkeme binasının altındaki emanet kasası. Arda\'nın anahtarı uyuyor. Kapı açılıyor. Toz dolu bir kutu. İçinde: 20 yılın belgesi. Sadece Kaplan ve Demirtaş değil — isimler sürüyor. Bakanlık, bankalar, medya. Bu kutu bir bomba. Şimdi ne yapacaksın?',
    clue: 'ASIL_KASA',
    npc: {
      name: 'Savcı Berna Aydın', role: 'Güvendiğin tek isim adalet sisteminde', avatar: '⚖️',
      mood: 'hazır ve kararlı',
      backstory: 'Yıllardır dürüst kalmayı başaran tek savcı. Bu dosyayı alırsa ne yapacağını biliyor.',
    },
    actions: ['investigate', 'negotiate', 'call_backup', 'bluff'],
    outcomes: {
      investigate:  { rep:+35, risk:+20, money:0,    text: 'Her belgeyi tek tek inceliyorsun. 20 yıl, 47 isim, yüzlerce suç. Viktor bu ülkenin en büyük yolsuzluk arşivini biriktirmiş — ve sana bırakmış.', clue: 'BÜYÜK_ARŞİV', quality: 'good' },
      negotiate:    { rep:+30, risk:+15, money:0,    text: 'Savcı Berna\'ya teslim ettin. "Bu dava bitmedi, Mert. Bu şehir değişecek." Belki değişecek. Belki değişmeyecek. Ama sen görevini yaptın.', clue: 'ADALET', quality: 'good' },
      call_backup:  { rep:+26, risk:-10, money:0,    text: 'Milletlerarası Şeffaflık Örgütü\'nü aradın. Belgeler yurt dışına da gönderildi. Artık imha edilemez.', clue: 'ULUSLARASI', quality: 'good' },
      bluff:        { rep:+22, risk:+25, money:0,    text: 'Sabah basın toplantısı düzenledin. "Bu belgelerin kopyaları 10 ayrı yerde." Baskı çöktü. Herkes bildi — her şey bitti.', clue: 'ADALET', quality: 'good' },
    }
  },
];

const ACTION_DEFS = {
  arrest:       { icon:'🚔', name:'GÖZALTI',    hint:'Tutuklama yap' },
  negotiate:    { icon:'🤝', name:'MÜZAKERE',   hint:'İkna et' },
  bribe:        { icon:'💰', name:'RÜŞVET',     hint:'Para teklif et' },
  investigate:  { icon:'🔎', name:'İNCELE',     hint:'Kanıt topla' },
  observe:      { icon:'👁️', name:'GÖZLEMLE',  hint:'Sessizce izle' },
  interrogate:  { icon:'💬', name:'SORGU',      hint:'Sıkıştır' },
  call_backup:  { icon:'📡', name:'TAKVİYE',    hint:'Yardım çağır' },
  infiltrate:   { icon:'🕶️', name:'SIZDIR',    hint:'İçine sız' },
  bluff:        { icon:'🎭', name:'BLÖF',       hint:'Aldatmaca yap' },
  flee:         { icon:'🏃', name:'ÇEKİL',      hint:'Geri çekil' },
};

// ── OYUN DURUMU ───────────────────────────────────────────────────
let state = {
  rep: 60, money: 300, risk: 15,
  turn: 0,
  currentEvent: null,
  chatHistory: [],
  actionUsed: false,
  totalScore: 0,
  cluesFound: [],
  goodActions: 0, badActions: 0,
  npcMoodLevel: 0,
};

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

function showStory() {
  showScreen('screen-story');
  const lines = [
    'Vartan City. 2024.',
    '',
    'Gece 02:34.',
    '',
    'Telefon çaldı.',
    '',
    '"Aslan. Viktor Saran ölü bulundu.',
    'Resmi açıklama kalp krizi.',
    'Ama sen görünce anlarsın."',
    '',
    'Şehrin en büyük iş insanı.',
    'Şehrin en derin sırrı.',
    '',
    'Bu dava 28 bölüm.',
    'Her karar bir sonrakini etkiler.',
    'Her ipucu seni gerçeğe yaklaştırır.',
    '',
    'Sen Dedektif Mert Aslan\'sın.',
    'Ve bu dosya seni bekliyor.',
  ];

  const el = document.getElementById('story-text');
  const btn = document.getElementById('story-btn');
  el.textContent = '';
  btn.style.display = 'none';

  let li = 0, ci = 0, full = '';
  function type() {
    if (li >= lines.length) { btn.style.display = 'inline-block'; return; }
    const line = lines[li];
    if (ci < line.length) {
      full += line[ci++];
      el.textContent = full;
      setTimeout(type, line.startsWith('"') ? 22 : 28);
    } else {
      full += '\n'; el.textContent = full;
      li++; ci = 0;
      setTimeout(type, line === '' ? 60 : 120);
    }
  }
  type();
}

function showRoleSelect() {
  // Artık rol seçimi yok — direkt oyuna gir
  startGame();
}

function startGame() {
  state = {
    rep: 60, money: 300, risk: 15,
    turn: 0,
    currentEvent: null,
    chatHistory: [],
    actionUsed: false,
    totalScore: 0,
    cluesFound: [],
    goodActions: 0, badActions: 0,
    npcMoodLevel: 0,
  };

  document.getElementById('hud-role-icon').textContent = PLAYER.icon;
  document.getElementById('hud-role-name').textContent = 'DEDEKTİF ASLAN';
  document.getElementById('hud-turn-max').textContent = CASE_CHAPTERS.length;

  showScreen('screen-game');
  updateHUD();
  loadNextChapter();
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

// ── BÖLÜM YÜKLE ───────────────────────────────────────────────────
function loadNextChapter() {
  if (state.turn >= CASE_CHAPTERS.length) { endGame('complete'); return; }

  const ch = CASE_CHAPTERS[state.turn];
  state.currentEvent = ch;
  state.chatHistory = [];
  state.actionUsed = false;
  state.npcMoodLevel = 0;

  document.getElementById('event-badge').textContent = ch.badge;
  document.getElementById('event-location').textContent = ch.location;
  document.getElementById('event-time').textContent = '🕐 ' + ch.time;
  document.getElementById('event-story').textContent = ch.story;
  document.getElementById('event-text').textContent = ch.text;
  document.getElementById('event-image').textContent = ch.image;
  document.getElementById('npc-panel').style.display = 'none';
  document.getElementById('chat-box').innerHTML = '';
  document.getElementById('outcome-banner').style.display = 'none';

  // İpucu rozetleri
  const prev = ch.clue;
  if (prev && state.cluesFound.includes(prev)) {
    addLog(`🔗 İpucu aktif: ${prev.replace(/_/g,' ')}`, 'good');
  }

  renderActionCards(ch.actions);
  addLog(`▸ Bölüm ${ch.chapter}/28: ${ch.story}`, 'neutral');
}

// ── AKSİYON KARTLARI ─────────────────────────────────────────────
function renderActionCards(actionKeys) {
  const row = document.getElementById('card-row');
  row.innerHTML = '';

  actionKeys.forEach(key => {
    const def = ACTION_DEFS[key];
    if (!def) return;

    const card = document.createElement('div');
    card.className = 'action-card';
    card.dataset.action = key;
    card.innerHTML = `
      <div class="action-card-icon">${def.icon}</div>
      <div class="action-card-name">${def.name}</div>
      <div class="action-card-hint">${def.hint}</div>`;
    card.onclick = () => useAction(key);
    row.appendChild(card);
  });

  const talk = document.createElement('div');
  talk.className = 'action-card talk-card';
  talk.innerHTML = `
    <div class="action-card-icon">💬</div>
    <div class="action-card-name">KONUŞ</div>
    <div class="action-card-hint">NPC ile diyalog</div>`;
  talk.onclick = openNPCPanel;
  row.appendChild(talk);
}

function useAction(key) {
  if (state.actionUsed) { addLog('Bu bölümde zaten hamle yaptın.', 'bad'); return; }
  const ch = state.currentEvent;
  const outcome = ch.outcomes[key];
  if (!outcome) return;

  state.rep   = Math.max(0, Math.min(100, state.rep   + outcome.rep));
  state.risk  = Math.max(0, Math.min(100, state.risk  + outcome.risk));
  state.money = Math.max(0, state.money + outcome.money);
  state.actionUsed = true;
  state.totalScore += outcome.rep - Math.abs(outcome.risk * 0.3);

  if (outcome.quality === 'good') state.goodActions++;
  else if (outcome.quality === 'bad') state.badActions++;

  if (outcome.clue && !state.cluesFound.includes(outcome.clue)) {
    state.cluesFound.push(outcome.clue);
    addLog(`🔍 Yeni ipucu: ${outcome.clue.replace(/_/g,' ')}`, 'good');
  }

  document.querySelectorAll('.action-card').forEach(c => {
    c.classList.add('used');
    c.onclick = null;
  });

  const type = outcome.quality === 'good' ? 'good' : outcome.quality === 'bad' ? 'bad' : 'neutral';
  showOutcomeBanner(outcome.text, type);
  addLog(`${ACTION_DEFS[key]?.icon || '▸'} ${outcome.text.substring(0, 80)}...`, type);
  updateHUD();

  if (state.risk >= 100) { setTimeout(() => endGame('caught'), 2200); return; }
  if (state.rep  <= 0)   { setTimeout(() => endGame('reputation'), 2200); return; }

  setTimeout(() => {
    state.turn++;
    loadNextChapter();
    updateHUD();
  }, 3000);
}

function showOutcomeBanner(text, type) {
  const b = document.getElementById('outcome-banner');
  b.textContent = text;
  b.className = `outcome-banner ${type}`;
  b.style.display = 'block';
}

// ── NPC ──────────────────────────────────────────────────────────
function openNPCPanel() {
  const ch = state.currentEvent;
  if (!ch?.npc) return;
  const npc = ch.npc;

  document.getElementById('npc-avatar').textContent = npc.avatar;
  document.getElementById('npc-name').textContent = npc.name;
  document.getElementById('npc-role-tag').textContent = npc.role;
  updateNPCMoodBar();
  document.getElementById('npc-panel').style.display = 'flex';

  if (state.chatHistory.length === 0) {
    getAIOpeningLine(npc, ch);
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
  const colors = [
    ['linear-gradient(90deg,var(--accent3),var(--accent))', 'var(--accent3)'],
    ['linear-gradient(90deg,var(--accent5),orange)', 'orange'],
    ['linear-gradient(90deg,var(--accent2),#ff0050)', 'var(--accent2)'],
  ];
  fill.style.background = colors[state.npcMoodLevel][0];
  status.style.background = colors[state.npcMoodLevel][1];
}

async function getAIOpeningLine(npc, ch) {
  document.getElementById('ai-thinking').style.display = 'flex';
  try {
    const req = `Sen ${npc.name} olarak bölüm ${ch.chapter}'desin: ${ch.location}. Dedektif Mert Aslan ile karşı karşıyasın. Karakterine uygun, gerilimli, özgün 1-2 cümle söyle. Tırnak/parantez/açıklama yasak.`;
    const reply = await callGemini(buildNPCPrompt(npc, ch), [
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

function buildNPCPrompt(npc, ch) {
  const moodLine = ['',
    '\nRUH HALİ YÜKSELDİ: Artık düşmanca yaklaşıyorsun.',
    '\nKRİTİK: Patlama noktasındasın.'][state.npcMoodLevel] || '';
  const clueCtx = state.cluesFound.length
    ? `\nDedektifin bulduğu ipuçları: ${state.cluesFound.join(', ').replace(/_/g,' ')}`
    : '';
  return `Sen "${npc.name}" adlı bir karaktersin. Rol: ${npc.role}.
ARKA PLAN: ${npc.backstory}
HAL: ${npc.mood}${moodLine}
SAHNE: ${ch.text}
KARŞI TARAF: Dedektif Mert Aslan — ${PLAYER.bg}${clueCtx}
KURAL: Türkçe, 2-4 cümle, tırnak/parantez/açıklama yasak. Gerçekçi, klişesiz. Dava bilgisine uygun konuş.`;
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
  const ch = state.currentEvent;
  state.chatHistory.push({ role: 'user', parts: [{ text }] });

  document.getElementById('ai-thinking').style.display = 'flex';
  document.getElementById('chat-input').disabled = true;

  try {
    const reply = await callGemini(buildNPCPrompt(ch.npc, ch), state.chatHistory);
    state.chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    addChatMessage('npc', reply);

    const lower = text.toLowerCase();
    if ((lower.includes('tehdit') || lower.includes('ezerim') || lower.includes('bitiririm')) && state.npcMoodLevel < 2) {
      state.npcMoodLevel++;
      updateNPCMoodBar();
      if (state.npcMoodLevel === 2) {
        addChatMessage('system', '⚠ NPC agresif — risk artıyor');
        state.risk = Math.min(100, state.risk + 5);
        updateHUD();
      }
    }

    const r = reply.toLowerCase();
    let d = 0;
    if (r.includes('haklısın') || r.includes('tamam') || r.includes('anlıyorum')) d = +2;
    if (r.includes('kandıramazsın') || r.includes('yalancı') || r.includes('bilmiyorsun')) d = -2;
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
  while (log.children.length > 60) log.removeChild(log.firstChild);
}

// ── SONUÇ ─────────────────────────────────────────────────────────
function endGame(reason) {
  let icon, title, desc, verdict, endClass = '';
  const total = CASE_CHAPTERS.length;
  const pct = Math.round((state.turn / total) * 100);
  const clueScore = state.cluesFound.length;

  if (reason === 'caught') {
    icon = '🚨'; title = 'DEDEKTİF YAKALANDI'; endClass = 'end-bad';
    desc = 'Risk çok yükseldi. Vartan City\'nin güçlüleri seni sistemden attı. Viktor\'un davası kapandı.';
    verdict = `${state.turn}/${total} bölüm tamamlandı. ${clueScore} ipucu bulundu.`;
  } else if (reason === 'reputation') {
    icon = '💀'; title = 'İTİBAR SIFIR'; endClass = 'end-bad';
    desc = 'Kimse artık Dedektif Aslan\'a güvenmiyor. Bu şehirde güvensiz dedektifin yeri yok.';
    verdict = `${state.turn}/${total} bölüm. İtibar çöktü.`;
  } else {
    const score = state.goodActions * 3 + clueScore * 5 - state.badActions * 2 + Math.round(state.rep * 0.5);

    if (clueScore >= 20 && state.goodActions >= 18) {
      icon = '⚖️'; title = 'GERÇEK ORTAYA ÇIKTI'; endClass = 'end-good';
      desc = 'Vartan City\'nin 20 yıllık kirini gün yüzüne çıkardın. Viktor\'un davası kapandı — ama şehir açıldı. Tarih seni unutmayacak.';
      verdict = `Mükemmel: ${clueScore} ipucu, ${state.goodActions} iyi karar. Skor: ${score}.`;
    } else if (clueScore >= 14 && state.goodActions >= 12) {
      icon = '🔍'; title = 'DAVA ÇÖZÜLDÜ'; endClass = 'end-good';
      desc = 'Kaplan, Demirtaş ve doktor gözaltında. Viktor\'un gerçek ölüm nedeni mahkemede. Bu şehirde bazı şeyler değişiyor.';
      verdict = `İyi: ${clueScore} ipucu, ${state.goodActions} iyi karar. Skor: ${score}.`;
    } else if (clueScore >= 8) {
      icon = '📋'; title = 'YARIDA KALDI'; endClass = 'end-neutral';
      desc = 'Önemli bulgular elde ettin ama dava tam kapanmadı. Güçlüler hâlâ özgür.';
      verdict = `Orta: ${clueScore} ipucu. Bazı parçalar eksik kaldı.`;
    } else {
      icon = '🌫️'; title = 'GERÇEK GÖMÜLDÜ'; endClass = 'end-bad';
      desc = 'Yeterli kanıt bulunamadı. Viktor\'un ölümü kalp krizi olarak kaldı. Şehrin güçlüleri kazandı.';
      verdict = `Yeterli kanıt yok. Sadece ${clueScore} ipucu. Bu şehir kazandı.`;
    }
  }

  document.getElementById('end-icon').textContent = icon;
  document.getElementById('end-title').textContent = title;
  document.getElementById('end-desc').textContent = desc;
  document.getElementById('end-verdict').textContent = verdict;
  document.getElementById('end-stats').innerHTML = `
    <div class="end-stat"><div class="end-stat-val">${state.turn}</div><div class="end-stat-label">BÖLÜM</div></div>
    <div class="end-stat"><div class="end-stat-val">${clueScore}</div><div class="end-stat-label">İPUCU</div></div>
    <div class="end-stat"><div class="end-stat-val">${state.goodActions}</div><div class="end-stat-label">İYİ KARAR</div></div>
    <div class="end-stat"><div class="end-stat-val">${state.rep}</div><div class="end-stat-label">İTİBAR</div></div>
  `;

  const ec = document.querySelector('.end-content');
  if (ec) ec.className = `end-content ${endClass}`;
  showScreen('screen-end');
}

function restartGame() { showScreen('screen-intro'); }
