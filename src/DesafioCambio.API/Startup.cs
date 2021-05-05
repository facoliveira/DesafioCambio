using DesafioCambio.Base.Repositorios;
using DesafioCambio.Base.CasosDeUso.Cambio;
using DesafioCambio.Base.Servicos;
using DesafioCambio.Aplicacao.Repositorios.Memoria;
using DesafioCambio.Aplicacao.CasoDeUso;
using DesafioCambio.Aplicacao.Servicos;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DesafioCambio.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Casos de Uso
            services.AddScoped<ICambioCasoDeUso, CambioCasoDeUso>();

            // Servicos
            services.AddScoped<ICambioServico, CambioServico>();

            // Repositorios
            services.AddSingleton<IMoedaRepositorio, MoedaRepositorio>();
            services.AddSingleton<ISegmentoRepositorio, SegmentoRepositorio>();

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DesafioCambio.API", Version = "v1" });
            });

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ItauExchange.API v1"));

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
