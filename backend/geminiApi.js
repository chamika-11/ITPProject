//AIzaSyATxlkzFR0c4APG79I1CKXJs8QufkCv3oU
require ("dotenv/config");

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 0.4,
    topP: 0.90,
    topK: 50,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
      history: [{
        role: "user",
        parts:[
          {
            text: "Your are chat assistant for a clinical management system. only answer questions realted to medical and hospital.and if user ask about medical or hospital realted question give them simple and short answers.if user ask any unrelated question, then say 'I am not able to answer this question,please ask only about medical realted questions'",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Okay,I'm ready to answer your medical and hospital questions.ask me anything about that",
          },
        ],
      }],
      
    });
  
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }
  
  //run();
  module.exports = run;