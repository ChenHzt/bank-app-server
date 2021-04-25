const express = require("express");

const router = new express.Router();

const { createUser, getUsers, getUserDetails} = require("../controllers/userController");
const { getAccountDetails, makeDeposit,updateCredit, withdraw,transfer, createAccount} = require("../controllers/accountController");
const { getTransactions} = require("../controllers/transactionsLogController");

//get list of users
router.get("/api/users", getUsers);

//create new user
router.post("/api/users", createUser)

//get user details
router.get("/api/users/:id/", getUserDetails);

//create new account
router.post("/api/accounts", createAccount);

//get account details
router.get("/api/accounts/:id/", getAccountDetails);

//deposit cash to user
router.patch("/api/accounts/:accountid/deposit", makeDeposit);

//update user's credit
router.patch("/api/accounts/:accountid/credit", updateCredit);

//withdraw from user cash
router.patch("/api/accounts/:accountid/withdraw", withdraw);

//transfer money
router.post("/api/transfer/:idFrom/:idTo", transfer);

//get transactions of account
router.get("/api/accounts/:id/transactions", getTransactions);

module.exports = router;