<template>
  <div v-if="open">
    <div class="centered" v-if="rules == 0 && !addRule">
      Nothing to show
    </div>
    <div class="row">
      <h3 class="ml-3 col-auto">Match Rules</h3>
      <div class="col-auto">
        <button
          class="btn btn-primary btn-xs mt-1 ml-2 "
          v-on:click="createRule"
        >
          Add Rule
        </button>
        <button class="btn btn-danger btn-xs mt-1 ml-2" v-on:click="deleteRule">
          Remove Rule
        </button>
      </div>
    </div>
    <div>
      <!-- Add  -->
      <div class="row  ml-4 mt-4" v-if="addRule">
        <label class="mt-2 col-auto">Match Mode:</label>
        <div class="col-4 col-md-2  mt-1">
          <select class="custom-select custom-select-sm" v-model="rule.mode">
            <option
              v-for="(mode, index) in modesForDropDown"
              v-bind:value="mode.mode"
              :key="index"
              >{{ mode.mode }}</option
            >
          </select>
        </div>
        <label class="mt-2 col-auto">Key:</label>
        <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm">
          <input
            type="text"
            v-model="rule.key"
            class="form-control input-lg"
            aria-describedby="modeHelp"
            placeholder="key"
          />
        </div>
        <label class=" ml-3 mt-2 col-auto">Vlaue:</label>

        <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm col-auto">
          <input
            type="text"
            v-model="rule.value"
            class="form-control input-lg"
            aria-describedby="modeHelp"
            placeholder="value"
          />
          <small class="text-muted ">Value must be string or float</small>
        </div>

        <button
          class="btn btn-success btn-xs mt-1 ml-4 col-auto"
          v-on:click="saveRule"
        >
          Save
        </button>
      </div>
      <!-- Fetch  -->
      <div
        class="row  mt-4 "
        v-for="(item, index) in rules"
        :key="index"
        @matchModes="updateRule"
      >
        <div class="form-check ml-3 mt-2 col-auto">
          <input
            type="checkbox"
            class="form-check-input"
            v-bind:value="item._id"
            v-model="checkedRules"
          />
        </div>
        <label class="mt-2 col-auto">Match Mode:</label>
        <div class="col-4 col-md-2  mt-1 input-group-sm col-auto">
          <input
            class="form-control text-center"
            type="text"
            v-bind:value="item.mode"
            readonly
          />
        </div>
        <label class="mt-2 col-auto">Key:</label>
        <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm col-auto">
          <input
            class="form-control text-center"
            type="text"
            v-bind:value="item.key"
            readonly
          />
        </div>
        <label class=" ml-3 mt-2 col-auto">Vlaue:</label>
        <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm col-auto">
          <input
            class="form-control text-center"
            type="text"
            v-bind:value="item.value"
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
      addRule: false,
      rules: [],
      rule: {
        mode: '',
        key: '',
        value: '',
        token: ''
      },
      modesForDropDown: [],
      checkedRules: [],
      token: ''
    };
  },
  methods: {
    createRule() {
      this.addRule = !this.addRule;
    },
    async getRules() {
      let res = await this.$http.get(`match-rule`, {
        params: { token: this.token }
      });

      this.rules = res.data.rules;
    },
    async getModes() {
      let res = await this.$http.get(`match-mode`, {
        params: { token: this.token }
      });

      this.modesForDropDown = res.data.modes;
      this.rule.mode = this.modesForDropDown[0].mode;
    },
    async saveRule() {
      try {
        this.rule.token = this.token;
        let value = parseFloat(this.rule.value);
        if (!Number.isNaN(value)) {
          this.rule.value = value;
        }
        let res = await this.$http.post('match-rule', this.rule);
        if (res) {
          this.getRules();
          this.addRule = false;
          swal.fire('Success', res.data.msg, 'success');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async deleteRule() {
      if (this.checkedRules.length > 0) {
        try {
          let res = await this.$http.delete(`match-rule`, {
            data: { token: this.token, rules: this.checkedRules }
          });
          if (res) {
            this.getRules();
            this.checkedRules = [];
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
    this.getRules();
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
