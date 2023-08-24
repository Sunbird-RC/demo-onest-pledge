const axios = require('axios'); // Or use the HTTP client specified by your service's documentation

const apiKey = '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';
const alias = 'onest.pledge@beehyv.com';



async function sendEmail(emailFrom, emailTo, causeName , donorName, certificareURL) {
    console.log(emailFrom, emailTo, causeName , donorName, certificareURL);



  let emailTemplate = `
  <html>
    <head>
      <title>Certificate of Pledge</title>
    </head>
    <body>
      <p>Dear ${donorName},</p>
      <p>We extend our heartfelt appreciation for your impactful pledge towards the cause: ${causeName}. Your commitment resonates deeply, and we are thrilled to present you with the "Certificate of Pledge."</p>
      <p>A team member will get in touch with you to facilitate the collection of the pledged amount. Your privacy is of utmost importance to us, and we assure you that these details will remain strictly confidential and not be shared with any third parties.</p>
      <p>Thank you once again for your invaluable contribution. We are honoured to have you as part of our mission.</p>
      <p>You can download your pledge certificate by clicking on the below attached link</p>
      <a href=${certificareURL}>Download pledge Certificate</a>
      <p>Warm regards,</p>
      <p>ONEST Pledge Team</p>
    </body>
  </html>
`;
const emailData = {
    to: emailTo,
    subject: 'Thank You for Your Support: Certificate of Pledge',
    htmlContent: emailTemplate,
};

  try {
    const response = await axios.post('https://api.alias-email-service.com/send', {
      apiKey,
      alias,
      ...emailData,
    });

    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


module.exports= {
    sendEmail,
}
