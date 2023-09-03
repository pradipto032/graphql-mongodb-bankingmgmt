const { model, Schema } = require('mongoose');

const bankingSchema = new Schema({
    name: String,
    accountNumber: Number,
    balance: Number,
    createdDate: String
})

module.exports = model('Bankaccount', bankingSchema)