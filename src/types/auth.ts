export interface JoinRequest {
    id: string;
    password: string;
    username: string;
    email: string;
    phone?: string;
    addr?: string;
    role?: string;
  }
  

export interface JoinFormData{
    id: string;
    password: string;
    username: string;
    email: string;
    phone?: string;
    addr?: string;
    role?: string;
  }