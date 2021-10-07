import { useRouter } from 'next/router';
import { Page } from '_molecules';
import { contentProps, contentServer, getBaseRoute } from '_utils';

interface IParam {
  slug: string;
}

const Route = ({ data, preview }: IPage) => {

  const { asPath } = useRouter();

  return (
    <Page data={data}
      slug={getBaseRoute(asPath)}
      preview={preview} />
  );

};

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
