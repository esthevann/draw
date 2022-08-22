export function sliceIfInvalid(str: string) {
    if (str.startsWith("\"") && str.endsWith("\"")){
        return str.slice(1, -1);
    } 
    return str;
}