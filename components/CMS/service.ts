import qs from 'qs';


/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
const getFullUrl = (path: string) => `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${path}`;

/**
 * Generic fetch function for Strapi API
 */
export async function strapiAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        'Accept': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    
    const requestUrl = `${getFullUrl(path)}${queryString ? `?${queryString}` : ''}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API error: ${data.error?.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}