const getFieldIcon = (value: any) => {
    if (Array.isArray(value)) return "box";
    if (typeof value === "object" && value !== null) return "box";
    if (typeof value === "string") return "case-upper";
    if (typeof value === "number") return "hash";
    if (typeof value === "boolean") return "toggle";
    if (typeof value === null) return "ban";
    return "circle-off";
  };

  export default getFieldIcon;