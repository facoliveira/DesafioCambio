#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["DesafioCambio.API/DesafioCambio.API.csproj", "DesafioCambio.API/"]
COPY ["DesafioCambio.Aplicacao/DesafioCambio.Aplicacao.csproj", "DesafioCambio.Aplicacao/"]
COPY ["DesafioCambio.Base/DesafioCambio.Base.csproj", "DesafioCambio.Base/"]
RUN dotnet restore "DesafioCambio.API/DesafioCambio.API.csproj"
COPY . .
WORKDIR "/src/DesafioCambio.API"
RUN dotnet build "DesafioCambio.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DesafioCambio.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DesafioCambio.API.dll"]