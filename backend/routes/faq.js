const express = require('express');
const router = express.Router();
const { getall, add, getById, edit, deletefaq ,translateFAQ} = require('../controllers/FAQ');
const {auth,isAdmin} = require('../middlewares/Auth');
router.post('/getbyid',getById);
router.post('/createfaq',auth,isAdmin,add);
router.post('/editfaq',auth,isAdmin,edit);
router.get('/getallfaqs',getall);
router.post('/deletefaq/:faqid',auth,isAdmin,deletefaq);

router.post('/translatefaq',translateFAQ);
module.exports = router;

