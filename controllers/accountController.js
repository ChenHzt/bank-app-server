const { Account } = require('../models/accountModel');
const { TransactionLog } = require('../models/transactionLogModel');

const createAccount = async (req, res) => {
    try {
        const account = new Account({owner:req.body.owner});
        
        await account.save();
        res.status(201).send(account);
    }
    catch (e) {
        res.status(400).send(e);
    }
}


const getAccountDetails = async (req, res) => {
    const _id = req.params.id;
    try {
        const account = await Account.findById(_id);
        if (!account) {
            return res.status(404).send({ error: "No account found" });
        }
        res.send(account);
    } catch (e) {
        res.status(500).send();
    }
}

const makeDeposit = async (req, res) => {
    
    try {
        if (!req.body.amount || req.body.amount < 0) 
            throw new Error('must enter positive amount for depositing')
        const {accountid } = req.params;
        await Account.updateOne({_id :accountid}, {$inc : {'cash' : req.body.amount}})
        const account = await Account.findById(accountid)       
        const newTransaction = new TransactionLog({actionType:'deposit',amount:req.body.amount,account:account._id});
        newTransaction.save();
        return res.status(201).send(account);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }

}

const updateCredit = async (req, res) => {
    try {
        if (!req.body.amount || req.body.amount < 0) 
            throw new Error('must enter positive amount for credit')
        const {accountid } = req.params;
        await Account.updateOne({_id :accountid}, {'credit' : req.body.amount})
        const account = await Account.findById(accountid)        
        return res.status(201).send(account);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }

}

const withdraw = async (req, res) => {

    try {
        if (!req.body.amount || req.body.amount < 0) 
            throw new Error('must enter positive amount to withdraw')
        const {accountid } = req.params;

        const account = await Account.findById(accountid);
        if(account.cash - req.body.amount < account.credit * -1)
            throw new Error(`can't allow the withrdawal. cash and credit run out`)    
        
        await Account.updateOne({_id :accountid}, {$inc : {'cash' : req.body.amount * (-1)}})
        const updatedAccount = await Account.findById(accountid)        
        const newTransaction = new TransactionLog({actionType:'withdraw',amount:req.body.amount,account:account._id});
        newTransaction.save();
        return res.status(201).send(updatedAccount);
    }
    catch (e) {
        return res.status(400).send({ error: e.message });
    }

}

const transfer = async (req, res) => {
    try {
        if (!req.body.amount || req.body.amount < 0) 
            throw new Error('must enter positive amount to transfer')
        const {idFrom } = req.params;
        const {idTo } = req.params;

        const fromAccount = await Account.findById(idFrom);
        const toAccount = await Account.findById(idTo);
        if(fromAccount.cash - req.body.amount < fromAccount.credit * -1)
            throw new Error(`can't allow the withrdawal. cash and credit run out`)    
        
        await Account.updateOne({_id :fromAccount}, {$inc : {'cash' : req.body.amount * (-1)}})
        await Account.updateOne({_id :toAccount}, {$inc : {'cash' : req.body.amount }})
        const updatedFromAccount = await Account.findById(idFrom);
        const updatedToAccount = await Account.findById(idTo);
        const newTransactionTransfer = new TransactionLog({actionType:'transfer',amount:req.body.amount,account:fromAccount._id});
        newTransactionTransfer.save();
        const newTransactionRecive = new TransactionLog({actionType:'recive',amount:req.body.amount,account:toAccount._id});
        newTransactionRecive.save();
        return res.status(201).send({from:updatedFromAccount,to:updatedToAccount});
    }
    catch (e) {
        return res.status(400).send({ error: e.message});
    }

}

module.exports = {
    getAccountDetails,
    makeDeposit,
    updateCredit,
    withdraw,
    transfer,
    createAccount
    
}