import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const startConnection = (updateStationState, ip, port) => {
  const connection = new HubConnectionBuilder()
    .withUrl("http://192.168.20.33:2224/StationsHub")
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect() // قابلیت اتصال مجدد خودکار
    .build();

  async function start() {
    try {
      await connection.start(); // Wait for connection to be established
      console.log("SignalR Connected.");

      // Call invoke only after connection is established
      try {
        await connection.invoke("sendDevicePing", {
          ip: "192.168.20.115", // استفاده از پارامتر ip
          port: "8080", // استفاده از پارامتر port
          continuePinging: true,
        });
        console.log(`Ping sent to IP: ${ip}, Port: ${port}`);
      } catch (err) {
        console.error("Error invoking sendDevicePing:", err);
      }

    } catch (err) {
      console.log("Failed to connect, retrying...");
      console.log(err);
      setTimeout(start, 5000); // Retry connection after 5 seconds
    }
  }

  connection.onclose(async () => {
    console.log("Connection closed, restarting...");
    await start(); // Restart the connection on close
  });

  // Start the connection
  start();

  // دریافت پیام‌های getStations
  connection.on("getStations", (message) => {
    console.log("Received message from server:", message);
    updateStationState(message); // به روز رسانی داده‌ها
  });

  // دریافت پیام‌های getDevicePing
  // connection.on("getDevicePing", (message) => {
  //   console.log("Received device ping:", message);
  // });

  return connection;
};

export { startConnection };
