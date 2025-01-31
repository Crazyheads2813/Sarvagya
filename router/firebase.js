const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get, child } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBqaKVJNgxafz3jD72DbV3AyCw_877sHYw",
  authDomain: "sarvagya-7f68f.firebaseapp.com",
  databaseURL: "https://sarvagya-7f68f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sarvagya-7f68f",
  storageBucket: "sarvagya-7f68f.firebasestorage.app",
  messagingSenderId: "623802430073",
  appId: "1:623802430073:web:bb9cbdc7cd3eb753261aa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);
const dataRef = ref(database, 'sensorData'); // Reference to sensor data in Firebase

// Function to listen for changes to the Firebase database
const listenForRealTimeData = (callback) => {
  onValue(dataRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback(data); // Send the data to callback for further handling (e.g., render in EJS)
    } else {
      console.log("No real-time data available in Firebase");
      callback({});
    }
  });
};


module.exports = { dataRef, getDatabase, get, set, child , listenForRealTimeData};
