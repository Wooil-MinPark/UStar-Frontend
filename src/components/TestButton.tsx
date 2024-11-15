import styles from '../styles/TestButton.module.css';

interface Props {
  title: string;
}

const TestButton: React.FC<Props> = ({ title }) => {
  return <button className={styles.title}>{title}</button>;
};
export default TestButton;
