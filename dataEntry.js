import readlineSync from "readline-sync";
import chalk from "chalk";

/**
 * Usa la terminal para leer el nombre del cliente
 */
export function ingresarCliente() {
  let cliente = readlineSync.question(chalk.yellow("¿Cuál es tu nombre? "));
  return cliente;
}

/**
 * Muestra una lista de productos disponibles y solicita al usuario que seleccione uno.
 *
 * @param {Array<{nombre: string, precio: number, maxGustos: number}>} productos - Lista de productos disponibles para seleccionar.
 * @returns {{nombre: string, precio: number, maxGustos: number}} El producto seleccionado por el usuario.
 */
export function seleccionarProducto(productos) {
  console.log(
    chalk.blue(
      "\nBienvenido heladería 'Los Pelados'! Estos son nuestros productos:\n"
    )
  );
  for (let i = 0; i < productos.length; i++) {
    console.log(
      `${i + 1}) ${productos[i].nombre} $${productos[i].precio} (hasta ${
        productos[i].maxGustos
      } sabores)`
    );
  }
  let productoIndex;
  while (
    productoIndex === undefined ||
    productoIndex < 0 ||
    productoIndex >= productos.length
  ) {
    productoIndex =
      parseInt(
        readlineSync.question(
          `\n${chalk.yellow("¿Qué vas a pedir?")} ${chalk.gray(
            "(Ingresa el número de opción)"
          )} `
        )
      ) - 1;
    if (productoIndex < 0 || productoIndex >= productos.length) {
      console.log(
        chalk.red("Lo siento, no entendí tu respuesta. Probá de nuevo")
      );
    }
  }

  let producto = productos[productoIndex];
  return producto;
}

/**
 * Lee la terminal para permitirle al cliente elegir una cantidad de gustos, acotada por el máximo de gustos disponibles.
 * @param {Number} maxGustos - Máximo de gustos a elegir.
 * @returns {Number} Número de gustos elegidos.
 */
export function seleccionarCantidadGustos(maxGustos) {
  let gustos;
  while (gustos === undefined || gustos < 1 || gustos > maxGustos) {
    gustos = parseInt(
      readlineSync.question(chalk.yellow("¿Cuántos gustos vas a pedir? "))
    );
    if (gustos < 1 || gustos > maxGustos) {
      console.log(
        `Lo siento, solo puedes pedir entre 1 y ${maxGustos} gustos. Probá de nuevo`
      );
    }
  }
  return gustos;
}

/**
 * Permite al usuario seleccionar una cantidad específica de sabores de una lista.
 * Muestra los sabores disponibles y solicita al usuario que ingrese el número correspondiente a cada sabor deseado.
 * Valida la entrada del usuario para asegurar que sea un número válido dentro del rango de opciones.
 *
 * @param {string[]} sabores - Array de nombres de sabores disponibles.
 * @param {number} gustos - Cantidad de sabores que el usuario puede elegir.
 * @returns {string[]} Array con los sabores seleccionados por el usuario.
 */
export function seleccionarSabores(sabores, gustos) {
  let saboresElegidos = [];
  console.log(chalk.blue("\nEstos son nuestros sabores:\n"));
  for (let i = 0; i < sabores.length; i++) {
    console.log(`${i + 1}) ${sabores[i]}`);
  }
  for (let i = 0; i < gustos; i++) {
    let saborIndex;
    while (
      saborIndex === undefined ||
      saborIndex < 0 ||
      saborIndex >= sabores.length
    ) {
      saborIndex =
        parseInt(
          readlineSync.question(chalk.gray("\nIngresa el número de opción: "))
        ) - 1;
      if (saborIndex < 0 || saborIndex >= sabores.length) {
        console.log(
          chalk.red("Lo siento, no entendí tu respuesta. Probá de nuevo")
        );
      }
    }
    console.log(chalk.green(`Elegiste ${sabores[saborIndex]}`));
    saboresElegidos.push(sabores[saborIndex]);
  }
  console.log(
    chalk.blue(
      "\n¡Gracias por comprar en heladería los pelados! Su pedido ha sido registrado"
    )
  );
  return saboresElegidos;
}
