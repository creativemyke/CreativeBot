const TelegramBot = require('node-telegram-bot-api');
const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

// Initialize your Telegram bot
telegramToken = process.env.TELEGRAM_BOT_TOKEN
const token = telegramToken;
const bot = new TelegramBot(token, { polling: true });
console.log('Yes baby i am active 😎')

let story = `Once upon a time in Lagos, Nigeria, there lived a young and passionate software developer named Nkem. From a young age, Nkem had been fascinated by computers and technology. He spent countless hours in the small internet cafe near his home, absorbing as much knowledge as he could about programming and software development. 

Nkem's family didn't have much money, but they recognized his talent and determination. They scraped together what they could to buy him a second-hand laptop, and Nkem seized the opportunity with both hands. He started learning to code, experimenting with different programming languages, and building small projects in his free time.

As he honed his skills, Nkem became involved in local tech communities and attended meetups. He discovered a thriving tech scene in Lagos, full of passionate individuals who, like him, dreamed of making a mark in the tech world. Nkem was particularly inspired by the success stories of Nigerian developers who had made it big internationally.

One day, Nkem read about a tech startup competition called the "African Innovators Challenge." The prize was a trip to Silicon Valley, a place he had only dreamed of visiting. With the encouragement of his family and friends, he decided to enter the competition, believing that this might be his chance to break through.

Nkem worked tirelessly on his project, a mobile app designed to solve a local problem. He poured his heart and soul into it, drawing inspiration from the challenges he had faced growing up in Lagos. As the submission deadline approached, he submitted his entry with hope in his heart but without any expectations.

To his astonishment, Nkem's project was selected as one of the finalists. He was invited to pitch his idea in front of a panel of judges and an audience of tech enthusiasts. Nkem stood on that stage, nerves and excitement coursing through him, and delivered a passionate pitch that left the audience in awe. His project won first place, earning him a ticket to Silicon Valley and a chance to turn his dreams into reality.

Nkem's journey to Silicon Valley was nothing short of transformative. He immersed himself in the vibrant tech ecosystem, meeting brilliant minds, attending conferences, and networking with influential people. His passion, talent, and unique perspective as a Nigerian developer caught the attention of several tech companies.

One day, while attending a networking event, Nkem met a group of entrepreneurs who were impressed by his work and vision. They offered him a position at their startup in Silicon Valley, and Nkem didn't hesitate to accept. With his exceptional coding skills and determination, he quickly became an invaluable member of the team.

Years passed, and Nkem continued to thrive in the heart of Silicon Valley. He contributed to the development of groundbreaking technologies, launched his own startup, and even mentored aspiring developers from Nigeria and across Africa. Nkem had come a long way from the internet cafe in Lagos, but he never forgot his roots.

Nkem's journey from Lagos to Silicon Valley was not just about personal success; it was a testament to the power of talent, determination, and the boundless possibilities that the world of technology offers. He remained committed to making a positive impact on both his local community and the global tech industry, proving that dreams could indeed come true, no matter where you start.`;


// Listen for incoming messages
// Listen for incoming messages
bot.on('message', (msg) => {
  const messageText = msg.text ? msg.text.toLowerCase() : '';

  // Check if the message text contains "hey"
  if (messageText.includes('hey')) {
    // Respond with "hi"
    bot.sendMessage(msg.chat.id, 'hi');
  }

  // Check if the message text contains "tell me"
  if (messageText.includes('tell me a story')) {
    // Extract the question from the message
    const question = messageText.replace('tell me', '').trim();
    
    // Respond with an answer to the question
    bot.sendMessage(msg.chat.id, `${story}`);
  }

  if (messageText === 'send file') {
    // Send a file from the internet
    const fileUrl = './6.png'; // Replace with the URL of your file
    bot.sendDocument(chatId, fileUrl);
  }

});

bot.on("polling_error", console.log);













