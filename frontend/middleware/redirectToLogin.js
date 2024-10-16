import {jwtDecode} from 'jwt-decode';

export default function ({ redirect }) {
  if (process.client) {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return redirect('/login');
    }

    // ตรวจสอบการหมดอายุของ token (JWT)
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // เปลี่ยนเวลาปัจจุบันเป็น seconds
    if (decodedToken.exp < currentTime) {
      // ถ้า token หมดอายุ
      localStorage.removeItem('token');  // ลบ token ที่หมดอายุ
      return redirect('/login');
    }
  }
}
