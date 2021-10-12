import Link from 'next/link';
import { useRouter } from 'next/router';
import { filterLocales } from '_utils';
import styles from './Primary.module.scss';

const Locales = () => {

  const { asPath, locale, locales } = useRouter();

  return (
    <nav className={styles.root}>
      <ul>
        {locales && filterLocales(locales).map((item, i) => (
          <li key={`${item}-${i}`}>
            <Link href={asPath}
              locale={item}>
              <a className={locale === item ? styles.active : undefined}>{ item }</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

};

export default Locales;
