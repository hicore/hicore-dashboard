<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <div
          class="text-center "
          style="margin-top:200px;height:auto;padding-top:100px !important;"
        >
          <small>Wellcome to the Hicore dashboard</small>
          <!-- Register button -->
          <center>
            <button
              class="btn btn-primary btn-block w-75 my-4"
              type="submit"
              v-on:click="registerNewAdmin"
            >
              Get Start
            </button>
          </center>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert2';

export default {
  data() {
    return {};
  },
  methods: {
    async registerNewAdmin() {
      try {
        let res = await this.$http.post('register');
        console.log(res.status);
        if (res.status == 200 || res.status == 201) {
          this.$router.push('/login');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    }
  }
};
</script>

<style></style>
