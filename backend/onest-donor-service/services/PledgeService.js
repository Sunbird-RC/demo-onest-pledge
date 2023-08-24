const { REGISTRY_URL} = require("../config/config");
const { default: axios } = require("axios");
const config = require('../config/config');
const utils = require('../services/utils');
const serviceUrl = `${REGISTRY_URL}/api/v1/Pledge`;
const donorService = require('./Donorservice');
const causeService = require('./CauseService');

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

        // let getDonarDetailsWithEmail = await donorService.getDonorByEmailId(pledge?.email);
        // if (getDonarDetailsWithEmail?.length === 0) {
        //     let createANewDonor = await  donorService.createDonor({
        //         "email": pledge?.email,
        //         "name": pledge?.donorName,
        //         "mobileNumber": pledge?.mobileNumber,
        //         "organisation": pledge?.donorOrganisation ?  pledge?.donorOrganisation  : "NA",
        //         "amountPledged": pledge?.amountForPledge,
        //         "pledgeCount": 1
        //     })
        // }
        // pledge.donorId = createANewDonor.


        let createdPledge = await axios.post(`${serviceUrl}`, pledge);

        let causeData = await causeService.getCauseById(pledge?.causeDetails?.causeId);
        let updatedPledgedAmount = parseInt(causeData.amountPledged) + parseInt(pledge?.amountForPledge ? pledge?.amountForPledge : 0);
        let currentPledgeCount = parseInt(causeData.pledgeCount) + 1;
        let reqToupdate =     {
            "name": pledge?.causeDetails?.causeName,
            "organisation": pledge?.causeDetails?.organisation,
            "pledgeCount": currentPledgeCount,
            "amountPledged": updatedPledgedAmount.toString()
        }
        await causeService.updateCauseById(pledge?.causeDetails?.causeId, reqToupdate)
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

async function downloadPledge(pledgeOsid) {
    try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          responseType: "arraybuffer",
          responseEncoding: "binary",
          url: `http://localhost:8081/api/v1/Pledge/${pledgeOsid}`,
          headers: {
            'Accept': 'application/pdf',
            'template-key': 'english_portrait'
          }
        };
        return await axios.request(config).then(d => d?.data);
      } catch (error) {
        console.log(error);
      }
}

module.exports= {
    getAllPledges,
    createPledge,
    getPledgeById,
    updatePledgeById,
    searchPledge,
    downloadPledge
}