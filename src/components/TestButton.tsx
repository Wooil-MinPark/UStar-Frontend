import styles from '../styles/TestButton.module.css';

interface Props {
  title: string;
}

const TestButton: React.FC<Props> = ({ title }) => {
  return (
    <div>
      <button className={styles.title}>{title}</button>
    </div>
  );
};
export default TestButton;
