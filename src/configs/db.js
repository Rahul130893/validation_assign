const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
   // "mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority"
    "mongodb+srv://rahul12345:rahul12345@cluster0.xnru5.mongodb.net/testconnect?retryWrites=true&w=majority"

  );
};
