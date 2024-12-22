export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type CartItem = Guitar & {
  quantity: number;
};

//Herencia en types. CartItem = Guitar (ahi va a tomar todas las propiedades de Guitar) & (asperson para agregar otras propiedades) { nombreDeNuevaPropiedad: Propiedad }

//>Para solamente SELECCIONAR algunas propiedades de otro type se usa el UTILITY TYPE:

//PICK : permite elegir ciertos elementos de otros types
//ejemplo: export type CartItem = Pick <Gitar, 'id'| 'name' | 'price'> estamos diciendo pick--> elige de Guitar, id | name| price

//OMIT: es lo contrario... 

//lookUp: es para tomar solo un elemento del type: Guitar['id'] solamente toma el id. Esto es lo que hacemos en useCart para tener un codigo mas corto

//ESTO AYUDA A QUE EL CODIGO SEA MAS CORTO 
