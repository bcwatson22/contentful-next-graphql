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

interface IPageContext {
  params: IPageParam;
  preview: boolean;
}

interface IPageParam {
  slug: string;
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
