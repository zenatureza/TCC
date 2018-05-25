var num_vagas_disponiveis = "0";
var marker;

// Create a client instance
var host = "m13.cloudmqtt.com";
var port = 11277;

// Create a client instance
// client = new Paho.MQTT.Client("iot.eclipse.org", 443, "/ws", "kcflxtae");
client = new Paho.MQTT.Client(host, port, client_id="web_" + parseInt(Math.random() * 100, 10));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
var connectionOptions = {
  useSSL: true,
  keepAliveInterval: 20,
  timeout: 3,
  userName: "kcflxtae",
  password: "xnPQvjYVZmxQ",
  onSuccess: onConnect
}
client.connect(connectionOptions);


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("entrou");
  marker.setLabel("666");
  client.subscribe("World");
  message = new Paho.MQTT.Message("cheguei nessa porra");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
client.onConnectionLost = function (responseObject) {
  marker.setLabel("123");
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives
client.onMessageArrived = function (message) {
  console.log("onMessageArrived:" + message.payloadString);
}

function initMap() {
  var coords = { lat: -29.720415, lng: -53.7141605 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: coords,
    scrollwheel: false
  });
  marker = new google.maps.Marker({
    title: "Vagas disponíveis",
    position: coords,
    animation: google.maps.Animation.DROP,
    label: num_vagas_disponiveis,
    map: map
  });
  marker.addListener('click', toggleBounce);
}

// Anima o 'marker'
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

