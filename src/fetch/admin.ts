import axios from "axios";
import host from './host.ts';
import Person from './person.ts';

const admin: string = "/admins";

class Admin extends Person {
    // private matricule: string;

    public obtenirListeAdmin() {
        const fetch = axios.get(host + admin);
        return fetch;
    }

    public obtenirAdminByMatricule(matricule: string) {
        const fetch = axios.get(host + admin + "/" + matricule);
        return fetch;
    }

    public creerCompte(newAdmin: any) {
        const fetch = axios.post(host + admin, newAdmin);
        return fetch;
    }

    public modifierAdmin(matricule: string, adminNewInfo: any) {
        const fetch = axios.put(host + admin + "/" + matricule, adminNewInfo);
        return fetch;
    }

    public supprimerAdmin(matricule: string) {
        const fetch = axios.delete(host + admin + "/" + matricule);
        return fetch;
    }
}

export default Admin;