import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
 filename:String,
 url:String,
 type:String,
 createdAt:{type:Date,default:Date.now}
});

export default mongoose.model('File',FileSchema);
