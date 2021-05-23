module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  ignorePatterns: ["**/__test__/*.js"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "no-console": "off",
  },
};
