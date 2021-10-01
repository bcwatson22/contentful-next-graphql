import { Page, IPage } from '_molecules';
import { server } from '_utils';

const Route = ({ response, endpoint, host }: IPage) => (
  <Page response={response}
    endpoint={endpoint}
    host={host} />
);

export const getServerSideProps = async ({ res, resolvedUrl }: IPageContext) => server(resolvedUrl, res);

export default Route;
