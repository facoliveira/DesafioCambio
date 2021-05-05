using System;

namespace DesafioCambio.Base.Entidades
{
    public abstract class BaseEntidade
    {
        public Guid Id { get; set; }

        public string Nome { get; set; }
    }
}
