using System;
using System.Threading.Tasks;

namespace DesafioCambio.Base.Servicos
{
    public interface ICambioServico
    {
        public double PegarTaxa(string moedaCodigo);
    }
}
