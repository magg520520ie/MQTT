// Create a client instance
client = new Paho.MQTT.Client("wss://iot.eclipse.org:443/ws", "iphoneXiphone8iphone7");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);

    var Output = document.getElementById('info');
    Output.innerHTML = message.payloadString + "<br>"+ Output.innerHTML
}

function subTopic() {
    var Topic = document.getElementById('txtSubTopic').value;
    client.subscribe(Topic);
    document.getElementById('txtSubTopic').value='';        
}

function pubTopic() {
    var Topic = document.getElementById('txtPubTopic').value;
    var Msg = document.getElementById('txtMsgTopic').value;

    message = new Paho.MQTT.Message(Msg);
    message.destinationName = Topic;
    client.send(message);
    document.getElementById('txtMsgTopic').value='';
}