interface IAddress {
  region: string;
  street: string;
  locality: string;
  postcode: string;
}

interface IComponent {
  __typename: string;
  id: string;
  content: any;
}

interface ICrop {
  width: number;
  height: number;
}

interface IGlobalResponse {
  json: IGlobalData;
  status: number;
}

interface IImage {
  src: string;
  alt: string;
}

interface ILink {
  title: string;
  slug: string;
}

interface IOption {
  text: string;
  value: string;
  disabled?: boolean;
}

interface IOptionCheckboxes extends IOption {
  choiceId?: string;
}

interface IPage extends IPreview {
  data: any;
}

interface IPageChildren {
  items: IPageParam[];
}

interface IPageContext {
  locale: string;
  locales: string[];
  params: IPageParam;
  preview: boolean;
}

interface IPageParam {
  slug: string;
  subslug?: string;
}

interface IParentParam extends IPageParam {
  childPagesCollection: IPageChildren;
}

interface IQuery {
  device: 'mobile' | 'portrait' | 'landscape' | 'desktop';
  dimensions: IDimensions;
}

interface IPreview {
  preview: boolean;
}

interface ITab {
  id: string;
  topic: string;
}
