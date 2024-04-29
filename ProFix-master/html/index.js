const firebaseConfig = {
    apiKey: "AIzaSyAVWkGsLftgmARG2CobEMMibCd4NzsfVSo",
    authDomain: "profix-master.firebaseapp.com",
    projectId: "profix-master",
    storageBucket: "profix-master.appspot.com",
    messagingSenderId: "9357872696",
    appId: "1:9357872696:web:95307cc2a350690ca6a0cd"
};
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = getFireStore(app);

function isValidEmail(email) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function register(){
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    if (!isValidEmail(email))
        alert("Invalid email");
    else if(password!==password2)
        alert("Two Passwords didnt match");
    else{
        auth.createUserWithEmailAndPassword(email, password)
        .then(function(){
            var user = auth.currentUser;
            var userData = {
                username: username,
                email: email
            };
            
            firebase.firestore().collection("users").doc(user.uid).set(userData)
            .then(function() {
                alert("User Created");
            })
            .catch(function(error) {
                alert("Error storing user data: " + error);
            });
    
        })
        .catch(function(error){
            var error_code = error.code;
            var error_message = error.message
            alert(error_message);
        })
        
    }
}

