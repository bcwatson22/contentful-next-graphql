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
  target: string;
  text: string;
}

interface IOption {
  text: string;
  value: string;
  disabled?: boolean;
}

interface IOptionCheckboxes extends IOption {
  choiceId?: string;
}

interface IPage {
  preview: boolean;
}

interface IPageContext {
  req: any;
  resolvedUrl: string;
  res: { statusCode: number; redirect: (path: string) => void } | undefined;
}

interface IQuery {
  device: 'mobile' | 'portrait' | 'landscape' | 'desktop';
  dimensions: IDimensions;
}

interface ITab {
  id: string;
  topic: string;
}
