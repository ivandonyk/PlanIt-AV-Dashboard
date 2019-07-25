export interface SlideData {
  buildingId: number;
  buildingName: string;
  coreEquipment: string;
  fiscalYear: number;
  nbrRooms: number;
  includes?: any;
  length?: any;
  roomsToReplace: Array<{
    roomName: string;
    year: string;
  }>;
}

export interface Slides {
  index: number;
  slides: SlideData[];
}

export interface Room {
  roomId: number;
  roomName: string;
  coreAge: string;
  equipmentAge: string;
  replace: string | number;
  lastInstall: string | number;
  colorCode: string;
  type: any;
  tier: any;
}

export interface Rooms {
  rooms: Room[];
}

export interface Buildings {
  systemBuilding: {
    buildings: SlideData;
    rooms: Room;
  };
}

export interface BuildingsIds {
  buildingName: string;
  id: number;
}

export interface RoomDetails {
  avLastUpdateCost: number;
  buildingId?: number;
  avLastUpdateDate: string;
  ceilingHeight: number;
  ceilingType: string;
  coreAge: string;
  buildingName?: string;
  dateOfLastRemodel: string;
  dimensions: string;
  roomType?: string;
  equipmentAge: string;
  floor: number;
  images?: Array<string>;
  integrator: string;
  lastAvContractor: string;
  lastInstallDate: string;
  lifecycle: number;
  nextAvUpdCost: number;
  nextAvUpdateDt: string;
  notes: string;
  origAvContractor: string;
  origAvInstallDate: string;
  origAvSystemCost: number;
  replaceUpg: string;
  roomName: string;
  seatingCapacity: number;
  seatingType: string;
  tier: number;
}

export interface RoomDTO {
  avLastUpdateCost?: number;
  avLastUpdateDate?: string;
  buildingId?: number;
  ceilingHeight?: number;
  ceilingType?: string;
  dateOfLastRemodel?: string;
  dimensions?: string;
  floor?: number;
  integrator?: string;
  lastAvContractor?: string;
  lifecycle?: number;
  nextAvUpdCost?: number;
  nextAvUpdateDt?: string;
  notes?: string;
  origAvContractor?: string;
  origAvInstallDate?: string;
  origAvSystemCost?: number;
  roomId?: number;
  roomName?: string;
  roomType?: string;
  seatingCapacity?: number;
  seatingType?: string;
  tier?: number;
  updProjDesc?: string;
  userName?: string;
  coreAge?: string | number;
}








export interface Equipment {
  building: string;
  category: string;
  colorCode: string;
  description: string;
  equipmentClass: string;
  installDate: string;
  lifecycle: string;
  manualIcon: boolean;
  manufacturer: string;
  modelNumber: string;
  photoIcon: boolean;
  room: string;
}

export interface EquipmentDetail {
  room: string;
  altLocation: string;
  roomId: any;
  manufacturer: string;
  modelNumber: string;
  description: string;
  equipmentClass: string;
  category: string;
  installDate: string;
  lifecycle: string;
  replacementDate: string;
  integrator: string;
  manufactureWarranty: string;
  warrantyExpiration: string;
  extWarrantyProvider: string;
  extWarrantyExpiration: any;
  serialNum: string;
  macAddress: string;
  ipAddress: string;
  port: string;
  countryManufacturer: string;
  manuals: string;
}

export interface EquipmentDetailUpdate {
  alternateLocation: string;
  countryOfManufacture: string;
  dateInstalled: string;
  description: string;
  equipmentCategory: string;
  equipmentClass: string;
  equipmentId: number;
  extWarrantyStartDate?: string;
  extendedWarranty?: number;
  extendedWarrantyProvider: string;
  integrator: string;
  ipAddress: string;
  lifecycle: number | string;
  macAddress: string;
  manufactureWarranty: number;
  manufacturer: string;
  modelNumber: string;
  port: string;
  replacementDate: string;
  roomId?: any;
  serialNumber: string;
  userName: string;
  warrantyExpirationDate: string;
  warrantyStartDate?: string;
}

