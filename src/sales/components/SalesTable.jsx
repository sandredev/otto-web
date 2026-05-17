import Table from "@/shared/table/Table";

export default function SalesTable({rowData, onVerRecibo}){
    const columnDefs = [
        {
            headerName: 'ID', 
            field:'id_venta',
            cellRenderer: (params) => (
                <button
                    onClick={() => onVerRecibo(params.value)}
                    className='text-blue-600 hover:text-blue-800 font-bold hover:underline'
                >
                    Ver #{params.value}
                </button>
            )
        },
        {headerName:'Empleado', field:'empleado'},
        {headerName: 'Cliente', field:'cliente'},
        {headerName: 'Subtotal', field:'subtotal'},
        {headerName: 'Descuento', field:'descuento'},
        {headerName: 'Fecha', field:'fecha'},
        {headerName: 'Estado', field:'estado'},
        {headerName: 'Total', field:'total'}
    ];

    return <Table rowData={rowData} columnDefs={columnDefs} />;
}