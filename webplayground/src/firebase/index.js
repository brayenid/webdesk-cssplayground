import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: 'AIzaSyCP3knAtcSfGqFAokyGYeRmxOCiEU25MAg',
  authDomain: 'websdeck.firebaseapp.com',
  projectId: 'websdeck',
  storageBucket: 'websdeck.appspot.com',
  messagingSenderId: '511310335431',
  appId: '1:511310335431:web:e0186209769370215b1de2'
}

initializeApp(firebaseConfig)
const db = getFirestore()

export { firebaseConfig, initializeApp, db }
