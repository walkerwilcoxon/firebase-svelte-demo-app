import { initializeApp } from 'firebase/app'
import {
    httpsCallable,
    getFunctions,
    type Functions,
} from 'firebase/functions'
import { getFirestore, Firestore, CollectionReference, collection } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'
import { writable } from 'svelte/store'

let functions: Functions
export let firestore: Firestore
export let auth: Auth

let app = initializeApp({
    apiKey: "AIzaSyCG_25MA5piQTbTl_Rsvx4ZLtDJnCNd_Yo",
    authDomain: "fir-svelte-demo-app.firebaseapp.com",
    projectId: "fir-svelte-demo-app",
    storageBucket: "fir-svelte-demo-app.appspot.com",
    messagingSenderId: "562872230075",
    appId: "1:562872230075:web:6c140c72cb7bddfcc6499e"
})

firestore = getFirestore()
auth = getAuth()
functions = getFunctions(app, 'us-central1')

export const user = writable(auth.currentUser)

auth.onAuthStateChanged(user.set)

export const signUpUser = httpsCallable<{ email: string; password: string, signupToken: string }, void>(functions, 'signUpUser')

export interface Shipment {
    supplier: string
    id: string
    departureDate: number
    arrivalDate: number
    numberOfButterflies: number
}

export interface Butterfly {
    scientificName: string
    commonName: string
}

// Typed collections
export const butterflyCollection = collection(firestore, 'butterflies') as CollectionReference<Butterfly>
export const shipmentCollection = collection(firestore, 'shipments') as CollectionReference<Shipment>