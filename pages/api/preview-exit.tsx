import { NextApiRequest, NextApiResponse } from 'next';
import { redirectServerSide } from '_utils';

const handlePreviewExit = (_: NextApiRequest, res: NextApiResponse) => {

  // Clears the preview mode cookies.
  res.clearPreviewData();

  redirectServerSide(res, '/', 307);
  
  res.end();

};

export default handlePreviewExit;
