import Link from 'next/link';
import styles from './styles/Navbar.module.css';

const ROUTES = [
    {
        label: 'Reviews',
        route: '/'
    },
    {
        label: 'Products',
        route: '/products'
    },
    {
        label: 'About',
        route: '/about'
    },
    {
        label: '🔎',
        route: '/coming-soon'
    },
];


const Navbar = ({ current }) => {
    return (
        <nav className={styles.nav}>
            {ROUTES.map(({ label, route }) => (
                <Link key={label} href={route} >
                    <a className={current === route ? styles.currentRoute : undefined}>{label}</a>
                </Link>
            ))}
        </nav>
    );
};

export default Navbar;