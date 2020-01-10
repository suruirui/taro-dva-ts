module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  weapp: {},
  h5: {
    devServer: {
      host: "localhost",
      port: 3000
      // proxy: {
      //   "/api/*": {
      //     target: "",
      //     changeOrigin: true
      //   }
      // }
    }
  }
};
