import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import KluboviPregled from './pages/klubovi/KluboviPregled'
import KluboviDodaj from './pages/klubovi/KluboviDodaj'
import KluboviPromjena from './pages/klubovi/KluboviPromjena'
import moment from 'moment'



function App() {

  function trenutnaGodina(){
    return moment().year();
  }

  return (
    <>
      <Container>
        <NavBarEdunova />
        
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.KLUB_PREGLED} element={<KluboviPregled />} />
          <Route path={RouteNames.KLUB_NOVI} element={<KluboviDodaj />} />
          <Route path={RouteNames.KLUB_PROMJENA} element={<KluboviPromjena />} />
        </Routes>

        <hr />
        &copy; Boris {trenutnaGodina()}
      </Container>
     
    </>
  )
}

export default App
