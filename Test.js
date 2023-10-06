const axios = require('axios');
const fs = require('fs');

// URL of the raw JSON file on GitHub
const githubJsonUrl = 'https://raw.githubusercontent.com/creativemyke/Bot-JSON/main/Data.JSON?token=GHSAT0AAAAAACHC5UPPXRQJN6QVXGTYQTY4ZI77VSA';

// Simulate a received message (you would get this from your bot)
const receivedMessage = 'meatpie';

// Fetch the JSON file from GitHub
axios.get(githubJsonUrl)
  .then((response) => {
    // Parse the JSON data from the response
    const messages = response.data;

  console.log(messages)
  });



  ////////

  const messageToRespond = {
    'instagram': 'https://media1.giphy.com/media/3bc9YL28QWi3pYzi1p/giphy.gif',
    
    'twitter': './file2.png',
  
    // Add more commands and responses as needed
  };



  // Check if the message text matches any key in the messageToRespond
  if (messageText in messageToRespond) {

  
  // Get the associated response
  const response = messageToFileMap[messageText];

  // Send the response
  bot.sendMessage(chatId, response)
  .then(() => {
    console.log('Responded');
  })
  .catch((error) => {
    bot.sendMessage(chatId, 'you can reach out to me directly @creativemyke on all social platforms ')
    console.error('Error Responding:', error.message);
  });
}