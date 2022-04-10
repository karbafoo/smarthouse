import AdminApi from "./admin.api";

async function routes(fastify: any, options: any) {
    fastify.register(AdminApi, { prefix: "/admin" });
}

export default routes;
