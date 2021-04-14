module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "extends": [
    "eslint:recommended" //规则默认都是关闭的，使用 eslint:recommended 启用推荐规则。参见 http://eslint.cn/docs/rules/
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [],
  "settings": {
  },
  "rules": {
    "no-console": "off"
  }
};
