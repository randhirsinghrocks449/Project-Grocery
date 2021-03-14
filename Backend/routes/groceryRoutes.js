const express = require('express');
const GroceryItem = require('../models/groceryModel');
const router = express.Router();

router.post('/add', (req, res) => {
    var saveGroceryData = new GroceryItem({
        groceryItem: req.body.groceryItem,
        isPurchased:req.body.isPurchased
    });

    saveGroceryData.save().then((docs) => {
        console.log("Success", docs);
        res.json({ result: "success" });
    }, (err) => {
        console.log(err);
    });
})

router.get('/getAll', (req, res) => {
    GroceryItem.find().then((data) => res.json(data))
})
   
router.put('/updatePurchaseStatus', (req, res) => {
    GroceryItem.findOneAndUpdate({ _id: req.body._id }, { isPurchased: req.body.isPurchased }, { returnOriginal: false }).then((data) => {
        res.json({result:"success"})
    })
});
router.delete('/deleteGroceryItem',(req, res) => {
    GroceryItem.deleteOne({ _id: req.body._id }).then((result) => {
        res.json({result:"success"})
    })
});

module.exports=router;