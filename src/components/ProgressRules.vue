<template>
  <div v-if="open">
    <div class="row">
      <h3 class="col-auto">Progress Rules</h3>
      <div class="col-auto  mt-1">
        <select
          class="custom-select custom-select-sm "
          v-model="selectedProgress"
        >
          <option
            v-for="(item, index) in progress"
            v-bind:value="item"
            :key="index"
            >{{ item }}</option
          >
        </select>
      </div>
      <!-- xp for level -->
      <div class="col-auto" v-if="selectedProgress == 'level'">
        <button class="btn btn-primary btn-xs mt-1 ml-2 " v-on:click="createXp">
          Add XP range
        </button>
        <button class="btn btn-danger btn-xs mt-1 ml-2" v-on:click="deleteXp">
          Remove XP range
        </button>
      </div>
      <!-- skill for rank -->
      <div class="col-auto" v-if="selectedProgress == 'rank'">
        <button
          class="btn btn-primary btn-xs mt-1 ml-2 "
          v-on:click="createSkill"
        >
          Add skill range
        </button>
        <button
          class="btn btn-danger btn-xs mt-1 ml-2"
          v-on:click="deleteSkill"
        >
          Remove skill range
        </button>
      </div>
      <!-- Level -->
      <div v-if="selectedProgress == 'level'">
        <!-- Add xp -->
        <div class="row  ml-4 mt-4" v-if="addXp">
          <label class="mt-2 col-auto">XP From:</label>
          <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm">
            <input
              type="text"
              v-model="xp.from"
              class="form-control input-lg"
              @keypress="isNumber($event)"
              placeholder="from"
            />
          </div>
          <label class="mt-2 col-auto">To:</label>
          <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm">
            <input
              type="text"
              v-model="xp.to"
              class="form-control input-lg"
              @keypress="isNumber($event)"
              placeholder="to"
            />
          </div>
          <label class=" ml-3 mt-2 col-auto">Level =</label>

          <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm col-auto">
            <input
              type="text"
              v-model="xp.level"
              class="form-control input-lg"
              @keypress="isNumber($event)"
              placeholder="level"
            />
          </div>

          <button
            class="btn btn-success btn-xs mt-1 ml-4 col-auto"
            v-on:click="saveXp"
          >
            Save
          </button>
        </div>
        <!-- Fetch  -->
        <MDBTable responsive="md" class="mt-4">
          <caption>
            {{
              selectedProgress
            }}
          </caption>

          <thead>
            <tr>
              <th scope="col">
                <fa class="icon" :icon="['fa', 'square']" size="1x" />
              </th>
              <th
                class="columnName"
                v-for="(column, index) in xpColumns"
                :key="index"
              >
                {{ column }}
                <small> (Number)</small>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(xp, index) in xps" :key="index">
              <div class="ml-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-bind:value="xp._id"
                  v-model="checkedXps"
                />
              </div>
              <td
                class="input-group-sm"
                v-for="column in xpColumns"
                :key="column"
              >
                <input
                  v-bind:id="column"
                  @keypress="isNumber($event)"
                  type="text"
                  class="form-control"
                  v-bind:value="xp[column]"
                  @blur="updateXpRow($event, xp)"
                />
              </td>
            </tr>
          </tbody>
        </MDBTable>
      </div>
      <!-- Rank -->
      <div v-if="selectedProgress == 'rank'">
        <!-- Add  -->
        <div class="row  ml-4 mt-4" v-if="addSkill">
          <label class="mt-2 col-auto">Skill From:</label>
          <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm">
            <input
              type="text"
              v-model="skill.from"
              class="form-control input-lg"
              @keypress="isNumber($event)"
              placeholder="from"
            />
          </div>
          <label class="mt-2 col-auto">To:</label>
          <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm">
            <input
              type="text"
              v-model="skill.to"
              class="form-control input-lg"
              @keypress="isNumber($event)"
              placeholder="to"
            />
          </div>
          <label class=" ml-3 mt-2 col-auto">Rank =</label>

          <div class="row ml-1 col-6 col-md-2  mt-1 input-group-sm col-auto">
            <input
              type="text"
              v-model="skill.rank"
              class="form-control input-lg"
              @keypress="isNumber($event)"
              placeholder="rank"
            />
            <small class="text-muted ">Value must be int</small>
          </div>

          <button
            class="btn btn-success btn-xs mt-1 ml-4 col-auto"
            v-on:click="saveSkill"
          >
            Save
          </button>
        </div>
        <!-- Fetch  -->
        <MDBTable responsive="md" class="mt-4">
          <caption>
            {{
              selectedProgress
            }}
          </caption>

          <thead>
            <tr>
              <th scope="col">
                <fa class="icon" :icon="['fa', 'square']" size="1x" />
              </th>
              <th
                class="columnName"
                v-for="(column, index) in skillColumns"
                :key="index"
              >
                {{ column }}
                <small> (Number)</small>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(skill, index) in skills" :key="index">
              <div class="ml-2">
                <input
                  type="checkbox"
                  class="form-check-input"
                  v-bind:value="skill._id"
                  v-model="checkedSkills"
                />
              </div>
              <td
                class="input-group-sm"
                v-for="column in skillColumns"
                :key="column"
              >
                <input
                  v-bind:id="column"
                  type="text"
                  class="form-control"
                  @keypress="isNumber($event)"
                  v-bind:value="skill[column]"
                  @blur="updateSkillRow($event, skill)"
                />
              </td>
            </tr>
          </tbody>
        </MDBTable>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert2';
import { MDBTable } from 'mdb-vue-ui-kit';
export default {
  props: ['open'],
  data() {
    return {
      progress: ['level', 'rank'],
      selectedProgress: 'level',
      xpColumns: ['xpFrom', 'to', 'level'],
      skillColumns: ['skillFrom', 'to', 'rank'],
      addXp: false,
      addSkill: false,
      xp: {
        from: 0,
        to: 0,
        level: 0
      },
      xps: [],
      checkedXps: [],
      skill: {
        from: 0,
        to: 0,
        rank: 0
      },
      skills: [],
      checkedSkills: [],
      token: ''
    };
  },
  components: {
    MDBTable
  },
  methods: {
    createXp() {
      this.addXp = !this.addXp;
    },
    createSkill() {
      this.addSkill = !this.addSkill;
    },
    async getXps() {
      let res = await this.$http.get(`progress-level`, {
        params: { token: this.token }
      });

      this.xps = res.data.xps;
    },
    async saveXp() {
      try {
        var data = {};
        data.token = this.token;
        data.xpFrom = this.xp.from;
        data.to = this.xp.to;
        data.level = this.xp.level;
        let res = await this.$http.post('progress-level', data);
        if (res) {
          await this.getXps();
          this.xp = {};
          swal.fire('Success', res.data.msg, 'success');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async deleteXp() {
      if (this.checkedXps.length > 0) {
        try {
          let res = await this.$http.delete(`progress-level`, {
            data: { token: this.token, xps: this.checkedXps }
          });
          if (res) {
            await this.getXps();
            this.checkedXps = [];
            swal.fire('Success', res.data.msg, 'success');
          }
        } catch (error) {
          swal.fire('Error', error.response.data.err, 'error');
        }
      }
    },
    async updateXpRow(e, xp) {
      try {
        var data = {};

        data.token = this.token;
        data.xpId = xp._id;
        data.xpColumn = e.target.id;
        data.value = e.target.value;
        let res = await this.$http.post('progress-level-update', data);
        if (res) {
          await this.getXps();
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async getSkills() {
      let res = await this.$http.get(`progress-rank`, {
        params: { token: this.token }
      });

      this.skills = res.data.skills;
    },
    async saveSkill() {
      try {
        var data = {};
        data.token = this.token;
        data.skillFrom = this.skill.from;
        data.to = this.skill.to;
        data.rank = this.skill.rank;
        let res = await this.$http.post('progress-rank', data);
        if (res) {
          await this.getSkills();
          this.rank = {};
          swal.fire('Success', res.data.msg, 'success');
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    async deleteSkill() {
      if (this.checkedSkills.length > 0) {
        try {
          let res = await this.$http.delete(`progress-rank`, {
            data: { token: this.token, skills: this.checkedSkills }
          });
          if (res) {
            await this.getSkills();
            this.checkedSkills = [];
            swal.fire('Success', res.data.msg, 'success');
          }
        } catch (error) {
          swal.fire('Error', error.response.data.err, 'error');
        }
      }
    },
    async updateSkillRow(e, skill) {
      try {
        var data = {};

        data.token = this.token;
        data.skillId = skill._id;
        data.skillColumn = e.target.id;
        data.value = e.target.value;
        let res = await this.$http.post('progress-rank-update', data);
        if (res) {
          await this.getSkills();
        }
      } catch (error) {
        swal.fire('Error', error.response.data.err, 'error');
      }
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (charCode < 48 || charCode > 57) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  },
  async created() {
    this.token = await localStorage.getItem('jwt');
    await this.getXps();
    await this.getSkills();
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
</style>
