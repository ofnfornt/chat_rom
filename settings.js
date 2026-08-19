function saveProfile(){
 const profile={
  username:document.getElementById('username').value,
  displayName:document.getElementById('displayName').value,
  bio:document.getElementById('bio').value
 };
 localStorage.setItem('profile',JSON.stringify(profile));
 alert('پروفایل ذخیره شد');
}

const avatar=document.getElementById('avatar');
avatar?.addEventListener('change',e=>{
 const file=e.target.files[0];
 if(file) document.getElementById('avatarPreview').src=URL.createObjectURL(file);
});
