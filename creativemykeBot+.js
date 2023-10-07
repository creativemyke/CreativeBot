const TelegramBot = require('node-telegram-bot-api');
const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

// Initialize your Telegram bot
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;; // Replace with your bot token
const token = telegramToken;
const bot = new TelegramBot(token, { polling: true });
console.log('Yes, the bot is active 😎');



// Define an object that maps message texts to responses and file URLs
const messageMapping = {
  'howdy': {
    response: `Howdy there!`,
    fileUrl: null, // No associated file
  },
  'how are you?': {
    response: 'I am good just chilling here?',
    fileUrl: null, // No associated file
  },
  '/start': {
    response: 'Glad to have you ',
    fileUrl: null, // No associated file
  },
  'bye': {
    response: 'Goodbye! Have a great day!',
    fileUrl: null, // No associated file
  },
  'hello': {
    response: 'hi there 😎',
    fileUrl: 'https://media1.giphy.com/media/3bc9YL28QWi3pYzi1p/giphy.gif',
  },
  'tell me a story': {
    response: 'Sure, check this out ',
    fileUrl: './file2.png',
  },
  'instruction': {
    response: 'Enjoy!',
    fileUrl: 'https://cdn.discordapp.com/attachments/1153612823985926146/1159815408346480640/CTA-2023.pdf?ex=65326545&is=651ff045&hm=437edb56debe7804a22f9e6922f3a51419416dd6192a0839a1f13179920eaa2f&',
  },
  'meatpie': {
    response: 'Here you go 😎',
    fileUrl: 'https://cdn.discordapp.com/attachments/1146798890222362635/1159522272143491113/Meatpie.jpg?ex=65315444&is=651edf44&hm=a4c446faf2c1a39b2a696f4a1aa3dbc7f100fd1bd7afdaf24141a573d12c565d&',
  },
  'characters': {
    response: 'Enjoy!',
    fileUrl: 'https://cdn.discordapp.com/attachments/1146798890222362635/1159822663137636362/Characters.zip?ex=65326c07&is=651ff707&hm=fc80e66cb457c4f5000f6ec5813151eeca292f691663ce97b1a9c7471c5919d6&',
  },
  // Add more message text and file URL pairs as needed
};


// Listen for the /start command or any message
bot.onText(/\/start/, (msg) => {
  const userName = msg.from.first_name; // Access the user's first name
  const chatId = msg.chat.id;
  

  // Send a welcome message when the user starts the bot
  const welcomeMessage = `Welcome, ${userName}! I'm Creativemyke. Welcome to a world of infinite possibilities?`;
  bot.sendMessage(chatId, welcomeMessage);
});

// Listen for incoming messages
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text ? msg.text.toLowerCase() : '';

  // Check if the received message is in the messageMapping object
  if (messageText in messageMapping) {
    const { response, fileUrl } = messageMapping[messageText];

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
