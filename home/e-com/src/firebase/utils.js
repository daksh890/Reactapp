import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt : 'select_account'});
export const signInwithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData)=>{
    if(!userAuth) return;
    const { uid } = userAuth;

    const userRef = firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        const {displayName, email, companyName, phoneNo } = userAuth;
        const timestamp = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createDate: timestamp,
                companyName,
                phoneNo,
                ...additionalData
            });
        }catch(err){
            //console.log(err);
        }
    }
    return userRef;
};