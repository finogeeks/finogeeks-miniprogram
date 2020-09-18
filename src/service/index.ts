import * as common from './common';
import * as adviser from './adviser';
import * as product from './product';
import * as report from './report';
import * as user from './user';
import * as detect from './detect';

import httpClient, { ApiConfig } from '../utils/http-client';

class Service {
  common = common
  adviser = adviser
  product = product
  report = report
  user = user
  detect = detect
  isAuth: boolean = false;
  setAuth(config:ApiConfig) {
    httpClient.setAuth(config)
    this.isAuth = true;
  }
}

const service = new Service()
export default service;