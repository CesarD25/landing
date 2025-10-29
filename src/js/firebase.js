import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

let saveVotes = (productId) => {
    // Referencia a la colección 'votes'
    const votesRef = ref(database, 'votes');

    // Crea una nueva entrada con una key única
    const newVoteRef = push(votesRef);


    // set() devuelve una promesa; manejamos éxito y error y normalizamos la respuesta
    return set(newVoteRef, { productId: productId, timestamp: Date.now() })
        .then(() => {
            return {
                status: true,
                message: 'Vote saved'
            }
        })
        .catch((error) => {
            console.error("Error saving vote: ", error);
            return {
                status: false,
                message: "Error saving vote: "
            }
        });
};

export { saveVotes };