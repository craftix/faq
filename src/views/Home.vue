<template>
  <div id="home">
      <div id="side">

      </div>

      <div id="content">

      </div>
  </div>
</template>

<script>
export default {
    name: 'home'
}
</script>

<style lang="scss">
    #home {
        display: flex;
        height: calc(100vh - 75px);

        #side {
            background-color: #eee;
            width: 400px;

            z-index: -1;
        }

        #content {
            width: 100%;
        }
    }
</style>
