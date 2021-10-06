import { Page } from '_molecules';
import { contentProps } from '_utils';

const Home = ({ data, preview }: IPage) => (
  <Page data={data}
    slug="/"
    preview={preview} />
);

export const getStaticProps = async ({ preview = false }) => contentProps({ params: { route: '/' }, preview });

export default Home;
