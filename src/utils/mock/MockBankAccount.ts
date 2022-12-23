import { BankAccount } from '@stripe/stripe-js'

export const MockBankAccount: BankAccount = {
  bank_name: 'BANK OF AMERICA',
  account_holder_type: 'Personal Checking',
  last4: '1234',
  id: '0',
  object: 'bank_account',
  account_holder_name: null,
  country: 'US',
  currency: 'USD',
  fingerprint: null,
  routing_number: null,
  status: '',
}
