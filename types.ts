type ID = string;

export type Station = {
  id: ID;
  address: string;
  bikesAvailable: number;
  docksAvailable: number;
  inService: boolean;
  name: string;
};

type ApiStationInfo = {
  address: string;
  name: string;
  station_id: string;
};

type ApiStationStatus = {
  is_installed: number;
  is_renting: number;
  is_returning: number;
  num_bikes_available: number;
  num_docks_available: number;
  station_id: string;
};

type ApiEnvelope<Type> = {
  data: {
    stations: Type;
  };
};

export type ApiStationInfoResponse = ApiEnvelope<ApiStationInfo[]>;

export type ApiStationStatusResponse = ApiEnvelope<ApiStationStatus[]>;
