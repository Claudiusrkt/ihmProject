import "../styles/contact.scss";

export default function Contact() {
    return (
        <div className="contact-container">
            <div className="circle blur-circle1"></div>
            <div className="circle blur-circle2"></div>
            <h1 className="contact-heading">Nous sommes à votre disposition <br /> pour toutes informations supplémentaires</h1>
            <div className="contact">
                <div className="c1"><i className="fa-solid fa-phone"></i> Téléphone: +261 16 461 53</div>
                <div className="c2"><i className="fa-solid fa-message"></i> Email: <a href="https://mail.google.com/mail/u/0/">ketrikahotel@gmail.com</a></div>
                <div className="c3"><i className="fa-solid fa-globe"></i> Site web: <a href="/">http://localhost:5173/</a></div>
            </div>
        </div>
    );
}