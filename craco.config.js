const CracoAntDesignPlugin = require("craco-antd");
const path = require("path");
const { ESLINT_MODES, POSTCSS_MODES, paths } = require("@craco/craco");

module.exports = {
  babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }]
      ]
  },
  webpack: {
    alias: {
        "@components": path.resolve(__dirname, `src/components/`),
        "@containers": path.resolve(__dirname, `src/containers/`),
        "@utils": path.resolve(__dirname, `src/utils/`),
        "@assets": path.resolve(__dirname, `src/assets/`)
    }
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#1DA57A",
          '@layout-header-background': '#f0f2f5'
        }
      },
    },
  ],
};