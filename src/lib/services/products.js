import { success } from "zod";
import supabase from "../supabase/client";

export const createProduct = async (datosProducto) => {
    try {
        if (!datosProducto || Object.keys(datosProducto).length === 0) {
            return {
                success: false,
                error: "Por favor, proporcione los datos del producto."
            };
        }

        if (!datosProducto.nombre_producto || !datosProducto.precio || !datosProducto.id_categoria) {
            return {
                success: false,
                error: "Los campos nombre_producto, precio e id_categoria son obligatorios."
            };
        }

        const { data, error } = await supabase
            .from("productos")
            .insert([
                {
                    nombre_producto: datosProducto.nombre_producto,
                    descripcion: datosProducto.descripcion || null,
                    precio: datosProducto.precio,
                    imagen_producto: datosProducto.imagen_producto,
                    id_categoria: datosProducto.id_categoria,
                    ingredientes: datosProducto.ingredientes || null,
                    estado: true,
                    disponible: datosProducto.disponible !== false
                }
            ]).select();

        if (error) {
            console.error("Error al crear el producto:", error);
            return {
                success: false,
                error: error.message || "Ocurrió un error al crear el producto."
            };
        }

        return {
            success: true,
            data: data[0],
            message: "Producto creado exitosamente"
        }
    }
    catch (error) {
        console.error("Error al crear el producto:", error);
        return {
            success: false,
            error: error.message || "Ocurrió un error al crear el producto."
        };
    }
};

export const getProducts = async (includeInactive = false) => {
    try {
        let query = supabase
            .from("productos")
            .select("*, categorias(nombre_categoria)");

        if (!includeInactive) {
            query = query.eq("estado", true);
        }

        const { data: existProducts, error: existError } = await query.order("nombre_producto", { ascending: true });

        if (existError) {  // ✅ Cambiar a existError
            throw existError;
        }

        if (!existProducts || existProducts.length === 0) {
            return {
                success: false,
                error: "No se encontraron productos en la base de datos"
            };
        }

        return {
            success: true,
            data: existProducts,
            count: existProducts.length,
            message: "Se han obtenido los productos correctamente"
        };

    } catch (error) {
        console.error(error.message);
        return {
            success: false,
            error: "Ocurrió un error al obtener los productos. Por favor, inténtelo de nuevo."
        };
    }
};

export const getProductById = async (id) => {
    try {

        if (id === undefined || id === null) {
            return {
                sucess: false,
                error: "Por favor, seleccione un ID de producto valido"
            };
        };

        const { data: existProduct, error: existError } = await supabase
            .from("productos")
            .select("*")
            .eq("id_producto", id)

        if (error) {
            throw error;
        }



        if (id <= 0) {
            return {
                sucess: false,
                error: "Ha existido un error a la hora de obtener el producto."
            }
        }

        if (existProduct.length === 0 || existProduct === null) {
            return {
                sucess: false,
                error: "No se encontró el producto en la base de Datos"
            };
        }

        if (existError) {
            return {
                sucess: false,
                error: "Existio un error al obttener el producto en la base de datos"
            };
        }
        return {
            sucess: true,
            data: existProduct,
            message: "Se ha obtenido el producto, correctamente"
        }

    } catch (error) {
        return {
            sucess: false,
            error: "Ocurrió un error al obtener el producto. Por favor, inténtelo de nuevo."
        };
    }
};

export const updateProduct = async (id, datosProducto) => {
    try {


        if (id === undefined || id === null) {
            return {
                sucess: false,
                error: "Por favor, seleccione un ID de producto valido"
            };
        }

        if (datosProducto === undefined || datosProducto === null || Object.keys(datosProducto).length === 0) {
            return {
                sucess: false,
                error: "Por favor, proporcione los datos del producto para actualizar."
            };
        }

        const dataWithTimestamp = {
            ...datosProducto,
            updated_at: new Date().toISOString()
        };




        const { data: existProduct, error: existError } = await supabase
            .from("productos")
            .update(dataWithTimestamp)
            .eq("id_producto", id)
            .select();

        if (error) {
            throw error;
        }

        return {
            sucess: true,
            data: existProduct,
            message: "Producto actualizado exitosamente"
        };

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        return {
            sucess: false,
            error: "Ocurrió un error al actualizar el producto. Por favor, inténtelo de nuevo."
        };
    }
};


export const desactiveProduct = async (id) => {
    try {
        if (id === undefined || id === null) {
            return {
                sucess: false,
                error: "Por favor, seleccione un ID de producto valido"
            };
        }

        const { data: existProduct, error: existError } = await supabase
            .from("productos")
            .update({ estado: false, fecha_ultima_modificacion: new Date().toISOString() })
            .eq("id_producto", id)
            .select();

        if (error) {
            throw error;
        }

        return {
            sucess: true,
            data: existProduct,
            message: "Producto desactivado exitosamente"
        };

    } catch (error) {
        console.error("Error al desactivar el producto:", error);
        return {
            sucess: false,
            error: "Ocurrió un error al desactivar el producto. Por favor, inténtelo de nuevo."
        };
    }
};

export const activeProduct = async (id) => {
    try {
        if (id === undefined || id === null) {
            return {
                sucess: false,
                error: "Por favor, seleccione un ID de producto valido"
            };
        }

        const { data: existProduct, error: existError } = await supabase
            .from("productos")
            .update({ estado: true, fecha_ultima_modificacion: new Date().toISOString() })
            .eq("id_producto", id)
            .select();

        if (error) {
            throw error;
        }

        return {
            sucess: true,
            data: existProduct,
            message: "Producto activado exitosamente"
        };
    } catch (error) {
        console.error("Error al activar el producto:", error);
        return {
            sucess: false,
            error: "Ocurrió un error al activar el producto. Por favor, inténtelo de nuevo."
        };
    }
};

export const getProductsByCategory = async (categoryId, includeInactive = false) => {
    try {
        if (!categoryId) {
            return {
                sucess: false,
                error: "Por favor, seleccione una categoría válida"
            };
        }

        const { data, error } = await supabase
            .from("productos")
            .select("*, categorias(nombre_categoria)")
            .eq("id_categoria", categoryId)
            .eq("estado", true)
            .order("nombre_producto", { ascending: true });

        if (error) {
            throw error;
        }

        if (data.length === 0 || data === null) {
            return {
                sucess: false,
                error: "No se encontraron productos para esta categoría en la base de Datos"
            };
        }

        return {
            sucess: true,
            data: data,
            count: data.length,
            message: "Se han obtenido los productos por categoría, correctamente"
        };

    } catch (error) {
        console.error("Error al obtener los productos por categoría:", error);
        return {
            sucess: false,
            error: "Ocurrió un error al obtener los productos por categoría. Por favor, inténtelo de nuevo."
        };
    }
};

export const getAvailableProducts = async () => {
    try {
        const { data, error } = await supabase
            .from("productos")
            .select("*, categorias(nombre_categoria)")
            .eq("estado", true)
            .eq("disponible", true)
            .order("nombre_producto", { ascending: true });

        if (error) throw error;

        return {
            success: true,
            data: data,
            count: data.length
        };

    } catch (error) {
        console.error("Error al obtener productos disponibles:", error);
        return {
            success: false,
            error: error.message || "Error al obtener productos"
        };
    }
};

export const searchProducts = async (searchTerm) => {
    try {
        if (!searchTerm || searchTerm.trim().length === 0) {
            return {
                success: false,
                error: "El término de búsqueda es requerido"
            };
        }

        const palabras = searchTerm.trim().split(" ");

        let query = supabase
            .from("productos")
            .select("*, categorias(nombre_categoria)")
            .eq("estado", true);

        const condiciones = palabras
            .map(palabra => `nombre_producto.ilike.%${palabra}%,descripcion.ilike.%${palabra}%,ingredientes.ilike.%${palabra}%`)
            .join(";");

        const { data, error } = await query
            .or(condiciones)
            .order("nombre_producto", { ascending: true });

        if (error) throw error;

        return {
            success: true,
            data: data,
            count: data.length,
            searchTerm: searchTerm
        };

    } catch (error) {
        console.error("Error al buscar productos:", error);
        return {
            success: false,
            error: error.message || "Error al buscar productos"
        };
    }
};