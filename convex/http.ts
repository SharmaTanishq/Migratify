import { httpRouter } from "convex/server";
import { webhookAction } from "./webhooks/webhookHttp";

const http = httpRouter();

http.route({
  pathPrefix: "/webhook/",
  method: "POST",
  handler: webhookAction,
});

http.route({
  path: "/example",
  method: "GET",
  handler: webhookAction,
});



// Convex expects the router to be the default export of `convex/http.js`.
export default http;