const { REGISTRY_URL} = require("../config/config");
const { default: axios } = require("axios");
const config = require('../config/config');
const utils = require('../services/utils');
const pledgeService = require('./PledgeService');
const { integer } = require("swagmock/lib/generators");


const serviceUrl = `${REGISTRY_URL}/api/v1/Cause`;

async function getAllCauses() {
    try {
        let listOfCauses = await axios.post(`${serviceUrl}/search`, 
        {
            "offset": 0,
            "filters": {

            }
        });
        return listOfCauses.data;
    } catch (error) {
        throw new Error({message: "Error while fectching causes"})
    }
}

async function createCause(cause){
    try {
        let createdCause = await axios.post(`${serviceUrl}/invite`, cause);
        return createdCause.data;
    } catch (error) {
        throw error
    }
}

async function getCauseById(causeId, headers){
    try {
        let getCause = await axios.get(`${serviceUrl}/${causeId}`);
        return getCause.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function updateCauseById(causeId,cause){
    try {
        let updatedCause = await axios.put(`${serviceUrl}/${causeId}`,
        cause
        );
        return updatedCause.data;
    } catch (error) {
        throw error
    }
}

async function getLivePledgedAmountByCauseID (causeId) {
    // let data = await getCauseById(causeId);
    let req = {
        "offset": 0,
        "filters": {
            //make this as causeId
            "causeId" : {
                "eq": causeId
            }
        }
    }
    let sum = 0;
    let fetchPledgesByCauseId  = await pledgeService.searchPledge(req);
    if (fetchPledgesByCauseId.length === 1){
        sum = parseInt(fetchPledgesByCauseId[0]?.amountForPledge);
    } else {
        let sum = fetchPledgesByCauseId.reduce( function (a, b) {
            return  parseInt(a.amountForPledge ? a.amountForPledge : 0) + parseInt(b.amountForPledge ? b.amountForPledge : 0);
        });
    }

    return {
        "totalAmountPledged": sum
    }
}

module.exports= {
    getAllCauses,
    createCause,
    getCauseById,
    updateCauseById,
    getLivePledgedAmountByCauseID
}