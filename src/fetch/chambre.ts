import axios from "axios";
import host from './host.ts';

const chambre: string = "/chambres";

class Chambre {
    // private numero: string = "";
    // private type: string = "";
    // private status: string = "";

    public obtenirListeChambre() {
        const fetch = axios.get(host + chambre);
        return fetch;
    }

    public obtenirChambreByNumero(numero: string) {
        const fetch = axios.get(host + chambre + "/" + numero);
        return fetch;
    }

    public ajouterChambre(newChambre: any) {
        const fetch = axios.post(host + chambre, newChambre);
        return fetch;
    }

    public modifierChambre(numero: number, chambreNewInfo: any) {
        const fetch = axios.put(host + chambre + "/" + numero, chambreNewInfo);
        return fetch;
    }

    public supprimerChambre(numero: number) { // => supprimer chambre
        const fetch = axios.delete(host + chambre + "/" + numero);
        return fetch;
    }
}

export default Chambre;