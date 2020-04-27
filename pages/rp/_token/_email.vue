<template>
  <div class="resetPassword">
    <div class="rp-flex-c">
      <div v-if="asking" class="form-c">
        <div class="form-cc">
          <div class="form_ch">
            <h3>Request password reset</h3>
          </div>
          <form
            id="rp_one"
            method="POST"
            name="rp_one"
            class="rp_one"
            @submit="(e) => sendResetLink(e)"
          >
            <div class="form-input">
              <input
                v-model="resetEmailData"
                name="email"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <div class="form-input">
              <button>
                {{ isRequesting ? 'REQUESTING...' : 'SEND RESET LINK' }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="!asking" class="form-c">
        <div class="form-cc">
          <div class="form_ch">
            <h3>Reset your password</h3>
          </div>
          <form
            id="rp_two"
            method="POST"
            name="rp_two"
            class="rp_two"
            @submit="(e) => resetUserPassword(e)"
          >
            <div class="form-input">
              <input
                v-model="resetPasswordData"
                name="password"
                :type="showPass ? 'text' : 'password'"
                placeholder="******"
              />
              <div class="password-icon" @click="() => togglePassword()">
                <div v-if="showPass">
                  <font-awesome-icon
                    :icon="['fas', 'eye']"
                    class="black"
                    size="lg"
                  />
                </div>
                <div v-if="!showPass">
                  <font-awesome-icon
                    :icon="['fas', 'eye-slash']"
                    class="black"
                    size="lg"
                  />
                </div>
              </div>
            </div>
            <div class="form-input">
              <button>
                {{ isRequesting ? 'REQUESTING...' : 'RESET PASSWORD' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import BASE_URL from '~/helpers/ajax'

export default {
  data() {
    return {
      showPass: false,
      isRequesting: false,
      asking: false,
      resetEmailData: '',
      resetPasswordData: ''
    }
  },
  mounted() {
    if (
      this.$route.params.email === 'HN_jkdjw_322' &&
      this.$route.params.token === 'reset'
    ) {
      this.asking = true
    }
  },
  methods: {
    togglePassword() {
      this.showPass = !this.showPass
    },
    sendResetLink(e) {
      e.preventDefault()
      if (!this.resetEmailData) return
      this.isRequesting = true
      let formData = $('#rp_one').serializeArray()
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value
        return acc
      }, {})

      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/otrp/reset/p/`,
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (res) => {
          const errorResponse = JSON.parse(res.responseText)
          this.isRequesting = false
          this.$swal({
            icon: 'error',
            title: 'Oops...',
            html: `<h3>${errorResponse.error}</h3>`
          })
          this.resetEmailData = ''
        }
      }).then((res) => {
        const { message } = res
        this.isRequesting = false
        this.$swal({
          icon: 'success',
          title: 'Approved',
          text: message
        })
        this.resetEmailData = ''
      })
    },

    resetUserPassword(e) {
      e.preventDefault()
      if (!this.resetPasswordData) return
      this.isRequesting = true
      let formData = $('#rp_two').serializeArray()
      formData = formData.reduce((acc, curr) => {
        acc[curr.name] = curr.value
        return acc
      }, {})
      $.ajax({
        type: 'POST',
        url: `${BASE_URL}/password/reset/${this.$route.params.token}/${this.$route.params.email}`,
        data: JSON.stringify(formData),
        dataType: 'json',
        contentType: 'application/json',
        error: (res) => {
          const errorResponse = JSON.parse(res.responseText)
          this.isRequesting = false
          this.$swal({
            title: 'Oops...',
            html: `<h3>${errorResponse.error}</h3>`
          })
          this.resetPasswordData = ''
        }
      }).then((res) => {
        const { message } = res
        this.isRequesting = false
        this.$swal({
          title: 'Approved',
          text: message
        })
        this.resetPasswordData = ''
        this.$router.push({
          name: 'begin',
          params: { haveAccountAlready: true }
        })
      })
    }
  },
  head() {
    return {
      title: 'Reset Password'
    }
  }
}
</script>
<style lang="scss">
@import url('@/assets/css/global.scss');
@import url('@/assets/css/begin.scss');
@import url('@/assets/css/dashboard.scss');
@import url('@/assets/css/resetPassword.scss');
</style>
