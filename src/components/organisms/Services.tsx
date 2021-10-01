import styles from './Services.module.scss';

interface IContent {
  heading: string;
  body: string;
  button: any;
}

export interface IProps {
  content: IContent;
}

const Services = ({ content }: IProps) => (
  <section className={styles.root}>
    <h2>Services component "{content.heading}"</h2>
  </section>
);

export default Services;
