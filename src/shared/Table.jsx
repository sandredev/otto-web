import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

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


*/
export default function Table(){

    const columns = [
        {field:'id_venta'},
        {field:'sandwich'},
        {field:'Gaseosa'},
        {field:'Tocineta'},
        {field:'Efectivo'},
        {field:'Transferencia'},
        {field:'total'}
    ]

    //para conectar con backend
    const [rowData, setRowData] = useState([])

    return(
        <div className="ag-theme-alpine" style={{ height: 300 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columns}
                defaultColDef={{
                    sortable: true,
                    filter: true,
                    resizable: true
                }}
            />
        </div>

    )
}