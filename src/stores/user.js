import { defineStore } from 'pinia'
import { Cookies, Loading, Notify } from 'quasar'
import { api } from 'boot/axios'
import { useRouter } from 'vue-router'
import { useGlobalStore } from './global'

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '',
    password: '',
    auth: false,
    type: '',
  }),
  actions: {
    onAuthorization() {
      const $router = useRouter()
      const storeGlobal = useGlobalStore()
      if (Cookies.has('email') && Cookies.has('password')) {
        Loading.show()
        api({
          method: 'post',
          url: storeGlobal.getAjaxUri('user/authorization'),
          data: {
            email: Cookies.get('email'),
            password: Cookies.get('password'),
          },
          timeout: storeGlobal.timeout.api.response,
          responseType: 'json',
        })
          .then((response) => {
            if (response.data.success) {
              if (response.data.registration) {
                this.$patch({
                  email: Cookies.get('email'),
                  password: Cookies.get('password'),
                })
                switch (response.data.type) {
                  case 'code_write': {
                    $router.push('UserRegistrationCode')
                    break
                  }
                  case 'history_read': {
                    $router.push('UserRegistrationTimeHistory')
                    break
                  }
                  case 'hero_create': {
                    $router.push('UserRegistrationHeroCreate')
                    break
                  }
                }
              } else {
                this.$patch({
                  auth: true,
                  email: Cookies.get('email'),
                  password: Cookies.get('password'),
                  type: response.data.type,
                })
                $router.push('UserProfile')
                this.setSocket()
              }
            } else {
              $router.push('UserSignInUp')
            }
            Loading.hide()
          })
          .catch(function (err) {
            Notify.create({
              color: 'negative',
              position: 'top',
              message: 'Нет соединения с сервером.',
              icon: 'fa-solid fa-message-xmark',
              timeout: storeGlobal.timeout.api.error.high,
              textColor: 'black',
            })
            Loading.hide()
            if (storeGlobal.app.environment == 'development') {
              console.log(err)
            }
          })
      } else {
        $router.push('UserSignInUp')
      }
    },
    onSocket() {
      const storeGlobal = useGlobalStore()
      const socket = io(storeGlobal.server.address, {
        query: {
          email: this.email,
          password: this.password,
        },
      })
      storeGlobal.socket = socket

      storeGlobal.socket.on('connect', () => {})

      storeGlobal.socket.on('GetPlayersCount', (data) => {
        storeGlobal.playersCount = data.value
      })

      storeGlobal.socket.on('AddPlayersCount', (data) => {
        storeGlobal.playersCount++
      })

      storeGlobal.socket.on('RemovePlayersCount', (data) => {
        storeGlobal.playersCount--
      })
    },
  },
})
