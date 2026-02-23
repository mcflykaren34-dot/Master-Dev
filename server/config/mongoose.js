const mongoose = require('mongoose');
const config = require('./config');
const cluster = require('cluster');

const {
    server: { mongoHost, mongoPort, dbName, poolSize, nodeEnv, prodDbUrl }
} = config;

let mongoUrl = ""

if (nodeEnv === "PROD") {
    mongoUrl = prodDbUrl;
}
else if (nodeEnv === "DEV") {
    mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${dbName}?maxPoolSize=${poolSize}`;
}

// Making MongoDB Connection using mongoose
exports.connect = () => {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(mongoUrl)
        .then(() => {

            if (cluster.isMaster) {
                console.log(`=============== 🚀🚀🚀 Successfully connected to ${nodeEnv} mongo database 🚀🚀🚀 ===============`);
                console.log(`=============== 🚀🚀🚀 Database name: ${dbName} 🚀🚀🚀 =============== \n`);
            }
        })
        .catch((error) => {
            console.log('Mongo connection failed. exiting now...');
            console.error(error);
            /* eslint-disable */
            process.exit(1);
        });
};
