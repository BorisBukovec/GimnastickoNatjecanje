using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class BackendContext : DbContext
    {

        public BackendContext(DbContextOptions<BackendContext> opcije) : base(opcije)
        {
            //ovdje se  mogu fino postaviti opcije, ali ne za sada
        }

        public DbSet<Klub> Klubovi { get; set; }

    }
}