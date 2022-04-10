const path = require("path");
const fs = require("fs");
const sendFile = (reply: any, data: any) => {
    const buffer = fs.readFileSync(path.join(__dirname, data));
    reply.type("image/png"); // if you don't set the content, the image would be downloaded by browser instead of viewed
    reply.send(buffer);
};
const sendResponse = (reply: any, data: any) => {
    reply.code(200).send(data);
};

const sendError = (reply: any, err: any) => {
    //TODO
    console.log("err", err);
    if (err) {
        if (err.self) {
            reply
                .code(403)
                .header("Content-Type", "application/json; charset=utf-8")
                .send({ msg: err.msg });
            return;
        } else if (err.name === "CastError") {
            reply.code(406).send({ code: err.code || "506", msg: "BAD_INPUT" });
            return;
        }
    }

    reply.code(403).send({ code: err.code || "0", msg: err.msg || "ERROR" });
};

export default {
    sendFile,
    sendResponse,
    sendError,
};
