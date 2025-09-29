import fs from "fs";
import {
seleccionarCantidadGustos,
ingresarCliente,
seleccionarProducto,
seleccionarSabores,
} from "./dataEntry.js";

// Cargar sabores y productos
let sabores = JSON.parse(fs.readFileSync("sabores.json", "utf-8"));
let productos = JSON.parse(fs.readFileSync("productos.json", "utf-8"));

// Leer pedidos existentes
let pedidos;
try {
pedidos = JSON.parse(fs.readFileSync("pedidos.json", "utf-8"));
} catch {
pedidos = [];
}

// Ingresar cliente
let cliente = ingresarCliente();

// Elegir producto
let producto = seleccionarProducto(productos);

// Elegir cantidad de gustos
let cantidadGustos = seleccionarCantidadGustos(producto.maxGustos);

// Elegir sabores
let saboresElegidos = seleccionarSabores(sabores, cantidadGustos);

// Crear pedido
let pedido = {
cliente: cliente,
producto: producto.nombre,
sabores: saboresElegidos
};

// Guardar pedido en pedidos.json
pedidos.push(pedido);
fs.writeFileSync("pedidos.json", JSON.stringify(pedidos, null, 2));

console.log("✅ Pedido guardado con éxito!");
console.log(pedido);