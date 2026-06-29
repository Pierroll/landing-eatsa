import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), "data");
const productosFile = path.join(dataDir, "productos.json");
async function getProductos() {
  try {
    const data = await fs.readFile(productosFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
    throw err;
  }
}
async function saveProducto(producto) {
  const productos = await getProductos();
  const index = productos.findIndex((p) => p.id === producto.id);
  if (index >= 0) {
    productos[index] = producto;
  } else {
    productos.push(producto);
  }
  await fs.writeFile(productosFile, JSON.stringify(productos, null, 2), "utf-8");
}

export { getProductos as g, saveProducto as s };
