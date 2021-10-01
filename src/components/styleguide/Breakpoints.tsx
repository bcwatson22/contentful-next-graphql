import styles from './Breakpoints.module.scss';

const breakpoints = [
  {
    name: 'Min',
    width: '320px'
  },
  {
    name: 'Portrait',
    width: '750px'
  },
  {
    name: 'Landscape',
    width: '1000px'
  },
  {
    name: 'Desktop',
    width: '1300px'
  },
  {
    name: 'Max',
    width: '1680px'
  }
];

const Breakpoints = () => (
  <section className={`${styles.root} section`}>
    <div className="inner">
      <h2>Breakpoints</h2>
      <ul className={styles.grid}>
        {breakpoints.map(breakpoint => {

          const { name, width } = breakpoint;

          return (
            <li key={name} 
              style={{ ['--width' as any]: width }}>
              <h3 className="h4">{ name }</h3>
              <h4>{ width }</h4>
              <pre>
                ${ name?.toLowerCase() }
              </pre>
            </li>
          );

        })}
      </ul>
    </div>
  </section>
);

export default Breakpoints;
