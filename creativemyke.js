const TelegramBot = require('node-telegram-bot-api');
const Dropbox = require('dropbox').Dropbox;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Initialize the Telegram Bot
const botToken = process.env.TELEGRAM_BOT_TOKEN
const bot = new TelegramBot(botToken, { polling: true });

console.log('Yes baby i am active 😎')

// Initialize the Dropbox client
const dropboxToken = ''
const dbx = new Dropbox({ accessToken: dropboxToken });

// Handle incoming messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText.startsWith('i want ')) {
    // Extract the requested file name without the extension
    const fileName = messageText.substring(7).trim();

    try {
      // List files in Dropbox folder
      const { entries } = await dbx.filesListFolder({ path: '/content' });
    

      if (entries && entries.length > 0) {
        // Filter files based on the name
        const matchingFiles = entries.filter((entry) =>
          entry.name.toLowerCase().startsWith(fileName.toLowerCase())
        );

        if (matchingFiles.length > 0) {
          // Get the metadata of the first matching file
          const fileMetadata = matchingFiles[0];

          // Download the file from Dropbox
          const filePath = path.join(__dirname, fileMetadata.name); // Use a suitable download path
          await dbx.filesDownload({ path: fileMetadata.path_display })
            .then((response) => {
              fs.writeFileSync(filePath, response.fileBinary, 'binary');
            })
            .catch((error) => {
              console.error('Error downloading file:', error);
              bot.sendMessage(chatId, 'An error occurred while downloading the file.');
            });

          // Send the downloaded file to the user
          bot.sendDocument(chatId, fs.readFileSync(filePath));
          fs.unlinkSync(filePath); // Delete the downloaded file after sending
        } else {
          bot.sendMessage(chatId, 'File not found.');
        }
      } else {
        bot.sendMessage(chatId, 'No files found in Dropbox.');
      }
    } catch (error) {
      console.error('Error:', error);
      bot.sendMessage(chatId, 'An error occurred while processing your request.');
    }
  }

});

bot.on("polling_error", console.log);
