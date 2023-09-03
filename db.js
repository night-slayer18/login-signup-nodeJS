const mongoose = require('mongoose');


// Connect to MongoDB
module.exports = () => {
  mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('could not connect to DB',err));
}