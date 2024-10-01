export interface Device {
  fullName: string;
  stationName: string;
  date: string;
  Status: number;
  time: string;
  duration: string;
  endedType: string;
  qualityType: string;
  id: string;
}

export interface Title {
  id: number;
  title: string;
  filter?: boolean;
  filterTitle?: string;
}

export interface ColumnFilter {
  filterTitle: string;
}
