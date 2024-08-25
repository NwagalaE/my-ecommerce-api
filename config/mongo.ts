import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/chat', {
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});