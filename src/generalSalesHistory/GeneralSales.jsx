import { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router";
import SalesTable from "../sales/components/SalesTable.jsx";
import ottoLogo from '@/assets/otto-logo.png';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAllSales, getSaleDetails, cancelSale } from '@/lib/services/ventas.js';
import ReceiptModal from "../sales/components/ReceiptModal.jsx";
import Swal from 'sweetalert2';

export default function GeneralSales(){
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ventaDetalle, setVentaDetalle] = useState(null);

    const cargarVentas = useCallback(async () => {
        setLoading(true);
        const result = await getAllSales();

        if (result.success && result.data) {
            const ventasFormateadas = result.data.map(venta => ({
                id_venta: venta.id_venta,
                empleado: venta.usuarios?.nombre_completo || 'N/A',
                cliente: venta.id_cliente || 'Cliente anónimo',
                subtotal: venta.subtotal.toLocaleString('es-CO'),
                descuento: venta.descuento.toLocaleString('es-CO'),
                total: venta.total.toLocaleString('es-CO'),
                fecha: new Date(venta.fecha_venta).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                estado: venta.estado_venta ? '✓ Completada' : '✗ Cancelada'
            }));
            setSales(ventasFormateadas);
        } else {
            Swal.fire('Error', result.error, 'error');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        cargarVentas();
    }, [cargarVentas]);

    const handleVerRecibo = async (idVenta) => {
        setLoading(true);
        const result = await getSaleDetails(idVenta);
        setLoading(false);

        if (result.success) {
            setVentaDetalle(result.data);
        } else {
            Swal.fire('Error', result.error, 'error');
        }
    };

    const handleEliminarRegistro = async (row) => {
        const result = await Swal.fire({
            title: '¿Cancelar esta venta?',
            text: `Se cancelará la venta #${row.id_venta}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No'
        });

        if (!result.isConfirmed) return;

        const cancelResult = await cancelSale(row.id_venta);

        if (cancelResult.success) {
            Swal.fire('Cancelada', 'La venta ha sido cancelada', 'success');
            cargarVentas();
        } else {
            Swal.fire('Error', cancelResult.error || 'No se pudo cancelar la venta', 'error');
        }
    };

    if (loading) {
        return (
            <section className="min-h-screen flex items-center justify-center">
                <p className='text-xl text-gray-600'>Cargando historial...</p>
            </section>
        );
    }

    return(
        <section className="min-h-screen">

            <header className="bg-yellow-otto-light flex items-center justify-center h-[10dvh] text-[clamp(1.2rem,3vw,1.8rem)] text-shadow-md font-bold text-white sticky top-0 z-50 border-b border-b-amber-50">
                <Link to={'/home'} className="absolute left-6">
                    <button className="cursor-pointer">
                        <span className="inline-block transition-transform duration-300 hover:-translate-x-1 cursor-pointer">
                            <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                        </span>
                    </button>
                </Link>  
                Historial
            </header>

            <div className="p-8">
                <div className="flex flex-row text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tighter text-left mb-6">
                    <h1>Historial de ventas histórico</h1>
                </div>

                <div className="flex items-center justify-start w-full h-full">
                    {sales.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center w-full">
                            <h2 className='text-2xl font-bold text-gray-800 mb-4'>No hay ventas</h2>
                            <p className='text-gray-600'>No se han registrado ventas en el sistema</p>
                        </div>
                    ) : (
                        <SalesTable 
                            rowData={sales}
                            onVerRecibo={handleVerRecibo}
                            onEliminarRegistro={handleEliminarRegistro}
                        />
                    )}
                </div>
            </div>

            {ventaDetalle && (
                <ReceiptModal 
                    venta={ventaDetalle}
                    onClose={() => setVentaDetalle(null)}
                />
            )}

            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-no-repeat bg-center opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url(${ottoLogo})`,
                    backgroundSize: 'calc(20vw + 20vh)'
                }}
            />
        </section>
    )
}
