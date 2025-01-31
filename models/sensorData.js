const mongoose = require('mongoose');

// Define the schema for sensor data
const sensorDataSchema = new mongoose.Schema({
  time: {
    type: Date,
    required: true,
 },
  smoke: {
    type: Number, // Concentration of smoke
    required: true,
  },
  no2: {
    type: Number, // Concentration of NO2
    required: true,
  },
  co2: {
    type: Number, // Concentration of CO2
    required: true,
  },
  nh3: {
    type: Number, // Concentration of NH3
    required: true,
  },
  ch4: {
    type: Number, // Concentration of CH4
    required: true,
  },
  lpg: {
    type: Number, // Concentration of LPG
    required: true,
  },
  h: {
    type: Number, // Hydrogen concentration
    required: true,
  },
  co: {
    type: Number, // Concentration of Carbon Monoxide (CO)
    required: true,
  },
  temp: {
    type: Number, // Temperature in Celsius
    required: true,
  },
  pressure: {
    type: Number, // Atmospheric pressure in hPa
    required: true,
  },
  humidity: {
    type: Number, // Relative humidity in percentage
    required: true,
  },
  pm2_5: {
    type: Number, // PM2.5 concentration in µg/m³
    required: true,
  },
  pm10: {
    type: Number, // PM10 concentration in µg/m³
    required: true,
  },
});

// Create the model from the schema
const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
