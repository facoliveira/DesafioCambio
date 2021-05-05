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
    public class SegmentoController : Controller
    {
        private readonly ISegmentoRepositorio segmentoRepositorio;

        public SegmentoController(ISegmentoRepositorio segmentoRepositorio)
        {
            this.segmentoRepositorio = segmentoRepositorio;
        }

        // GET: api/<SegmentoController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new ApiCasoDeUsoSaida.Lista<Segmento>()
            {
                Mensagem = "Sucesso",
                Itens = segmentoRepositorio.Lista(),
            });
        }

        // GET api/<SegmentoController>/5
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var segmento = segmentoRepositorio.Seleciona(id);
            if (segmento == null)
            {
                return NotFound(new ApiCasoDeUsoSaida.Padrao() {
                    Mensagem = "Segmento não encontrado"
                });
            }
            return Ok(new ApiCasoDeUsoSaida.Seleciona<Segmento>() {
                Mensagem = "Sucesso",
                Item = segmento,
            });
        }

        // POST api/<SegmentoController>
        [HttpPost]
        public IActionResult Post([FromBody] Segmento segmento)
        {
            if (segmentoRepositorio.Seleciona(segmento.Id) != null)
            {
                return BadRequest(new ApiCasoDeUsoSaida.Padrao() {
                    Mensagem = "Segmento já existe"
                });
            }
            segmentoRepositorio.Insere(segmento);
            return Created("", new ApiCasoDeUsoSaida.Padrao()
            {
                Mensagem = "Segmento criado com sucesso"
            });
        }

        // PUT api/<SegmentoController>/5
        [HttpPut]
        public IActionResult Put([FromBody] Segmento segmento)
        {
            if (segmentoRepositorio.Seleciona(segmento.Id) == null)
            {
                return NotFound(new ApiCasoDeUsoSaida.Padrao() {
                    Mensagem = "Segmento não encontrado"
                });
            }
            segmentoRepositorio.Atualiza(segmento);
            return Ok(new ApiCasoDeUsoSaida.Padrao() {
                Mensagem = "Segmento atualizado"
            });
        }

        // DELETE api/<SegmentoController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            segmentoRepositorio.Exclui(segmentoRepositorio.Seleciona(id));
            return Ok(new ApiCasoDeUsoSaida.Padrao() {
                Mensagem = "Segmento excluido"
            });
        }
    }
}
