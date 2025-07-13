const express = require("express");
const router = express.Router();
const Message = require('../models/Message.model');



router.get("/", (req, res) => {
    res.json({ message: "Hello World" });
    });

router.get("/messages", async (req, res) => {
   const messages = await Message.find().sort({ timestamp: 1 });
   res.json(messages);
});

router.get("/messages/:room",async(req,res)=>{
    const room = req.params.room;
    const messages = await Message.find({room}).sort({timestamp:1});
    res.json(messages);
});


module.exports = router;