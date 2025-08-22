import { Link } from "react-router";
import chambre1 from "../assets/image/chambre1.jpg";
import chambre2 from "../assets/image/chambre2.jpg";
import chambre3 from "../assets/image/chambre3.jpg";

export default function Accueil({ setCurrent }: any) {
    return (
        <div className="accueil">
            <div className="circle blur-circle1"></div>
            <div className="circle blur-circle2"></div>
            <div className="salutation-text">
                <h1>Bienvenue, c'est la chambre qu'il vous faut</h1>
                <h1>Réserver dès maintenant</h1>
            </div>
            <div className="room-presentation">
                <div className="block b1">
                    <div className="label">Chambre avec de lit confortable</div>
                    <img src={ chambre1 } alt="chambre1" />
                </div>
                <div className="block b2">
                    <div className="label">Espace bien aérer</div>
                    <img src={ chambre2 } alt="chambre2" />
                </div>
                <div className="block b3">
                    <div className="label">Des multiples catégories avec de tarif abordable</div>
                    <img src={ chambre3 } alt="chambre3" />
                </div>
            </div>
            <div className="link-to-reservation">
                <Link to={ "/reservation" }><button className="btn" onClick={ () => setCurrent("/reservation") }>Effectuer vos réservation <i className="fa-solid fa-arrow-right"></i></button></Link>
            </div>
        </div>
    );
}