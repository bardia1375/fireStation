import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../../Actions/Table/table";

// Images
import { TableComponent } from "../../../Components/publicTable/Main";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "Reducers";
import { numberWithCommasAndPersian } from "../../../Components/Commons/NumberToPersian";

interface SoftwareFeature {
  Name: string;
  TechnicalDocument: string | null;
  EducationalFilm: string | null;
  Price: number | null;
  IsActive: boolean | null;
  SoftwareFeautureId: string;
}

interface Software {
  SoftwareFeauture: SoftwareFeature[] | null;
}
const MySoftwareModules = () => {
  // const devices = useSelector((state) => state.devices.items);
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [softwares, setSoftwares] = useState<Software[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const { devicesData, isActive } = useSelector((state: RootState) => state.tableData);
  const [Videos, setVideo] = useState({
    Id: 8,
    Title: "آموزش کامل نرم افزار",
    Link: "https://www.aparat.com/video/video/embed/videohash/AUk53/vt/frame",
    Tag: "نرم افزار",
  });
  const { id } = useParams();
  // getAllData
  const handleGetMyTicketsList = async () => {
    try {
      setLoading(true);
      const { allData } = await dispatch(
        getAllData("CustomerSoftwareGet", "SET-SOFTWARES", { CustomerSoftwareId: id })
      );

      if (Array.isArray(allData)) {
        setSoftwares(allData);
      } else if (allData) {
        // If allData is not an array but exists, convert it to an array
        setSoftwares([allData]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dataa:", error);
      setLoading(false);
    }
    // setSoftwares([
    //   {
    //     Id: 9207,
    //     SoftwareType: 0,
    //     SoftwareName: "نرم افزار حضور و غیاب تحت ویندوز پیشرفته",
    //     Status: 1,
    //     StatusName: "تایید شده",
    //     Serial: "RS079814",
    //   },
    //   {
    //     Id: 2342,
    //     SoftwareType: 2342,
    //     SoftwareName: "تست",
    //     Status: 1,
    //     StatusName: "تایید شده",
    //     Serial: "RS079814",
    //   },
    // ]);
    setLoading(false);
  };
  useEffect(() => {
    handleGetMyTicketsList();
  }, []);
  //Set Titles
  const titles = [{ title: "ماژول" }, { title: "فیلم توضیحات" }, { title: " وضعیت " }];

  const dataShow = softwares[0]?.SoftwareFeauture.map(item => [
    item.Name !== null || undefined ? item.Name : " ",
    item.TechnicalDocument !== null || undefined ? item.TechnicalDocument : "ندارد",
    item.IsActive !== null || undefined ? (item.IsActive ? "فعال" : "غیرفعال") : "",
    item.SoftwareFeautureId !== null || undefined ? item.SoftwareFeautureId : "",

    // item.IsActive !== null || undefined ? item.IsActive?"فعال" :"غیرفعال": "",

    // {
    //   Name: "امکان تعریف نامحدود ساعت کاری",
    //   Description: "امکان تعریف نامحدود ساعت کاری",
    //   TechnicalDocument: null,
    //   EducationalFilm: null,
    //   Price: 0,
    //   SoftwareFeautureId: "3bc9aee6-aa57-ee11-a027-000c29580b63",
    //   IsActive: false,
    // },
  ]);
  const AccordionTitle = softwares[0]?.SoftwareFeauture?.map(item => [
    // item.Name !== null || undefined ? item.Name : " ",
    // item.TechnicalDocument !== null || undefined ? item.TechnicalDocument : " ",
    // item.Status !== null || undefined ? item.Status : "",
    // item.Status !== null || undefined ? item.Status : "",
    // { title: "نام", value: item.Name !== null || undefined ? item.Name : " " },

    {
      title: "فیلم توضیحات",
      value: "مشاهده",
      link: item.TechnicalDocument !== null || undefined ? item.TechnicalDocument : "ندارد",
    },
    {
      title: "فیلم آموزشی",
      value: "مشاهده",
      link: item.EducationalFilm !== null || undefined ? item.EducationalFilm : "ندارد",
      // link: "https://www.aparat.com/video/video/embed/videohash/AUk53/vt/frame",
    },
    {
      title: "وضعیت",
      value: item.IsActive !== null || undefined ? (item.IsActive ? "فعال" : "غیرفعال") : "c",
    },
    {
      title: "قیمت",
      value:
        item.Price !== null || undefined ? `${numberWithCommasAndPersian(item.Price)} ریال` : " ",
    },
  ]);
  //   const AccordionTitle = [
  //     {title:"نام",value:"1"},
  //     {title:"فیلم توضیحات",value:"مشاهده",link:""},
  //     {title:"فیلم آموزشی",value:"مشاهده",link:""},
  //     {title:"قیمت",value:"فعال"},
  //     {title:"وضعیت",value:"فعال"},
  //     {title:"",value:""},

  // ]
  console.log("softwares", softwares);
  // const getUniqueSoftwareId = (data) => {
  //   console.log("34234234",data);

  // };
  return (
    <>
      <TableComponent
        page={"ماژول ها "}
        TableData={softwares || []}
        purchase={true}
        AccordionTitle={AccordionTitle}
        accordion
        textAccordion
        // TableData={softwares || []}
        // hoverMode={true}
        // hoverActionItems={true}
        // innerButton={true}
        // outerButton={true}
        // settingButton={true}
        // trashButton={true}
        checkBox={true}
        data={dataShow}
        // setRefresh={setRefresh}
        title={titles}
        loading={loading}
        // getUniqueSoftwareId={getUniqueSoftwareId}
        facilitiUrl={"/mySoftware/Modules/Facilities"}
        // facilitiesTitle={"اطلاعات"}
        // moviesUrl={moviesUrl}
      />
    </>
  );
};
export default MySoftwareModules;
