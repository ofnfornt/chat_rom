async function changePassword(){
 const password=document.getElementById('password').value;
 if(!password) return alert('رمز جدید را وارد کنید');
 alert('درخواست تغییر رمز ارسال شد');
}

function enable2FA(){
 alert('فعال سازی تایید دو مرحله‌ای آماده اتصال به Backend است');
}

function logoutAll(){
 localStorage.removeItem('token');
 alert('از همه دستگاه‌ها خارج شدید');
}
