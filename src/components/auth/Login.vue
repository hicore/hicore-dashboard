<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
          class="text-center border border-primary p-5"
          style="margin-top:100px;height:auto;padding-top:50px !important;"
          @submit.prevent="loginUser"
        >
          <img
            src="../../assets/appIcon.png"
            alt="Hicore"
            style="width:100px;height:100px; margin-bottom:50px !important;"
          />
          <!-- Username -->
          <input
            type="text"
            id="username"
            class="form-control mb-3"
            placeholder="Username"
            v-model="login.username"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control mb-2"
            placeholder="Password"
            v-model="login.password"
          />
          <!-- Login button -->
          <center>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Login
            </button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert2';

export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let res = await this.$http.post('login', this.login);
        let token = res.data.token;
        localStorage.setItem('jwt', token);
        if (token) {
          this.$router.push('/match');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    }
  }
};
</script>

<style></style>
