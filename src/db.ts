import mongoose from "mongoose";
import DatabaseConfig from "./config";

mongoose.Promise = global.Promise;
const connection = mongoose.connect(DatabaseConfig.url, {});

const __INIT__ = async () => {
    return new Promise((resolve, reject) => {
        connection
            .then((db) => {
                console.log("[i] db connection established");
                resolve(true);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

export default { __INIT__ };
