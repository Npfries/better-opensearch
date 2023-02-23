export const getJson = (str: string) => {
    const lines = str.split('{');
    const operation = lines.shift();
    const jsonStr = lines.length ? '{' + lines.join('{') : '{}';
    const options = JSON.parse(jsonStr);
    return {
        operation,
        options,
    };
};
