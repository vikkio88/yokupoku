import ThemeSwitcher from './ThemeSwitcher';

const Footer = ({ className }) => {
    return (
        <>
            <footer className={className}>
                <span>
                    made with ♥ by <a
                        href="//vikkio.me"
                        target="_blank"
                    >vikkio</a>
                </span>
                <ThemeSwitcher />
            </footer>
        </>

    );
};

export default Footer;