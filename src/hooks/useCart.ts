import { useState, useEffect, useMemo } from "react";
import { db } from "../data/db";
import type { Guitar, CartItem } from "../types";
export const useCart = () => {
  const inicialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };

  const [data, setData] = useState<Guitar[]>([]);//definimos el type de data inline type y corchetes porque es un array
  const [cart, setCart] = useState(inicialCart); //si hay algo en localStorage entonces ese es el valor inicial sino entonces es un arreglo vacio

  useEffect(() => {
    setData(db);
  }, []);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item:Guitar) => {
    const itemExists = cart.findIndex(el => item.id === el.id);
    if (itemExists === -1) {
      //agregamos al carrito
      const newItem: CartItem = {...item, quantity : 1}
      setCart([...cart, newItem]);
    } else {
      const updatedCart = [...cart];

      //actualizamos el carrito
      if (updatedCart[itemExists].quantity >= MAX_ITEMS) return;

      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    }
  };

  //Remove elements from cart
  const removeFromCart = (id: Guitar['id']) => {
    setCart(pervCart => pervCart.filter(guitar => guitar.id !== id));
  };

  //Increase elements from cart
  const increaseElements = (id: Guitar['id']) => {
    const updatedCart = cart.map(item => {
      if (item.id == id && item.quantity < MAX_ITEMS) {
        //creamos un nuevo objeto item con lo previo y modificamos la propiedad cantidad
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  //Decrease Elements
  const decreaseElements = (id: Guitar['id']) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const clearCart = () => setCart([]);

   //State derivado: sacamos logica del template. El valor de la funcion lo evalua en el ternario del template
   const isEmpty = useMemo(() => cart.length === 0, [cart]);
   const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0), [cart]);
 
   //UseMemo se usa para mejorar el perfomance de la app. Evita tener que llamar a una funcion cada vez que se monta la app como en el caso actual de isEmpty() y CartTotal(). Cuando usamos useMemo ya no mandamos llamar a las funciones dentro del template sino que se ejecutan segun el array de dependencias (deps)
 

  return {
    cart,
    addToCart,
    removeFromCart,
    decreaseElements,
    increaseElements,
    clearCart,
    data,
    isEmpty,
    cartTotal
  };
};
