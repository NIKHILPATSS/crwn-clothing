import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAKpNXYEFdRBO_M3HByFK1Gs98zQV0Si8I",
    authDomain: "crown-db-24e7b.firebaseapp.com",
    projectId: "crown-db-24e7b",
    storageBucket: "crown-db-24e7b.appspot.com",
    messagingSenderId: "836117219271",
    appId: "1:836117219271:web:395689e2efd4b6f4a9bbe2",
    measurementId: "G-43PX70DNWT"
}

export const createUserProfileDocument =  async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName , email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error){
            console.log('error creating user',error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;