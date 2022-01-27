export interface AW_LocationData {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: AW_Location;
  AdministrativeArea: AW_Location;
}

interface AW_Location {
  ID: string;
  LocalizedName: string;
}
