/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as Integrations_Mail_Resend_index from "../Integrations/Mail/Resend/index.js";
import type * as Integrations_Mail_Twilio_index from "../Integrations/Mail/Twilio/index.js";
import type * as Integrations_Mail_index from "../Integrations/Mail/index.js";
import type * as Types_node from "../Types/node.js";
import type * as ai_generateHtml from "../ai/generateHtml.js";
import type * as flows_edge_onEdgeDelete from "../flows/edge/onEdgeDelete.js";
import type * as flows_edges from "../flows/edges.js";
import type * as flows_node_data from "../flows/node/data.js";
import type * as flows_node_deleteNode from "../flows/node/deleteNode.js";
import type * as flows_node_updateNode from "../flows/node/updateNode.js";
import type * as flows_nodes from "../flows/nodes.js";
import type * as http from "../http.js";
import type * as mail_index from "../mail/index.js";
import type * as mappings_dataMap from "../mappings/dataMap.js";
import type * as myFunctions from "../myFunctions.js";
import type * as projects from "../projects.js";
import type * as variables_index from "../variables/index.js";
import type * as webhooks_events from "../webhooks/events.js";
import type * as webhooks_handlers from "../webhooks/handlers.js";
import type * as webhooks_index from "../webhooks/index.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "Integrations/Mail/Resend/index": typeof Integrations_Mail_Resend_index;
  "Integrations/Mail/Twilio/index": typeof Integrations_Mail_Twilio_index;
  "Integrations/Mail/index": typeof Integrations_Mail_index;
  "Types/node": typeof Types_node;
  "ai/generateHtml": typeof ai_generateHtml;
  "flows/edge/onEdgeDelete": typeof flows_edge_onEdgeDelete;
  "flows/edges": typeof flows_edges;
  "flows/node/data": typeof flows_node_data;
  "flows/node/deleteNode": typeof flows_node_deleteNode;
  "flows/node/updateNode": typeof flows_node_updateNode;
  "flows/nodes": typeof flows_nodes;
  http: typeof http;
  "mail/index": typeof mail_index;
  "mappings/dataMap": typeof mappings_dataMap;
  myFunctions: typeof myFunctions;
  projects: typeof projects;
  "variables/index": typeof variables_index;
  "webhooks/events": typeof webhooks_events;
  "webhooks/handlers": typeof webhooks_handlers;
  "webhooks/index": typeof webhooks_index;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {
  persistentTextStreaming: {
    lib: {
      addChunk: FunctionReference<
        "mutation",
        "internal",
        { final: boolean; streamId: string; text: string },
        any
      >;
      createStream: FunctionReference<"mutation", "internal", {}, any>;
      getStreamStatus: FunctionReference<
        "query",
        "internal",
        { streamId: string },
        "pending" | "streaming" | "done" | "error" | "timeout"
      >;
      getStreamText: FunctionReference<
        "query",
        "internal",
        { streamId: string },
        {
          status: "pending" | "streaming" | "done" | "error" | "timeout";
          text: string;
        }
      >;
      setStreamStatus: FunctionReference<
        "mutation",
        "internal",
        {
          status: "pending" | "streaming" | "done" | "error" | "timeout";
          streamId: string;
        },
        any
      >;
    };
  };
};
