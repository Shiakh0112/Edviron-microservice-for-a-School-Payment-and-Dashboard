  require('dotenv').config({ path: '.env' });
  const mongoose = require('mongoose');
  const app = require('./app');

  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI;

  console.log('Environment variables loaded:');
  console.log('PORT:', PORT);
  console.log('MONGO_URI:', MONGO_URI ? 'Found' : 'Missing');

  if (!MONGO_URI) {
    console.error('MongoDB connection string is missing. Please check your .env file');
    process.exit(1);
  }

  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });