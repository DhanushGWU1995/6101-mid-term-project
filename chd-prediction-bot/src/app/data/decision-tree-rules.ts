// Decision Tree Rules derived from R rpart model (PRUNED)
// Simple random sampling dataset (n=15238, balanced 50/50)
// Root node: n=15238, balanced priors (0.500, 0.500)
// Terminal nodes marked with * in original output
// Updated: Based on natural Age/Sex variation (no matching)

export const decisionTreeRules = {
  "rules": [
    {
      "condition": "Age in ['50-54', '55-59', '60-64', '65-69']",
      "outcome": "Yes (0.651 vs 0.349)",
      "probability": { "yes": 0.651, "no": 0.349 },
      "n": 10117,
      "children": [
        {
          "condition": "General_Health_Status in ['Good', 'Fair', 'Poor']",
          "outcome": "Yes (0.750 vs 0.250)",
          "probability": { "yes": 0.750, "no": 0.250 },
          "n": 7341,
          "children": [
            {
              "condition": "General_Health_Status in ['Fair', 'Poor']",
              "outcome": "Yes (0.836 vs 0.164)",
              "probability": { "yes": 0.836, "no": 0.164 },
              "n": 4110,
              "terminal": true
            },
            {
              "condition": "General_Health_Status == 'Good'",
              "outcome": "Yes (0.641 vs 0.359)",
              "probability": { "yes": 0.641, "no": 0.359 },
              "n": 3231,
              "children": [
                {
                  "condition": "Age in ['60-64', '65-69']",
                  "outcome": "Yes (0.702 vs 0.298)",
                  "probability": { "yes": 0.702, "no": 0.298 },
                  "n": 2175,
                  "terminal": true
                },
                {
                  "condition": "Age in ['50-54', '55-59']",
                  "outcome": "Yes (0.514 vs 0.486)",
                  "probability": { "yes": 0.514, "no": 0.486 },
                  "n": 1056,
                  "children": [
                    {
                      "condition": "Diabetes_Status in ['Yes', 'Yes/borderline', 'No']",
                      "outcome": "Yes (0.630 vs 0.370)",
                      "probability": { "yes": 0.630, "no": 0.370 },
                      "n": 335,
                      "terminal": true
                    },
                    {
                      "condition": "Diabetes_Status == 'Yes/pregnancy only'",
                      "outcome": "No (0.460 vs 0.540)",
                      "probability": { "yes": 0.460, "no": 0.540 },
                      "n": 721,
                      "children": [
                        {
                          "condition": "Age == '55-59'",
                          "outcome": "Yes (0.515 vs 0.485)",
                          "probability": { "yes": 0.515, "no": 0.485 },
                          "n": 394,
                          "children": [
                            {
                              "condition": "BMI_Value >= 26.6",
                              "outcome": "Yes (0.555 vs 0.445)",
                              "probability": { "yes": 0.555, "no": 0.445 },
                              "n": 274,
                              "terminal": true
                            },
                            {
                              "condition": "BMI_Value < 26.6",
                              "outcome": "No (0.425 vs 0.575)",
                              "probability": { "yes": 0.425, "no": 0.575 },
                              "n": 120,
                              "terminal": true
                            }
                          ]
                        },
                        {
                          "condition": "Age == '50-54'",
                          "outcome": "No (0.394 vs 0.606)",
                          "probability": { "yes": 0.394, "no": 0.606 },
                          "n": 327,
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
          "outcome": "No (0.390 vs 0.610)",
          "probability": { "yes": 0.390, "no": 0.610 },
          "n": 2776,
          "children": [
            {
              "condition": "Age in ['60-64', '65-69']",
              "outcome": "No (0.459 vs 0.541)",
              "probability": { "yes": 0.459, "no": 0.541 },
              "n": 1813,
              "children": [
                {
                  "condition": "Sex == 'Male'",
                  "outcome": "Yes (0.557 vs 0.443)",
                  "probability": { "yes": 0.557, "no": 0.443 },
                  "n": 983,
                  "children": [
                    {
                      "condition": "General_Health_Status == 'Very Good'",
                      "outcome": "Yes (0.606 vs 0.394)",
                      "probability": { "yes": 0.606, "no": 0.394 },
                      "n": 743,
                      "terminal": true
                    },
                    {
                      "condition": "General_Health_Status == 'Excellent'",
                      "outcome": "No (0.408 vs 0.592)",
                      "probability": { "yes": 0.408, "no": 0.592 },
                      "n": 240,
                      "children": [
                        {
                          "condition": "Diabetes_Status == 'Yes'",
                          "outcome": "Yes (0.655 vs 0.345)",
                          "probability": { "yes": 0.655, "no": 0.345 },
                          "n": 29,
                          "terminal": true
                        },
                        {
                          "condition": "Diabetes_Status == 'Yes/pregnancy only'",
                          "outcome": "No (0.374 vs 0.626)",
                          "probability": { "yes": 0.374, "no": 0.626 },
                          "n": 211,
                          "terminal": true
                        }
                      ]
                    }
                  ]
                },
                {
                  "condition": "Sex == 'Female'",
                  "outcome": "No (0.343 vs 0.657)",
                  "probability": { "yes": 0.343, "no": 0.657 },
                  "n": 830,
                  "children": [
                    {
                      "condition": "Diabetes_Status in ['Yes', 'Yes/borderline']",
                      "outcome": "Yes (0.565 vs 0.435)",
                      "probability": { "yes": 0.565, "no": 0.435 },
                      "n": 108,
                      "terminal": true
                    },
                    {
                      "condition": "Diabetes_Status in ['Yes/pregnancy only', 'No']",
                      "outcome": "No (0.310 vs 0.690)",
                      "probability": { "yes": 0.310, "no": 0.690 },
                      "n": 722,
                      "terminal": true
                    }
                  ]
                }
              ]
            },
            {
              "condition": "Age in ['50-54', '55-59']",
              "outcome": "No (0.259 vs 0.741)",
              "probability": { "yes": 0.259, "no": 0.741 },
              "n": 963,
              "terminal": true
            }
          ]
        }
      ]
    },
    {
      "condition": "Age in ['18-24', '25-29', '30-34', '35-39', '40-44', '45-49']",
      "outcome": "No (0.202 vs 0.798)",
      "probability": { "yes": 0.202, "no": 0.798 },
      "n": 5121,
      "children": [
        {
          "condition": "General_Health_Status in ['Fair', 'Poor']",
          "outcome": "No (0.482 vs 0.518)",
          "probability": { "yes": 0.482, "no": 0.518 },
          "n": 1099,
          "children": [
            {
              "condition": "Age in ['40-44', '45-49']",
              "outcome": "Yes (0.616 vs 0.384)",
              "probability": { "yes": 0.616, "no": 0.384 },
              "n": 609,
              "children": [
                {
                  "condition": "General_Health_Status == 'Poor'",
                  "outcome": "Yes (0.777 vs 0.223)",
                  "probability": { "yes": 0.777, "no": 0.223 },
                  "n": 211,
                  "terminal": true
                },
                {
                  "condition": "General_Health_Status == 'Fair'",
                  "outcome": "Yes (0.530 vs 0.470)",
                  "probability": { "yes": 0.530, "no": 0.470 },
                  "n": 398,
                  "children": [
                    {
                      "condition": "Age == '45-49'",
                      "outcome": "Yes (0.594 vs 0.406)",
                      "probability": { "yes": 0.594, "no": 0.406 },
                      "n": 239,
                      "terminal": true
                    },
                    {
                      "condition": "Age == '40-44'",
                      "outcome": "No (0.434 vs 0.566)",
                      "probability": { "yes": 0.434, "no": 0.566 },
                      "n": 159,
                      "terminal": true
                    }
                  ]
                }
              ]
            },
            {
              "condition": "Age in ['18-24', '25-29', '30-34', '35-39']",
              "outcome": "No (0.316 vs 0.684)",
              "probability": { "yes": 0.316, "no": 0.684 },
              "n": 490,
              "children": [
                {
                  "condition": "General_Health_Status == 'Poor'",
                  "outcome": "Yes (0.545 vs 0.455)",
                  "probability": { "yes": 0.545, "no": 0.455 },
                  "n": 101,
                  "terminal": true
                },
                {
                  "condition": "General_Health_Status == 'Fair'",
                  "outcome": "No (0.257 vs 0.743)",
                  "probability": { "yes": 0.257, "no": 0.743 },
                  "n": 389,
                  "terminal": true
                }
              ]
            }
          ]
        },
        {
          "condition": "General_Health_Status in ['Excellent', 'Very Good', 'Good']",
          "outcome": "No (0.125 vs 0.875)",
          "probability": { "yes": 0.125, "no": 0.875 },
          "n": 4022,
          "terminal": true
        }
      ]
    }
  ]
};