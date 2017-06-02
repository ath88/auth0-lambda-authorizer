# auth0-lambda-authorizer

This small project is a very simple AWS API Gateway custom authorizer using eg. Auth0.

It utilizes JWT, which is verified only by checking the signing key, in an RS256-encryption method.

## How to set up:
To use the custom authorizer you must:

### 1. Get an authentication provider
I used Auth0. Get a free account here: https://auth0.com/

### 2: Get the public key in PEM format
From Auth0, a JWK can be found here: https://ath88.eu.auth0.com/.well-known/jwks.json
The JWK can be translated to a PEM with eg. https://www.npmjs.com/package/pem-jwk. An example of this is in `jwkToPem.js`. Save this in `public.pem`.

### 3: Create the custom authorizer zip-package
Install dependencies with `npm install`.
Create zip-package: `zip -r auth0-lambda-authorizer .`

### 4: Upload the zip-package to AWS Lambda
Using the AWS Console, create a new Lambda function and upload the zip-package as the function.

### 5: Create the custom authorizer
Using the AWS Console, the custom authorizer can be made in the API Gateway. Remember to refer to the previously created Lambda function.


## How to test:
Obtain a JWT from your authentication provider. At Auth0, this can be used:

```
POST https://ath88.eu.auth0.com/oauth/ro
{
  "client_id": client_id from auth0,
  "username": email address registered to user at auth0,
  "password": users password,
  "connection": "Username-Password-Authentication",
  "scope": "openid"
}
```
