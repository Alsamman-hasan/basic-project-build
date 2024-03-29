module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "airbnb",
    "prettier",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "ulbi-tv-plugin",
    "@typescript-eslint",
    "react-hooks",
    "@typescript-eslint/eslint-plugin",
    "prettier",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        parser: "typescript",
        usePrettierrc: false,
        endOfLine: "auto",
        semi: true,
        useTabs: false,
        tabWidth: 2,
      },
    ],
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "ulbi-tv-plugin/path-checker": [
      "error",
      {
        alias: "@",
      },
    ],
    "ulbi-tv-plugin/layer-imports": [
      "error",
      {
        alias: "@",
        ignoreImportPatterns: ["**/StoreProvider", "**/testing"],
      },
    ],
    "ulbi-tv-plugin/public-api-imports": [
      "error",
      {
        alias: "@",
        testFilesPatterns: [
          "**/*.test.*",
          "**/*.story.*",
          "**/StoreDecorator.tsx",
        ],
      },
    ],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "off",
    "react/button-has-type": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "react/require-default-props": "off",
    "react/react-in-jsx-scope": "off",
    "react/function-component-definition": "off",
    "no-shadow": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "react/no-array-index-key": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/no-unused-prop-types": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-param-reassign": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "react/self-closing-comp": "off",
    "no-undef": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-useless-fragment": "warn",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "max-len": [
      "error",
      {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
  },
};
