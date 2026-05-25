import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);

import { useRef } from "react";

import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

export default function Table({rowData, columnDefs, onEliminarRegistro}){

    const gridRef = useRef(null);

    const exportDataToCVS= ()=>{
        gridRef.current.api.exportDataAsCsv()
    };

    const exportExcel= async ()=>{
        const fecha = new Date();
        const fechaFormateada = fecha.toLocaleDateString();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(`ventas-${fechaFormateada.replace(/\//g,'-')}`);

        worksheet.columns = columnDefs.map(col => ({
            header: col.headerName,
            key: col.field,
            width: 20
        }));
        
        rowData.forEach((row)=>{
            worksheet.addRow(row);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `ventas-${fechaFormateada.replace(/\//g,'-')}.xlsx`);
    };

    const handleEliminarRegistro = () => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        if (selectedRows.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Selecciona un registro',
                text: 'Por favor, selecciona la fila que deseas eliminar.',
                confirmButtonText: 'OK'
            });
            return;
        }
        onEliminarRegistro?.(selectedRows[0]);
    };

    const columns = columnDefs || [
        {headerName: 'ID', field:'id_venta'},
        {headerName:'Empleado', field:'empleado'},
        {headerName: 'Cliente', field:'cliente'},
        {headerName: 'Subtotal', field:'subtotal', valueFormatter: p=> `$${p.value}`},
        {headerName: 'Descuento', field:'descuento', valueFormatter: p=> `$${p.value}`},
        {headerName: 'Hora', field:'hora'},
        {headerName: 'Estado', field:'estado'},
        {headerName: 'Total', field:'total', valueFormatter: p=> `$${p.value}`}
    ];

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
                    selection={onEliminarRegistro ? { mode: 'singleRow' } : undefined}
                />
            </div>

            <div className="flex mt-6 gap-4 flex-wrap">
                <button 
                    onClick={exportDataToCVS} 
                    className="bg-white flex justity-start items-center border-2 cursor-pointer border-gray-300 text-black rounded-xl hover:bg-gray-100 transition px-6 py-3 font-medium"
                >
                    Exportar a CSV
                </button>

                <button 
                    onClick={exportExcel} 
                    className="bg-white flex justify-start items-center gap-2  border-2 border-gray-300 text-black rounded-xl hover:bg-gray-100 cursor-pointer transition px-6 py-3 font-medium"
                > 
                    Exportar Excel
                </button>

                {onEliminarRegistro && (
                    <button 
                        onClick={handleEliminarRegistro}
                        className="bg-[#FF2323] flex justify-start items-center gap-2  border-2 border-[#eb2121] text-white rounded-xl hover:bg-[#fe3838] cursor-pointer transition px-6 py-3 font-medium"
                    > 
                        Eliminar Registro
                    </button>
                )}
            </div>
        </section>
    )
}
