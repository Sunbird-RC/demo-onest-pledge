const { default: axios } = require("axios");
const { REGISTRY_URL, KEYCLOAK_URL} = require("../config/config");
const qs = require('qs');

async function getServiceAccountToken(clientId, client_secret) {

    const response = await axios({
        method: 'post',
        url: `${KEYCLOAK_URL}/auth/realms/sunbird-rc/protocol/openid-connect/token`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            'grant_type': 'client_credentials',
            'client_id': clientId,
            'client_secret': client_secret
        })
    })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });
    return response.access_token;
}

module.exports= {
    getServiceAccountToken
}