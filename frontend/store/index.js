import { jwtDecode } from 'jwt-decode';

export const state = () => ({
  decodedToken: null
});

export const mutations = {
  SET_DECODED_TOKEN(state, payload) {
    state.decodedToken = payload;
  }
};

export const actions = {
  decodeToken({ commit }) {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      commit('SET_DECODED_TOKEN', decoded);
    }
  }
};

export const getters = {
  getDecodedToken: (state) => {
    return state.decodedToken;
  }
};
