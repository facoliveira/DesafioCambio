using DesafioCambio.Base.CasosDeUso.Base;
using System.Collections.Generic;

namespace DesafioCambio.Base.CasosDeUso.Api
{
    public class ApiCasoDeUsoSaida : IBaseCasoDeUsoSaida
    {
        public class Padrao
        {
            public string Mensagem { get; set; }
        }

        public class Lista<T> : Padrao 
        {
            public IEnumerable<T> Itens { get; set; }
        }

        public class Seleciona<T> : Padrao
        {
            public T Item { get; set; }
        }
    }
}
