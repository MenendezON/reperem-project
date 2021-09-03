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

const email = document.getElementById('floatingEmail');
const password = document.getElementById('floatingPassword');
const addBtn = document.getElementById('addBtn');
const loginBtn = document.getElementById('loginBtn');

const auth = firebase.auth();
const user = [];

if (addBtn){
  addBtn.addEventListener('click', (e) => {
    var em = email.value;
    var pwd = password.value;
    user.push(auth.currentUser);

    auth.createUserWithEmailAndPassword(em, pwd)
    .then(userData => {
      userData.user.sendEmailVerification();
      if(userData.user !== null){
        window.location.replace("/");
      }
    }).catch((error)=>{
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error code : '+errorCode);
      console.log('Error message : '+errorMessage);
      document.getElementById('resultLogin').innerHTML = errorMessage;
    });
  });
};

let signout = () => {
  window.location.href = "/signin";
  auth.signOut().then(()=>{
    console.log('User logged out!');
  }).catch((error)=>{
    console.log(error.message);
  });
}

if(loginBtn){
  loginBtn.addEventListener('click', (e)=>{
    var em = email.value;
    var pwd = password.value;
    var promise = auth.signInWithEmailAndPassword(em, pwd);
    promise.catch((e)=>{return console.log(e.message)});
    if(promise){
      user.push(auth.currentUser);
      window.location.replace("/");
    }
  });
}

auth.onAuthStateChanged((user) => {
  if(user != null){
    console.log('This mutherfucker is exist');
  }else{
    //auth.signOut();
    console.log('No user');
  }
});
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