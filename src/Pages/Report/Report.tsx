import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import moment from "moment-jalaali";
import serverApi from "Services/httpService";
import Pagination from "../../Components/publicTable/pagination/Pagination";

// Redux
import { RootState } from "../../Reducers";

// Components
import { TableComponent } from "../../Components/publicTable/Main";
import FormContainer from "./Form/FormContainer";
import InputSearch from "Components/DropDown/InputSearch";

// Utilities
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useIsEndpointCrud } from "Utils/permissionUtils";

// Interfaces
interface Device {
  id: string;
  fullName: string;
  stationName: string;
  date: string;
  time: string;
  duration: number;
  endedType: string;
  qualityType: string | null;
}

interface ColumnFilter {
  filterTitle: string;
}

interface FetchDevicesParams {
  query: string;
  columnFilter: ColumnFilter | null;
}

const Report: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();

  // State Management
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [columnFilter, setColumnFilter] = useState<ColumnFilter | null>(null);
  const [fromDateReport, setFromDateReport] = useState<string>("");
  const [toDateReport, setToDateReport] = useState<string>("");
  const [fromTimeReport, setFromTimeReport] = useState<string>("");
  const [toTimeReport, setToTimeReport] = useState<string>("");
  const { devicesData } = useSelector((state: RootState) => state.tableData);
  const location = useLocation();
  const [totalCount, setTotalCount] = useState<number>(0);

  const [currentPage, setCurrentPage] = useState(
    location?.state?.currentPage ? location?.state?.currentPage : 1
  );
  const pageSize = 10;
  // تغییر fetchDevices برای دریافت صفحه
  const fetchDevices = async ({
    query,
    columnFilter,
    page,
  }: FetchDevicesParams & { page: number }): Promise<Device[]> => {
    try {
      const payload: any = {
        page: currentPage, // شماره صفحه
        limit: pageSize,
        fromDate: fromDateReport
          ? moment(fromDateReport).format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
        toDate: toDateReport
          ? moment(toDateReport).format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
        // fromTime: fromTimeReport,
        // toTime: toTimeReport,
      };

      if (columnFilter?.filterTitle === "fullName") {
        payload.fullName = query;
      } else if (columnFilter?.filterTitle === "quality") {
        payload.quality = query;
      }

      const response = await serverApi.post("/Reports/MissionReport", payload);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching devices:", error);
      throw error;
    }
  };

  // به‌روزرسانی useMutation برای پشتیبانی از صفحه‌بندی
  const {
    mutate,
    data: reports,
    isLoading,
  } = useMutation<Device[], Error, FetchDevicesParams & { page: number }>({
    mutationKey: ["devices"],
    mutationFn: fetchDevices,
    onSuccess: data => {
      setTotalCount(data?.totalCount);
      setDevices(data?.data)
    },
  });

  // به‌روزرسانی useEffect برای گوش دادن به currentPage
  useEffect(() => {
    mutate({ query: searchQuery, columnFilter, page: currentPage });
  }, [fromDateReport, toDateReport, currentPage, mutate]);

  // تنظیم currentPage هنگام تغییر صفحه
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    mutate({ query: searchQuery, columnFilter });
  }, [fromDateReport, toDateReport, mutate, fromTimeReport, toTimeReport]);

  // Table Columns
  const [titles, setTitle] = useState([
    { id: 0, title: "کاربر", filter: true, filterTitle: "fullName" },
    { id: 1, title: "ایستگاه", filter: true, filterTitle: "" },
    { id: 2, title: "تاریخ" },
    { id: 3, title: "ساعت" },
    { id: 4, title: "مدت زمان" },
    { id: 5, title: "وضعیت", filter: true, filterTitle: "" },
    { id: 6, title: "کیفیت", filter: true, filterTitle: "quality" },
  ]);
  const endpoint = "/Reports/TimeInMission";
  
  const hasPermission = useIsEndpointCrud(endpoint);
  const [dataTable, setDataTable] = useState(reports);
  useEffect(() => {
    setDataTable(reports);
  }, []);
  useEffect(() => {
    if (!hasPermission) {
      setTitle(prev => {
        const filterDuration = prev.filter(el => el.id !== 4);
        return filterDuration;
      });
    }
  }, [hasPermission]);
  // Prepare Data for Display
  // Prepare Data for Display
  const dataShow =
    reports?.data && Array.isArray(reports?.data)
      ? reports?.data.map((item: any) => {
          const baseData = [
            item.fullName || "-",
            item.stationName || "-",
            item.date || "-",
            item.time || "-",
            item.endedType || "-",
            item.qualityType || "-",
            item.id,
          ];

          // اضافه کردن duration در صورت وجود دسترسی
          if (hasPermission) {
            baseData.splice(4, 0, `${item.duration} ثانیه`);
          }

          return baseData;
        })
      : [];
  // Handle Filter Selection
  const handleFilterSelection = (selectedFilter: ColumnFilter) => {
    setColumnFilter(selectedFilter);
  };

  // Handle Search Input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (columnFilter) {
      mutate({ query, columnFilter });
    }
  };

  // Preserve getData Function
  const getData = (item: {
    fromDate: string;
    toDate: string;
    fromTime: string;
    toTime: string;
  }) => {
    setFromDateReport(item.fromDate);
    setFromTimeReport(item?.fromTime);
    setToTimeReport(item?.toTime);
    setToDateReport(item.toDate);
  };

  return (
    <>
      <TableComponent
        pagination={5}
        excelExport
        loading={isLoading}
        InputSearchFilter={<InputSearch value={searchQuery} onSearch={handleSearch} />}
        onSearch={handleFilterSelection}
        page="دستگاه"
        devices={devices}
        data={dataShow}
        TableData={devicesData || []}
        title={titles}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        reportTiming={<FormContainer getData={getData} isLoading={isLoading} />}
      />
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={Math.ceil(totalCount / 10)}
        pageSize={pageSize}
        onPageChange={handlePageChange} // اینجا
      />
    </>
  );
};

export default Report;
