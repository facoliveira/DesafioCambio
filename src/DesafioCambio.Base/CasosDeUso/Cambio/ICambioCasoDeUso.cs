using DesafioCambio.Base.CasosDeUso.Base;

namespace DesafioCambio.Base.CasosDeUso.Cambio
{
    public interface ICambioCasoDeUso : IBaseCasoDeUso<CambioCasoDeUsoEntrada, CambioCasoDeUsoSaida>
    {
        CambioCasoDeUsoSaida Calcular(CambioCasoDeUsoEntrada obj);
    }
}
