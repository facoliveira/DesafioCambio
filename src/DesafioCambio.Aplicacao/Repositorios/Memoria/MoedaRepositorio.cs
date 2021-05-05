using System;
using System.Collections.Generic;
using DesafioCambio.Base.Entidades;
using DesafioCambio.Base.Repositorios;

namespace DesafioCambio.Aplicacao.Repositorios.Memoria
{
    public class MoedaRepositorio : IMoedaRepositorio
    {
        private List<Moeda> bd;

        public MoedaRepositorio()
        {
            bd = new List<Moeda>()
            {
                new Moeda
                {
                    Id = Guid.NewGuid(),
                    Nome = "Dólar",
                    Codigo = "USD",
                },
                new Moeda
                {
                    Id = Guid.NewGuid(),
                    Nome = "Euro",
                    Codigo = "EUR",
                },
                new Moeda
                {
                    Id = Guid.NewGuid(),
                    Nome = "Libra esterlina",
                    Codigo = "GBP",
                },
            };
        }

        public void Insere(Moeda obj)
        {
            if (obj.Id == Guid.Empty)
            {
                obj.Id = Guid.NewGuid();
            }
            this.bd.Add(obj);
        }

        public Moeda Seleciona(Guid id)
        {
            return this.bd.Find(c => c.Id == id);
        }

        public IEnumerable<Moeda> Lista()
        {
            return this.bd;
        }

        public void Atualiza(Moeda obj)
        {
            var i = this.bd.IndexOf(this.Seleciona(obj.Id));
            this.bd[i] = obj;
        }

        public void Exclui(Moeda obj)
        {
            this.bd.Remove(obj);
        }
    }
}
