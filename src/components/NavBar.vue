<template>
  <nav class="navbar navbar-light bg-light ">
    <a class="navbar-brand" href="#">
      <img
        src="../assets/appIcon.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
      Hicore
    </a>
    <div class="col-md-0 col-md-offset-0 mr-4" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" @click="logUserOut"> {{ user.username }}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
export default {
  data() {
    return {
      user: {},
      navOpen: true
    };
  },
  methods: {
    getUserDetails() {
      let token = localStorage.getItem('jwt');
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
    },
    logUserOut() {
      localStorage.removeItem('jwt');
      this.$router.push('/login');
    }
  },
  created() {
    this.getUserDetails();
  }
};
</script>

<style lang="scss"></style>
