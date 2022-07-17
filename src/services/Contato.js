import axios from "axios";

export class Contato{
    static serverURL = `http://localhost:9000`;
    
    static getAllContatos(){
        let dataURL = `${this.serverURL}/contatos`;
        return axios.get(dataURL);
    }
    
    static getContato(contatoId){
        let dataURL = `${this.serverURL}/contatos/${contatoId}`;
        return axios.get(dataURL);
    }

    static createContato(contato){
        let dataURL = `${this.serverURL}/contatos/`;
        return axios.post(dataURL, contato);
    }
    
    static updateContato(contato, contatoId){
        let dataURL = `${this.serverURL}/contatos/${contatoId}`;
        return axios.put(dataURL, contato);
    }

    static deleteContato(contatoId){
        let dataURL = `${this.serverURL}/contatos/${contatoId}`;
        return axios.delete(dataURL);
    }

    static getAllGrupos(){
        let dataURL = `${this.serverURL}/grupos/`;
        return axios.get(dataURL);
    }

    static getGrupo(contato){
        let grupoId = contato.grupoId;
        let dataURL = `${this.serverURL}/grupos/${grupoId}`;
        return axios.get(dataURL);
    }

}