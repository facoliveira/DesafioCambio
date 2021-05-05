using DesafioCambio.Base.CasosDeUso.Base;

namespace DesafioCambio.Base.CasosDeUso.Api
{
    public interface IApiCasoDeUso : IBaseCasoDeUso<ApiCasoDeUsoEntrada, ApiCasoDeUsoSaida>
    {
        ApiCasoDeUsoSaida Retorna(ApiCasoDeUsoEntrada obj);
    }
}
