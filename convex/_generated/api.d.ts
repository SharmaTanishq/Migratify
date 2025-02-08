/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as Types_node from "../Types/node.js";
import type * as flows_edge_onEdgeDelete from "../flows/edge/onEdgeDelete.js";
import type * as flows_edges from "../flows/edges.js";
import type * as flows_node_data from "../flows/node/data.js";
import type * as flows_node_deleteNode from "../flows/node/deleteNode.js";
import type * as flows_node_updateNode from "../flows/node/updateNode.js";
import type * as flows_nodes from "../flows/nodes.js";
import type * as http from "../http.js";
import type * as myFunctions from "../myFunctions.js";
import type * as projects from "../projects.js";
import type * as webhooks_events from "../webhooks/events.js";
import type * as webhooks_index from "../webhooks/index.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "Types/node": typeof Types_node;
  "flows/edge/onEdgeDelete": typeof flows_edge_onEdgeDelete;
  "flows/edges": typeof flows_edges;
  "flows/node/data": typeof flows_node_data;
  "flows/node/deleteNode": typeof flows_node_deleteNode;
  "flows/node/updateNode": typeof flows_node_updateNode;
  "flows/nodes": typeof flows_nodes;
  http: typeof http;
  myFunctions: typeof myFunctions;
  projects: typeof projects;
  "webhooks/events": typeof webhooks_events;
  "webhooks/index": typeof webhooks_index;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
