// Decision Tree Rules derived from R rpart model
// Root node: n=240489, balanced priors (0.500, 0.500)
// Terminal nodes marked with * in original output

export const decisionTreeRules = {
  "rules": [
    {
      "condition": "Age in ['50-54', '55-59', '60-64', '65-69']",
      "outcome": "Yes (0.648 vs 0.352)",
      "probability": { "yes": 0.648, "no": 0.352 },
      "n": 116335,
      "children": [
        {
          "condition": "General_Health_Status in ['Good', 'Fair', 'Poor']",
          "outcome": "Yes (0.744 vs 0.256)",
          "probability": { "yes": 0.744, "no": 0.256 },
          "n": 63952,
          "children": [
            {
              "condition": "General_Health_Status in ['Fair', 'Poor']",
              "outcome": "Yes (0.829 vs 0.171)",
              "probability": { "yes": 0.829, "no": 0.171 },
              "n": 25394,
              "terminal": true
            },
            {
              "condition": "General_Health_Status == 'Good'",
              "outcome": "Yes (0.636 vs 0.364)",
              "probability": { "yes": 0.636, "no": 0.364 },
              "n": 38558,
              "children": [
                {
                  "condition": "Age in ['60-64', '65-69']",
                  "outcome": "Yes (0.693 vs 0.307)",
                  "probability": { "yes": 0.693, "no": 0.307 },
                  "n": 22365,
                  "terminal": true
                },
                {
                  "condition": "Age in ['50-54', '55-59']",
                  "outcome": "Yes (0.517 vs 0.483)",
                  "probability": { "yes": 0.517, "no": 0.483 },
                  "n": 16193,
                  "children": [
                    {
                      "condition": "Diabetes_Status in ['Yes', 'Yes/borderline']",
                      "outcome": "Yes (0.662 vs 0.338)",
                      "probability": { "yes": 0.662, "no": 0.338 },
                      "n": 3051,
                      "terminal": true
                    },
                    {
                      "condition": "Diabetes_Status in ['Yes/pregnancy only', 'No']",
                      "outcome": "No (0.465 vs 0.535)",
                      "probability": { "yes": 0.465, "no": 0.535 },
                      "n": 13142,
                      "children": [
                        {
                          "condition": "Smoking_Status == 'Yes'",
                          "outcome": "Yes (0.520 vs 0.480)",
                          "probability": { "yes": 0.520, "no": 0.480 },
                          "n": 5634,
                          "children": [
                            {
                              "condition": "Age == '55-59'",
                              "outcome": "Yes (0.569 vs 0.431)",
                              "probability": { "yes": 0.569, "no": 0.431 },
                              "n": 2880,
                              "terminal": true
                            },
                            {
                              "condition": "Age == '50-54'",
                              "outcome": "No (0.456 vs 0.544)",
                              "probability": { "yes": 0.456, "no": 0.544 },
                              "n": 2754,
                              "terminal": true
                            }
                          ]
                        },
                        {
                          "condition": "Smoking_Status == 'No'",
                          "outcome": "No (0.416 vs 0.584)",
                          "probability": { "yes": 0.416, "no": 0.584 },
                          "n": 7508,
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
          "outcome": "No (0.395 vs 0.605)",
          "probability": { "yes": 0.395, "no": 0.605 },
          "n": 52383,
          "children": [
            {
              "condition": "Age in ['60-64', '65-69']",
              "outcome": "No (0.470 vs 0.530)",
              "probability": { "yes": 0.470, "no": 0.530 },
              "n": 30137,
              "children": [
                {
                  "condition": "Sex == 'Male'",
                  "outcome": "Yes (0.567 vs 0.433)",
                  "probability": { "yes": 0.567, "no": 0.433 },
                  "n": 13788,
                  "children": [
                    {
                      "condition": "General_Health_Status == 'Very Good'",
                      "outcome": "Yes (0.605 vs 0.395)",
                      "probability": { "yes": 0.605, "no": 0.395 },
                      "n": 9816,
                      "terminal": true
                    },
                    {
                      "condition": "General_Health_Status == 'Excellent'",
                      "outcome": "No (0.436 vs 0.564)",
                      "probability": { "yes": 0.436, "no": 0.564 },
                      "n": 3972,
                      "children": [
                        {
                          "condition": "Diabetes_Status == 'Yes'",
                          "outcome": "Yes (0.721 vs 0.279)",
                          "probability": { "yes": 0.721, "no": 0.279 },
                          "n": 249,
                          "terminal": true
                        },
                        {
                          "condition": "Diabetes_Status in ['Yes/borderline', 'Yes/pregnancy only', 'No']",
                          "outcome": "No (0.397 vs 0.603)",
                          "probability": { "yes": 0.397, "no": 0.603 },
                          "n": 3723,
                          "terminal": true
                        }
                      ]
                    }
                  ]
                },
                {
                  "condition": "Sex == 'Female'",
                  "outcome": "No (0.349 vs 0.651)",
                  "probability": { "yes": 0.349, "no": 0.651 },
                  "n": 16349,
                  "children": [
                    {
                      "condition": "Diabetes_Status == 'Yes'",
                      "outcome": "Yes (0.608 vs 0.392)",
                      "probability": { "yes": 0.608, "no": 0.392 },
                      "n": 1237,
                      "terminal": true
                    },
                    {
                      "condition": "Diabetes_Status in ['Yes/borderline', 'Yes/pregnancy only', 'No']",
                      "outcome": "No (0.314 vs 0.686)",
                      "probability": { "yes": 0.314, "no": 0.686 },
                      "n": 15112,
                      "terminal": true
                    }
                  ]
                }
              ]
            },
            {
              "condition": "Age in ['50-54', '55-59']",
              "outcome": "No (0.255 vs 0.745)",
              "probability": { "yes": 0.255, "no": 0.745 },
              "n": 22246,
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
      "n": 124154,
      "children": [
        {
          "condition": "General_Health_Status in ['Fair', 'Poor']",
          "outcome": "No (0.478 vs 0.522)",
          "probability": { "yes": 0.478, "no": 0.522 },
          "n": 18227,
          "children": [
            {
              "condition": "Age in ['40-44', '45-49']",
              "outcome": "Yes (0.621 vs 0.379)",
              "probability": { "yes": 0.621, "no": 0.379 },
              "n": 7479,
              "children": [
                {
                  "condition": "General_Health_Status == 'Poor'",
                  "outcome": "Yes (0.769 vs 0.231)",
                  "probability": { "yes": 0.769, "no": 0.231 },
                  "n": 1621,
                  "terminal": true
                },
                {
                  "condition": "General_Health_Status == 'Fair'",
                  "outcome": "Yes (0.547 vs 0.453)",
                  "probability": { "yes": 0.547, "no": 0.453 },
                  "n": 5858,
                  "children": [
                    {
                      "condition": "Smoking_Status == 'Yes'",
                      "outcome": "Yes (0.611 vs 0.389)",
                      "probability": { "yes": 0.611, "no": 0.389 },
                      "n": 3101,
                      "terminal": true
                    },
                    {
                      "condition": "Smoking_Status == 'No'",
                      "outcome": "No (0.446 vs 0.554)",
                      "probability": { "yes": 0.446, "no": 0.554 },
                      "n": 2757,
                      "terminal": true
                    }
                  ]
                }
              ]
            },
            {
              "condition": "Age in ['18-24', '25-29', '30-34', '35-39']",
              "outcome": "No (0.301 vs 0.699)",
              "probability": { "yes": 0.301, "no": 0.699 },
              "n": 10748,
              "terminal": true
            }
          ]
        },
        {
          "condition": "General_Health_Status in ['Excellent', 'Very Good', 'Good']",
          "outcome": "No (0.126 vs 0.874)",
          "probability": { "yes": 0.126, "no": 0.874 },
          "n": 105927,
          "terminal": true
        }
      ]
    }
  ]
};