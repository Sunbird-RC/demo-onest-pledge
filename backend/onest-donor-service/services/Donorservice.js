const { REGISTRY_URL} = require("../config/config");
const { default: axios } = require("axios");
const config = require('../config/config');
const utils = require('../services/utils');
const pledgeService = require('./PledgeService');

const serviceUrl = `${REGISTRY_URL}/api/v1/Donor`;



async function createDonor(donor){
    try {
        let createdDonor = await axios.post(`${serviceUrl}`, donor);
        return createdDonor.data;
    } catch (error) {
        throw error
    }
}


async function getDonorById(donorId, headers){
    try {
        let getDonar = await axios.get(`${serviceUrl}/${donorId}`);
        return getDonar.data;
    } catch (error) {
        console.log(error);
        throw error
    }
}

async function updateDonorById(donorId, donor){
    try {
        let updatedDonar = await axios.put(`${serviceUrl}/${donorId}`,
        donor
        );
        return updatedDonar.data;
    } catch (error) {
        throw error
    }
}

async function searchDonor(req) {
    try {
        let fetchDonarbyFilter = await axios.post(`${serviceUrl}/search`,
        req
        );
        return fetchDonarbyFilter.data;
    } catch (error) {
        throw error
    }
}

async function getAllPledgesBasedOnDonorId(donorId) {
    try {
        let req = {
                "offset": 0,
                "filters": {
                    "donorId" : {
                        "eq": donorId
                    }
                }
            }
        
        let fetchPledgesByDonarId  = await pledgeService.searchPledge(req);
        return fetchPledgesByDonarId;
    } catch (error) {
        throw error
    }
}



module.exports= {
    createDonor,
    getDonorById,
    updateDonorById,
    searchDonor,
    getAllPledgesBasedOnDonorId
}