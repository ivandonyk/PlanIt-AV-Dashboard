export interface UserData {

    firstName: String;
    lastName: string;
    userName: string;
    role: string;
    token: string;
    message: Number;
    businessAcctId: Number;

}
export interface LoginData {

    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    jti: string;

}

export interface UserManageData {
    dateAdded: string;
    id: number;
    name: string;
    status: string;
    userName: string;
    userType: string;
}

export interface AnotherUserData {
    active: string;
    firstName: string;
    id: number;
    userRoleId: number;
    lastName: string;
    phoneNbr: string;
    primaryAcctAdmin: string;
    role: string;
    title: string;
    userName: string;
}
export interface UserRoles {
  roleDescription: string;
  roleId: number;
  roleName: string;
}

export interface BillingSubs {
  id: number;
  nbrRooms: number;
  nbrUsers: number;
  subscription: string;
}

export interface BussAcc {
  address1: string;
  address2: string;
  addressId: number;
  busAcctId: number;
  city: string;
  companyName: string;
  name: string;
  phone: string;
  state: string;
  title: string;
  userId: number;
  userName: string;
  zip: string;
}

export interface updBusAcct {
  address1: string;
  address2: string;
  addressId: number;
  busAcctId: number;
  city: string;
  companyName: string;
  state: string;
  zip: string;
}
