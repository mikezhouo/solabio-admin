module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'no-console':0,
        'no-return-await':0,
        'generator-star-spacing':'off',
        'no-tabs':'off',
        'no-unused-vars':'off',
        'no-irregular-whitespace':'off',
        'no-debugger':'off'
    }
};