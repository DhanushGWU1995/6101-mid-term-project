// Decision Tree Rules derived from R rpart model (PRUNED)
// Simple random sampling dataset (n=15238, balanced 50/50)
// Root node: n=15238, balanced priors (0.500, 0.500)
// Terminal nodes marked with * in original output
export const decisionTreeRules = {
  "n": 15238,
  "children": [
    {
      "condition": "Age in ['50-54', '55-59', '60-64', '65-69']",
      "outcome": "Yes (0.648 vs 0.352)",
      "probability": { "yes": 0.648, "no": 0.352 },
      "n": 10157,
      "children": [
        {
          "condition": "General_Health_Status in ['Good', 'Fair', 'Poor']",
          "outcome": "Yes (0.744 vs 0.256)",
          "probability": { "yes": 0.744, "no": 0.256 },
          "n": 7396,
          "children": [
            {
              "condition": "General_Health_Status in ['Fair', 'Poor']",
              "outcome": "Yes (0.817 vs 0.183)",
              "probability": { "yes": 0.817, "no": 0.183 },
              "n": 4204,
              "terminal": true
            },
            {
              "condition": "General_Health_Status == 'Good'",
              "outcome": "Yes (0.648 vs 0.352)",
              "probability": { "yes": 0.648, "no": 0.352 },
              "n": 3192,
              "children": [
                {
                  "condition": "Sex == 'Male'",
                  "outcome": "Yes (0.714 vs 0.286)",
                  "probability": { "yes": 0.714, "no": 0.286 },
                  "n": 1852,
                  "terminal": true
                },
                {
                  "condition": "Sex == 'Female'",
                  "outcome": "Yes (0.558 vs 0.442)",
                  "probability": { "yes": 0.558, "no": 0.442 },
                  "n": 1340,
                  "children": [
                    {
                      "condition": "Diabetes_Status == 'Yes'",
                      "outcome": "Yes (0.695 vs 0.305)",
                      "probability": { "yes": 0.695, "no": 0.305 },
                      "n": 370,
                      "terminal": true
                    },
                    {
                      "condition": "Diabetes_Status in ['Yes/borderline', 'Yes/pregnancy only', 'No']",
                      "outcome": "Yes (0.506 vs 0.494)",
                      "probability": { "yes": 0.506, "no": 0.494 },
                      "n": 970,
                      "children": [
                        {
                          "condition": "Age in ['55-59', '60-64', '65-69']",
                          "outcome": "Yes (0.537 vs 0.463)",
                          "probability": { "yes": 0.537, "no": 0.463 },
                          "n": 817,
                          "children": [
                            {
                              "condition": "BMI_Value >= 18.4",
                              "outcome": "Yes (0.545 vs 0.455)",
                              "probability": { "yes": 0.545, "no": 0.455 },
                              "n": 802,
                              "children": [
                                {
                                  "condition": "Smoking_Status == 'Yes'",
                                  "outcome": "Yes (0.597 vs 0.403)",
                                  "probability": { "yes": 0.597, "no": 0.403 },
                                  "n": 424,
                                  "terminal": true
                                },
                                {
                                  "condition": "Smoking_Status == 'No'",
                                  "outcome": "No (0.487 vs 0.513)",
                                  "probability": { "yes": 0.487, "no": 0.513 },
                                  "n": 378,
                                  "children": [
                                    {
                                      "condition": "Age == '65-69'",
                                      "outcome": "Yes (0.556 vs 0.444)",
                                      "probability": { "yes": 0.556, "no": 0.444 },
                                      "n": 169,
                                      "terminal": true
                                    },
                                    {
                                      "condition": "Age in ['55-59', '60-64']",
                                      "outcome": "No (0.431 vs 0.569)",
                                      "probability": { "yes": 0.431, "no": 0.569 },
                                      "n": 209,
                                      "terminal": true
                                    }
                                  ]
                                }
                              ]
                            },
                            {
                              "condition": "BMI_Value < 18.4",
                              "outcome": "No (0.133 vs 0.867)",
                              "probability": { "yes": 0.133, "no": 0.867 },
                              "n": 15,
                              "terminal": true
                            }
                          ]
                        },
                        {
                          "condition": "Age == '50-54'",
                          "outcome": "No (0.340 vs 0.660)",
                          "probability": { "yes": 0.340, "no": 0.660 },
                          "n": 153,
                          "terminal": true
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "condition": "General_Health_Status in ['Excellent', 'Very Good']",
          "outcome": "No (0.392 vs 0.608)",
          "probability": { "yes": 0.392, "no": 0.608 },
          "n": 2761,
          "children": [
            {
              "condition": "Age in ['60-64', '65-69']",
              "outcome": "No (0.462 vs 0.538)",
              "probability": { "yes": 0.462, "no": 0.538 },
              "n": 1804,
              "children": [
                {
                  "condition": "Sex == 'Male'",
                  "outcome": "Yes (0.546 vs 0.454)",
                  "probability": { "yes": 0.546, "no": 0.454 },
                  "n": 1003,
                  "children": [
                    {
                      "condition": "General_Health_Status == 'Very Good'",
                      "outcome": "Yes (0.589 vs 0.411)",
                      "probability": { "yes": 0.589, "no": 0.411 },
                      "n": 764,
                      "terminal": true
                    },
                    {
                      "condition": "General_Health_Status == 'Excellent'",
                      "outcome": "No (0.410 vs 0.590)",
                      "probability": { "yes": 0.410, "no": 0.590 },
                      "n": 239,
                      "children": [
                        {
                          "condition": "Diabetes_Status == 'Yes'",
                          "outcome": "Yes (0.704 vs 0.296)",
                          "probability": { "yes": 0.704, "no": 0.296 },
                          "n": 27,
                          "terminal": true
                        },
                        {
                          "condition": "Diabetes_Status in ['Yes/pregnancy only', 'No']",
                          "outcome": "No (0.373 vs 0.627)",
                          "probability": { "yes": 0.373, "no": 0.627 },
                          "n": 212,
                          "terminal": true
                        }
                      ]
                    }
                  ]
                },
                {
                  "condition": "Sex == 'Female'",
                  "outcome": "No (0.356 vs 0.644)",
                  "probability": { "yes": 0.356, "no": 0.644 },
                  "n": 801,
                  "children": [
                    {
                      "condition": "Diabetes_Status in ['Yes', 'Yes/borderline']",
                      "outcome": "Yes (0.616 vs 0.384)",
                      "probability": { "yes": 0.616, "no": 0.384 },
                      "n": 99,
                      "terminal": true
                    },
                    {
                      "condition": "Diabetes_Status in ['Yes/pregnancy only', 'No']",
                      "outcome": "No (0.319 vs 0.681)",
                      "probability": { "yes": 0.319, "no": 0.681 },
                      "n": 702,
                      "terminal": true
                    }
                  ]
                }
              ]
            },
            {
              "condition": "Age in ['50-54', '55-59']",
              "outcome": "No (0.260 vs 0.740)",
              "probability": { "yes": 0.260, "no": 0.740 },
              "n": 957,
              "terminal": true
            }
          ]
        }
      ]
    },
    {
      "condition": "Age in ['18-24', '25-29', '30-34', '35-39', '40-44', '45-49']",
      "outcome": "No (0.203 vs 0.797)",
      "probability": { "yes": 0.203, "no": 0.797 },
      "n": 5081,
      "children": [
        {
          "condition": "General_Health_Status in ['Fair', 'Poor']",
          "outcome": "No (0.465 vs 0.535)",
          "probability": { "yes": 0.465, "no": 0.535 },
          "n": 1139,
          "children": [
            {
              "condition": "Age in ['35-39', '40-44', '45-49']",
              "outcome": "Yes (0.562 vs 0.438)",
              "probability": { "yes": 0.562, "no": 0.438 },
              "n": 796,
              "children": [
                {
                  "condition": "General_Health_Status == 'Poor'",
                  "outcome": "Yes (0.719 vs 0.281)",
                  "probability": { "yes": 0.719, "no": 0.281 },
                  "n": 260,
                  "terminal": true
                },
                {
                  "condition": "General_Health_Status == 'Fair'",
                  "outcome": "No (0.485 vs 0.515)",
                  "probability": { "yes": 0.485, "no": 0.515 },
                  "n": 536,
                  "children": [
                    {
                      "condition": "Smoking_Status == 'Yes'",
                      "outcome": "Yes (0.563 vs 0.437)",
                      "probability": { "yes": 0.563, "no": 0.437 },
                      "n": 309,
                      "children": [
                        {
                          "condition": "Age == '45-49'",
                          "outcome": "Yes (0.673 vs 0.327)",
                          "probability": { "yes": 0.673, "no": 0.327 },
                          "n": 147,
                          "terminal": true
                        },
                        {
                          "condition": "Age in ['35-39', '40-44']",
                          "outcome": "No (0.463 vs 0.537)",
                          "probability": { "yes": 0.463, "no": 0.537 },
                          "n": 162,
                          "terminal": true
                        }
                      ]
                    },
                    {
                      "condition": "Smoking_Status == 'No'",
                      "outcome": "No (0.379 vs 0.621)",
                      "probability": { "yes": 0.379, "no": 0.621 },
                      "n": 227,
                      "terminal": true
                    }
                  ]
                }
              ]
            },
            {
              "condition": "Age in ['18-24', '25-29', '30-34']",
              "outcome": "No (0.242 vs 0.758)",
              "probability": { "yes": 0.242, "no": 0.758 },
              "n": 343,
              "terminal": true
            }
          ]
        },
        {
          "condition": "General_Health_Status in ['Excellent', 'Very Good', 'Good']",
          "outcome": "No (0.128 vs 0.872)",
          "probability": { "yes": 0.128, "no": 0.872 },
          "n": 3942,
          "terminal": true
        }
      ]
    }
  ]
};