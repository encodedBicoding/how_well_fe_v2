<template>
  <div class="footer">
    <div class="footer-body">
      <nav class="footer-nav">
        <ul class="footer-nav-list">
          <li class="fnl-item">
            <a href="/about">About</a>
          </li>
          <li class="fnl-item">
            <a href="/contact">Contact</a>
          </li>
          <li class="fnl-item">
            <a href="/terms">Terms of Use</a>
          </li>
          <li class="fnl-item">
            <a href="/privacy">Privacy Policy</a>
          </li>
        </ul>
      </nav>
      <div class="copyrights">
        <p>
          Copyright &copy; {{ getYear() }}. All Rights Reserved. Brought to you
          by
          <a href="#" target="#" class="ebc"
            >encodedBicoding</a
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  methods: {
    getYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
@import url('../assets/css/footer.scss');
</style>
