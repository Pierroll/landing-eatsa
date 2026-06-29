import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const productosFile = path.join(dataDir, 'productos.json');

export interface Producto {
  id: string;
  name: string;
  tag: string;
  image: string;
  attributes: string[]; // e.g. ["Orgánico", "Fair Trade"]
  specs: { label: string; value: string }[]; // e.g. [{ label: "Humedad", value: "7%" }]
  status: 'activo' | 'inactivo';
}

export async function getProductos(): Promise<Producto[]> {
  try {
    const data = await fs.readFile(productosFile, 'utf-8');
    return JSON.parse(data);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

export async function getProductoById(id: string): Promise<Producto | null> {
  const productos = await getProductos();
  return productos.find(p => p.id === id) || null;
}

export async function saveProducto(producto: Producto): Promise<void> {
  const productos = await getProductos();
  const index = productos.findIndex(p => p.id === producto.id);
  
  if (index >= 0) {
    productos[index] = producto;
  } else {
    productos.push(producto);
  }

  // Ensure data dir exists
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(productosFile, JSON.stringify(productos, null, 2), 'utf-8');
}

export async function deleteProducto(id: string): Promise<void> {
  const productos = await getProductos();
  const filtrados = productos.filter(p => p.id !== id);
  await fs.writeFile(productosFile, JSON.stringify(filtrados, null, 2), 'utf-8');
}
