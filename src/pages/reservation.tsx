import "../styles/reservation.scss";
import ReservationObject from "../fetch/reservation";
import { useEffect, useState } from "react";

export default function Reservation() {
    const [reservation, setReservation] = useState({
        type: "",
        nbPersonne: 1,
        nbChambre: 1,
        dateReservation: "",
        dateDebut: "",
        dateFin: "",
        status: "non-payé",
        numeroClient:0,
        matricule: "non-designé"
    })
    const [isConnected, setIsConnected] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const user:any = localStorage.getItem("user");
        console.log(localStorage.getItem("user"));
        ((user != null) && (JSON.parse(user).isConnected)) ? setIsConnected(true) : setIsConnected(false);
    }, [localStorage.getItem("user")])
    
    // useEffect(() => {
    //     let currentDate = new Date();
    //     setReservation(previousState => {
    //         return { ... previousState, dateDebut: setDateFormat(currentDate.getDate().toString(), currentDate.getMonth().toString(), currentDate.getFullYear().toString()).split("/").reverse().join("-") }
    //     })
    //     // currentDate.setDate(currentDate.getDate() + 1);
    //     alert("curr " + reservation.dateDebut.toString());
    // }, [])

    useEffect(() => {
        if(isConnected == true) {
            const user:any = localStorage.getItem("user");
            setReservation(previousState => {
                return { ... previousState, numeroClient: JSON.parse(user).numeroClient }
            });
        }else {
         console.log("NOT_CONNECTED: reservation");
        }
    }, [isConnected])

    useEffect(() => {
        const user:any = localStorage.getItem("user");
        if(isConnected) {
            setReservation(previousState => {
                return { ... previousState, numeroClient: JSON.parse(user).numeroClient }
            });
        }
    }, [reservation.numeroClient])

    useEffect(() => {
        const date = new Date();
        setReservation(previousState => {
            return { ...previousState, dateReservation: setDateFormat(date.getDate().toString(), date.getMonth().toString(), date.getFullYear().toString()) }
        })
    }, [new Date().getDate()])

    function reserver() {
        const newReservation = new ReservationObject();
        newReservation.faireReservation(reservation)
        .then((response) => {
            console.log("reservation status: " + response.status);
            setShowSuccessModal(true);
        })
    }

    return (
        <div className="reservation">
            <p style={{ display: isConnected ? "none" : "inline" }} className="connexionStatus"><small>Vous n'êtes pas connecté</small></p>
            <div className="presentation-text">
                <h1>Nos tarifs</h1>
            </div>
            <div className="tarif-collection">
                <div className="card basic">
                    <div className="card-heading">
                        <p><b>BASIQUE</b></p>
                        <h2 className="prix">Ar 100.000</h2>
                        <p>par nuit</p>
                    </div>
                    <ul className="card-body feature-of-chambre">
                        <li><i className="fa-solid fa-check-circle"></i> Chambre confortable</li>
                        <li><i className="fa-solid fa-check-circle"></i> Divertissement(TV)</li>
                        <li><i className="fa-solid fa-dot-circle no"></i> Wifi</li>
                        <li><i className="fa-solid fa-dot-circle no"></i> Service de chambre</li>
                        <li><i className="fa-solid fa-dot-circle no"></i> Petit déjeuner</li>
                    </ul>
                    <div className="card-control">
                        <a href="#to-formulaire"><button className="btn" onClick={() => {
                            setReservation(previousState => {
                                disabledBtn();
                                return { ... previousState, type: "Basic" }
                            });
                        }}><i className="fa-solid fa-arrow-down"></i> Choisir</button></a>
                    </div>
                </div>
                <div className="card classic">
                    <div className="card-heading">
                        <p><b>CLASSIQUE</b></p>
                        <h2 className="prix">Ar 150.000</h2>
                        <p>par nuit</p>
                    </div>
                    <ul className="card-body feature-of-chambre">
                        <li><i className="fa-solid fa-check-circle"></i> Chambre confortable</li>
                        <li><i className="fa-solid fa-check-circle"></i> Divertissement(TV)</li>
                        <li><i className="fa-solid fa-check-circle"></i> Wifi</li>
                        <li><i className="fa-solid fa-check-circle"></i> Service de chambre</li>
                        <li><i className="fa-solid fa-dot-circle no"></i> Petit déjeuner</li>
                    </ul>
                    <div className="card-control">
                        <a href="#to-formulaire"><button className="btn" onClick={() => {
                            setReservation(previousState => {
                                disabledBtn();
                                return { ... previousState, type: "Classic" }
                            });
                        }}><i className="fa-solid fa-arrow-down"></i> Choisir</button></a>
                    </div>
                </div>
                <div className="card premium">
                    <div className="card-heading">
                        <p><b>VIP</b></p>
                        <h2 className="prix">Ar 200.000</h2>
                        <p>par nuit</p>
                    </div>
                    <ul className="card-body feature-of-chambre">
                        <li><i className="fa-solid fa-check-circle"></i> Chambre confortable</li>
                        <li><i className="fa-solid fa-check-circle"></i> Divertissement(TV)</li>
                        <li><i className="fa-solid fa-check-circle"></i> Wifi</li>
                        <li><i className="fa-solid fa-check-circle"></i> Service de chambre</li>
                        <li><i className="fa-solid fa-check-circle"></i> Petit déjeuner</li>
                    </ul>
                    <div className="card-control">
                        <a href="#to-formulaire"><button className="btn" onClick={() => {
                            setReservation(previousState => {
                                disabledBtn();
                                return { ... previousState, type: "Premium" }
                            });
                        }}><i className="fa-solid fa-arrow-down"></i> Choisir</button></a>
                    </div>
                </div>
            </div>
            <div className="container" id="to-formulaire">
                <h5>Formulaire de réservation <span className="chambre-label" style={{ display: reservation.type.length > 0 ? "inline" : "none" }}>"Chambre { reservation.type }"</span></h5>
                <p className="errorMsg" style={{ display: errorMsg() }}>Date de réservation invalide</p>
                <p className="infoMsg" style={{ display: reservation.type == "" ? "inline" : "none" }}>Choisissez la type de chambre</p>
                <div className="form">
                    <div className="form-group">
                        <label>Nombre de personne</label>
                        <input type="number" className="form-control" min={1} max={30} value={ reservation.nbPersonne > 30 ? 30 : reservation.nbPersonne } onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, nbPersonne: parseInt(e.target.value) ? parseInt(e.target.value) : 1 }
                            });
                        }} placeholder="Nombre de personne" />
                    </div>
                    <div className="form-group">
                        <label>Du </label>
                        <input type="date" className="form-control" onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, dateDebut: e.target.value.toString().split("-").reverse().join("/") }
                            });
                        }} />
                        <label>Au </label>
                        <input type="date" className="form-control" onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, dateFin: e.target.value.toString().split("-").reverse().join("/") }
                            });
                        }} />
                    </div>
                    <div className="form-group">
                        <label>Nombre de chambre</label>
                        <input type="number" className="form-control" min={1} max={30} maxLength={3} placeholder="Nombre de chambre" value={ reservation.nbChambre > 30 ? 30 : reservation.nbChambre } onChange={(e) => {
                            setReservation(previousState => {
                                return { ... previousState, nbChambre: parseInt(e.target.value) ? parseInt(e.target.value) : 1 }
                            });
                        }} />
                    </div>
                    <div className="form-group">
                        <button className="form-control btn" onClick={reserver} disabled={ disabledBtn() }><i className="fa-solid fa-calendar"></i> Réserver</button>
                    </div>
                </div>
            </div>
            <SuccessModal show={ showSuccessModal } setShow={ setShowSuccessModal } />
        </div>
    );

    function errorMsg() {
        const dateDeb = reservation.dateDebut;
        const dateFin = reservation.dateFin;
        if(compareToToday(dateDeb) || compare(dateDeb, dateFin) && (dateDeb != "") && (dateFin != "")){
            return "inline";
        }
        return "none";
    }
    function disabledBtn() {
        // En cas d'erreur de saisie
        if(
            (compareToToday(reservation.dateDebut)) ||
            (isConnected == false) ||
            (reservation.type == "") ||
            (compare(reservation.dateDebut, reservation.dateFin)) ||
            (reservation.dateDebut == "") ||
            (reservation.dateFin == "") ||
            (reservation.dateDebut == reservation.dateFin && reservation.dateDebut != "") ||
            (reservation.dateDebut == reservation.dateFin && reservation.dateDebut == "")
        ) {
            return true;
        }
        return false;
    }
    function setDateFormat(day:string, month:string, year:string) {
        day = day.length < 2 ? "0" + day : day;
        month = month.length < 2 ? "0" + month : month;
        return `${day}/${month}/${year}`;
    }
    function toISO(date:string) {
        return new Date(date.split("/").reverse().join("-"));
    }
    function compare(dateDeb:any, dateFin:any) {
        if(toISO(dateDeb) >= toISO(dateFin)) {
            return true;
        }
        return false;
    }
    function compareToToday(dateDeb:any) {
        let date = new Date();
        let today = setDateFormat(date.getDate().toString(), (date.getMonth() + 1).toString(), date.getFullYear().toString());
        if(toISO(dateDeb) < toISO(today)) {
            return true;
        }
        return false;
    }
}

function SuccessModal({ show, setShow }: any) {
    return (
        <div className="success-modal-container" style={{ display: show == true ? "inline" : "none" }}>
            <div className="modal-heading"><h5>Votre reservation a été effectuée</h5></div>
            <div className="modal-body">Vous allez recevoir un email de confirmation<br /><i className="fa-solid fa-key"></i> La clé de votre chambre vous attend</div>
            <div className="modal-footer"><button className="recu-btn" onClick={() => { setShow(false) }}>Réçu</button></div>
        </div>
    );
}