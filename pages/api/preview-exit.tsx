import { NextApiRequest, NextApiResponse } from 'next';
import { redirectServerSide } from '_utils';

const handlePreviewExit = (req: NextApiRequest, res: NextApiResponse) => {

  res.clearPreviewData();

  const { slug } = req.query;

  typeof slug === 'string'
    ? redirectServerSide(res, slug, 307)
    : redirectServerSide(res, '/', 307);
  
  res.end();

};

export default handlePreviewExit;
