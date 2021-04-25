const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://chen:dSWaqN41W6rgbose@cluster0.8i1yh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    //The MongoDB Node.js driver rewrote the tool it uses to parse MongoDB connection strings. Because this is such a big change, they put the new connection string parser behind a flag
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);
