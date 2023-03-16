import { defineStore } from 'pinia';

export const useUserStore = defineStore('counter', {
  state: () => ({
    email: '',
    socket: '',
    auth: false,
    type: '',
  }),
});
