const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyAp6fQAui5RaZe1hS-r9v4da7RZO_WGkvg",
    authDomain: "emergentes-821c5.firebaseapp.com",
    projectId: "emergentes-821c5",
    storageBucket: "emergentes-821c5.firebasestorage.app",
    messagingSenderId: "810284799347",
    appId: "1:810284799347:web:3906edfc2fefbb129fe106",
    measurementId: "G-D825F0L32F"
};

// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exportar Firebase Auth para ser reutilizado
const auth = getAuth(firebaseApp);

module.exports = { firebaseApp, auth };
// const admin = require("firebase-admin");
// const serviceAccount = require("./firebase-admin.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// module.exports = admin;