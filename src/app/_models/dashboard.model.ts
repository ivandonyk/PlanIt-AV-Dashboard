export interface Systems {
  nbrBuildings: number;
  nbrRooms: number;
  nbrEquipment: number;
}

export interface Lifecycle {
  coreEquipmentAge: string;
  roomsToUpgrade: Array<RoomsToUpgrade>;
}


export interface RoomsToUpgrade {
  nbrRoomsUpg: number;
  year: number;
}

export interface Support {
  rptIssueMonth: number | string;
  rptIssue12Months: number | string;
  serviceCallMonth: number | string;
  serviceCall12Months: number | string;
}

export interface Dashboard {
  dashboard: {
    systems?: Systems;
    lifecycle?: Lifecycle;
    support?: Support;
  };
}
