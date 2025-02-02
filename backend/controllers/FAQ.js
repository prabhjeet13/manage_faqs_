const FAQ = require('../models/FaqSchema');
const FAQTranslation = require('../models/TranslationSchema');
const {translate} = require("@vitalets/google-translate-api");
require('dotenv').config();


const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 8001;
let client;
// let set_async;
// let get_async;
(
    async()=> {
        client = redis.createClient({
            host: '127.0.0.1', port: 6379
        });
        
        client.connect()
        .then(() => console.log("Connected to Redis"))
        .catch((err) => console.error("Redis connection error:", err));
        
    }
)();

exports.add = async (req,res) => {

    try {     
        const {question,answer} = req.body;

        if(!question || !answer)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }


        const details = await FAQ.create({
            question,
            answer,
        })

        return res.status(201).json({
            success : true,
            message : 'created',
            details : details,
        });


    }catch(error)
    {
        return res.status(500).json({
            success : false,
            message : 'internal server error',
        });
    }
}
exports.edit = async (req,res) => {

    try {     
        const {faqid,question,answer} = req.body;

        if(!question || !answer || !faqid)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }


        const details = await FAQ.findByIdAndUpdate({_id : faqid},{
            question,
            answer,
        },{new : true});

        return res.status(200).json({
            success : true,
            message : 'edit',
            details : details,
        });


    }catch(error)
    {
        return res.status(500).json({
            success : false,
            message : 'internal server error',
        });
    }
}
exports.getall = async (req,res) => {

    try {     
        
        const details = await FAQ.find({});

        return res.status(200).json({
            success : true,
            message : 'fetched all',
            details : details,
        });


    }catch(error)
    {
        return res.status(500).json({
            success : false,
            message : 'internal server error',
        });
    }
}
exports.getById = async (req,res) => {

    try {     
        
        const {faqid} = req.body;

        if(!faqid)
        {
                return res.status(404).json({
                    success : false,
                    message : 'give all details',
                });
        }

        const details = await FAQ.findById({_id : faqid});

        return res.status(200).json({
            success : true,
            message : 'fetch hogya',
            details : details,
        });


    }catch(error)
    {
        return res.status(500).json({
            success : false,
            message : 'internal server error',
        });
    }
}
exports.deletefaq = async (req,res) => {

    try {     
        
        const {faqid} = req.params;

        if(!faqid)
        {
                return res.status(404).json({
                    success : false,
                    message : 'give all details',
                });
        }

        await FAQ.findByIdAndDelete({_id : faqid});

        return res.status(200).json({
            success : true,
            message : 'delete hogya',
        });


    }catch(error)
    {
        return res.status(500).json({
            success : false,
            message : 'internal server error',
        });
    }
}
exports.translateFAQ = async (req, res) => {
    try {
          const { faqid } = req.body;
          const { lang } = req.query; 
          if (!faqid || !lang) {
          return res.status(400).json({ message: "FAQ ID and language are required!" });
          }
  
          const redisKey = `faq_${faqid}_lang_${lang}`;
  
          const data = await client.get(redisKey);
          
          if(data)
          {
              return res.status(200).json({
                  success: true,
                  message: 'Fetched from cache',
                  details: JSON.parse(data),
              });
          }
                  
          const existingTranslation = await FAQTranslation.findOne({faq : faqid,language : lang});
          if (existingTranslation) {
              await client.set(redisKey,JSON.stringify(existingTranslation));    
              return res.status(200).json({
                  success : true, 
                  message : 'translated',
                  details : existingTranslation,
              });
          }   
  
          const faq = await FAQ.findById({_id : faqid});
          if (!faq) {
          return res.status(404).json({ message: "FAQ not found!" });
          }
  
  
          try {
  
              const translatedQuestion = await translate(faq.question, { to: lang });
              const translatedAnswer = await translate(faq.answer, { to: lang });
  
                  const newTranslation = new FAQTranslation({
                      faq : faqid,
                      language : lang,
                      translated_question: translatedQuestion.text,
                      translated_answer: translatedAnswer.text,
                  });
          
                  await newTranslation.save();
                  await client.set(redisKey,JSON.stringify(newTranslation));    
                  return res.status(201).json({
                          success: true,
                          message : 'translated success',
                          details :  newTranslation,
                  });
           }catch(error)
           {
                   return res.status(201).json({
                      success: true,
                      message : 'translated success',
                      details :  {
                          translated_question: faq.question,
                          translated_answer: faq.answer
                      }
                  });            
           }     
    }catch(error)
    {
          return res.status(500).json({
              success : false,
              message : 'internal server error',
              e : `${error}`
          });
    } 
  }


