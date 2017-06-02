const fs = require("fs");
const jwt = require("jsonwebtoken");
const public = fs.readFileSync("./public.pem");

exports.handler = function(event, context, callback) {
    const token = event.authorizationToken;

    var result;
    try {
        result = jwt.verify(token, public, { algorithms: ["RS256"] });
    }
    catch(error) {
        console.error(error);
        return callback("Unauthorized");
    }

    console.log(result);
    var principalId = result.sub;

    const authResponse = {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Allow",
                    Resource: ["arn:aws:execute-api:*"]
                }
            ]
        }
    };

    callback(null, authResponse);
};
