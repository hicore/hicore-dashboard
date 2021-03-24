<template>
  <div class="sidebar navbar-light bg-light">
    <div class="elements" v-for="(item, index) in navElements" :key="index">
      <div class="sidebar-element">
        <router-link :to="{ name: item }"
          ><fa class="icon" :icon="['fa', navElementsIcons[index]]" size="1x" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['open'],
  data() {
    return {
      navElements: ['Analyses', 'Match', 'Users', 'Settings'],
      navElementsIcons: ['tachometer-alt', 'gamepad', 'users', 'cog']
    };
  },
  methods: {
    goToView(item) {
      console.log(item);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  flex-direction: column;
  width: 60px;
  height: calc(100vh - 50px);
  padding-top: 48px;
  .sidebar-element {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    margin-bottom: 8px;
    color: #527afc;
    cursor: pointer;
  }
  a.router-link-active {
    color: #fc7a52;
  }
}
</style>
