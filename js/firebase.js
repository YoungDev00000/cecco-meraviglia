import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDm18l5VH6gxrC-33uA7xNDIGfzPpgOr_s",
    authDomain: "storage-cecco.firebaseapp.com",
    databaseURL: "https://storage-cecco-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "storage-cecco",
    storageBucket: "storage-cecco.firebasestorage.app",
    messagingSenderId: "711299112703",
    appId: "1:711299112703:web:dcc4c8d6a7f0639fbbf6ca",
    measurementId: "G-4V1V6VQ6X2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(db);

export function fetchBrandNames(callback) {
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const brandNames = Object.keys(data);
            console.log(brandNames);
            try {
                if (typeof callback === 'function') {
                    callback(brandNames);
                } else {
                    console.error('Provided callback is not a function.');
                }
            } catch (error) {
                console.error('Error fetching brand names:', error);
            }
        } else {
            console.log("No brands found.");
            callback([]);
        }
    });
}

export function fetchBrandDescription(brandName) {
    return new Promise((resolve, reject) => {
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data[brandName]) {
                const description = data[brandName].description;
                console.log(description);
                resolve(description);
            } else {
                console.log(`Brand ${brandName} not found.`);
                reject('Description not found for ' + brandName);
            }
        });
    });
}

export function fetchBrandImageUrl(brandName, callback) {
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data[brandName]) {
            const imageUrl = data[brandName].images;
            console.log(imageUrl);
            callback(imageUrl);
        } else {
            console.log(`Brand ${brandName} not found.`);
            callback(null);
        }
    });
}