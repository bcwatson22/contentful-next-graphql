import { NextApiResponse } from 'next';

const redirectServerSide = (res: NextApiResponse, destination: string, status = 301) => res.writeHead(status, { Location: destination });

export default redirectServerSide;
