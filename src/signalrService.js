import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const startConnection = (GetDeviceState, CanStartMission) => {
  console.log("salam");
  const connection = new HubConnectionBuilder()
    .withUrl("http://192.168.20.33:5555/DeviceHub")
    .configureLogging(LogLevel.Information)
    .build();

  connection
    .start()
    .then(() => {
      console.log("SignalR Connected!");

      // Register client method
      connection.on("getDeviceState", message => {
        console.log("Received message from server:", message);
        // Handle received messages
        GetDeviceState(message);
      });

      connection.on("canStartMission", missionId => {
        console.log("Server can start mission with ID:", missionId);
        // Handle the canStartMission event here
        // For example, you can trigger some action in your React component
        CanStartMission(missionId);
      });

      // Example: Invoke server method
      connection.invoke("SendMessage", "Hello from client!");
    })
    .catch(error => {
      console.error("SignalR Connection Error: ", error);
    });

  return connection;
};

export { startConnection };
