import axios from "axios";

export default function buscaVerso(abreviacao, capitulo, numero) {
    var config = {
        method: 'get',
        url: `https://www.abibliadigital.com.br/api/verses/nvi/${abreviacao}/${capitulo}/${numero}`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

}