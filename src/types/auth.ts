export interface Auth {
  session: Session;
}

export interface Session {
  expires_at: number;
  expires_in: number;
  token_type: string;
  access_token: string;
  refresh_token: string;
  provider_token: string | null;
  provider_refresh_token: string | null;
  user: User;
}

interface App_Metadata {
  provider: string;
  providers: string[];
}

export interface Amr {
  method: string;
  timestamp: string;
}

export interface User {
  id: string;
  factors?: any[];
  iat: number;
  iss: string;
  email: string;
  phone: string;
  app_metadata: App_Metadata;
  user_metadata: User_Metadata;
  role: string;
  aal: string;
  amr: Amr[];
  session_id: string;
}

type User_Metadata = {
  avatar_url: string;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  picture: string;
  provider_id: string;
  sub: string;
};

export interface User_Session {
  session: Session;
  user: User;
}
