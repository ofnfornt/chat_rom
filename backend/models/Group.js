import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
 name:{type:String,required:true},
 type:{type:String,enum:['group','channel'],default:'group'},
 owner:{type:String,required:true},
 members:[String],
 admins:[String],
 createdAt:{type:Date,default:Date.now}
});

export default mongoose.model('Group',groupSchema);
