import { NextApiRequest, NextApiResponse } from 'next';
import { redirectServerSide } from '_utils';

const handlePreview = (req: NextApiRequest, res: NextApiResponse) => {

  res.setPreviewData({ maxAge: 60 * 60 });

  const { slug } = req.query;

  if (!slug) return res.status(401).json({ message: 'Invalid slug' });

  if (typeof slug === 'string') {

    redirectServerSide(res, slug, 307);

    res.end();

  }

};

export default handlePreview;