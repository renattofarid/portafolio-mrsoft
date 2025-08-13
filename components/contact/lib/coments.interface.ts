export interface CommentResource {
  id: number;
  content: string;
  person: string;
  position: string;
  producto: string;
  cliente: Cliente;
}

export interface Cliente {
  id: number;
  nombre: string;
  logo: string;
  imagen_referencia: string;
  flyer_bienvenida: null;
  flyer_informativo: null;
  type: string;
  comment: Comment;
}

export interface Comment {
  text: string;
  author: string;
  position: string;
}

export interface EmailContactRequest {
  ruc: string;
  razon_social: string;
  direccion: string;
  ciudad_pais: string;
  persona_contacto: string;
  telefono: string;
  correo: string;
  mensaje: string;
  producto: string;
}
