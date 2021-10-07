import { Page } from '_organisms';
import { contentProps } from '_utils';

const Home = ({ data, preview }: IPage) => (
  <Page data={data}
    preview={preview} />
);

export const getStaticProps = async ({ preview = false }) => contentProps({ params: { slug: '/' }, preview });

export default Home;
