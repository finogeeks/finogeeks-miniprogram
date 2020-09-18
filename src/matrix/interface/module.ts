import { Store } from './store';
export interface ModuleOpts {
  baseUrl: string,
  userId:string,
  deviceId: string,
  accessToken: string,
  jwt: string,
  store: Store,
}