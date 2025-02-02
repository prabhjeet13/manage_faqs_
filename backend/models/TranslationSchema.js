const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
  faq: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FAQ',
    required: true
  },
  language: {
    type: String,
    required: true
  },
  translated_question: {
    type: String,
    required: true
  },
  translated_answer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('FAQTranslation', TranslationSchema);

