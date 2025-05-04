require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const axios = require('axios');
const app = express();

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID1 = process.env.CHAT_ID;
const CHAT_ID2 = process.env.CHAT_ID_2;

async function sendTelegramMessage(message, chat_id) {
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await axios.post(telegramUrl, {
        chat_id: chat_id,
        text: message,
    });
}

app.get('/track-open', async (req, res) => {
    const userEmail = req.query.email;
    const timestamp = new Date().toISOString();

    const logMessage = `📧 Email opened by: ${userEmail}\n🕒 Time: ${timestamp}`;
    console.log(logMessage);

    try {
        await sendTelegramMessage(logMessage, CHAT_ID1);
        await sendTelegramMessage(logMessage, CHAT_ID2);
        console.log('Telegram message sent successfully');

        const imageUrl = 'https://mail-check.tech/MailCheck.png';
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    
        res.setHeader('Content-Type', 'image/png');
        res.send(response.data);
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).send('Something went wrong');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
