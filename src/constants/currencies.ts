export type Currency = 'CHF' | 'EUR' | 'USD' | 'PLN';

export const CURRENCIES: Currency[] = ['CHF', 'EUR', 'USD', 'PLN'];

export const DEFAULT_CURRENCY = CURRENCIES[0];

export enum APIv2 {
  CHF = '/api/v2/auth/login',
  AuthSignup = '/api/v2/auth/signup',
  AuthRenew = '/api/v2/auth/renew',
  AuthResetPassword = '/api/v2/auth/reset-password',
  AuthChangePassword = '/api/v2/auth/change-password',
  AuthGenerateApikey = '/api/v2/auth/apikey',
  Users = '/api/v2/users',
  Domains = '/api/v2/domains',
  Links = '/api/v2/links'
}
