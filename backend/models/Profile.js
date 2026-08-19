import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 displayName:{type:String,default:'User'},
 bio:{type:String,default:''},
 avatar:{type:String,default:''},
 status:{type:String,default:'online'},
 updatedAt:{type:Date,default:Date.now}
});

export default mongoose.model('Profile',ProfileSchema);
