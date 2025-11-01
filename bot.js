// =============================
// HIMASI HUB BOT 📚
// Telegram Bot - Himpunan Mahasiswa Sistem Informasi
// Universitas Bina Sarana Informatika PSDKU Kota Yogyakarta
// =============================
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
// === MASUKKAN TOKEN TELEGRAM ANDA DI SINI ===
const token = process.env.TELEGRAM_BOT_TOKEN;
// Jalankan bot dengan polling
const bot = new TelegramBot(token, { polling: true });
// Error handling untuk bot
bot.on('error', (error) => {
console.error('Bot error:', error);
});
bot.on('polling_error', (error) => {
console.error('Polling error:', error);
});
// =============================
// Data Informasi HIMASI
// =============================
const informasiHimasi = {
"Tentang HIMASI": "HIMASI adalah salah satu organisasi kemahasiswaan yang mewadahi mahasiswa Fakultas Teknik dan Informatika Prodi Sistem Informasi Kampus Yogyakarta Universitas Bina Sarana Informatika dalam bidang akademik maupun non akademik.",
"Visi": "Menjadikan organisasi dengan meningkatkan jiwa kreatif dan komunikatif yang akan menghasilkan inovasi baru dan berkualitas.",
"Misi": "1. Melaksanakan pelatihan pendidikan berbasis IT\n2. Mengembangkan soft skills dan hard skills mahasiswa\n3. Membangun jaringan dengan dunia industri dan akademisi\n4. Mengkoordinir kegiatan kemahasiswaan yang bergerak dalam teknologi komputer",
"Maksud & Tujuan": "1. Sebagai pedoman untuk menjalankan program kerja yang akan direalisasikan\n2. Menjaga eksistensi mahasiswa prodi Sistem Informasi dalam berorganisasi\n3. Meningkatkan kualitas mahasiswa Sistem Informasi sehingga dapat menumbuhkan prestasi akademik\n4. Sebagai delegasi kampus berdasarkan program studi.",
"Program Kerja": "1. Seminar dan Workshop Teknologi\n2. Menciptakan kreatifikas dari ide mahasiswa\n3. Memiliki desa binaan yang berfokus pada IT\n4. Diskusi dan Sharing Session\n5. Kegiatan Sosial dan Kepedulian"
};
// =============================
// State Management
// =============================
const userStates = new Map(); // chatId -> state

// =============================
// Inline Keyboard Menu Utama
// =============================
const mainMenu = {
reply_markup: {
inline_keyboard: [
[{ text: "📚 Tentang HIMASI", callback_data: "tentang_himasi" }],
[{ text: "🎯 Program Kerja", callback_data: "program_kerja" }],
[{ text: "📍 Info & Kontak", callback_data: "info_kontak" }],
[{ text: "👥 Daftar Anggota", callback_data: "daftar_anggota" }]
]
}
};
// =============================
// COMMAND /START
// =============================
bot.onText(/\/start/, async (msg) => {
const chatId = msg.chat.id;
try {
await bot.sendMessage(chatId, `
👋 *Selamat Datang di HIMASI HUB Bot*!

Halo! Saya adalah bot resmi *Himpunan Mahasiswa Sistem Informasi (HIMASI)*
Universitas Bina Sarana Informatika PSDKU Kota Yogyakarta 📚

Saya siap membantu kamu mendapatkan informasi tentang organisasi kami.
Silakan pilih menu di bawah ini:
`, { parse_mode: 'Markdown', ...mainMenu });
} catch (error) {
console.error('Error sending start message:', error);
}
});
// =============================
// HANDLER CALLBACK BUTTON
// =============================
bot.on('callback_query', async (query) => {
const chatId = query.message.chat.id;
const action = query.data;
try {
switch (action) {
// === TENTANG HIMASI ===
case 'tentang_himasi':
await bot.sendMessage(chatId, `
📚 *Tentang HIMASI*

HIMASI adalah salah satu organisasi kemahasiswaan yang mewadahi mahasiswa Fakultas Teknik dan Informatika Prodi Sistem Informasi Kampus Yogyakarta Universitas Bina Sarana Informatika dalam bidang akademik maupun non akademik.

*Visi:*
Menjadikan organisasi dengan meningkatkan jiwa kreatif dan komunikatif yang akan menghasilkan inovasi baru dan berkualitas. 

*Misi:*
1. Melaksanakan pelatihan pendidikan berbasis IT
2. Menciptakan kreatifikas dari ide mahasiswa
3. Memiliki desa binaan yang berfokus pada IT
4. Mengkoordinir kegiatan kemahasiswaan yang bergerak dalam teknologi komputer

*Maksud & Tujuan*
1. Sebagai pedoman untuk menjalankan program kerja yang akan direalisasikan
2. Menjaga eksistensi mahasiswa prodi Sistem Informasi dalam berorganisasi
3. Meningkatkan kualitas mahasiswa Sistem Informasi sehingga dapat menumbuhkan prestasi akademik
4. Sebagai delegasi kampus berdasarkan program studi.

Gunakan menu untuk informasi lebih lanjut! 📖
`, { parse_mode: 'Markdown', ...mainMenu });
break;
// === PROGRAM KERJA ===
case 'program_kerja':
await bot.sendMessage(chatId, `
🎯 *Program Kerja HIMASI*

Berikut adalah program kerja utama HIMASI:
1. *Seminar dan Workshop Teknologi*
   - Workshop pemrograman
   - Seminar IT terkini
   - Training skill development

2. *Kegiatan Pengabdian Masyarakat*
   - Pelatihan komputer untuk masyarakat
   - Digitalisasi UMKM
   - Program literasi digital

3. *Lomba dan Kompetisi IT*
   - Hackathon
   - Competitive Programming
   - UI/UX Design Competition

4. *Diskusi dan Sharing Session*
   - Tech talk
   - Career development
   - Sharing alumni

5. *Kegiatan Sosial dan Kepedulian*
   - Bakti sosial
   - Donasi dan kepedulian sosial

Untuk informasi detail, hubungi admin kami! 💬
`, { parse_mode: 'Markdown', ...mainMenu });
break;
// === INFO & KONTAK ===
case 'info_kontak':
await bot.sendMessage(chatId, `
📍 *Info & Kontak HIMASI*

🏛️ *Universitas Bina Sarana Informatika*
PSDKU Kota Yogyakarta
Program Studi Sistem Informasi

📧 *Email:* himasi.yog@bsi.ac.id
📱 *Instagram:* @himasi\\_ubsiyogyakarta
🌐 *Website:* himasiygy.bsi.ac.id
📞 *Kontak Pengurus:* 083101487796
Untuk informasi lebih lanjut atau pertanyaan, silakan hubungi pengurus HIMASI melalui media sosial atau email di atas.

👥 Mari bergabung bersama kami dan kembangkan potensimu di bidang Sistem Informasi! 🚀
`, { parse_mode: 'Markdown', ...mainMenu });
break;
// === DAFTAR ANGGOTA ===
case 'daftar_anggota':

userStates.set(chatId, 'waiting_for_order');
await bot.sendMessage(chatId, `
👥 *Daftar Sebagai Anggota HIMASI*

Silakan ketik data diri kamu dengan format berikut:
*Nama | NIM | Semester | No. HP*

Contoh:
*Ahmad Rizki | 12345678 | 3 | 081234567890*
`, { parse_mode: 'Markdown' });
break;
default:
await fallback(chatId);
}
await bot.answerCallbackQuery(query.id);
} catch (error) {
console.error('Error handling callback query:', error);
try {
await bot.answerCallbackQuery(query.id, { text: 'Terjadi kesalahan, silakan coba lagi.' });
} catch (answerError) {
console.error('Error answering callback query:', answerError);
}
}
});
// =============================
// HANDLER PESAN UMUM
// =============================
bot.on('message', async (msg) => {
const chatId = msg.chat.id;
const userState = userStates.get(chatId);
try {
if (userState === 'waiting_for_order') {
await handleOrder(msg);
} else if (userState === 'waiting_for_confirmation') {
await handleConfirmation(msg);
} else if (userState === 'waiting_for_contact') {
await handleContact(msg);
}
} catch (error) {

console.error('Error handling message:', error);
try {
await bot.sendMessage(chatId, 'Terjadi kesalahan, silakan coba lagi atau gunakan menu utama.', mainMenu);
} catch (sendError) {
console.error('Error sending error message:', sendError);
}
}
});
// =============================
// FLOW 3.1: PROSES DAFTAR ANGGOTA
// =============================
async function handleOrder(msg) {
const chatId = msg.chat.id;
const orderText = msg.text;
try {
// Parse data pendaftaran (format: Nama | NIM | Semester | No. HP)
const parts = orderText.split('|').map(p => p.trim());
if (parts.length < 4) {
userStates.delete(chatId);
await bot.sendMessage(chatId, "Format tidak lengkap. Silakan gunakan format:\n*Nama | NIM | Semester | No. HP*", { parse_mode: 'Markdown', ...mainMenu });
return;
}
const [nama, nim, semester, noHp] = parts;
userStates.set(chatId, 'waiting_for_confirmation');
userStates.set(`${chatId}_order`, { nama, nim, semester, noHp });
await bot.sendMessage(chatId, `
✅ *Data Pendaftaran:*
📝 Nama: ${nama}
🆔 NIM: ${nim}
📚 Semester: ${semester}
📱 No. HP: ${noHp}

Apakah data di atas sudah benar? (ya/tidak)
`, { parse_mode: 'Markdown' });
} catch (error) {
console.error('Error in handleOrder:', error);
userStates.delete(chatId);
await bot.sendMessage(chatId, "Terjadi kesalahan saat memproses data. Silakan coba lagi.", mainMenu);
}
}
async function handleConfirmation(msg) {
const chatId = msg.chat.id;
const reply = msg.text.toLowerCase();
try {
if (reply === "ya") {
userStates.set(chatId, 'waiting_for_contact');
await bot.sendMessage(chatId, "Terima kasih! Data kamu sudah tercatat. Pengurus HIMASI akan menghubungi kamu segera untuk proses selanjutnya.\n\nApakah ada pertanyaan atau hal lain yang ingin ditanyakan?", { parse_mode: 'Markdown' });
} else {
userStates.delete(chatId);
userStates.delete(`${chatId}_order`);
await bot.sendMessage(chatId, "Baik, pendaftaran dibatalkan. Silakan lihat informasi lain atau kembali ke menu utama.", mainMenu);
}
} catch (error) {
console.error('Error in handleConfirmation:', error);
userStates.delete(chatId);
userStates.delete(`${chatId}_order`);
await bot.sendMessage(chatId, "Terjadi kesalahan. Silakan coba lagi.", mainMenu);
}
}
async function handleContact(msg) {
const chatId = msg.chat.id;
const contact = msg.text;
try {
userStates.delete(chatId);
const orderData = userStates.get(`${chatId}_order`);
userStates.delete(`${chatId}_order`);
await bot.sendMessage(chatId, `
Terima kasih ${orderData ? orderData.nama : ''}! 🙏

Data pendaftaran kamu sudah tercatat dengan baik. Pengurus HIMASI akan segera menghubungi kamu melalui nomor HP yang telah kamu berikan untuk proses selanjutnya.

📚 *Selamat bergabung dengan HIMASI!*
Bersama kita kembangkan potensi di bidang Sistem Informasi! 🚀

Gunakan menu untuk informasi lebih lanjut tentang HIMASI.
`, { parse_mode: 'Markdown', ...mainMenu });
} catch (error) {
console.error('Error in handleContact:', error);
await bot.sendMessage(chatId, "Terima kasih! Pengurus akan menghubungi Anda segera.", mainMenu);
}
}
// =============================
// Fungsi Helper (Jika Diperlukan)
// =============================
// Fungsi-fungsi helper dapat ditambahkan di sini jika diperlukan
// =============================
// FLOW 6: FALLBACK
// =============================
async function fallback(chatId) {
try {
await bot.sendMessage(chatId, `
Maaf, saya belum paham maksud kamu 😅
Silakan pilih menu berikut:
1️⃣ Tentang HIMASI
2️⃣ Program Kerja
3️⃣ Info & Kontak
4️⃣ Daftar Anggota
`, mainMenu);
} catch (error) {
console.error('Error in fallback:', error);
}
}
console.log("🤖 HIMASI HUB Bot is running...");