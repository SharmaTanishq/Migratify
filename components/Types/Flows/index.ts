import { Edge, Node, ReactFlowJsonObject } from "@xyflow/react";
import { APIClassType } from "../api";
import { NodeData } from "@/components/CMS/types";

export type FlowType = {
    name: string;
    id: string;
    data: ReactFlowJsonObject<AllNodeType, EdgeType> | null;    
    configurations:Record<string,any>;
    description: string;
    endpoint_name?: string | null;
    style?: FlowStyleType;
    is_component?: boolean;
    last_tested_version?: string;
    updatedAt?: string;
    createdAt?: string;
    publishedAt?: string;
    isHandleReversed?: boolean;
    documentId?: string;
    parent?: string;
    folder?: string;
    user_id?: string;
    icon?: string;
    gradient?: string;
    tags?: string[];
    icon_bg_color?: string;
    folder_id?: string;
    webhook?: boolean;
    locked?: boolean | null;    
  };

export type EdgeType = Edge<EdgeDataType, "default">;

export type EdgeDataType = {
    sourceHandle: sourceHandleType;
    targetHandle: targetHandleType;
    data:any;
  };

export type PlatformType = 'vtex' | 'shopify' | 'woocommerce';

export interface NodeSubProperty {
  type: 'e-commerce' | 'webhook' | 'database';
  platform?: PlatformType;
  events?: string[];
}


// right side
export type sourceHandleType = {
    baseClasses?: string[];
    dataType: string;
    id: string;
    output_types: string[];
    conditionalPath?: string | null;
    name: string;
  };
  //left side
  export type targetHandleType = {
    inputTypes?: string[];
    output_types?: string[];
    type: string;
    fieldName: string;
    name?: string;
    id: string;
    proxy?: { field: string; id: string };
  };



export type NodeDataType = {
    showNode?: boolean;
    type: string;
    node: APIClassType;
    subProperty?:NodeSubProperty;
    id:string;
    ui:NodeData;
    isHandleReversed?:boolean;
    configurations:any;
    secrets:any;
    selected:boolean,
    _id:string;
    output_types?: string[];
    selected_output_type?: string;
    buildStatus?: boolean;
  };



export type EcommerceNodeType = Node<NodeDataType,"ecommerceNode">;
export type BridgesNodeType = Node<NodeDataType,"bridgeNode">;
export type PIMNodeType = Node<NodeDataType,"pimNode">;
export type CRMNodeType = Node<NodeDataType,"crmNode">;
export type ERPNodeType = Node<NodeDataType,"erpNode">;
export type MailNodeType = Node<NodeDataType,"mailNode">;
export type PaymentNodeType = Node<NodeDataType,"paymentNode">;
export type ShippingNodeType = Node<NodeDataType,"shippingNode">;
export type SocialNodeType = Node<NodeDataType,"socialNode">;
export type OutputNodeType = Node<NodeDataType,"outputNode">;
export type VoiceAgentNodeType = Node<NodeDataType,"voiceAgentNode">;
export type CallProviderNodeType = Node<NodeDataType,"callProviderNode">;

export type AllNodeType = EcommerceNodeType | BridgesNodeType | PIMNodeType | CRMNodeType | ERPNodeType | MailNodeType | PaymentNodeType | ShippingNodeType | SocialNodeType | OutputNodeType | VoiceAgentNodeType | CallProviderNodeType;


// FlowStyleType is the type of the style object that is used to style the
// Flow card with an emoji and a color.
export type FlowStyleType = {
  emoji: string;
  color: string;
  flow_id: string;
};
