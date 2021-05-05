using System;
using DesafioCambio.Base.CasosDeUso.Base;

namespace DesafioCambio.Base.CasosDeUso.Cambio
{
    public class CambioCasoDeUsoEntrada : IBaseCasoDeUsoEntrada
    {
        public Guid MoedaId { get; set; }

        public Guid SegmentoId { get; set; }

        public double Quantidade { get; set; }
    }
}
