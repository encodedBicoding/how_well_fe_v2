<template>
  <div class="dashboard">
    <div class="overlay"></div>
    <div class="container page-flex">
      <div class="page-content head">
        <div class="header flex-row justify-space-between">
          <div class="page-logo">
            <a href="/dashboard">HWDYKM <span class="beta">QUIZ</span></a>
          </div>
          <div class="share">
            <div class="content-name">
              <span v-if="error.statusCode === '404'">404</span>
              <span v-if="error.statusCode !== '404'">{{
                error.statusCode
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="body">
        <div class="content-body">
          <div class="content-paragraph content-flex-center">
            <div class="oops">
              <p>{{ error.statusCode || '404' }}</p>
            </div>
            <div class="nfc">
              <p>
                {{ error.message || 'Plaque not found' }}
              </p>
            </div>
          </div>
        </div>
        <div class="footer">
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Footer from '../components/Footer.vue'

export default {
  components: { Footer },
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss">
@import url('../assets/css/about.scss');
@import url('../assets/css/dashboard.scss');
</style>
