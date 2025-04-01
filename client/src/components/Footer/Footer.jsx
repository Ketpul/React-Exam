const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} ImageShare. Всички права запазени.</p>
                <nav className="footer-nav">
                    <a href="/about">За нас</a>
                    <a href="/contact">Контакт</a>
                    <a href="/terms">Условия за ползване</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
