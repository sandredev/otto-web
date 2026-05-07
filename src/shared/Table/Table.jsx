
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
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
*/
export default function Table({rowData}){

    const gridRef = useRef(null);

    const exportDataToCVS= ()=>{
        gridRef.current.api.exportDataAsCsv()
    };

    const exportExcel= async ()=>{

        /*Esto solo es para poner la fecha en la hoja*/
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString();

        const workbook = new ExcelJS.workbook();
        const worksheet = workbook.addWorksheet(`ventas-${fechaFormateada}`);

        worksheet.columns = [
            { header: 'ID Venta', key: 'id_venta', width: 20 },
            { header: 'Sandwich', key: 'sandwich', width: 20 },
            { header: 'Gaseosa', key: 'gaseosa', width: 20 },
            { header: 'Tocineta', key: 'tocineta', width: 20 },
            { header: 'Efectivo', key: 'efectivo', width: 20 },
            { header: 'Transferencia', key: 'transferencia', width: 20 },
            { header: 'Fecha', key: 'fecha', width: 20 },
            { header: 'Total', key: 'total', width: 20 }
        ];
        
        rowData.forEach((row)=>{
            worksheet.addRow(row);
        })

        const buffer = await workbook.xlsx.writeBuffer();

        const blob = new Blob(
            [buffer],
            {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        );

        saveAs(blob, `ventas-${fechaFormateada}.xlsx`);



        /*diseño de la tabla en excel*/
        worksheet.getRow(1).eachCell((cell) => {

            cell.font = {
                bold: true,
                color: { argb: 'FFFFFF' }
            };

            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE7B901' }
            };

            cell.alignment = {
                horizontal: 'center'
            };
        });

        // formato  de la moneda
        worksheet.getColumn('D').numFmt = '$#,##0';

        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        //filtros
        worksheet.autoFilter= {from: 'A1', to:'H1'};
    }

    const columns = [
        {field:'id_venta'},
        {field:'sandwich'},
        {field:'gaseosa'},
        {field:'tocineta'},
        {field:'efectivo'},
        {field:'transferencia'},
        {field:'fecha'},
        {field:'total'}
    ]

    return(
        <section>
            <div className="ag-theme-alpine" style={{ height: 300, width: '100%'  }}>
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
                />
            </div>

            <div>
                <button onClick={exportDataToCVS}>Exportar a CSV</button>
                <button onClick={exportExcel}> Exportar Excel</button>
            </div>
        </section>


    )
}