import { data } from "react-router";
import supabase from "../supabase/client";
import {calculateTotal} from "../utils/funciones.js";



export const createSale = async (datosVenta) => {
    try {
        if (!datosVenta || Object.keys(datosVenta).length === 0) {
            return {
                sucess: false,
                error: "Los datos de la venta no pueden estar vacios."
            };
        }

        if (!datosVenta.id_empleado){
            return {
                sucess: false,
                error: "El id del empleado es requerido para crear una venta."
            };
        }

        const totalCalculado= calculateTotal(
            datosVenta.subtotal || 0,
            datosVenta.descuento || 0
        )

        if (!totalCalculado.sucess) {
                return totalCalculado;
        }

        const {data, error} = await supabase
        .fromto("ventas")
        .insert([{
            id_empleado: datosVenta.id_empleado,
            id_cliente: datosVenta.id_cliente,
            subtotal: datosVenta.subtotal || 0,
            descuento: datosVenta.descuento || 0,
            total: totalCalculado.total || 0,
            notas: datosVenta.notas || "",
            fecha_venta: datosVenta.fecha_venta || new Date().toISOString(),
            estado_venta: datosVenta.estado_venta || true
        }])
        .select();

        if (error) {
            throw error;
        }

        return {
            sucess: true,
            data: data[0],
            message: "Venta creada exitosamente."
        };

    } catch (error) {
        console.error("Error al crear la venta:", error);
        return {
            sucess: false,
            error: error.message || "Error al crear la venta."
        };
    }
};

export const addSaleDetaiil= async (datosDetalle) => {
        try {
            if (!datosDetalle || Object.keys(datosDetalle).length === 0) {
                return {
                    sucess: false,
                    error: "Los datos del detalle de venta no pueden estar vacios."
                };
            }

            if (!datosDetalle.id_venta || !datosDetalle.id_producto || !datosDetalle.cantidad || !datosDetalle.precio_unitario) {
                return {
                    sucess: false, 
                    error: "Campos requeridos"
                };
            }

            const subTotal= datosDettale.cantidad * datosDetalle.precio_unitario;

            const {data, error} = await supabase
            .from("detalle_ventas")
            .insert([{
                id_venta: datosDetalle.id_venta,
                id_producto: datosDetalle.id_producto,
                cantidad: datosDetalle.cantidad,
                precio_unitario: datosDetalle.precio_unitario,
                subtotal: subTotal
            }])
            .select();

            if (error) {
                throw error;
            }

            return  {
                sucess: true,
                data: data[0],
                message: "Detalle de venta agregado exitosamente."
            };

        } catch (error) {
            console.error("Error al agregar el detalle de venta:", error);
            return {
                sucess: false,
                error: error.message || "Error al agregar el detalle de venta."
            };
        }

};


export const getSaleById = async (idVenta) => {
    try {
        if (!idVenta) {
            return {
                sucess: false,
                error: "El id de la venta es requerido para obtener los detalles."
            };
            }
        

        const {data, error} = await supabase
        .from("ventas")
         .select(`
                *,
                usuarios(nombre_completo, nombre_usuario),
                detalles_venta(
                    id_detalle,
                    cantidad,
                    precio_unitario,
                    subtotal,
                    productos(nombre_producto, imagen_producto)
                )
            `).eq("id_venta", idVenta)
            .eq("estado_venta", true)
            .single();

            if (error) {
                throw error;
            }

            if (!data) {
                return {
                    sucess: false,
                    error: "No se encontró la venta con el id proporcionado."
                };
            }

            return {
                sucess: true,
                data: data,
                message: "Venta obtenida exitosamente."
            };

    } catch (error) {
        console.error("Error al obtener la venta:", error);
        return {
            sucess: false,
            error: error.message || "Error al obtener la venta."
        };
    }
        };

export const cancelSale = async (idVenta) => {
    try {
        if (!idVenta) {
            return {
                sucess: false,
                error: "El id de la venta es requerido para cancelar la venta."
            };
        }

        const {data, error} = await supabase
        .from("ventas")
        .update({estado_venta: false})
        .eq("id_venta", idVenta)
        .select();

        if (error) {
            throw error;
        }

        return {
            sucess: true,
            data: data[0],
            message: "Venta cancelada exitosamente."
        };
        } catch (error) {
            console.error("Error al cancelar la venta:", error);
            return {
                sucess: false,
                error: error.message || "Error al cancelar la venta."
            };
        }
    };

export const getAllSales = async (includeCompleted = true) => {
    try {
        let query = supabase
            .from("ventas")
            .select(`
                *,
                usuarios(nombre_completo, nombre_usuario),
                detalles_venta(
                    cantidad,
                    precio_unitario,
                    subtotal,
                    productos(nombre_producto)
                )
            `);

        if (includeCompleted) {
            query = query.eq("estado_venta", true);
        }

        const { data, error } = await query.order("fecha_venta", { ascending: false });

        if (error) throw error;

        return {
            success: true,
            data: data,
            count: data.length
        };

    } catch (error) {
        console.error("Error al obtener ventas:", error);
        return {
            success: false,
            error: error.message || "Error al obtener ventas"
        };
    }
};

export const getSalesByEmployee = async (idEmpleado, includeCompleted = true) => {
    try {
        if (!idEmpleado) {
            return {
                success: false,
                error: "El ID del empleado es requerido"
            };
        }

        let query = supabase
            .from("ventas")
            .select(`
                *,
                usuarios(nombre_completo, nombre_usuario),
                detalles_venta(
                    cantidad,
                    precio_unitario,
                    subtotal,
                    productos(nombre_producto)
                )
            `)
            .eq("id_empleado", idEmpleado);

        if (includeCompleted) {
            query = query.eq("estado_venta", true);
        }

        const { data, error } = await query.order("fecha_venta", { ascending: false });

        if (error) throw error;

        return {
            success: true,
            data: data,
            count: data.length
        };

    } catch (error) {
        console.error("Error al obtener ventas del empleado:", error);
        return {
            success: false,
            error: error.message || "Error al obtener ventas"
        };
    }
};