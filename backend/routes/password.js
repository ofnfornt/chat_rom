import bcrypt from 'bcrypt';

export default function passwordRoutes(app, User){
 app.post('/api/account/change-password', async (req,res)=>{
  try{
   const {userId,currentPassword,newPassword}=req.body;
   const user=await User.findById(userId);
   if(!user) return res.status(404).json({error:'User not found'});

   const valid=await bcrypt.compare(currentPassword,user.password);
   if(!valid) return res.status(400).json({error:'Current password is incorrect'});

   user.password=await bcrypt.hash(newPassword,12);
   await user.save();

   res.json({success:true,message:'Password changed'});
  }catch(e){
   res.status(500).json({error:e.message});
  }
 });
}
