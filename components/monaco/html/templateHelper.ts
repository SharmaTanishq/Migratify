export const renderTemplate = (template: string, data: any): string => {
    return template.replace(/\{\{\s*([^}]+)\s*\}\}/g, (match, path) => {
      const value = path.trim().split('.').reduce((obj: any, key: string) => {
        return obj?.[key];
      }, data);
      return value !== undefined ? value : match;
    });
  };