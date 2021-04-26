const express = require("express");

const router = new express.Router();

const { createUser, getUsers, getUserLoggedIn,login,logout, getUserDetails} = require("../controllers/userController");
const { getAccountDetails, getUserAccounts, makeDeposit,updateCredit, withdraw,transfer, createAccount} = require("../controllers/accountController");
const { getTransactions} = require("../controllers/transactionsLogController");
const auth = require('../middlewares/auth')

//get list of users
router.get("/api/users", getUsers); //permission for admins

//create new user
router.post("/api/users", createUser) //permission to all v

//login user
router.post("/api/users/login", login) //permission to all v

//login user
router.post("/api/users/logout", auth, logout) //permission to user logged in v

//get user details
router.get("/api/users/:id", auth , getUserDetails); //permission for admin

//get user logged in
router.get("/api/users/me", auth , getUserLoggedIn); //permission for user logged in v

//create new account
router.post("/api/accounts", auth ,createAccount); //permission for user logged in v

//get account details
router.get("/api/accounts/:id", auth ,getAccountDetails); //permission for admin

//get all users account
router.get("/api/accounts", auth ,getUserAccounts); //permission for user logged in v

//deposit cash to user
router.patch("/api/accounts/:accountid/deposit",auth , makeDeposit); //permission for user logged in v

//update user's credit
router.patch("/api/accounts/:accountid/credit",auth , updateCredit); //permission for user logged in v

//withdraw from user cash
router.patch("/api/accounts/:accountid/withdraw",auth , withdraw); //permission for user logged in v

//transfer money
router.post("/api/transfer/:idFrom/:idTo", auth ,transfer);//permission for user logged in v

//get transactions of account
router.get("/api/accounts/:id/transactions", auth , getTransactions); //permission for user logged in

module.exports = router;