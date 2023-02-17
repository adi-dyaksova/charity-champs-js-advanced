const config = {
    user: "guest",
    password: "1234",
    server: 'MIPH',
    port: 1433,
    database: 'Charity-champs',
    options: {
        trustedconnection: true,
        trustServerCertificate: true,
        instancename: 'SQLEXPRESS'
    },

};

module.exports = config;