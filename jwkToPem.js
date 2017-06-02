var request = require("request");
var jwk2pem = require("pem-jwk").jwk2pem;

var issuer = "https://ath88.eu.auth0.com/";
var jwkUrl = issuer + ".well-known/jwks.json";

request({
    method: "GET",
    url: jwkUrl,
    json: true
}, (error, response, body) => {
    const jwk = body.keys[0];
    const secret = jwk2pem(jwk);
    console.log(secret)
});
