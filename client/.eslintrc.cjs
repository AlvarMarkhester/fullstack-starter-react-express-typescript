module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript",
        "prettier"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "tsconfig.json",
        "tsconfigRootDir": __dirname,
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/react-in-jsx-scope": 0
    },
    "ignorePatterns": ["vite.config.ts"],
    "settings": {
        "react": {
          "version": "detect"
        }
      }
}
