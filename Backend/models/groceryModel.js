const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({

    groceryItem: {
        type: String,
        required: true
    },
    isPurchased: {
        type: Boolean,
        required: true,
        default: false
    }

}, { versionKey: false });

module.exports= mongoose.model('GroceryItem', grocerySchema);

