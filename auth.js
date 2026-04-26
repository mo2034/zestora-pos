const firebaseConfig = {
  apiKey: "AIzaSyDGCkaW9MnDpcItW1yOdnRxPSI5X5aFOVE",
  authDomain: "zestora-web.firebaseapp.com",
  projectId: "zestora-web",
  storageBucket: "zestora-web.firebasestorage.app",
  messagingSenderId: "763748103265",
  appId: "1:763748103265:web:5fb9927bad072e78652620"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Force session persistence so the user is signed out when the browser/tab is closed
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

function signUp() {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
      document.getElementById('auth-error').textContent = '';
    })
    .catch((error) => {
      document.getElementById('auth-error').textContent = error.message;
    });
}

function login() {
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
      document.getElementById('auth-error').textContent = '';
    })
    .catch((error) => {
      document.getElementById('auth-error').textContent = error.message;
    });
}

function logout() {
  auth.signOut().then(() => {
    // Clear any local storage or session storage data
    localStorage.clear();
    sessionStorage.clear();
    
    // UI toggle
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
    
    // Reset login form fields
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
  }).catch((error) => {
    console.error("Logout Error:", error);
  });
}

// Force sign-out when the page is closed/refreshed
window.addEventListener('beforeunload', () => {
  auth.signOut();
});

auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
  } else {
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
  }
});