export type Evento = {
    nombre: string;
    fecha: string;
    lugar: string;
    hora: {
        inicio: string;
        fin: string;
    }
}