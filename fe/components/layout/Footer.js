import ThemeSwitcher from './ThemeSwitcher';

const Footer = ({ className }) => {
    return (
        <>
            <footer className={className}>
                <span>
                    made with ♥ by <a
                        href="https://livellosegreto.it/@vikkio"
                        target="_blank"
                        rel="me"
                    >vikkio</a>
                </span>
                <ThemeSwitcher />
            </footer>
        </>

    );
};

export default Footer;