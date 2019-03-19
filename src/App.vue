<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
  export default {
    beforeMount() {
      const token = localStorage.getItem('faq-token');
      if (token) {
        this.$store.commit('loadToken', token)
      }
    }
  }
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  button {
    margin-right: 25px;
    padding: 7px 14px;

    background-color: #ddd;
    color: black;

    border: none;
    border-radius: 3px;

    transition: background-color 75ms ease;
  }

  button:hover {
    background-color: #e4e4e4;
    cursor: pointer;
  }
</style>
