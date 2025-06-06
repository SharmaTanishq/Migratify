import { NextResponse } from "next/server";
import { strapiAPI } from "./service";

export async function getNodes(params = {}) {
     const data = await strapiAPI('allnodes', {
        populate: {
          nodes: {
            populate: {
              Node: {
                populate: ['node_logo']
              }
            }
          }
        },
        sort: ['publishedAt:asc'],
        ...params,
      })
      return data;
}

export async function getIntegrations(params = {}){
    const data = await strapiAPI('allnodes', {
        populate: {
            nodes: {
                populate: {
                    Node: {
                        populate: ['node_logo']
                    }
                }
            }
        },
        filters: {
            $or: [
                {
                    Name: {
                        $eq: 'ERPs'
                    }
                },
                {
                    Name: {
                        $eq: 'E-Mail'  
                    }
                }
            ]
        },
        ...params,
    });
    
    return data;
}

export async function getBridges(params = {}){
    const data = await strapiAPI('allnodes', {
        populate: {
            nodes: {
                populate: {
                    Node: {
                        populate: ['node_logo']
                    }
                }
            }
        },
        filters: {
            $and: [
                {
                    Name: {
                        $eq: 'Bridges'
                    }
                }
            ]
        },
        ...params,
    });
    return data;
}

export async function getLandingPage(params = {}){
    const data = await strapiAPI('landing', {
        populate: '*',
        ...params,
    });
    return data;
}

export async function getDefaultSchema(params = {}){
    const data = await strapiAPI('schemas', {
        populate: '*',
        filters: {
            name: {
                $eqi: params
            }
        },
        ...params,
    });
    return data;
}