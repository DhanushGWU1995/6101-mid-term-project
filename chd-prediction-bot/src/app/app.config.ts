export const AppConfig = {
  apiEndpoint: 'https://api.example.com/chd-prediction', // Replace with your actual API endpoint
  defaultPrediction: {
    age: null,
    sex: null,
    smokingStatus: null,
    diabetesStatus: null,
    exercisePast30Days: null,
    generalHealthStatus: null
  },
  environment: 'development' // Change to 'production' for production builds
};