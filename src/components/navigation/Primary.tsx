import Link from 'next/link';
import { useRouter } from 'next/router';
import { getBaseRoute } from '_utils';
import styles from './Primary.module.scss';

interface INavLink extends ILink {
  childPagesCollection: IChildPages;
}

interface IChildPages {
  items: INavLink[];
}

interface IProps {
  links: INavLink[];
}

const Primary = ({ links }: IProps) => {

  const { asPath } = useRouter();

  return (
    <nav className={styles.root}>
      <ul>
        {links.map(({ title, slug, childPagesCollection }) => (
          <li key={`${title}`}>
            <Link href={`${slug !== '/' ? '/' : ''}${slug}`}>
              <a className={getBaseRoute(asPath) === slug ? styles.active : undefined}>{ title }</a>
            </Link>
            {childPagesCollection.items.length > 0 && (
              <ul>
                {childPagesCollection.items.map(({ title: childTitle, slug: childSlug }) => (
                  <li key={`${childTitle}`}>
                    <Link href={`/${slug}/${childSlug}`}>
                      <a className={getBaseRoute(asPath) === childSlug ? styles.active : undefined}>{ childTitle }</a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );

};

export default Primary;
