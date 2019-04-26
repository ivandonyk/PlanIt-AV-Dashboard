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


