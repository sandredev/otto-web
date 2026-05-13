import Table from "../../shared/Table/Table";

export default function diarySales(){
    /*Esto solo es de prueba*/
    const sales = [
        {
            id_venta: 1,
            sandwich: 'Hamburguesa',
            gaseosa: 'Coca Cola',
            tocineta: true,
            efectivo: 25000,
            transferencia: 0,
            fecha: '2026-05-07',
            total: 25000
        },
        {
            id_venta: 2,
            sandwich: 'Perro Caliente',
            gaseosa: 'Pepsi',
            tocineta: false,
            efectivo: 0,
            transferencia: 18000,
            fecha: '2026-05-07',
            total: 18000
        }
    ];
    /*Esto solo es de prueba*/

    
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric'
    })

    return(
        <section className="bg-[--color-graywhite] min-h-full p-8">

            <div className=" flex flex-row text-4xl font-black text-black tracking-tighter text-left mb-6">
                <h1>{`Ventas del ${fechaFormateada}`}</h1>
            </div>

            <div className="flex items-center justify-start w-full h-full">
                <Table
                    rowData={sales}
                />
            </div>
        </section>
    )
}