import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'

const firebaseConfig = {
    apiKey: "AIzaSyAqfeh3R5u23u0FcaOmIQmnbNP7vflpUMQ",
    authDomain: "hackathon-e9fc0.firebaseapp.com",
    databaseURL: "https://hackathon-e9fc0.firebaseio.com",
    projectId: "hackathon-e9fc0",
    storageBucket: "hackathon-e9fc0.appspot.com",
    messagingSenderId: "950213629592",
    appId: "1:950213629592:web:a89b4c4eb1954672b0a2ed",
    measurementId: "G-6VYCN4MB6L"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestampsInSnapshots: true});

export default firebase;