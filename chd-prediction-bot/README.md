# CHD Prediction Bot

A **static, client-side** Angular application that predicts the likelihood of Coronary Heart Disease (CHD) based on user input using a pre-trained decision tree model. This application requires **no backend server** and runs entirely in the browser using static decision tree rules.

## Features

- **User Input Form**: Collects relevant patient data such as age, sex, smoking status, diabetes status, exercise habits, and general health status
- **Instant Predictions**: Provides immediate CHD risk predictions based on decision tree rules
- **Decision Tree Visualization**: Visual representation of the decision-making process
- **Static Deployment**: Can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Project Structure

The project is organized into several components, services, and models:

- **Components**:
  - `prediction-form`: Handles user input for CHD prediction
  - `result-display`: Shows the prediction results to the user
  - `decision-tree-viz`: Visualizes the decision tree used for predictions

- **Services**:
  - `decision-tree-prediction.service.ts`: Contains the logic for predicting CHD using static decision tree rules (no API calls)

- **Models**:
  - `patient-data.model.ts`: Defines the structure of the patient data collected from the user
  - `prediction-result.model.ts`: Represents the structure of the prediction output

- **Data**:
  - `decision-tree-rules.ts`: Contains the complete decision tree rules derived from the R rpart model
  - `variable-mappings.ts`: Maps categorical variables used in the prediction model

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd chd-prediction-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
ng serve
```
Open your browser and navigate to `http://localhost:4200` to access the application.

### 4. Build for Production
```bash
ng build --configuration production
```
The build artifacts will be stored in the `dist/` directory and can be deployed to any static hosting service.

## Deployment Options

Since this is a **static application** with no backend dependencies, you can deploy it to:

- **GitHub Pages**:
  ```bash
  ng build --configuration production --base-href /your-repo-name/
  npx angular-cli-ghpages --dir=dist/chd-prediction-bot
  ```

- **Netlify**: Simply drag and drop the `dist/` folder to Netlify

- **Vercel**: Connect your GitHub repository and deploy automatically

- **Any Static Host**: Upload the contents of `dist/` to any web server

## Usage

1. Open the application in your browser
2. Answer the questionnaire by selecting options for:
   - Age group
   - Biological sex
   - General health status
   - Diabetes status
   - Smoking history
   - Exercise habits
   - BMI value
3. Receive instant CHD risk prediction with:
   - Probability percentage
   - Risk level classification
   - Personalized recommendations
4. View the decision tree visualization to understand how the prediction was made

## Technical Details

### Decision Tree Model

The application uses a static decision tree derived from an R rpart model trained on the BRFSS 2024 dataset:
- **Training samples**: 15,238 (3-way matched case-control design)
- **Test accuracy**: 66.6%
- **Sensitivity**: 64.0%
- **Specificity**: 69.2%
- **Precision**: 67.5%

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.