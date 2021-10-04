import Link from 'next/link';
import styles from './Primary.module.scss';

interface INavLink {
  title: string;
  slug: string;
}

interface IPrimary {
  links: INavLink[];
}

const Primary = ({ links }: IPrimary) => (
  <nav className={styles.root}>
    <ul>
      {links.map(link => {

        const { title, slug } = link;

        return (
          <li key={`${title}`}>
            <Link href={slug}>
              <a>{ title }</a>
            </Link>
          </li>
        );

      })}
    </ul>
  </nav>
);

export default Primary;
