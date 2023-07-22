module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["fix", "style", "feat", "refactor", "chore", "docs"]
    ]
  }
}
