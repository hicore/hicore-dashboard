const conf = {
  server: {
    host: process.env.VUE_APP_MOTHERSHIP_HOST,
    port: parseInt(process.env.VUE_APP_MOTHERSHIP_PORT)
  },
  dashboard: {
    port: parseInt(process.env.VUE_APP_DASHBOARD_PORT)
  }
};

module.exports = conf;
