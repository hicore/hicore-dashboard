<template>
  <NavBar></NavBar>
  <div>
    <section>
      <Sidebar></Sidebar>
    </section>
    <div class="centered">
      Coming Soon
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/SideBar';

export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    Sidebar
  }
};
</script>

<style scoped>
section:first-child {
  width: 5%;
  height: 100vh;
}
section {
  width: 95%;
  float: left;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
