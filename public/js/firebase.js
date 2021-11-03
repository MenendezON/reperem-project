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

function Verif(){
  id = document.getElementById('productId').value;
  libelle = document.getElementById('productDesignation').value;
  unit = document.getElementById('productUnity').value;
  qte = document.getElementById('productQuantity').value;
  categ = document.getElementById('productCategory').value;
  etage = document.getElementById('productSpace').value;
  mag = document.getElementById('productStore').value;
  desc = document.getElementById('productDetails').value;
  prix = document.getElementById('productPrice').value;
  pic = "default.jpg";
  uid = "unknown";
}

function Clear(){
  document.getElementById('productDesignation').value = "";
  document.getElementById('productUnity').value = "";
  document.getElementById('productQuantity').value = "";
  document.getElementById('productCategory').value = "";
  document.getElementById('productSpace').value = "";
  document.getElementById('productStore').value = "";
  document.getElementById('productDetails').value = "";
  document.getElementById('productPrice').value = "";
}

const addProduct = document.getElementById('addProduction');

//ajout de produit
if(addProduct){
  addProduct.addEventListener('click', (e) => {
    e.preventDefault();
    Verif();
    try{
      firebase.database().ref('product/'+id).set({
        libelle: libelle,
        unite: unit,
        quantite: parseInt(0),
        category: categ,
        emplacement: etage,
        magasin: mag,
        description : desc,
        picture: pic,
        user: uid
      });

      Clear();
      entryData(qte, prix, id, 'entree');
      fillAll();

    }catch(err) {
      document.getElementById("result").innerHTML = err.message;
    }
  });
}

// opération d'entrée
entryData = (qte, prix, id, typeOpe) => {
  const rootRef = firebase.database().ref('operation/'+id);
  var currentDate = Date.now();
  const autoId = rootRef.push().key;
  rootRef.child(autoId).set({
    type : typeOpe,
    qte: parseInt(qte),
    dte: currentDate,
    prix: parseFloat(prix)
  });

  
  firebase.database().ref('product/'+id+'/quantite').on('value', (snapshot) => {
    qteCurrent = snapshot.val();
  });
  let qteActuelle = parseInt(qteCurrent)+parseInt(qte);
  firebase.database().ref('product/'+id).update({quantite : parseInt(qteActuelle)});
}

// opération d'entrée
outputData = (qte, prix, id) => {
  const rootRef = firebase.database().ref('product/'+id+'/sortie/');
  var currentDate = Date.now();
  const autoId = rootRef.push().key;
  rootRef.child(autoId).set({
    qte_entree: parseInt(qte),
    dte_entree: currentDate,
    prix_unite: parseFloat(prix)
  });

  firebase.database().ref('product/'+id+'/quantite').on('value', (snapshot) => {
    qteCurrent = snapshot.val();
  });
  let qteActuelle = parseInt(qteCurrent)-parseInt(qte);
  firebase.database().ref('product/'+id).update({quantite : parseInt(qteActuelle)});
}

//afficher la liste des produits
/*firebase.database().ref('product/'+1630960048).on('value', (snapshot) => {
  const data = snapshot.val();
  console.log(data.libelle);

});*/

fillAll = () => {
  const arrayL = document.getElementById('displayArray');
  arrayL.innerHTML = "";
  firebase.database().ref("product").orderByKey().once("value").then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();  
      console.log("Produit key : "+key+" With value : "+childSnapshot.val().libelle);
      arrayL.innerHTML += "<tr><td style='width:50px; text-align:center; cursor:pointer; font-weight: bold;'>+</td><td>"+childSnapshot.val().libelle+"</td><td style='width:150px; text-align:center; '>"+childSnapshot.val().quantite+"</td><td style='width:150px; text-align:center; '><a href='/view/"+key+"'>Détails</a></td></tr>";
    });
  });
}

/*fillById = (id) => {
  console.log(id);
  const arrayL = document.getElementById('displayArray');
  arrayL.innerHTML = "Hello";
  firebase.database().ref('product/'+id).on('value', (snapshot) => {
    var data = snapshot.val();
    firebase.database().ref('operation/'+id).orderByKey().once("value").then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();  
        arrayL.innerHTML += "<tr><td style='width:50px; text-align:center; cursor:pointer; font-weight: bold;'>+</td><td>"+data.libelle+"</td><td style='width:150px; text-align:center; '>"+data.quantite+"</td><td style='width:150px; text-align:center; '>"+childSnapshot.val().type+"</td></tr>";
      });
    });
    
  });
}*/
fillById = (id) => {
  const arrayL = document.getElementById('displayArray');
  arrayL.innerHTML = "<tr><th>Libelle</th><th>Type</th><th>Quantité</th><th>Prix</th><th>Date d'op</th></tr>";
  var libelle;
  firebase.database().ref('product/'+id).orderByKey().once("value").then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childData); 
      libelle = childSnapshot.val().libelle;
      //arrayL.innerHTML += "<tr><td>"+childSnapshot.val().type+"</td><td>"+childSnapshot.val().qte+"</td><td>"+childSnapshot.val().prix+"</td><td>"+childSnapshot.val().dte+"</td></tr>";
    });
  });
  firebase.database().ref('operation/'+id).orderByKey().once("value").then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      arrayL.innerHTML += "<tr><td>"+libelle+"</td><td>"+childSnapshot.val().type+"</td><td>"+childSnapshot.val().qte+"</td><td>"+childSnapshot.val().prix+"</td><td>"+childSnapshot.val().dte+"</td></tr>";
    });
  });
}

//fillAll();
/*const email = document.getElementById('floatingEmail');
const password = document.getElementById('floatingPassword');
const addBtn = document.getElementById('addBtn');
const loginBtn = document.getElementById('loginBtn');

const auth = firebase.auth();
const user = auth.currentUser;

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
}*/
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

