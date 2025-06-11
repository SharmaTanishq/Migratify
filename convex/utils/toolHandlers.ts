export const toolHandlers = {
    weather: async (params:any) => {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        const data = await response.json();
        return data;
    }
}