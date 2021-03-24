const config = require('./src/config');

const {
  dashboard: { port }
} = config;

module.exports = {
  devServer: {
    port: port
  }
};
