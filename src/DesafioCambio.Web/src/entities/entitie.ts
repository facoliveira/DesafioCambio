export interface Moeda {
    id: string;
    nome: string;
    codigo: string;
}
  
export interface Segmento {
    id: string;
    nome: string;
    taxa: number;
}
  
export interface Cambio {
    valor: number;
}