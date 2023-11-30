import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  SelectOption: String,
  agreed: Boolean,
  created_at: Date
});

const OptionSchema = new mongoose.Schema({
  label: String,
  value: String,
})
  
export const User = mongoose.model('User', userSchema);
export const Options = mongoose.model('Options', OptionSchema);



