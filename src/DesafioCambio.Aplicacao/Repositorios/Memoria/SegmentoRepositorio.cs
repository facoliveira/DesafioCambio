using System;
using System.Collections.Generic;
using DesafioCambio.Base.Entidades;
using DesafioCambio.Base.Repositorios;

namespace DesafioCambio.Aplicacao.Repositorios.Memoria
{
    public class SegmentoRepositorio : ISegmentoRepositorio
    {
        private List<Segmento> bd;

        public SegmentoRepositorio()
        {
            bd = new List<Segmento>()
            {
                new Segmento
                {
                    Id = Guid.NewGuid(),
                    Nome = "Varejo",
                    Taxa = 0.01,
                },
                new Segmento
                {
                    Id = Guid.NewGuid(),
                    Nome = "Personnalite",
                    Taxa = 0.02,
                },
                new Segmento
                {
                    Id = Guid.NewGuid(),
                    Nome = "Private",
                    Taxa = 0.03,
                },
            };
        }

        public void Insere(Segmento obj)
        {
            if (obj.Id == Guid.Empty)
            {
                obj.Id = Guid.NewGuid();
            }
            this.bd.Add(obj);
        }

        public Segmento Seleciona(Guid id)
        {
            return this.bd.Find(c => c.Id == id);
        }

        public IEnumerable<Segmento> Lista()
        {
            return this.bd;
        }

        public void Atualiza(Segmento obj)
        {
            var i = this.bd.IndexOf(this.Seleciona(obj.Id));
            this.bd[i] = obj;
        }

        public void Exclui(Segmento obj)
        {
            this.bd.Remove(obj);
        }
    }
}
