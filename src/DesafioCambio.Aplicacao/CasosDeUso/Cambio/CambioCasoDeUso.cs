using DesafioCambio.Base.Entidades;
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
            Moeda moeda = moedaRepositorio.Seleciona(obj.MoedaId);
            Segmento segmento = segmentoRepositorio.Seleciona(obj.SegmentoId);
            if(moeda == null || segmento == null)
            {
                throw new System.Exception("Parâmetros incorretos");
            }
            double taxa = cambioServico.PegarTaxa(moeda.Codigo);
            return new CambioCasoDeUsoSaida
            {
                Valor = (obj.Quantidade * taxa) * (1 + segmento.Taxa)
            };
        }
    }
}
