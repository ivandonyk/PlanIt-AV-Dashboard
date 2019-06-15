export interface EquipmentDetailAdd {
  alternateLocation: string;
  countryOfManufacture: string;
  dateInstalled: string;
  description: string;
  equipmentCategory: string;
  equipmentClass: string;
  extWarrantyStartDate: string;
  extendedWarranty: number;
  extendedWarrantyProvider: string;
  ipAddress: string;
  lifeCycle?: string;
  lifecycle?: string | number;
  macAddress: string;
  manufactureWarranty: number;
  manufacturer: string;
  modelNumber: string;
  port: string;
  rooms?: string;
  roomId?: string;
  replacementDate: string;
  serialNumber: string;
  warrantyExpirationDate: string;
  warrantyStartDate: string;
  userName?: string;
}
