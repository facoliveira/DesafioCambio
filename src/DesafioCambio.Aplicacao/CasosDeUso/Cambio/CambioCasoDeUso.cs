using DesafioCambio.Base.Servicos;
using DesafioCambio.Base.Repositorios;
using DesafioCambio.Base.CasosDeUso.Cambio;

namespace DesafioCambio.Aplicacao.CasoDeUso
{
    public class CambioCasoDeUso : ICambioCasoDeUso
    {
        private readonly IMoedaRepositorio moedaRepositorio;
        private readonly ISegmentoRepositorio segmentoRepositorio;
        private readonly ICambioServico cambioServico;

        public CambioCasoDeUso(
            IMoedaRepositorio moedaRepositorio,
            ISegmentoRepositorio segmentoRepositorio,
            ICambioServico cambioServico
        )
        {
            this.moedaRepositorio = moedaRepositorio;
            this.segmentoRepositorio = segmentoRepositorio;
            this.cambioServico = cambioServico;
        }

        public CambioCasoDeUsoSaida Calcular(CambioCasoDeUsoEntrada obj)
        {
            var cur = moedaRepositorio.Seleciona(obj.MoedaId);

            var seg = segmentoRepositorio.Seleciona(obj.SegmentoId);

            var rate = cambioServico.PegarTaxa(cur.Codigo);

            return new CambioCasoDeUsoSaida
            {
                Valor = (obj.Quantidade * rate) * (1 + seg.Taxa)
            };
        }
    }
}
