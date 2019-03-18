<template>
  <div id="home">
      <div id="nav">

      </div>

      <div id="content-container">
          <div id="side">

          </div>

          <div id="content">

          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style>
    #home {
        display: flex;
        flex-direction: column;
    }

    #nav {
        height: 50px;
        border-bottom: solid 1px black;
    }

    #content-container {
        display: flex;
        height: 100vh;
    }

    #side {
        background-color: #aaa;
        width: 300px;
    }

    #content {
        width: 100%;
    }
</style>
