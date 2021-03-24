<template>
  <NavBar></NavBar>
  <div>
    <section>
      <Sidebar></Sidebar>
    </section>
    <section>
      <div class="p-1 mt-3">
        <div>
          <button
            class="btn btn-primary btn-sm m-2"
            role="button"
            v-on:click="onTopButtonsClick(0)"
          >
            Match Modes
          </button>
          <button
            class="btn btn-primary btn-sm m-2 "
            role="button"
            v-on:click="onTopButtonsClick(1)"
          >
            Match Rules
          </button>
          <button
            class="btn btn-primary btn-sm m-2"
            role="button"
            v-on:click="onTopButtonsClick(2)"
          >
            Statics
          </button>
          <button
            class="btn btn-primary btn-sm m-2"
            role="button"
            v-on:click="onTopButtonsClick(3)"
          >
            Progress Rules
          </button>
        </div>
      </div>
      <hr />
      <MatchModes :open="topButtons[0]"></MatchModes>
      <MatchRules :open="topButtons[1]"></MatchRules>
      <Statics :open="topButtons[2]"></Statics>
      <ProgressRules :open="topButtons[3]"></ProgressRules>
    </section>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar';
import Sidebar from '../../components/SideBar';
import MatchRules from '../../components/MatchRules';
import Statics from '../../components/Statics';
import MatchModes from '../../components/MatchModes';
import ProgressRules from '../../components/ProgressRules';

export default {
  data() {
    return {
      topButtons: [true, false, false, false]
    };
  },
  components: {
    NavBar,
    Sidebar,
    MatchRules,
    Statics,
    MatchModes,
    ProgressRules
  },
  methods: {
    onTopButtonsClick(item) {
      for (let i = 0; i < this.topButtons.length; i++) {
        if (i == item) {
          this.topButtons[i] = true;
        } else {
          this.topButtons[i] = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
section:first-child {
  width: 5%;
  height: 100vh;
}
section {
  width: 90%;
  float: left;
}
</style>
