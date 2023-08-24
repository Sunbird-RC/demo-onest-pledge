const { REGISTRY_URL} = require("../config/config");
const { default: axios } = require("axios");
const config = require('../config/config');
const utils = require('../services/utils');
const serviceUrl = `${REGISTRY_URL}/api/v1/Pledge`;
const donorService = require('./Donorservice');
const causeService = require('./CauseService');
const mailService = require('./mailservice');
const brevoMailService = require('./brevoMailService2');

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

        let baseURL = config.VISITOR_CERTIFICATE_BASE_URL;
        let notification_sender_mail_id = config.EMAIL_ID_FOR_NOTIFICATIONS;
        let notification_sender_name = config.EMAIL_SENDER_NAME;
        // mailService.sendEmail("kanjarla.sreejit@gmail.com", "sreejith.k@beehyv.com", pledge?.donorName, `http://localhost:8000/download/${createdPledge.data.result.Pledge.osid}`);
        // mailService.sendEmail("onest.pledge@beehyv.com", pledge?.email, pledge?.causeDetails?.causeName, pledge?.donorName, `http://localhost:8000/download/${createdPledge.data.result.Pledge.osid}`);
        brevoMailService.sendEmail(notification_sender_mail_id , pledge?.email, pledge?.causeDetails?.causeName, pledge?.donorName, `${baseURL}/download/${createdPledge.data.result.Pledge.osid}`,notification_sender_name );
        return createdPledge.data;
    } catch (error) {
        throw error
    }
}

async function getPledgeById(pledgeId, headers){
    try {

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