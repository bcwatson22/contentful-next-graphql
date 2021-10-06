import Link from 'next/link';
import { useRouter } from 'next/router';
import { getBaseRoute } from '_utils';
import styles from './Primary.module.scss';

interface INavLink {
  title: string;
  slug: string;
}

interface IPrimary {
  links: INavLink[];
}

const Primary = ({ links }: IPrimary) => {

  const { asPath } = useRouter();

  return (
    <nav className={styles.root}>
      <ul>
        {links.map(link => {

          const { title, slug } = link;

          return (
            <li key={`${title}`}>
              <Link href={`${slug !== '/' ? '/' : ''}${slug}`}>
                <a className={getBaseRoute(asPath) === slug ? styles.active : undefined}>{ title }</a>
              </Link>
            </li>
          );

        })}
      </ul>
    </nav>
  );

};

export default Primary;
