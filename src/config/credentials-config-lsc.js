const CREDENTIALS_CONFIG_LSC = () => ({
    type : `${process.env.TYPE_LSC_AGENT}`,
    project_id : `${process.env.PROJECT_ID_LSC_AGENT}`,
    private_key_id : `${process.env.PRIVATE_KEY_ID_LSC_AGENT}`,
    private_key : `${process.env.PRIVATE_KEY_LSC_AGENT}`,
    client_email : `${process.env.CLIENT_EMAIL_LSC_AGENT}`,
    client_id : `${process.env.CLIENT_ID_LSC_AGENT}`,
    auth_uri : `${process.env.AUTH_URI_LSC_AGENT}`,
    token_uri : `${process.env.TOKEN_URI_LSC_AGENT}`,
    auth_provider_x509_cert_url : `${process.env.AUTH_PROVIDER_X590_CERT_URL_LSC_AGENT}`,
    client_x509_cert_url : `${process.env.CLIENT_X509_CERT_URL_LSC_AGENT}`
});

module.exports = CREDENTIALS_CONFIG_LSC;