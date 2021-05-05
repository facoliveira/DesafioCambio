using DesafioCambio.Base.CasosDeUso.Cambio;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesafioCambio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CambioController : Controller
    {
        private readonly ICambioCasoDeUso cambioCasoDeUso;

        public CambioController(ICambioCasoDeUso cambioCasoDeUso)
        {
            this.cambioCasoDeUso = cambioCasoDeUso;
        }

        // GET api/<CambioController>/5/4/3
        [HttpGet("{moedaId}/{segmentoId}/{quantidade}")]
        public IActionResult Get(Guid moedaId, Guid segmentoId, double quantidade)
        {
            CambioCasoDeUsoEntrada entrada = new()
            {
                MoedaId = moedaId,
                SegmentoId = segmentoId,
                Quantidade = quantidade,
            };
            CambioCasoDeUsoSaida saida = cambioCasoDeUso.Calcular(entrada);
            return Ok(saida);
        }
    }
}
