import { useComponent } from '_hooks';

interface IProps {
  component: IComponent;
}

const Component = ({ component }: IProps) => {

  const id = component?.__typename.split('Organism')[1];
  const Component = useComponent(id);
  const content = { ...component };

  return Component 
    ? <Component content={content} />
    : null;

};

export default Component;
