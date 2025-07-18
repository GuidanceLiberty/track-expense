const mongoos = require('mongoose')

const Schema = mongoos.Schema;

// categories
const categories_model = new Schema({
    type:{ type: String, default: "Investment"},
    color: {type: String, default: '#FCBE44'}
});

//transactions
const transaction_model = new Schema({
    name: {type: String, default: "Anonymous"},
    type: {type: String, default: "Investment"},
    amount: {type: Number},
    date: { type: Date, default: Date.now}
})

const Categories = mongoos.model('categories', categories_model)
const Transaction = mongoos.model('transaction', transaction_model);

exports.default = Transaction;
module.exports = {
    Categories,
    Transaction
}