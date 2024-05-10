import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    app: {
      version: '0.0.1',
      environment: 'development',
    },
    setting: {
      cookies: {
        options: {},
      },
    },
    server: {
      address: 'https://customstory.online/',
    },
    api: {
      address: 'https://customstory.online/api/',
    },
    timeout: {
      api: {
        response: 10000,
        error: {
          low: 2000,
          medium: 3000,
          high: 3500,
        },
      },
    },

    playersCount: 0,

    socket: null,
  }),
  actions: {
    getAjaxUri(data) {
      return this.api.address + data
    },
  },
})
