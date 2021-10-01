const addTrailingSlash = (path: string): string => path.endsWith('/') ? path : `${path}/`;

export default addTrailingSlash;
