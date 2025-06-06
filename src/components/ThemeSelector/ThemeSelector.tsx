import { useState } from "react";
import styles from './ThemeSelector.module.css';

function ThemeSelector() {
  const [theme, setTheme] = useState('light dark');

  if (!document.documentElement.style.colorScheme) {
    document.documentElement.style.colorScheme = theme;
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    document.documentElement.style.colorScheme = event.target.value;
    setTheme(event.target.value);
  }

  return (
    <div className={styles.Theme}>
      <span>Theme:</span>
      <select value={theme} onChange={handleValueChange}>
        <option value="light dark">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

export default ThemeSelector;
