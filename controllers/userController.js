const { User } = require('../models/userModel');
const { Account } = require('../models/accountModel');
const { TransactionLog } = require('../models/transactionLogModel');
// const { loadUsers, saveUsers, findDuplicates, getUser, updateUser } = require('../db/dbHandler');

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const account = new Account({owner:newUser._id});
        
        await newUser.save();
        const token = await newUser.generateAuthToken()

        await account.save();
        res.status(201).send({newUser,token});
    }
    catch (e) {
        res.status(400).send(e);
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email,req.body.passportId, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
}

const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
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
    console.log("dddddddddddddd");
    res.send(req.user)
}

const getUserLoggedIn = async (req, res) => {
    res.send(req.user)
}

module.exports = {
    createUser,
    getUsers,
    getUserDetails,
    getUserLoggedIn,
    login,
    logout
    
}