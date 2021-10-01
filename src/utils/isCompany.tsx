const isCompany = (req: any): boolean => req.headers.host.split('.')[0] !== 'www';

export default isCompany;
