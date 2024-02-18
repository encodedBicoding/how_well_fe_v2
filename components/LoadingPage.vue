<template>
    <div v-if="loading" class="loading-page">
        <p class="spinner"></p>
    </div>
  </template>
  
  <script>
    export default {
      data: () => ({
        loading: false
      }),
      methods: {
        start() {
          this.loading = true
        },
        finish() {
          this.loading = false
        }
      }
    }
  </script>
  
  <style scoped>
    .loading-page {
      position: fixed;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      top: 0;
      left: 0;
      width: 100%;
      height: 80%;
      padding-top: 200px;
      font-size: 30px;
      font-family: sans-serif;
    }
    .spinner {
        animation: spin 1s ease infinite;
        border: 4px solid #ff5a09;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: black;
    }

    @keyframes spin {
        0% { transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }
  </style>