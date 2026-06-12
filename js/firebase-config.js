// Importar funciones de Firebase desde CDN (versión 10.8.0)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// =========================================================
// ⚠️ PEGA AQUÍ TU CONFIGURACIÓN DE FIREBASE
// (La obtienes en la consola de Firebase: Project Settings > General > Your apps)
// =========================================================
const firebaseConfig = {
  apiKey: "AIzaSyBlDNUZN3-EeVoz_HD-tgkzrxJl8ndX4j8",
  authDomain: "apaticgames-a4209.firebaseapp.com",
  projectId: "apaticgames-a4209",
  storageBucket: "apaticgames-a4209.firebasestorage.app",
  messagingSenderId: "900964381147",
  appId: "1:900964381147:web:6a0a6ceb1d82ae41fc37fe"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, db };