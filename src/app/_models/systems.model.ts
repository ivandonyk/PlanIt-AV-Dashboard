export interface SlideData {
  buildingId: number;
  nbrRooms: number;
  coreEquipment: string;
  roomsToReplace: string;
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

export interface RoomDetails {
  avLastUpdateCost: number;
  avLastUpdateDate: string;
  ceilingHeight: number;
  ceilingType: string;
  dateOfLastRemodel: string;
  dimensions: string;
  floor: number;
  integrator: string;
  lastAvContractor: string;
  nextAvUpdCost: number;
  nextAvUpdateDt: string;
  notes: string;
  origAvContractor: string;
  origAvInstallDate: string;
  origAvSystemCost: number;
  roomName: string;
  seatingCapacity: number;
  seatingType: string;
  tier: number;
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

