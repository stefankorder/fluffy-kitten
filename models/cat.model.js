import mongoose from 'mongoose';

const kittySchema = { name: String, fur: String, lives: Number };
const Cat = mongoose.model('KittyCat', kittySchema);

export default Cat;