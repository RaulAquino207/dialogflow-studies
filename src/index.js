const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();
const express = require('express');
const uuid = require('uuid');

const PORT = process.env.PORT || 5000;

const PROJECID = process.env.PROJECT_ID_LSC_AGENT;

const CONFIGURATION = {
    credentials: {
        private_key: process.env.PRIVATE_KEY_LSC_AGENT,
        client_email: process.env.CLIENT_EMAIL_LSC_AGENT
    }
}

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

const detectIntent = async (languageCode, queryText, sessionId) => {

    let sessionPath = sessionClient.projectAgentSessionPath(PROJECID, sessionId);

    let request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: queryText,
                languageCode: languageCode,
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    // console.log(responses);
    const result = responses[0].queryResult;
    // console.log(result);

    return {
        response: result.fulfillmentText
    };
}

const server = express();

server.use(express.urlencoded({
    extended: true
}));
server.use(express.json());

server.get('/', (req, res) => {
    res.json({
        message : `Test API to study the use of dialogflow`
    });
})

server.post('/dialogflow', async (req, res) => {

    const sessionId = uuid.v4();

    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;

    let responseData = await detectIntent(languageCode, queryText, sessionId);

    res.send(responseData.response);
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})