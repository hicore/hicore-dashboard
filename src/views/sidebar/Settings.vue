<template>
  <div id="app">
    <NavBar></NavBar>
    <Sidebar :open="navOpen"></Sidebar>
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

<style lang="scss"></style>
