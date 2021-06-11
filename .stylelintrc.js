module.exports = {
  "extends": [
        "stylelint-config-recommended", "stylelint-config-recommended-scss"
    ],
    "rules": {
        "no-descending-specificity": null,
        "indentation": 4,
        "selector-pseudo-element-no-unknown": [true, {"ignorePseudoElements": ["/^v-/"]}]
    }
};
