using System;
using System.Collections.Generic;

namespace DesafioCambio.Base.Repositorios
{
    public interface IBaseRepositorio<T>
    {
        T Seleciona(Guid obj);

        IEnumerable<T> Lista();

        void Insere(T obj);

        void Atualiza(T obj);

        void Exclui(T obj);
    }
}
