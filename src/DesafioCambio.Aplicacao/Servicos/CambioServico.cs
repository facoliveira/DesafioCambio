using DesafioCambio.Base.Servicos;
using System;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;

namespace DesafioCambio.Aplicacao.Servicos
{
    public class CambioServico : ICambioServico
    {
        private readonly IConfiguration configuracao;

        public CambioServico(IConfiguration configuration)
        {
            this.configuracao = configuration;
        }

        public double PegarTaxa(string moedaCodigo)
        {
            HttpClient client = new();
            Uri uri = new($"{configuracao["Cambio:API_URL"]}/{configuracao["Cambio:API_KEY"]}/pair/{moedaCodigo}/BRL");
            var response = client.Send(new HttpRequestMessage(HttpMethod.Get, uri));
            response.EnsureSuccessStatusCode();
            using var reader = new StreamReader(response.Content.ReadAsStream());
            JObject data = JsonConvert.DeserializeObject<JObject>(reader.ReadToEnd());

            return Double.Parse(data["conversion_rate"].ToString());
        }
    }
}
