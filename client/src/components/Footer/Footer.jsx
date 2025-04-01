const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; {new Date().getFullYear()} ImageShare. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="/about">About Us</a>
                    <a href="#">Contact</a>
                    <a href="#">Terms of Service</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
