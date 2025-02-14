using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KlubController : ControllerBase
    {
        // koristimo dependency injection
        // 1. definiramo privatno svojstvo
        private readonly BackendContext _context;


        // 2. u konstruktoru postavljamo vrijednost
        public KlubController(BackendContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Klubovi);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpGet("{sifra:int}")]
        public IActionResult Get(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { poruka = "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var Klub = _context.Klubovi.Find(sifra);
                if (Klub == null)
                {
                    return NotFound(new { poruka = $"Klub s šifrom {sifra} ne postoji" });
                }
                return Ok(Klub);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }



        [HttpPost]
        public IActionResult Post(Klub Klub)
        {
            try
            {
                _context.Klubovi.Add(Klub);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, Klub);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Klub Klub)
        {
            try
            {

                var KlubBaza = _context.Klubovi.Find(sifra);
                if (KlubBaza == null)
                {
                    return NotFound(new { poruka = $"Klub s šifrom {sifra} ne postoji" });
                }

                // rucni mapping - kasnije automatika
                KlubBaza.Naziv = Klub.Naziv;
                KlubBaza.Adresa = Klub.Adresa;
                KlubBaza.Iban = Klub.Iban;


                _context.Klubovi.Update(KlubBaza);
                _context.SaveChanges();
                return Ok(KlubBaza);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new { poruka = "Šifra mora biti pozitivan broj" });
            }
            try
            {
                var Klub = _context.Klubovi.Find(sifra);
                if (Klub == null)
                {
                    return NotFound(new { poruka = $"Klub s šifrom {sifra} ne postoji" });
                }
                _context.Klubovi.Remove(Klub);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


    }
}