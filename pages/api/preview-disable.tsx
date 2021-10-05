import { NextApiRequest, NextApiResponse } from 'next';
import { redirectServerSide } from '_utils';

const handlePreviewExit = (req: NextApiRequest, res: NextApiResponse) => {

  // Clears the preview mode cookies.
  res.clearPreviewData();

  const destination = typeof req.headers.referer === 'string' ? req.headers.referer : '/';

  redirectServerSide(res, destination, 307);
  
  res.end();

};

export default handlePreviewExit;
