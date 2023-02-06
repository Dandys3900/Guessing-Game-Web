const namesArray = [];

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDD6i3_BSApa0BDqpV3QUlPEwZdr7caeno",
    authDomain: "guessinggame-4ed32.firebaseapp.com",
    databaseURL: "https://guessinggame-4ed32-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "guessinggame-4ed32",
    storageBucket: "guessinggame-4ed32.appspot.com",
    messagingSenderId: "876468199286",
    appId: "1:876468199286:web:e7a7c7e0b972a8ca5c6457"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
var database = firebase.database().ref('names');
// Set listener to trigger update everytime change happens
database.on("value", function(databaseData) {
    var data = databaseData.val();
    for (let item in data) {
        namesArray.push(data[item]);
    }
});

function startGame() {
    // Hide button
    document.getElementById("startButton").style.display = "none";
    document.getElementById("addNameButton").style.display = "none";
    document.getElementById("backButton").style.display = "block";
    // Change background to the one without text
    if (window.innerWidth > 800)
        document.body.style.backgroundImage = "url('style/background_basic.png')";

    selectAndSetUserName();
}

function backToMainPage() {
    document.getElementById("startButton").style.display = "block";
    document.getElementById("addNameButton").style.display = "block";
    document.getElementById("newNameForm").style.display = "none";
    document.getElementById("backButton").style.display = "none";
    document.getElementById("nameToGuess").style.display = "none";
    // Change background to the one with text
    if (window.innerWidth > 800)
        document.body.style.backgroundImage = "url('style/background_title.png')";
}

function selectAndSetUserName() {
    const randomName = namesArray[Math.floor(Math.random() * namesArray.length)];
    document.getElementById("nameToGuess").style.display = "block";
    document.getElementById("nameToGuess").innerHTML = randomName;
}

function showForm() {
    document.getElementById("newNameForm").style.display = "block";
    document.getElementById("backButton").style.display = "block";
    document.name.newname.value = "";
    document.getElementById("startButton").style.display = "none";
    document.getElementById("addNameButton").style.display = "none";
}

function addNewName() {
    const newlyEnteredName = document.name.newname.value;
    // Send new value to firebase database
    if (document.name.newname.value != "")
        database.push(newlyEnteredName);
    
    document.getElementById("newNameForm").style.display = "none";
    backToMainPage();
}