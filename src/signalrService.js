import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const startConnection = (updateStationState, ip, port) => {
  const connection = new HubConnectionBuilder()
    .withUrl("http://192.168.20.33:2224/StationsHub")
    .configureLogging(LogLevel.Information)
    .withAutomaticReconnect() // قابلیت اتصال مجدد خودکار
    .build();

  connection
    .start()
    .then(() => {
      console.log("SignalR Connected!");

      // ثبت تابع برای دریافت پیام‌ها از سرور
      connection.on("getStations", message => {
        console.log("Received message from server:", message);
        updateStationState(message); // به روز رسانی داده‌ها
      });

      // فراخوانی متد SendDevicePing برای ارسال ip و port به سرور
      connection
        .invoke("sendDevicePing", { ip: "192.168.20.115", port: "8080", continuePinging: true })
        .then(response => {
          console.log("Received response from SendDevicePing:", response);
          // اگر نیاز است، پاسخ را به state اضافه کنید یا هر پردازش دیگری انجام دهید
        })
        .catch(error => {
          console.error("Error invoking SendDevicePing: ", error);
        });
    })
    .catch(error => {
      console.error("SignalR Connection Error: ", error);
    });

  // مدیریت قطع شدن اتصال و تلاش برای اتصال مجدد
  connection.onclose(error => {
    console.log("Connection closed due to error. Trying to reconnect...", error);
  });

  return connection;
};

export { startConnection };
