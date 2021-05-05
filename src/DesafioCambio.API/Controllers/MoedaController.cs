using DesafioCambio.Base.CasosDeUso.Api;
using DesafioCambio.Base.Entidades;
using DesafioCambio.Base.Repositorios;
using DesafioCambio.Base.Servicos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesafioCambio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoedaController : Controller
    {
        private readonly IMoedaRepositorio moedaRepositorio;
        private readonly ICambioServico cambioServico;

        public MoedaController(IMoedaRepositorio moedaRepositorio, ICambioServico cambioServico)
        {
            this.moedaRepositorio = moedaRepositorio;
            this.cambioServico = cambioServico;
        }

        // GET: api/<MoedaController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new ApiCasoDeUsoSaida.Lista<Moeda>()
            {
                Mensagem = "Sucesso",
                Itens = moedaRepositorio.Lista(),
            });
        }

        // GET api/<MoedaController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var moeda = moedaRepositorio.Seleciona(id);
            if (moeda == null)
            {
                return NotFound(new ApiCasoDeUsoSaida.Padrao() {
                    Mensagem = "Moeda não encontrada"
                });
            }
            return Ok(new ApiCasoDeUsoSaida.Seleciona<Moeda>()
            {
                Item = moeda,
                Mensagem = "Sucesso",
            });
        }

        // POST api/<MoedaController>
        [HttpPost]
        public IActionResult Post([FromBody] Moeda moeda)
        {
            try
            {
                var taxa = cambioServico.PegarTaxa(moeda.Codigo);
            }
            catch (Exception)
            {
                return BadRequest(new ApiCasoDeUsoSaida.Padrao() {
                    Mensagem = "Moeda inválida"
                });
            }
            if (moedaRepositorio.Seleciona(moeda.Id) != null)
            {
                return BadRequest(new ApiCasoDeUsoSaida.Padrao() {
                    Mensagem = "Moeda já existe"
                });
            }
            moedaRepositorio.Insere(moeda);
            return Created("", new ApiCasoDeUsoSaida.Padrao()
            {
                Mensagem = "Moeda criada com sucesso",
            });
        }

        // PUT api/<MoedaController>/5
        [HttpPut]
        public IActionResult Put([FromBody] Moeda moeda)
        {
            if (moedaRepositorio.Seleciona(moeda.Id) == null)
            {
                return NotFound(new ApiCasoDeUsoSaida.Padrao() {
                    Mensagem = "Moeda não encontrada"
                });
            }
            try
            {
                var taxa = cambioServico.PegarTaxa(moeda.Codigo);
            }
            catch (Exception)
            {
                return BadRequest(new ApiCasoDeUsoSaida.Padrao() {
                    Mensagem = "Moeda inválida"
                });
            }
            moedaRepositorio.Atualiza(moeda);
            return Ok(new ApiCasoDeUsoSaida.Padrao()
            {
                Mensagem = "Moeda atualizada"
            });
        }

        // DELETE api/<MoedaController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            moedaRepositorio.Exclui(moedaRepositorio.Seleciona(id));
            return Ok(new ApiCasoDeUsoSaida.Padrao()
            {
                Mensagem = "Moeda excluida"
            });
        }
    }
}
