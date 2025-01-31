const Joi = require('joi');

// Define the Joi validation schema
const validateSensorData = (data) => {
  const schema = Joi.object({
    time: Joi.date().default(() => new Date(), 'current time'), // Optional, defaults to current time
    smoke: Joi.number().required().min(0).label('Smoke Concentration'),
    no2: Joi.number().required().min(0).label('NO2 Concentration'),
    co2: Joi.number().required().min(0).label('CO2 Concentration'),
    nh3: Joi.number().required().min(0).label('NH3 Concentration'),
    ch4: Joi.number().required().min(0).label('CH4 Concentration'),
    lpg: Joi.number().required().min(0).label('LPG Concentration'),
    h: Joi.number().required().min(0).label('Hydrogen Concentration'),
    co: Joi.number().required().min(0).label('CO Concentration'),
    temp: Joi.number().required().min(-50).max(100).label('Temperature (°C)'), // Adjust range as needed
    pressure: Joi.number().required().min(300).max(1100).label('Pressure (hPa)'), // Adjust range as needed
    humidity: Joi.number().required().min(0).max(100).label('Humidity (%)'),
    pm2_5: Joi.number().required().min(0).label('PM2.5 (µg/m³)'),
    pm10: Joi.number().required().min(0).label('PM10 (µg/m³)'),
  });

  return schema.validate(data);
};

module.exports = validateSensorData;
