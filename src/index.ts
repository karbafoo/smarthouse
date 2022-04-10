import Database from "./db";
import restApi from "./api";
import { doMiddlewaringStuff } from "./middlewares";

const fastify = require("fastify")({
    logger: false,
});
doMiddlewaringStuff(fastify);
//////    s/////////////
fastify.register(restApi);

///////////////////
const PORT = 4442;

const HttpInit = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
        fastify.listen(
            process.env.PORT || PORT,
            "0.0.0.0",
            function (err: any, address: any) {
                if (err) {
                    fastify.log.error(err);
                    process.exit(1);
                }
                fastify.log.info(`server listening on ${address}`);
                resolve();
            }
        );
    });
};
const start = async () => {
    await Database.__INIT__();
    const server = await HttpInit();
    console.log("[i] Running a API server at", PORT);
    console.log("server", server);
};

start();
