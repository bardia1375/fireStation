import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const startConnection = (updateStationState) => {
  const connection = new HubConnectionBuilder()
    .withUrl("http://192.168.20.33:2224/Stations")
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect() // اضافه کردن قابلیت اتصال مجدد خودکار
    .build();

  connection
    .start()
    .then(() => {
      console.log("SignalR Connected!");

      // ثبت تابع برای دریافت پیام‌ها از سرور
      connection.on("getStations", (message) => {
        console.log("Received message from server:", message);
        updateStationState(message); // به روز رسانی داده‌ها
      });
    })
    .catch((error) => {
      console.error("SignalR Connection Error: ", error);
    });

  // مدیریت قطع شدن اتصال و اتصال مجدد
  connection.onclose((error) => {
    console.log("Connection closed due to error. Trying to reconnect...", error);
  });

  return connection;
};

export { startConnection };
