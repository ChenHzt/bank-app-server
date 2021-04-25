const cors = require("cors");
const express = require("express");
const path = require("path");

const app = express();

require("./db/mongoose");
const userRouter = require("./routers/users.js");

// const publicDirectory = path.join(__dirname, 'client/build');
// app.use(express.static(publicDirectory));

app.use(express.json());
app.use(cors());
app.use("/api",userRouter);

// app.get("*", (req, res) => {
//   console.log(req);
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
