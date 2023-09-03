const { gql } = require('apollo-server');

module.exports = gql`
    type Bankdetails {
        accountNumber: Int
        name: String
        balance: Int
        createdDate: String
    }

    input BankdetailsInput {
        name: String
        balance: Int
    }

    type Query {
        getBankdetails(accountNumber: Int!): Bankdetails!,
        transaction(toAccount: Int!, fromAccount: Int!, moneyAmount: Int!): String!
    }

    type Mutation {
        createBankdetails(bankdetailsInput: BankdetailsInput!): Bankdetails,
        deleteBankdetails(id: ID!): Boolean,
        updateBankdetails(id: ID!, bankdetailsInput: BankdetailsInput!): Boolean
    }
`