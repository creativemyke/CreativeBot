const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios'); // Import Axios
const fs = require('fs');
require('dotenv').config();

// ... (Other code remains the same)

// URL of the JSON file hosted on GitHub
const messageMappingUrl = process.env.MESSAGE_MAPPING_URL;

// Function to fetch messageMapping data from the JSON file
async function fetchMessageMappingData() {
  try {
    const response = await axios.get(messageMappingUrl);
    return response.data; // Return the JSON data
  } catch (error) {
    console.error('Error fetching messageMapping data:', error.message);
    return {}; // Return an empty object in case of an error
  }
}

// Initialize your Telegram bot
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const token = telegramToken;
const bot = new TelegramBot(token, { polling: true });
console.log('Yes, the bot is active 😎');

// ...

// Modify your bot.on('message', (msg) => { ... }) block to use the fetched data
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text ? msg.text.toLowerCase() : '';

  // Fetch messageMapping data from the JSON file
  const messageMappingData = await fetchMessageMappingData();

  // Check if the received message is in the messageMapping object
  if (messageText in messageMappingData) {
    const { response, fileUrl } = messageMappingData[messageText];

    // Send the response back to the user
    bot.sendMessage(chatId, response);

    // Check if there is an associated file URL
    if (fileUrl) {
      // Send the file as a document
      bot.sendDocument(chatId, fileUrl)
        .then(() => {
          console.log('File sent successfully');
        })
        .catch((error) => {
          bot.sendMessage(chatId, 'Damn seems the file is missing, contact me: @creativemyke ')
          console.error('Error sending file:', error.message);
        });
    }
  } else {
    // If the message doesn't match any predefined response, you can handle it differently
    bot.sendMessage(chatId, "I'm sorry, I don't understand that message.");
  }
});

bot.on("polling_error", console.log);
