
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import { useRef } from "react";

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

/*
para poder usarla, instale esto: npm install ag-grid-react ag-grid-community
la etiqueta es AgGridReact

obligatorio colocarlo dentro del div y ponerle este estilo al mismo: className="ag-theme-alpine" style={{ height: 300 }}

Existen props para los columnas, estas nos permiten las siguientes funciones:
    1.editable: true → editar celda
    2.sortable: true → ordenar
    3.filter: true → filtro básico
    4.checkboxSelection: true → checkbox para seleccionar filas
    5.valueFormatter → formatear (ej: $1000)

La prop defaultColDef={ {} } permite setear lo anterior de manera global para evitar repetir todo eso
La prop rowData={} permite el ingreso de las filas
La prop columnDefs={} crea el header de la tabla (nombre de las columnas)

api.exportDataAsCsv() para poder exportar a cvs con useRef

al momento de crear la tabla, cuando esta va cargando las filas, crea un objeto para cada una que normalmente
se le llama params, el cual contiene toda la información la fila, como también nos sirve para obtener el valor
de una celda en especifico.
    1.p.data:Todo el objeto de la fila (si quieremos acceder e cualquier otro campo, debes hacerlo con .field donde
    field es el valor que le colocamos a los otros campos)
    2.p.value: El valor crudo de la celda
    3.p.node: Información del nodo de la fila (metadatos).
*/
export default function Table({rowData, columnDefs}){

    const gridRef = useRef(null);

    const exportDataToCVS= ()=>{
        gridRef.current.api.exportDataAsCsv()
    };

    const exportExcel= async ()=>{
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`ventas-${fechaFormateada.replace(/\//g,'-')}`);

        // Crear columnas dinámicamente
        worksheet.columns = columnDefs.map(col => ({
            header: col.headerName,
            key: col.field,
            width: 20
        }));
        
        rowData.forEach((row)=>{
            worksheet.addRow(row);
        })

        // ... resto del diseño igual ...
    }

    // Usar columnDefs que viene por props, o usar por defecto
    const columns = columnDefs || [
        {headerName: 'ID', field:'id_venta'},
        {headerName:'Empleado', field:'empleado'},
        {headerName: 'Cliente', field:'cliente'},
        {headerName: 'Subtotal', field:'subtotal', valueFormatter: p=> `$${p.value}`},
        {headerName: 'Descuento', field:'descuento', valueFormatter: p=> `$${p.value}`},
        {headerName: 'Hora', field:'hora'},
        {headerName: 'Estado', field:'estado'},
        {headerName: 'Total', field:'total', valueFormatter: p=> `$${p.value}`}
    ]



    return(
        <section className="w-full">
            <div className="ag-theme-alpine rounded-xl overflow-hidden border border-gray-300" 
                style={{ height: 300, width: '100%'  }}
            >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columns}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        resizable: true,
                        flex: 1
                    }}
                    rowHeight={50}
                    headerHeight={55}
                />
            </div>

            <div className="flex mt-6 gap-4 flex-wrap">
                <button 
                    onClick={exportDataToCVS} 
                    className="bg-white flex justity-start items-center border-2 border-gray-300 text-black rounded-xl hover:bg-gray-100 transition px-6 py-3 font-medium"
                >
                    Exportar a CSV
                </button>

                <button 
                    onClick={exportExcel} 
                    className="bg-white flex justify-start items-center gap-2  border-2 border-gray-300 text-black rounded-xl hover:bg-gray-100 transition px-6 py-3 font-medium"
                > 
                    Exportar Excel
                </button>

                <button 
                    className="bg-[#FF2323] flex justify-start items-center gap-2  border-2 border-[#eb2121] text-white rounded-xl hover:bg-[#fe3838] transition px-6 py-3 font-medium"
                > 
                    Eliminar Registro
                </button>
            </div>
        </section>


    )
}