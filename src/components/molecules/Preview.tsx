import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Preview.module.scss';

const Preview = ({ preview }: IPreview) => {

  const { asPath, locale } = useRouter();

  return (
    <aside className={styles.root}>
      {preview ? (
        <>
          You're in preview mode!
          <Link href="/api/preview-exit">
            <a>Exit</a>
          </Link>
        </>
      ) : (
        <>
          {/* <Link href={`/api/preview?slug=/${locale}${asPath}`}> */}
          Published content
          <Link href={`/api/preview?slug=${asPath}`}>
            <a>Enter preview</a>
          </Link>
        </>
      )}
    </aside>
  );
  
};

export default Preview;
