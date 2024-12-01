const express = require("express");
// const { getAllDiaryEntries, getDiaryByDate, saveOrUpdateDiary } = require("../controllers/dairyController");
const router = express.Router();
const {getDb} = require('../db')

// // Import the DiaryEntry model directly
// const DiaryEntry = require("../models/DiaryEntry");

// // Get all diary entries
// router.get("/", getAllDiaryEntries);

// // Get a diary entry by date
// router.get("/:date", getDiaryByDate);

// // Save or update a diary entry
// router.post("/", saveOrUpdateDiary);

// // Handle invalid routes for this module
// router.use((req, res) => {
//   res.status(404).json({ message: "Invalid route" });
// });
router.post('/addDiary', async (req, res) => {
     try {
       const { text, date, email } = req.body;
       const userCollections = getDb('diary');
   
       const filter = { email, date };
       const update = { $set: { text, email, date } };
       const options = { upsert: true };
   
       await userCollections.updateOne(filter, update, options);
   
       res.status(200).json({ success: true, msg: 'Diary added/updated successfully!' });
     } catch (error) {
       res.status(400).json({ success: false, msg: error.message });
     }
   });
   

router.post('/fetchDiary',async(req,res)=>{
    try {
     const {email}=req.body;
     const userCollections=getDb('diary');
     const response=await userCollections.find({email}).toArray();
     res.status(200).json({msg:response});

    } catch (error) {
     return res.status(400).json({msg:error});
    }
});


router.post('/dayFetch',async(req,res)=>{
   try {
     const {date, email}=req.body;
   const userCollections=getDb('diary');
   const response=await userCollections.findOne({email,date});
   res.status(200).json({msg:response});
   } catch (error) {
     return res.status(400).json({msg:error});
   }
})
module.exports = router;