import { Page } from '_organisms';
import { contentProps, contentServer } from '_utils';

interface IParam {
  slug: string;
}

const Route = ({ data, preview }: IPage) => (
  <Page data={data}
    preview={preview} />
);

export const getStaticPaths = async (ctx: IPageContext) => {

  const data = await contentServer(ctx);

  return {
    paths: data.navCollection.items.filter(({ slug }: IParam) => slug !== '/').map(({ slug }: IParam) => ({ 
      params: { 
        slug 
      } 
    })),
    fallback: true
  };

};

export const getStaticProps = async (ctx: IPageContext) => contentProps(ctx);

export default Route;
