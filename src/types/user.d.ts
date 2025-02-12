export interface Users{
    id: string;
  password: string;
  username: string;
  email: string;
  phone?: string;
  addr?: string;
  role: string;
}

export interface LoginFormData{
  id : string ;
  password : string;
}