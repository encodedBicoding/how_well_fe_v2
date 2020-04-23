<template>
  <div>
    <div
      v-if="$nuxt.isOffline"
      style="position:relative; top: 0; color: #fff; padding: .5rem; display: flex; background-color: #ff1010; align-items: center; justify-content: center"
    >
      <div>
        <p style="text-align: center">
          You are offline
        </p>
      </div>
    </div>
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: pt-sans-pro, sans-serif !important;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
