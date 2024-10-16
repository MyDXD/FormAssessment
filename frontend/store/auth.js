// store/auth.js
export const state = () => ({
    loggedIn: false, // สถานะล็อกอินเริ่มต้น
  });
  
  export const mutations = {
    login(state) {
      state.loggedIn = true; // เปลี่ยนสถานะล็อกอิน
    },
    logout(state) {
      state.loggedIn = false; // เปลี่ยนสถานะออกจากระบบ
    },
  };
  