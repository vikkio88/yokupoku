import { useTheme } from 'next-themes';
import { T } from '../common';

import styles from './styles/ThemeSwitcher.module.css';


const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const switchTheme = theme => {
        theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(theme);
    };
    return (
        <T title="Switch Theme" position="left">
            <button
                onClick={() => switchTheme(theme)}
                className={styles.switch}
            >
                {theme === 'dark' ? '🌄' : '🌌'}
            </button>
        </T>
    );
};


export default ThemeSwitcher;