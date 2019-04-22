


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
  buildingId: number | string;
  rooms: Room;
}


