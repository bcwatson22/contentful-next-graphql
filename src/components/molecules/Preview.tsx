import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Preview.module.scss';

const Preview = ({ preview }: IPreview) => {

  const { asPath, locale } = useRouter();
  const query = `?slug=/${locale ?? 'en'}${asPath}`;

  return (
    <aside className={styles.root}>
      {preview ? (
        <>
          You're in preview mode!
          <Link href={`/api/preview-exit${query}`}>
            <a>Exit</a>
          </Link>
        </>
      ) : (
        <>
          Published content
          <Link href={`/api/preview${query}`}>
            <a>Enter preview</a>
          </Link>
        </>
      )}
    </aside>
  );
  
};

export default Preview;
