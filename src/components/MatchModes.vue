<template>
  <div v-if="open">
    <div class="centered" v-if="modes == 0 && !addMode">
      Nothing to show
    </div>
    <div class="row ">
      <h3 class="col-auto">Match Modes</h3>
      <div class="col-auto">
        <button
          class="btn btn-primary btn-xs mt-1 ml-2 "
          v-on:click="createMode"
        >
          Add Mode
        </button>
        <button
          class="btn btn-danger btn-xs mt-1 ml-2"
          v-on:click="deleteMode()"
        >
          Remove Mode
        </button>
      </div>
    </div>
    <div>
      <!-- Add -->
      <div class="row ml-3 mt-4" v-if="addMode">
        <label class=" ml-3 mt-2 col-auto">Mode:</label>
        <div class="row  ml-3 mt-1 input-group-sm col-auto">
          <input
            type="text"
            v-model="match.mode"
            class="form-control"
            aria-describedby="modeHelp"
            placeholder="Enter match mode"
          />
        </div>
        <button
          class="btn btn-success btn-xs mt-1 ml-4 col-auto"
          v-on:click="saveMode"
        >
          Save
        </button>
      </div>
      <!-- Fetch -->
      <div class="row mt-4" v-for="(item, index) in modes" :key="index">
        <div class="form-check ml-3 mt-2 col-auto">
          <input
            type="checkbox"
            class="form-check-input"
            v-bind:value="item._id"
            v-model="checkedModes"
          />
        </div>
        <label class="mt-2 col-auto">Mode:</label>
        <div class="row  ml-3 mt-2 input-group-sm col-auto">
          <input
            class="form-control text-center"
            type="text"
            v-bind:value="item.mode"
            readonly
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';
export default {
  props: ['open'],
  data() {
    return {
      addMode: false,
      modes: [],
      checkedModes: [],
      match: {
        mode: '',
        token: ''
      },
      token: ''
    };
  },
  methods: {
    createMode() {
      this.addMode = !this.addMode;
    },
    async getModes() {
      let res = await this.$http.get(`match-mode`, {
        params: { token: this.token }
      });

      this.modes = res.data.modes;
    },
    async saveMode() {
      try {
        this.match.token = this.token;
        let res = await this.$http.post('match-mode', this.match);
        if (res) {
          this.getModes();
          this.addMode = false;
          swal.fire('Success', res.data.msg, 'success');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async deleteMode() {
      if (this.checkedModes.length > 0) {
        try {
          let res = await this.$http.delete(`match-mode`, {
            data: { token: this.token, modes: this.checkedModes }
          });
          if (res) {
            this.getModes();
            this.checkedModes = [];
            swal.fire('Success', res.data.msg, 'success');
          }
        } catch (error) {
          swal.fire('Error', error.response.data.err, 'error');
        }
      }
    }
  },
  async created() {
    this.token = await localStorage.getItem('jwt');
    this.getModes();
  }
};
</script>

<style scoped>
.btn-xs {
  padding: 5px 20px;
  font-size: 12px;
}
.btn {
  max-height: 30px;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
