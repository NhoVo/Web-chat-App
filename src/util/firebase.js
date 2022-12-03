// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your we app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: 'AIzaSyAc5R48XRDx2jxyGscKmfCZUqcdpnnmWCw',
    authDomain: 'chat-app-50a48.firebaseapp.com',
    projectId: 'chat-app-50a48',
    storageBucket: 'chat-app-50a48.appspot.com',
    messagingSenderId: '294060158276',
    appId: '1:294060158276:web:182b5dd69cc88fbe56bb11',
    measurementId: 'G-R1FJ2081Y0',
    // apiKey: 'AIzaSyDRjLuTfjjBWAmUn8YmG0IE48VfCBHJm54',
    // authDomain: 'otp-chat-45f02.firebaseapp.com',
    // projectId: 'otp-chat-45f02',
    // storageBucket: 'otp-chat-45f02.appspot.com',
    // messagingSenderId: '445148443097',
    // appId: '1:445148443097:web:d9dd87417bd459ac5729c8',
    // measurementId: 'G-EVDW3LDZJG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
