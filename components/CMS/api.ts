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

export async function getLandingPage(params = {}){
    const data = await strapiAPI('landing', {
        populate: '*',
        ...params,
    });
    return data;
}