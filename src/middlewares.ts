// import { UserDeviceController } from './models';

const doMiddlewaringStuff = (fastify: any) => {
    //Cors Middleware
    fastify.register(require("fastify-cors"), {
        // put your options here
    });

    fastify
        .decorate(
            "verifyJWTandLevel",
            function (request: any, reply: any, done: any) {
                if (
                    !request ||
                    !request.headers ||
                    !request.headers.authorization
                ) {
                    return done(new Error("unauthorized")); //TODO SUPER ALERT ADMIN
                }

                const token = (request.headers.authorization || "").split("::");
                //TODO VALIDATE SIG LENGTH
                if (!token || token.length != 2 || !token[0] || !token[1]) {
                    return done(new Error("unauthorized")); //TODO SUPER ALERT ADMIN
                }

                const addr = token[0];
                const sig = token[1];
                return done();
                // UserDeviceController.verifySigForRequest({
                //     ip: request.ip,
                //     address: addr.toUpperCase(),
                //     sig: sig
                // })
                //     .then((userDevice) => {
                //         request.user = userDevice;
                //         return done();
                //     })
                //     .catch((err) => {
                //         //TODO parse err
                //         return done(new Error('unauthorized'));
                //     });
            }
        )
        .decorate(
            "verifyUserAndPassword",
            function (request: any, reply: any, done: any) {
                done();
            }
        )
        .register(require("fastify-auth"));
};

export { doMiddlewaringStuff };
