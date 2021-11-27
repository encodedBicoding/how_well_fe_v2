<template>
  <div class="mc-cc123">
    <div class="fl-col-center">
      <div class="mb-form fl-col-center">
        <div v-if="!haveAccountAlready" class="formS">
          <div class="t-f-flx">
            <p class="w90 CLF5">CREATE A FREE ACCOUNT</p>
            <p class="CL39 w90 ls-2">HWDYKM</p>
          </div>
          <div class="db">
            <form
              id="register"
              method="POST"
              name="register"
              @submit="(e) => register(e)"
            >
              <div class="form-input CL39 w70">
                <label for="userName"
                  >USERNAME: <span class="CLF5">*</span></label
                >
                <input v-model="RegUsernameData" type="text" name="userName" />
              </div>
              <div class="form-input w70 CL39">
                <label for="email">EMAIL: <span class="CLF5">*</span></label>
                <input v-model="RegEmailData" type="email" name="email" />
              </div>
              <div class="form-input w70 CL39">
                <label for="password"
                  >PASSWORD: <span class="CLF5">*</span></label
                >
                <input
                  v-model="RegPasswordData"
                  :type="showPass ? 'text' : 'password'"
                  name="password"
                />
                <div class="showPass" @click="() => togglePassword()">
                  <div v-if="showPass">
                    <font-awesome-icon
                      :icon="['fas', 'eye']"
                      size="1x"
                      class="CLF10"
                    />
                  </div>
                  <div v-if="!showPass">
                    <font-awesome-icon
                      :icon="['fas', 'eye-slash']"
                      size="1x"
                      class="CLF10"
                    />
                  </div>
                </div>
              </div>
              <div class="form-input w70">
                <button class="CLF5">
                  {{ isRequesting ? 'PLEASE WAIT...' : 'REGISTER' }}
                </button>
              </div>
            </form>
          </div>
          <div class="fl-col-j-center mt-10px">
            <p>
              Already have an account?
              <span class="CLBE w90 login" @click="() => turbo('login')">
                LOGIN
              </span>
            </p>
          </div>
        </div>
        <div v-if="haveAccountAlready" class="formS">
          <div class="t-f-flx">
            <p class="w90 CLF5">LOGIN</p>
            <p class="CL39 w90 ls-2">HWDYKM</p>
          </div>
          <div class="db">
            <form
              id="login"
              method="POST"
              name="login"
              @submit="(e) => login(e)"
            >
              <div class="form-input CL39 w70">
                <label for="userName"
                  >USERNAME: <span class="CLF5">*</span></label
                >
                <input v-model="LogUsernameData" type="text" name="userName" />
              </div>
              <div class="form-input w70 CL39">
                <label for="password"
                  >PASSWORD: <span class="CLF5">*</span></label
                >
                <input
                  v-model="LogPasswordData"
                  :type="showPass ? 'text' : 'password'"
                  name="password"
                />
                <div class="showPass" @click="() => togglePassword()">
                  <div v-if="showPass">
                    <font-awesome-icon
                      :icon="['fas', 'eye']"
                      size="1x"
                      class="CLF10"
                    />
                  </div>
                  <div v-if="!showPass">
                    <font-awesome-icon
                      :icon="['fas', 'eye-slash']"
                      size="1x"
                      class="CLF10"
                    />
                  </div>
                </div>
              </div>
              <div class="form-input w70">
                <button class="CLF5">
                  {{ isRequesting ? 'PLEASE WAIT...' : 'LOGIN' }}
                </button>
              </div>
            </form>
          </div>
          <div class="fl-col-j-center mt-10px">
            <p>
              Don't have an account?
              <span class="CLBE w90 login" @click="() => turbo('register')">
                SIGNUP
              </span>
            </p>
            <div class="mt-10px small fl-col-j-center">
              <p>Forgot password?</p>
              <a
                class="CLBE pswCh w90"
                :href="`${feURL}/rp/reset/HN_jkdjw_322`"
              >
                REQUEST PASSWORD CHANGE
              </a>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!haveAccountAlready" class="terms">
        <div>
          <p>
            By creating an account, you agree to our
            <Nuxt-Link to="/terms" class="tdnone">
              <span class="white tt">Terms of use</span>
            </Nuxt-Link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import FE_URL from '~/helpers/feUrl.js'

const BASE_URL = process.env.SERVER_API
export default {
  data() {
    return {
      haveAccountAlready: this.$route.params.haveAccountAlready,
      RegUsernameData: '',
      RegEmailData: '',
      RegPasswordData: '',
      LogUsernameData: '',
      LogPasswordData: '',
      isRequesting: false,
      errorData: '',
      showPass: false,
      feURL: FE_URL
    }
  },
  methods: {
    login(e) {
      e.preventDefault()
      if (!this.LogUsernameData || !this.LogPasswordData) {
        return
      }
      this.isRequesting = true
      let formData = $('#login').serializeArray()
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value
        return acc
      }, {})
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/login`,
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (res) => {
          const errorResponse = res.responseText
          this.isRequesting = false
          if (JSON.parse(errorResponse).error) {
            this.errorData = JSON.parse(errorResponse).error
            this.$swal({
              title: 'Oops...',
              html: `<h4>${this.errorData}</h4>`
            })
          } else {
            this.errorData = JSON.parse(errorResponse).errors
            this.$swal({
              title: 'Oops...',
              html: `
                <ol style="list-style-type: none;>
                  ${this.errorData.map((error) => `<li>${error.msg}</li>`)}
                </ol>
              `
            })
          }

          setTimeout(() => {
            this.errorData = ''
          }, 4000)
        }
      }).then((data) => {
        this.isRequesting = false
        localStorage.setItem(
          '__hwdykm_inkR',
          data.token
            .split('')
            .splice(10, 34)
            .reverse()
            .join('')
        )
        localStorage.setItem(
          'api__hwdykm_inkR',
          data.token
            .split('')
            .splice(0, 34)
            .reverse()
            .join('')
        )
        localStorage.setItem(
          '__api__token__howzy',
          data.token
            .split('')
            .splice(2, 34)
            .reverse()
            .join('')
        )
        localStorage.setItem(
          'api__hwdykm_inkR',
          data.token
            .split('')
            .splice(4, data.token.length)
            .reverse()
            .join('')
        )
        sessionStorage.setItem(
          '__hwdykm_inkR',
          data.token
            .split('')
            .splice(10, 34)
            .reverse()
            .join('')
        )
        sessionStorage.setItem(
          'api__hwdykm_inkR',
          data.token
            .split('')
            .splice(0, 34)
            .reverse()
            .join('')
        )
        sessionStorage.setItem(
          '__api__token__howzy',
          data.token
            .split('')
            .splice(2, 34)
            .reverse()
            .join('')
        )
        sessionStorage.setItem(
          'api__hwdykm_inkR',
          data.token
            .split('')
            .splice(4, data.token.length)
            .reverse()
            .join('')
        )
        sessionStorage.setItem('__token__HWDYKM__user__', data.token)
        localStorage.setItem('__user__', data.data.userName)
        this.$router.push({ name: 'dashboard' })
      })
    },
    togglePassword() {
      this.showPass = !this.showPass
    },
    turbo(page) {
      this.formPage = page
      this.haveAccountAlready = !this.haveAccountAlready
    },
    register(e) {
      e.preventDefault()
      if (
        !this.RegUsernameData ||
        !this.RegPasswordData ||
        !this.RegEmailData
      ) {
        return
      }
      this.isRequesting = true
      let formData = $('#register').serializeArray()
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value
        return acc
      }, {})
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/register`,
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (req) => {
          const errorResponse = req.responseText
          this.isRequesting = false
          this.showRegError = true
          if (JSON.parse(errorResponse).error) {
            this.errorData = JSON.parse(errorResponse).error
            this.$swal({
              title: 'Oops...',
              html: `<h4>${this.errorData}</h4>`
            })
          } else {
            this.errorData = JSON.parse(errorResponse).errors
            this.$swal({
              title: 'Oops...',
              html: `
                <ol style="list-style-type: none;">
                  ${this.errorData.map((error) => `<li>${error.msg}</li>`)}
                </ol>
              `
            })
          }
          setTimeout(() => {
            this.errorData = ''
          }, 4000)
        }
      }).then((data) => {
        this.isRequesting = false
        localStorage.setItem(
          'api__hwdykm_inkR',
          data.token
            .split('')
            .splice(0, 34)
            .reverse()
            .join('')
        )
        localStorage.setItem(
          '__api__token__howzy',
          data.token
            .split('')
            .splice(2, 34)
            .reverse()
            .join('')
        )
        localStorage.setItem(
          'api__hwdykm_inkR',
          data.token
            .split('')
            .splice(4, data.token.length)
            .reverse()
            .join('')
        )
        sessionStorage.setItem(
          '__hwdykm_inkR',
          data.token
            .split('')
            .splice(10, 34)
            .reverse()
            .join('')
        )
        sessionStorage.setItem(
          'api__hwdykm_inkR',
          data.token
            .split('')
            .splice(0, 34)
            .reverse()
            .join('')
        )
        sessionStorage.setItem(
          '__api__token__howzy',
          data.token
            .split('')
            .splice(2, 34)
            .reverse()
            .join('')
        )
        sessionStorage.setItem(
          'api__hwdykm_inkR',
          data.token
            .split('')
            .splice(4, data.token.length)
            .reverse()
            .join('')
        )
        sessionStorage.setItem('__token__HWDYKM__user__', data.token)
        localStorage.setItem('__user__', data.user.userName)
        this.$router.push({ name: 'dashboard' })
      })
    }
  },
  head() {
    return {
      title: `${this.$route.params.haveAccountAlready ? 'Login' : 'Register'}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${
            this.$route.params.haveAccountAlready
              ? 'Login to view your anonymous responses, responses to feedback and responses to your online quiz'
              : 'Create your FREE anonymous messaging account or online quiz account'
          }`
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('@/assets/css/begin.scss');
</style>
