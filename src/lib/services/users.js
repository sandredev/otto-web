import supabase from "../supabase/client";

export const createUser = async (datosUsuarios) => {
    try {
        const { data, error } = await supabase.from("usuarios").insert([datosUsuarios]);

        if (error) throw error;

        return {
            sucess: true,
            data: data[0]
        };

    }catch (error) {
        return {
            sucess: false,
            error: error.message
        }
    }

};


export const getUserById= async (id) => {
    try {
        const { data, error } = await supabase.from("usuarios").select("*").eq("id", id).single();

        if (error) throw error;

        return {
            sucess: true,
            empleados: data
        }; 
    } catch (error) {
        return {
            sucess: false,
            error: error.message
        };
    }
};


export const updateUser = async (id, datosActualizados) => {
    try {
        const { data, error } = await supabase.from("usuarios").update(datosActualizados).eq("id", id);

        if (error) throw error;

        return {
            sucess: true,
            data: data[0]
        };
    } catch (error) {
        return {
            sucess: false,
            error: error.message
        };
    }
};

export const deleteLogicUser = async (id) => {
    try {
        const { data, error } = await supabase.from("usuarios").update({estado: false}).eq("id", id);

        if (error) throw error;

        return {
            sucess: true,
            message: "Usuario desactivado exitosamente"
        };
    } catch (error) {
        return {
            sucess: false,
            error: error.message
        };
    }
};
