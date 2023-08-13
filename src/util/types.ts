
/**
 * Users
 */
export interface CreateUsernameVariables {
  username: string;
}

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}


export interface CurrentUser{
  name: String;
  email: String;
  emailVerified: Boolean;
  image: String;
  phoneNumber: String;
}; 


export interface SearchUsersInputs {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  createdBy: string;
  username: string;
  email: string;
  phone: string;
}

export interface GetSearchedUser {
  id: string;
  username: string;
  email: string;
  phone: string;
}
/**
 * Messages
 */

export interface SendMessageVariables {
  timeStamp: number;
  _id: string;
  createdBy: string;
  body: string;
  whatsApp: boolean;
  sms: boolean;
  email: boolean;
  google_app_password?: string,
  sms_account_SID?: string,
  sms_auth_token?: string,
  sms_service_SID?: string,
}



/**
 * Conversations
 */
