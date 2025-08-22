import axios from "axios";
import host from './host.ts';// http://127.0.0.1:3000/api/users
import Person from './person.ts';

const userString: string = "/clients";

class Client extends Person {
    // private numeroClient: number = 9; // auto increment

    public obtenirListeClient() {
        const fetch = axios.get(host + userString);
        return fetch;
    }

    public obtenirClientByNumeroClient(numeroClient: number) {
        const fetch = axios.get(host + userString + "/numero/" + numeroClient);
        // console.log(fetch);
        return fetch;
    }

    public obtenirClientByTel(tel: string) {
        const fetch = axios.get(host + userString + "/email/" + tel);
        return fetch;
    }

    public obtenirClientByEmail(email: string) {
        const fetch = axios.get(host + userString + "/email/" + email);
        return fetch;
    }

    public creerCompte(client: any) {
        const fetch = axios.post(host + userString, client);
        return fetch;
    }

    public modifierCompte(numeroClient: number, client: any) {
        const fetch = axios.put(host + userString + "/" + numeroClient, client);
        return fetch;
    }

    public supprimerClient(numeroClient: number) {
        const fetch = axios.delete(host + userString + "/" + numeroClient);
        return fetch;
    }

    public authentification(telEmail: string , mdp : string) {
        const fetch = axios.post(host  + "/auth/login",{
            telEmail,
            mdp
        } );
        return fetch;
    }
}

export default Client;