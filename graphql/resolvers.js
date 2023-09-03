const Bankaccount = require('../models/Bankaccount');

module.exports = {
    Query: {
        async getBankdetails(_, {accountNumber}) {
            return await Bankaccount.findOne({accountNumber: accountNumber});
        },
        async transaction(_, {toAccount, fromAccount, moneyAmount}) {
            const toAccountDetails = await Bankaccount.findOne({accountNumber: toAccount});
            const fromAccountDetails = await Bankaccount.findOne({accountNumber: fromAccount});

            if(fromAccountDetails.balance < moneyAmount) {
                return "Insufficient funds";
            }
            else
            {
                toAccountDetails.balance = toAccountDetails.balance+moneyAmount;
                fromAccountDetails.balance = fromAccountDetails.balance-moneyAmount;
                await toAccountDetails.save();
                await fromAccountDetails.save();
            } 
            return "Money transferred";
        }
    },
    Mutation: {
        async createBankdetails(_, {bankdetailsInput: {name, balance}}) {
            const newBankUser = new Bankaccount({
                name,
                accountNumber: Math.ceil(Math.random()*10000000),
                balance,
                createdDate: new Date().toISOString()
            })
            const res = await newBankUser.save();

            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteBankdetails(_, { id }) {
            const del = (await Bankaccount.deleteOne({_id: id})).deletedCount;
            return del;
        },
        async updateBankdetails(_, { id, bankdetailsInput: {name,balance}}) {
            console.log("id, name, balance");
            console.log(name, balance, "asdasd");
            const up = (await Bankaccount.updateOne({_id: id}, {name: name, balance: balance})).modifiedCount;
            return up;
        }
    }
}