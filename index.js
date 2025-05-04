require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const axios = require('axios');
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

async function sendTelegramMessage(message) {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await axios.post(telegramUrl, {
        chat_id: CHAT_ID,
        text: message,
    });
}

app.get('/track-open', async (req, res) => {
    const userEmail = req.query.email;
    const timestamp = new Date().toISOString();

    const logMessage = `📧 Email opened by: ${userEmail}\n🕒 Time: ${timestamp}`;
    console.log(logMessage);

    try {
        await sendTelegramMessage(logMessage);
    } catch (err) {
        console.error('Telegram message failed:', err.message);
    }

    const pixel = Buffer.from(
        'R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
        'base64'
    );
    res.setHeader('Content-Type', 'image/gif');
    res.send(pixel);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
