import { Page } from '_organisms';
import { contentProps } from '_utils';

const Home = ({ data, preview }: IPage) => (
  <Page data={data}
    preview={preview} />
);

export const getStaticProps = async ({ locale, locales, preview = false }: IPageContext) => contentProps({ locale: locale === 'catchAll' ? 'en' : locale, locales, params: { slug: '/' }, preview });

export default Home;
