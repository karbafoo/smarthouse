import HttpHandler from "../http";
import { getLatestSensor, onNewSensor } from "./../sensor.component/index";
import {
    checkKeys,
    getLatestKey,
    onNewCommand,
} from "./../key.component/index";

async function routes(fastify: any, options: any) {
    // fastify.addHook('preHandler', fastify.auth([fastify.verifyJWTandLevel]));

    fastify.route({
        method: "GET",
        url: "/keys",
        handler: getLatestKeys,
    });
    fastify.route({
        method: "GET",
        url: "/sensors",
        handler: getLatestSensors,
    });
    fastify.route({
        method: "POST",
        url: "/command",
        handler: NewCommand,
    });
    fastify.route({
        method: "POST",
        url: "/update",
        handler: UpdateServer,
    });
}

export default routes;

const getLatestKeys = async (request: any, reply: any) => {
    try {
        getLatestKey()
            .then((latestKey) => {
                // console.log("getLatestKey", latestKey);
                HttpHandler.sendResponse(reply, {
                    success: true,
                    data: latestKey,
                });
            })
            .catch((err) => {
                HttpHandler.sendError(reply, err);
            });
    } catch (err) {
        HttpHandler.sendError(reply, err);
    }
};
const getLatestSensors = async (request: any, reply: any) => {
    try {
        // console.log("getLatestSensors");
        getLatestSensor()
            .then((latestSensor) => {
                HttpHandler.sendResponse(reply, {
                    success: true,
                    data: latestSensor,
                });
            })
            .catch((err) => {
                HttpHandler.sendError(reply, err);
            });
    } catch (err) {
        HttpHandler.sendError(reply, err);
    }
};
const NewCommand = async (request: any, reply: any) => {
    try {
        console.log("request.body NewCommand", request.body);
        onNewCommand({
            data: request.body.data,
        })
            .then((latestCommand) => {
                HttpHandler.sendResponse(reply, {
                    success: true,
                    data: latestCommand,
                });
            })
            .catch((err) => {
                HttpHandler.sendError(reply, err);
            });
    } catch (err) {
        HttpHandler.sendError(reply, err);
    }
};

const UpdateServer = async (request: any, reply: any) => {
    try {
        console.log(
            "request.body UpdateServer " + Math.random() * 100,
            request.body
        );
        onNewSensor({ data: request.body.sensors })
            .then((sensorDoc) => {
                checkKeys({ data: request.body.keys })
                    .then((latestCommandDoc) => {
                        if (latestCommandDoc) {
                            console.log(
                                "should UpdateServer res1",
                                request.body.keys,
                                latestCommandDoc.data.reduce(
                                    (s: string, i: string, index: number) => {
                                        s += i;
                                        s +=
                                            index <
                                            latestCommandDoc.data.length - 1
                                                ? ","
                                                : "";
                                        return s;
                                    },
                                    ""
                                )
                            );
                            HttpHandler.sendResponse(
                                reply,
                                latestCommandDoc.data.reduce(
                                    (s: string, i: string, index: number) => {
                                        s += i;
                                        s +=
                                            index <
                                            latestCommandDoc.data.length - 1
                                                ? ","
                                                : "";
                                        return s;
                                    },
                                    ""
                                )
                            );
                        } else {
                            HttpHandler.sendResponse(reply, 0);
                        }
                    })
                    .catch((err) => {
                        HttpHandler.sendError(reply, err);
                    });
            })
            .catch((err) => {
                HttpHandler.sendError(reply, err);
            });
    } catch (err) {
        HttpHandler.sendError(reply, err);
    }
};
