import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const startConnection = updateDeviceState => {
  const connection = new HubConnectionBuilder()
  //حتما این مورد تغییر کند مطابق ایپی
    .withUrl("http://192.168.31.33:2220/StationsHub")
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect() // اضافه کردن قابلیت اتصال مجدد خودکار
    .build();

  connection
    .start()
    .then(() => {
      console.log("SignalR Connected!");

      // ثبت تابع برای دریافت پیام‌ها از سرور
      connection.on("getStations", message => {
        console.log("Received message from server:", message);
        updateDeviceState(message); // به روز رسانی داده‌ها
      });
    })
    .catch(error => {
      console.error("SignalR Connection Error: ", error);
    });

  // مدیریت قطع شدن اتصال و اتصال مجدد
  connection.onclose(error => {
    console.log("Connection closed due to error. Trying to reconnect...", error);
  });

  return connection;
};

export { startConnection };
