const { REGISTRY_URL} = require("../config/config");
const { default: axios } = require("axios");
const config = require('../config/config');
const utils = require('../services/utils');
const serviceUrl = `${REGISTRY_URL}/api/v1/Pledge`;

async function getAllPledges() {
    try {
        let listOfPledges = await axios.post(`${serviceUrl}/search`, 
        {
            "offset": 0,
            "filters": {

            }
        });
        return listOfPledges.data;
    } catch (error) {
        throw new Error({message: "Error while fectching pledges"})
    }
}

async function createPledge(pledge){
    try {
        let createdPledge = await axios.post(`${serviceUrl}`, pledge);
        return createdPledge.data;
    } catch (error) {
        throw error
    }
}

async function getPledgeById(pledgeId, headers){
    try {
        // let adminSecret = config.ADMIN_API_SECRET_KEY;
        // let token = await utils.getServiceAccountToken("admin-api", adminSecret);
        // console.log(token);
        let getPledge = await axios.get(`${serviceUrl}/${pledgeId}`);
        return getPledge.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function updatePledgeById(pledgeId,pledge){
    try {
        let updatedPledge = await axios.put(`${serviceUrl}/${pledgeId}`,
        pledge
        );
        return updatedPledge.data;
    } catch (error) {
        throw error
    }
}


async function searchPledge(req) {
    try {
        let fetchDonarbyFilter = await axios.post(`${serviceUrl}/search`,
        req
        );
        return fetchDonarbyFilter.data;
    } catch (error) {
        throw error
    }
}

module.exports= {
    getAllPledges,
    createPledge,
    getPledgeById,
    updatePledgeById,
    searchPledge
}