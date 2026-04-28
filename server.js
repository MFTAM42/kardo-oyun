const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const GEMINI_API_KEY = 'AIzaSyC6EWtl3NfAeje30-AWdvKiYt3qdK70kNY';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

app.post('/api/chat', async (req, res) => {
  const { npcPersonality, npcName, playerRole, eventText, history, playerStats } = req.body;

  if (!history || !npcPersonality) {
    return res.status(400).json({ error: 'Eksik parametre' });
  }

  const systemPrompt = `Sen "${npcName}" adlı bir NPC'sin. Karakter özelliğin: ${npcPersonality}.

OYUN BAĞLAMI:
- Mevcut olay: ${eventText}
- Oyuncu rolü: ${playerRole}
- Oyuncu itibarı: ${playerStats?.rep ?? 50}/100
- Oyuncu parası: $${playerStats?.money ?? 300}
- Oyuncu riski: ${playerStats?.risk ?? 30}/100

KURALLAR:
1. Karakterine sadık kal. Kısa ve gerçekçi konuş (2-4 cümle).
2. Oyuncunun rolüne göre tepki ver (polis sorgularsa farklı, hırsız teklif yaparsa farklı).
3. Türkçe konuş. Dramatik ve gerilimli bir dil kullan.
4. Zaman zaman bilgi sızdır veya ipucu ver, ama her şeyi kolayca verme.
5. Eğer oyuncu seni kandırmaya veya tehdit etmeye çalışırsa buna uygun tepki ver.
6. Cevabında sadece NPC'nin konuştuğu metni yaz, ekstra açıklama ekleme.`;

  // Gemini için mesaj geçmişini oluştur
  const contents = [];
  for (const h of history) {
    contents.push({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }],
    });
  }

  try {
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 300, temperature: 0.9 },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini hata:', data);
      return res.status(500).json({ error: 'Gemini hata', detail: data?.error?.message });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Cevap yok.';

    let repChange = 0;
    const lower = reply.toLowerCase();
    if (lower.includes('iyi') || lower.includes('tamam') || lower.includes('anlıyorum')) repChange = 3;
    if (lower.includes('yalan') || lower.includes('ihanet') || lower.includes('güvenmiyorum')) repChange = -3;

    res.json({ reply, repChange });
  } catch (err) {
    console.error('Gemini API hatası:', err.message);
    res.status(500).json({ error: 'AI yanıt vermedi', detail: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🎮 KARDO: Şehrin Gölgeleri`);
  console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
  console.log(`🔑 Gemini Pro: ✅ Aktif\n`);
});
