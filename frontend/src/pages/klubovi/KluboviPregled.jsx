import { useEffect, useState } from "react"
import KlubService from "../../services/KlubService"
import { Button, Table } from "react-bootstrap";
import { NumericFormat } from "react-number-format";
import { GrValidate } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";


export default function KluboviPregled(){

    const[klubovi, setKlubovi] = useState();
    const navigate = useNavigate();

    async function dohvatiKlubove(){
        const odgovor = await KlubService.get()
        setKlubovi(odgovor)
    }

    // hooks (kuka) se izvodi prilikom dolaska na stranicu Klubovi
    useEffect(()=>{
        dohvatiKlubove();
    },[])



    function obrisi(sifra){
        if(!confirm('Sigurno obrisati')){
            return;
        }
        brisanjeKluba(sifra);
    }

    async function brisanjeKluba(sifra) {
        const odgovor = await KlubService.obrisi(sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiKlubove();
    }


    return(
        <>
        <Link
        to={RouteNames.SMJER_NOVI}
        className="btn btn-success siroko"
        >Dodaj novi klub</Link>
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Naziv</th>
                    <th>adresa</th>
                    <th>iban</th>
                    <th>Akcija</th>
                </tr>
            </thead>
            <tbody>
                {klubovi && klubovi.map((klub,index)=>(
                    <tr key={index}>
                        <td>
                            {klub.naziv}
                        </td>
                        <td>
                            {klub.adresa}
                        </td>
                        <td>
                            {klub.iban}
                        </td>
                       
                        <td>
                            <Button
                            onClick={()=>navigate(`/klubovi/${klub.sifra}`)}
                            >Promjena</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button
                            variant="danger"
                            onClick={()=>obrisi(klub.sifra)}
                            >Obriši</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )


}