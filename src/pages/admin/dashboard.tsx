import { useEffect, useState } from "react";
import "../../styles/admin.dashboard.scss";
import { BarChart } from "@mui/x-charts";
import ClientObj from "../../fetch/client";
import ReservationObj from "../../fetch/reservation";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <Reservation />
        </div>
    );
}

function Histogramme() {
    const [month, setMonth] = useState({
        jan: 0,
        fev: 0,
        mars: 0,
        avr: 0,
        mai: 0,
        juin: 0,
        juil: 0,
        aout: 0,
        sept: 0,
        oct: 0,
        nov: 0,
        dec: 0
    })

    useEffect(() => {
        let basic:number = 100000;
        let classic:number = 150000;
        let premium:number = 200000;
        const res = new ReservationObj();
        res.obtenirListeReservation()
        .then((response) => {
            let reservation = response.data;
            for(let i = 0; i < reservation.length; i++) {
                let monthOfReservation:number = parseInt((reservation[i].dateReservation.split("/")[1])) + 1;
                let price = 0;
                console.log(reservation[i].type);
                if(reservation[i].type == "Basic") {
                    price = basic;
                }else if(reservation[i].type == "Classic") {
                    price = classic;
                }else {
                    price = premium;
                }

                switch(monthOfReservation) {
                    case 1: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, jan: month.jan + price }
                        }); 
                        break;
                    case 2: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, fev: month.fev + price }
                        }); 
                        break;
                    case 3: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, mars: month.mars + price }
                        }); 
                        break;
                    case 4: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, avr: month.avr + price }
                        }); 
                        break;
                    case 5: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, mai: month.mai + price }
                        }); 
                        break;
                    case 6: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, juin: month.juin + price }
                        }); 
                        break;
                    case 7: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, juil: month.juil + price }
                        }); 
                        break;
                    case 8: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, aout: month.aout + price }
                        }); 
                        console.log(price + " + ");
                        break;
                    case 9: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, sept: month.sept + price }
                        }); 
                        break;
                    case 10: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, oct: month.oct + price }
                        }); 
                        break;
                    case 11: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, nov: month.nov + price }
                        });  
                        break;
                    case 12: 
                        setMonth(previousMonths => {
                            return { ...previousMonths, dec: month.dec + price }
                        }); 
                        break;
                }
            }
        })
        .catch((e) => console.log(e))
    }, [])

    return (
        <div className="histogramme">
            <h2>Recette mensuelle(Ariary)</h2>
            <BarChart
                xAxis={[
                    {
                        id: 'barCategories',
                        data: ['Août', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Fev', 'Mars', 'Avr', 'Mai', 'Jui','Juil', ],
                    },
                ]}
                series={[
                    {
                        data: [month.aout, month.sept, month.oct, month.nov, month.dec, month.jan, month.fev, month.mars, month.avr, month.mai, month.juin, month.juil],
                    },
                ]}
                className="bar-chart"
            />
        </div>
    );
}

function Reservation() {
    const [recent, setRecent] = useState(0);
    const [total, setTotal] = useState(0);
    const [reservationList, setReservationList] = useState([]);

    useEffect(() => {
        const reservation = new ReservationObj();
        reservation.obtenirListeReservation()
        .then((response) => {
            effectif(response.data);
            setReservationList(response.data);
        })

        setInterval(() => {
            reservation.obtenirListeReservation()
            .then((response) => {
                effectif(response.data);
                setReservationList(response.data);
            })
        }, 1000)
    }, [])

    useEffect(() => {
        setReservationList(reservationList);
        // console.log(reservationList);
    }, [reservationList])

    function effectif(obj: any) {
        const date = new Date();
        let now = setDateFormat(date.getDate().toString(), date.getMonth().toString(), date.getFullYear().toString());
        let todayReservation:any = obj.filter((item:any) => item.dateReservation == now)
        setTotal(obj.length);
        setRecent(todayReservation.length);
    }
    function setDateFormat(day:string, month:string, year:string) {
        day = day.length < 2 ? "0" + day : day;
        month = month.length < 2 ? "0" + month : month;
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="reservation-container">
            <div className="data">
                <Histogramme />
                <div className="box-list">
                    <div className="box nouvelle">
                        <h5>Aujourd'hui</h5>
                        <h3><i className="fa-solid fa-history"></i> { recent }</h3>
                    </div>
                    <div className="box totale">
                        <h5>Totale réservation</h5>
                        <h3>{ total }</h3>
                    </div>
                </div>
            </div>
            <h2>Listes de réservation</h2>
            <div className="search-field">
                <input type="text" className="form-control" placeholder="Rechercher de réservation(nom, prenoms)" />
                <button className="btn"><i className="fa-solid fa-search"></i> Rechercher</button>
            </div>
            <div className="filter">
                <button className="btn label">Filtre: </button>
                <button className="btn btn-filter">Tout</button>
                <button className="btn btn-filter">Payé</button>
                <button className="btn btn-filter">Non Payé</button>
            </div>
            <div className="reservation-list">
                { reservationList.map((reservation:any) => <List key={reservation.ref} reservation={reservation} />) }
            </div>
        </div>
    );
}

function List({reservation}: any) {
    const [client, setClient] = useState({
        nom: "",
        prenoms: "",
        email: ""
    });
    const [confirmRemove, setConfirmRemove] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [ref, setRef] = useState(0);

    useEffect(() => {
        getClient(reservation.numeroClient);
    }, [])

    useEffect(() => {
        if(confirmRemove == true) {
            annulerReservation(ref);
        }
    }, [showDeleteModal])

    function getClient(numeroClient: any) {
        const client = new ClientObj();
        client.obtenirClientByNumeroClient(numeroClient)
        .then((response) => { 
            setClient({
                nom: response.data.nom,
                prenoms: response.data.prenoms,
                email: response.data.email
            })
            setConfirmRemove(false);
        })
    }

    function annulerReservation(ref: number) {
        const reservation = new ReservationObj();
        reservation.annulerReservation(ref)
        .then((response) => {
            console.log(response.data);
        })
        .catch(() => console.log("_ERR: annuler reservation"));
    }

    return (
        <div className="list">
            <p>Réservation de<span className="chambre">{reservation.nbChambre} chambre {reservation.type}</span>pour<span className="personne">{reservation.nbPersonne} personne</span>au nom de {client.nom} {client.prenoms}</p>
            <p>Du {reservation.dateDebut} au {reservation.dateFin}</p>
            <p><a href="https://mail.google.com">{client.email}</a></p>
            <div className="control">
                <button className="btn btn-primary"><i className="fa-solid fa-calendar"></i> Réservé le {reservation.dateReservation}</button>
                <button className="btn btn-primary">{reservation.status}</button>
                <div className="control-btn">
                    <button className="btn crud-btn valider"><i className="fa-solid fa-check"></i> Valider</button>
                    <button className="btn crud-btn update"><i className="fa-solid fa-edit"></i></button>
                    <button className="btn crud-btn delete" onClick={ () => {setShowDeleteModal(true); setRef(reservation.ref)}}><i className="fa-solid fa-trash"></i></button>
                </div>
            </div>
            <ConfirmDelete
                nom={client.nom + " " + client.prenoms}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                setConfirmRemove={setConfirmRemove}
            />
        </div>
    );
}

function ConfirmDelete({nom, showDeleteModal, setShowDeleteModal, setConfirmRemove} : any) {
    const remove = () => {
        setConfirmRemove(true);
        setShowDeleteModal(false);
    }
    
    return (
        <div className="confirm-delete" style={{ display: showDeleteModal == true ? "flex" : "none" }}>
            <div className="delete-modal">
                <i className="fa-solid fa-trash delete-modal-icon"></i>
                <h4>Supprimer une réservation</h4>
                <p>La suppression est irréversible</p>
                <p>Réservation de {nom}</p>
                <div className="control-btn">
                    <button className="btn cancel-btn" onClick={() => setShowDeleteModal(false)}><i className="fa-solid fa-cancel"></i> Annuler</button>
                    <button className="btn delete-btn" onClick={remove}><i className="fa-solid fa-trash"></i> Supprimer</button>
                </div>
            </div>
        </div>
    );
}

// function Connexion() {
//     return (
//         <h1><i className="fa-solid fa-sign-in"></i> Se connecter</h1>
//     );
// }