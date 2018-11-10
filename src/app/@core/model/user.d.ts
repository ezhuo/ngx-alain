export interface UserInfo {
  id: number;
  avatar?: string;
  true_name?: string;
  images?: string;
  admin?: boolean;
  email?: string;
  group_ids?: string;
  group_names?: string;
  is_group?: string;
  login_username?: string;
  org_fdn?: string;
  org_id?: number;
  org_name?: string;
  phone?: string;
  role_id?: string;
  role_name?: string;
  style?: string;
}

export interface LoginOptions {
  account?: string;
  password?: string;
  mobile?: string;
  captcha?: any;
  remember?: boolean;
}
