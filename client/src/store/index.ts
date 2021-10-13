import axios from 'axios';
import { createStore } from 'vuex';
import router from '@/router';

axios.defaults.baseURL = 'http://localhost:7000/api/v1/';

export default createStore({
  state: {
    token: localStorage.getItem('access_token') || null,
    flights: '',
  },

  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
  },

  mutations: {
    signIn(state, token) {
      state.token = token;
    },

    logOut(state) {
      state.token = null;
    },
  },

  actions: {
    signUp(context, data) {
      axios
        .post('auth/signup', data, { withCredentials: true })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    logOut(context) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + context.state.token;

      if (context.getters.loggedIn) {
        axios
          .post('auth/logout')
          .then((response) => {
            localStorage.removeItem('access_token');
            context.commit('logOut', null);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    signIn(context, data) {
      axios
        .post('auth/signin', data, { withCredentials: true })
        .then((response) => {
          const access_token = JSON.stringify(response.data);
          localStorage.setItem('access_token', access_token);
          context.commit('signIn', access_token);
          router.push('/');
          console.log(response);
        })
        .catch((error) => {
          localStorage.removeItem('access_token');
          console.log(error);
        });
    },

    searchFligts(context, data) {
      // axios
      //   .post('auth/signIn', data, { withCredentials: true })
      //   .then((response) => {
      //     const access_token = JSON.stringify(response.data);
      //     localStorage.setItem('access_token', access_token);
      //     context.commit('signIn', access_token);
      //     router.push('/');
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     localStorage.removeItem('access_token');
      //     console.log(error);
      //   });
    },
  },

  modules: {},
});
