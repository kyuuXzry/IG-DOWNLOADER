/*
 * © Paduka Kyuu
 * WhatsApp : 62856726744
 * Instagram : Rissxzry_
 * Jangan hapus credit, hargai creator
 * Note sesuaikan dengan variable kalian
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async (m, alipdev) => {
  const { kyuuai, Reply, text, command, isRegistered, checkLimit, addLimit } = alipdev;

  if (!["insta", "ig", "igexport"].includes(command)) return;

  if (!isRegistered(m.sender)) {
    return Reply(global.mess.verifikasi);
  }
  if (checkLimit && checkLimit(m.sender, false, false)) {
    return Reply(global.mess.limit);
  }

  if (!text) {
    return Reply(`Contoh: .${command} https://www.instagram.com/reel/...`);
  }

  if (!/instagram\.com\/(p|reel|tv)\//.test(text)) {
    return Reply('❌ Link Instagram tidak valid.');
  }

  await kyuuai.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
  Reply('⏳ Mengambil video Instagram...');

  try {
    const apiUrl = `https://igexport.com/api/ig-reels?url=${encodeURIComponent(text)}`;

    const { data } = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://igexport.com/id/video-download/'
      }
    });

    if (!data || !data.ok || !data.media || !data.media.videoUrl) {
      return Reply('❌ Gagal mendapatkan data dari API.');
    }

    const media = data.media;
    const title = media.filename?.replace('.mp4', '') || 'Instagram Video';
    const mediaUrl = media.videoUrl;

    const mediaRes = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
    const bufferMedia = Buffer.from(mediaRes.data);

    const tmpDir = path.join(__dirname, '..', 'tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
    const outPath = path.join(tmpDir, `ig_${Date.now()}.mp4`);
    fs.writeFileSync(outPath, bufferMedia);

    const caption = `✅ Berhasil download\n\n${title}`;

    await kyuuai.sendMessage(m.chat, {
      video: bufferMedia,
      fileName: `ig_${Date.now()}.mp4`,
      mimetype: 'video/mp4',
      caption: caption
    }, { quoted: m });

    await kyuuai.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
    if (addLimit) addLimit(m.sender, false, false);

  } catch (err) {
    console.error('[INSTA ERROR]', err);
    await kyuuai.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    Reply(`❌ Gagal: ${err.message}`);
  }
};

module.exports.command = ['insta', 'ig', 'igexport'];
module.exports.tags = ['downloader'];
module.exports.help = ['insta <link instagram>'];