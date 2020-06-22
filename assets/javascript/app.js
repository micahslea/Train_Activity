var config = {
  apiKey: "AIzaSyCWLrQR2aONylPCNpSwYBdLeJVP6JKlAi8",
  authDomain: "train-activity-c2c5a.firebaseapp.com",
  databaseURL: "https://train-activity-c2c5a.firebaseio.com",
  projectId: "train-activity-c2c5a",
  storageBucket: "train-activity-c2c5a.appspot.com",
  messagingSenderId: "762449658925",
  appId: "1:762449658925:web:f125cf27aea6201524a4a4",
  measurementId: "G-Q18WV7EJR7",
};
firebase.initializeApp(config);

var tr = $("<tr>");
var th = $("<th>").attr("scope", "row");
var td1 = $("<td>");
var td2 = $("<td>");
var td3 = $("<td>");
var td4 = $("<td>");

var database = firebase.database();
var trainName;
var destination;
var firstTime;
var frequency;
var currentTime = moment();

$("#submit").on("click", function (event) {
  event.preventDefault();
  trainName = $("#train-name").val().trim();
  destination = $("#train-destination").val().trim();
  firstTime = $("#train-first-time").val().trim();
  frequency = $("#train-frequency").val().trim();

  var trainInfo = {
    Name: trainName,
    Destination: destination,
    FirstTime: firstTime,
    Frequency: frequency,
  };

  database.ref().push(trainInfo);

  $("#train-name").val("");
  $("#train-destination").val("");
  $("#train-first-time").val("");
  $("#train-frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  var newTrain = childSnapshot.val();

  var trainName = newTrain.Name;
  var destination = newTrain.Destination;
  var firstTime = newTrain.FirstTime;
  var frequency = newTrain.Frequency;

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  var tRemainder = diffTime % frequency;

  var tMinutesTillTrain = frequency - tRemainder;

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");

  $(".table").append(tr);
  tr.append(th.text(trainName));
  tr.append(td1.text(destination));
  tr.append(td2.text(frequency));
  tr.append(td3.text(moment(nextTrain).format("hh:mm A")));
  tr.append(td4.text(tMinutesTillTrain));
});
