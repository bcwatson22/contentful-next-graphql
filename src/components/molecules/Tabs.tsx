import styles from './Tabs.module.scss';

interface IProps {
  tabs: ITab[];
  activeTab: string;
  classes: string;
  emitClick: (id: string, i: number) => void;
}

const Tabs = ({ tabs, activeTab, classes, emitClick }: IProps) => (
  <nav className={`${styles.root}${classes ? ' ' + classes : ''}`}>
    <ul>
      {tabs.map((tab, i) => {

        const { id, topic } = tab;

        return (
          <li key={`${id}-${i}`}>
            <button onClick={() => emitClick(id, i)}
              className={`${styles.button}${activeTab === id ? ' ' + styles.selected : ''}`}>
              { topic }
            </button>
          </li>
        );
        
      })}
    </ul>
  </nav>
);

export default Tabs;
