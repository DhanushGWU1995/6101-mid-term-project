# CHD Prediction Bot

This project is an Angular application designed to predict the likelihood of Coronary Heart Disease (CHD) based on user input and a decision tree model. The application collects patient data through a user-friendly interface and provides predictions along with visualizations of the decision-making process.

## Features

- **User Input Form**: Collects relevant patient data such as age, sex, smoking status, diabetes status, exercise habits, and general health status.
- **Prediction Results**: Displays the prediction results based on the input data, indicating the likelihood of CHD.
- **Decision Tree Visualization**: Provides a visual representation of the decision tree used for making predictions, helping users understand the factors influencing the outcome.

## Project Structure

The project is organized into several components, services, and models:

- **Components**:
  - `prediction-form`: Handles user input for CHD prediction.
  - `result-display`: Shows the prediction results to the user.
  - `decision-tree-viz`: Visualizes the decision tree used for predictions.

- **Services**:
  - `chd-prediction.service.ts`: Contains the logic for predicting CHD based on user input and the decision tree model.

- **Models**:
  - `patient-data.model.ts`: Defines the structure of the patient data collected from the user.
  - `prediction-result.model.ts`: Represents the structure of the output from the prediction service.
  - `decision-tree.model.ts`: Defines the structure of the decision tree used for predictions.

- **Data**:
  - `decision-tree-rules.ts`: Contains the rules of the decision tree.
  - `variable-mappings.ts`: Maps categorical variables used in the prediction model.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd chd-prediction-bot
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   ng serve
   ```
   Open your browser and navigate to `http://localhost:4200` to access the application.

## Usage

- Fill out the prediction form with the required patient data.
- Submit the form to receive a prediction regarding the likelihood of Coronary Heart Disease.
- View the decision tree visualization to understand the prediction process.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.