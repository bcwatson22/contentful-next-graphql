import styles from './Banner.module.scss';

interface IContent {
  heading: string;
  body: string;
  button: any;
}

export interface IProps {
  content: IContent;
}

const Banner = ({ content }: IProps) => (
  <section className={styles.root}>
    <h2>Banner component "{content.heading}"</h2>
  </section>
);

export default Banner;
