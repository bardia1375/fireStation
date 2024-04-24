import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../../Actions/Table/table";

// Images
import { TableComponent } from "../../../Components/publicTable/Main";

const  MySoftwareFacilities = () => {
  // const devices = useSelector((state) => state.devices.items);
  const dispatch = useDispatch();
  const [softwares, setSoftwares] = useState([]);
  const [loading, setLoading] = useState(false);
  const { devicesData, isActive } = useSelector((state) => state.tableData);
  // getAllData
  const handleGetMyTicketsList = async () => {
    // setLoading(true);
    // const { allData } = await dispatch(getAllData("Softwares","SET-SOFTWARES"));
    // setSoftwares(allData);
    setSoftwares([ {
      "Id": 9207,
      "SoftwareType": 0,
      "SoftwareName": "نرم افزار حضور و غیاب تحت ویندوز پیشرفته",
      "Status": 1,
      "StatusName": "تایید شده",
      "Serial": "RS079814"
  }]);
    setLoading(false);
  };
  useEffect(()=>{
    handleGetMyTicketsList()
  },[])
  //Set Titles
  const titles = [
    { title: "نام" },
    { title: "فیلم توضیحات" },
    { title: "فیلم آموزشی " },
    { title: " قیمت " },
    { title: " وضعیت " },



  ];

  const dataShow = softwares?.map((item) => [
    item.Module ? item.Module : "1",
    item.videoInformation  ? item.videoInformation : "https://www.aparat.com/video/video/embed/videohash/AUk53/vt/frame",
    // item.Active !== null || undefined ? item.Active===1?"تایید شده":item.Active===0?"تایید نشده " : " در دست بررسی":"",
    item.video  ? item.video : "https://www.aparat.com/video/video/embed/videohash/AUk53/vt/frame",
    item.Price ?  item.Price:"15000",
    item.Status !== null || undefined ? item.Status===1?"فعال":item.Status===0?"غیرفعال" :item.Status===2? "مفقودشده":"تعویض شده":"",
    item.Status !== null || undefined ? item.Status===1?"فعال":item.Status===0?"غیرفعال" :item.Status===2? "مفقودشده":"تعویض شده":"",


  ]);

  return (
    <>
    
    <TableComponent
      page={"ماژول"}
      // hoverMode={true}
      // hoverActionItems={true}
      // innerButton={true}
      // outerButton={true}
      // settingButton={true}
      // trashButton={true}
      purchase={true}
      // checkBox={true}
      data={dataShow}
      title={titles}
      loading={loading}
      

    />
    </>
  );
};
export default MySoftwareFacilities