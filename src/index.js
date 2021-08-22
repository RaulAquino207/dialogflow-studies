const dialogflow = require('@google-cloud/dialogflow');
require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 5000;

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const PROJECID = CREDENTIALS.project_id;

const CONFIGURATION = {
    credentials: {
        private_key: CREDENTIALS['private_key'],
        client_email: CREDENTIALS['client_email']
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
    console.log(responses);
    const result = responses[0].queryResult;
    console.log(result);

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
    res.json(`Test API to study the use of dialogflow`);
})

server.post('/dialogflow', async (req, res) => {

    let languageCode = req.body.languageCode;
    let queryText = req.body.queryText;
    let sessionId = req.body.sessionId;

    let responseData = await detectIntent(languageCode, queryText, sessionId);

    res.send(responseData.response);
});

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})