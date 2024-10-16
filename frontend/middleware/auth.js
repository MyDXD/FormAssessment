// middleware/auth.js
export default function ({ store, redirect }) {
    // ตรวจสอบสถานะการล็อกอินจาก Vuex store
    if (!store.state.auth.loggedIn) {
      return redirect('/login'); // ถ้ายังไม่ล็อกอินให้ redirect ไปหน้า /login
    }
  }
  