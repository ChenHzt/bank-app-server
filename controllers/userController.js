const { User } = require('../models/userModel');
const { Account } = require('../models/accountModel');
const { TransactionLog } = require('../models/transactionLogModel');
// const { loadUsers, saveUsers, findDuplicates, getUser, updateUser } = require('../db/dbHandler');

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const account = new Account({owner:newUser._id});
        
        await newUser.save();
        await account.save();
        res.status(201).send(newUser);
    }
    catch (e) {
        res.status(400).send(e);
    }
}


const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users);
        
        res.send(users);
    } catch (e) {
        res.status(500).send(e.message);
    }
}

const getUserDetails = async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send({ error: "No user found" });
        }
        const accounts = await Account.find({owner:_id});
        res.send({user,accounts});
    } catch (e) {
        res.status(500).send();
    }
}

module.exports = {
    createUser,
    getUsers,
    getUserDetails,
    
}