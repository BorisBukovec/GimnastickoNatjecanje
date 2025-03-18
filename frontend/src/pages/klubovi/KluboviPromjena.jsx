import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import moment from "moment";
import KlubService from "../../services/KlubService";
import { useEffect, useState } from "react";


export default function KluboviPromjena(){

    const navigate = useNavigate();
    const [klub,setKlub] = useState({});
    const routeParams = useParams();

    async function dohvatiKlub(){
        const odgovor = await KlubService.getBySifra(routeParams.sifra)
        setKlub(odgovor)
    }

    useEffect(()=>{
        dohvatiKlub();
    },[])

    async function promjena(klub){
        const odgovor = await KlubService.promjena(routeParams.sifra,klub);
        if(odgovor.greska){
            alert(odgovor.poruka)
            return
        }
        navigate(RouteNames.KLUB_PREGLED)
    }

    function odradiSubmit(e){ // e je event
        e.preventDefault(); // nemoj odraditi zahtjev na server pa standardnom načinu

        let podaci = new FormData(e.target);

        promjena(
            {
                naziv: podaci.get('naziv'),
                adresa: podaci.get('adresa'),
                iban: podaci.get('iban')
            }
        );
    }

    return(
    <>
    Promjena kluba
    <Form onSubmit={odradiSubmit}>

    <Form.Group controlId="naziv">
            <Form.Label>Naziv</Form.Label>
            <Form.Control type="text" name="naziv" required  defaultValue={klub.naziv}/>
        </Form.Group>

        <Form.Group controlId="adresa">
            <Form.Label>adresa</Form.Label>
            <Form.Control type="text" name="adresa"  defaultValue={klub.adresa} />
        </Form.Group>

        <Form.Group controlId="iban">
            <Form.Label>iban</Form.Label>
            <Form.Control type="text" name="iban" defaultValue={klub.iban}/>
        </Form.Group>

        <hr/>

        <Row>
            <Col xs={6} sm={6} md={3} lg={2} xl={6} xxl={6}>
                <Link
                to={RouteNames.KLUB_PREGLED}
                className="btn btn-danger siroko"
                >Odustani</Link>
            </Col>
            <Col xs={6} sm={6} md={9} lg={10} xl={6} xxl={6}>
                <Button variant="success" type="submit" className="siroko">
                    Promjeni klub
                </Button>
            </Col>
        </Row>


    </Form>




   
    </>
    )
}