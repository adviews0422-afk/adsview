import checkoutNodeJssdk from '@paypal/payouts-sdk'

function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID!
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

  return process.env.PAYPAL_MODE === 'live'
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
}

export function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment())
}
