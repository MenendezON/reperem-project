var firebaseConfig = {
    apiKey: "AIzaSyDCtOahyyAHGV3DEViaUFuk4kJpPEl3OxI",
    authDomain: "gestionstocks-56016.firebaseapp.com",
    databaseURL: "https://gestionstocks-56016-default-rtdb.firebaseio.com",
    projectId: "gestionstocks-56016",
    storageBucket: "gestionstocks-56016.appspot.com",
    messagingSenderId: "886449195422",
    appId: "1:886449195422:web:73f1477f3e5be474a82e8f"
};

firebase.initializeApp(firebaseConfig);


let userId = document.getElementById('userId');
let fullname = document.getElementById('floatingFullname');
let email = document.getElementById('floatingEmail');
let password = document.getElementById('floatingPassword');
let addBtn = document.getElementById('addBtn');
let loginBtn = document.getElementById('loginBtn');

const auth = firebase.auth();

let login = () => {
    auth.signInWithEmailAndPassword(email.value, password.value);
}

let user = auth.currentUser;

/*user.updateProfile({
    displayName: "Menendez NELSON",
    photoURL: "https://example.com/user/profile.jpg"
  }).then(function() {
    // Update successful.
    console.log('User Profile Updated Successfully');
  }).catch(function(error) {
    // An error happened.
  });*/

auth.onAuthStateChanged((user) => {
    if(user !== null){
        console.log('This mutherfucker is exist');
        console.log(user.uid);
        console.log(user.email);
        console.log(user.displayName);
        console.log(user.photoURL);
    }else{
        signout();
        console.log('No user');
    }
});


//not yet done
let signup = () => {
    auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then(function () {
        user = auth.currentUser;
        user.sendEmailVerification();
      })
      .then(function () {
        user.updateProfile({
          displayName: "Menendez NELSON",
          photoURL: "PHOTO url"
        });
      })
    .catch((error)=>{
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
}

let signout = () => {
    console.log('Au revoir !!!');
    auth.signOut().then(function(){
        console.log('User logged out!');
    }).catch((error)=>{
        console.log(error.message);
    });
}

/*const database = firebase.database();
const rootRef = database.ref('users');
addBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const autoId = rootRef.push().key;
    rootRef.child(autoId).set({
        full_name : fullname.value,
        email : email.value,
        password : password.value
    });
});*/