import axios from "axios";
import host from './host.ts';

const reservation: string = "/reservations";;

class Reservation {
    // private ref: number; // auto increment
    // private type: string;
    // private dateReservation: Date;
    // private dateDebut: Date;
    // private dateFin: Date;
    // private status: string;
    // private nbPersonne: number;
    // private nbChambre: number;
    // private numeroClient: number;
    // private matricule: string;

    public obtenirListeReservation() {
        const fetch = axios.get(host + reservation);
        return fetch;
    }

    public faireReservation(newReservation: any) {
        const fetch = axios.post(host + reservation, newReservation);
        return fetch;
    }

    public modifierReservation(reference: number, reservation: any) {
        const fetch = axios.put(host + reservation + "/" + reference, reservation);
        return fetch;
    }

    public annulerReservation(reference: number) {
        const fetch = axios.delete(host + reservation + "/" + reference);
        return fetch;
    }
}

export default Reservation;