const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var missionsSchema = mongoose.Schema({
    name: String,
    description: String,
    maxPrice: Number,
    zip: Number,
    address: String,
    locationX: Number,
    locationY: Number,
    creatorId: Number,
    helperId: Number,
    supporterId: Number,
    paymentMethod: { type: Schema.Types.ObjectId, ref: 'PaymentMethod'},
    status: { type: Schema.Types.ObjectId, ref: 'Status'},
    karmaPoints: Number,
    category:  { type: Schema.Types.ObjectId, ref: 'Category'},
    paymentStatus: String,
    isReviewed: Boolean,
    checkList: [
        {
            name: String,
            quantity: Number,
            checked: Boolean
        }
    ],
    receipts: [
        {
            name: String,
            createdAt: Date,
            url: String
    }
]},  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('Mission', missionsSchema);