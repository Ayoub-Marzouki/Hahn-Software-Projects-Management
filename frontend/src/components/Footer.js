import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p>&copy; {currentYear} Projects Manager. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
