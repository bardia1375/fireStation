const isAdmin = localStorage.getItem("role");

export const menues = [
  // {
  //   url: "/club",
  //   title: "باشگاه مشتریان",
  //   imgUrl: "/images/menuIcon/club.svg",

  // },

  // {
  //   url: "/mySoftware",
  //   title: "نرم افزارهای من",
  //   imgUrl: "/images/menuIcon/software.svg",
  // },
  {
    url: "/personnel",
    title: "کاربران",
    imgUrl: "/images/menuIcon/people.svg",
    role: "/UserManagement/GetUsers",
  },
  {
    url: "/dashboard",
    title: "داشبورد",
    imgUrl: "/images/menuIcon/device.svg",
    Permission: "/Reports/TimeInMission",
    role: "/dashboard",
  },
  {
    url: "/stations",
    title: "ایستگاه‌ها",
    imgUrl: "/images/menuIcon/device.svg",
    Permission: "",
    role: "/Stations/EditStation",
  },
  {
    url: "/reports",
    title: "گزارشات",
    imgUrl: "/images/menuIcon/message.svg",
    Permission: "",
    role: "/Reports/MissionReport",
  },
  {
    url: "/setting",
    title: "تنظیمات",
    imgUrl: "/images/menuIcon/setting.svg",
    Permission: "",
    role: "/BaseSettings/GetBaseSetting",
  },
  {
    url: "/logs",
    title: "تاریخچه سیستم",
    imgUrl: "/images/menuIcon/message.svg",
    Permission: "",
    role: "/SystemLogs/GetLogs",
  },

  // {
  //   url: "/mycontract",
  //   title: "قراردادهای من",
  //   imgUrl: "/images/menuIcon/contract.svg",
  // },
  // {
  //   url: "/myorder",
  //   title: "سفارش های من",
  //   imgUrl: "/images/menuIcon/order.svg",
  // },
  //   {
  //     url: "/questions",
  //     title: "پرسش‌های پرشمار",
  //     imgUrl: "/images/menuIcon/check.svg",
  //   },
  //  {
  //     url: "/videos",
  //     title: "آموزش",
  //     imgUrl: "/images/menuIcon/educate.svg",
  //   },
  //   {
  //     url: "/satisfy",
  //     title: "ثبت رضایت نامه",
  //     imgUrl: "/images/menuIcon/check.svg",
  //   },

  //   {
  //     url: "/fix",
  //     title: "تعمیرات",
  //     imgUrl: "/images/menuIcon/repair.svg",
  //   },

  // {
  //   url: "/person",
  //   title: "افراد مرتبط",
  //   imgUrl: "/images/menuIcon/people.svg",
  // },

  // {
  //   url: "/profile",
  //   title: "تنظیمات",
  //   imgUrl: "/images/menuIcon/setting.svg",
  // },
  {
    url: "/logout",
    title: "خروج",
    imgUrl: "/images/menuIcon/logout.svg",
  },
];
export const SITE_KEY = " ";
