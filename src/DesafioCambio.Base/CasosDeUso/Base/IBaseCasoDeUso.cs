namespace DesafioCambio.Base.CasosDeUso.Base
{
    public interface IBaseCasoDeUso<TEntrada, TSaida> where TEntrada : IBaseCasoDeUsoEntrada where TSaida : IBaseCasoDeUsoSaida
    {
    }
}
