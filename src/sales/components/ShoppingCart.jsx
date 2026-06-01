import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAllPaymentMethods } from '@/lib/services/pagos.js';
import { registrarVentaCompleta } from '@/lib/services/ventas.js';
import { useAuth } from '../../lib/hooks/useAuth.js';
import alertPop from '@/utils/alertPop.js';

export default function ShoppingCart({ carrito, onAumentar, onDisminuir, onEliminar , onRegistroExitoso}) {
    const [descuento, setDescuento] = useState(0);
    const [pagos, setPagos] = useState([]);
    const [metodosPago, setMetodosPago] = useState([]);
    const [metodoPagoTemp, setMetodoPagoTemp] = useState('');
    const [montoPagoTemp, setMontoPagoTemp] = useState('');
    const [loading, setLoading] = useState(false);
    const { userData } = useAuth();
    useEffect(() => {
        if (carrito.length === 0) return;
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        setMontoPagoTemp(String(total));
    }, [carrito]);

    // Cargar métodos de pago
    useEffect(() => {
        const cargarMetodos = async () => {
            const result = await getAllPaymentMethods(false);
            if (result.success) {
                setMetodosPago(result.data);
                if (result.data.length > 0) {
                    setMetodoPagoTemp(result.data[0].id_metodo);
                }
            }
        };
        cargarMetodos();
    }, []);


    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const total = subtotal - descuento;
    const totalPagado = pagos.reduce((sum, pago) => sum + pago.monto, 0);
    const pendiente = total - totalPagado;

    // Agregar pago
    const agregarPago = async () => {
        const monto = parseFloat(montoPagoTemp);

        if (!montoPagoTemp || monto <= 0) {
            await alertPop('ERROR', 'Ingresa un monto válido', 'error', 'Continuar');
            return;
        }

        if (monto > pendiente) {
            await alertPop('ERROR', `El monto no puede exceder $${pendiente.toLocaleString('es-CO')}`, 'error', 'Continuar');
            return;
        }

        const metodo = metodosPago.find(m => m.id_metodo == metodoPagoTemp);

        setPagos([
            ...pagos,
            {
                id: Date.now(),
                id_metodo_pago: parseInt(metodoPagoTemp),
                nombre_metodo: metodo.nombre_metodo,
                monto: monto
            }
        ]);

        setMontoPagoTemp('');
    };

    // Eliminar pago
    const eliminarPago = (id) => {
        setPagos(pagos.filter(pago => pago.id !== id));
    };

    const handleRegistrarVenta = async () => {
        if (carrito.length === 0) {
            await alertPop('ERROR', 'El carrito está vacío', 'error', 'Continuar');
            return;
        }

        if (pendiente > 0) {
            await alertPop('ERROR', `Falta pagar $${pendiente.toLocaleString('es-CO')}`, 'error', 'Continuar');
            return;
        }

        setLoading(true);

        // Preparar datos de la venta
        const datosVenta = {
            id_empleado: userData.id_usuario,
            id_cliente: null,
            subtotal: subtotal,
            descuento: descuento,
            total: total,
            notas: null
        };

        // Preparar detalles
        const detalles = carrito.map(item => ({
            id_producto: item.id,
            cantidad: item.cantidad,
            precio_unitario: item.precio,
            subtotal: item.precio * item.cantidad
        }));

        // Preparar pagos (sin el id temporal)
        const pagosParaGuardar = pagos.map(({ id, nombre_metodo, ...rest }) => rest);

        // Registrar venta
        const result = await registrarVentaCompleta(datosVenta, detalles, pagosParaGuardar);
        setLoading(false);

        if (result.success) {
            await alertPop('ÉXITO', 'Venta registrada correctamente', 'success');
            // Limpiar
            setPagos([]);
            setDescuento(0);
            onRegistroExitoso();
        } else {
            await alertPop('ERROR', result.error, 'error');
        }
    };

    return (
        <div className='bg-white rounded-lg shadow-lg p-6 sticky top-0 h-fit max-h-[85vh] overflow-y-auto'>
            {/* Título */}
            <h2 className='text-2xl font-bold text-gray-900 mb-6 border-b pb-4'>
                Factura
            </h2>

            {/* Lista de productos */}
            {carrito.length === 0 ? (
                <div className='text-center py-8'>
                    <p className='text-gray-500'>No hay productos en el carrito</p>
                </div>
            ) : (
                <div className='space-y-3 mb-6 max-h-40 overflow-y-auto'>
                    {carrito.map(item => (
                        <div 
                            key={item.id}
                            className='bg-gray-50 p-3 rounded-lg border border-gray-200'
                        >
                            <div className='flex justify-between items-start mb-2'>
                                <div className='flex-1'>
                                    <h4 className='font-semibold text-sm text-gray-900'>
                                        {item.name}
                                    </h4>
                                    <p className='text-xs text-gray-600'>
                                        ${item.precio.toLocaleString('es-CO')}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onEliminar(item.id)}
                                    className='cursor-pointer text-red-500 hover:text-red-700'
                                >
                                    <FontAwesomeIcon icon={faTrash} size='sm' />
                                </button>
                            </div>

                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <button
                                        onClick={() => onDisminuir(item.id)}
                                        className='cursor-pointer bg-yellow-otto text-white p-1 rounded hover:brightness-95'
                                    >
                                        <FontAwesomeIcon icon={faMinus} size='xs' />
                                    </button>
                                    <span className='px-3 py-1 bg-gray-200 rounded text-sm font-semibold'>
                                        {item.cantidad}
                                    </span>
                                    <button
                                        onClick={() => onAumentar(item.id)}
                                        className='cursor-pointer bg-yellow-otto text-white p-1 rounded hover:brightness-95'
                                    >
                                        <FontAwesomeIcon icon={faPlus} size='xs' />
                                    </button>
                                </div>
                                <p className='font-semibold text-gray-900 text-sm'>
                                    ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Descuento */}
            {carrito.length > 0 && (
                <div className='mb-4 border-t pt-4'>
                    <label className='text-sm font-medium text-gray-700 mb-2 block'>
                        Descuento
                    </label>
                    <input
                        type='number'
                        value={descuento}
                        onChange={(e) => {
                            const value = e.target.value;

                            if (value === '') {
                                setDescuento('');
                                return;
                            }

                            setDescuento(Math.max(0, parseFloat(value) || 0));
                        }}
                        placeholder='0'
                        className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm'
                        min='0'
                        max={subtotal}
                    />
                </div>
            )}

            {/* Totales */}
            {carrito.length > 0 && (
                <div className='space-y-2 border-t pt-4 mb-6'>
                    <div className='flex justify-between text-sm'>
                        <span className='text-gray-600'>Subtotal:</span>
                        <span className='font-semibold'>${subtotal.toLocaleString('es-CO')}</span>
                    </div>
                    {descuento > 0 && (
                        <div className='flex justify-between text-sm text-red-600'>
                            <span>Descuento:</span>
                            <span>-${descuento.toLocaleString('es-CO')}</span>
                        </div>
                    )}
                    <div className='flex justify-between text-lg font-bold border-t pt-2'>
                        <span>Total:</span>
                        <span className='text-yellow-otto'>${total.toLocaleString('es-CO')}</span>
                    </div>
                </div>
            )}

            {/* Sección de Pagos */}
            {carrito.length > 0 && (
                <div className='border-t pt-4 mb-6'>
                    <h3 className='font-bold text-sm mb-3'>Pagos</h3>

                    {/* Agregar pago */}
                    <div className='space-y-2 mb-4 bg-gray-50 p-3 rounded-lg'>
                        <select
                            value={metodoPagoTemp}
                            onChange={(e) => setMetodoPagoTemp(e.target.value)}
                            className='cursor-pointer w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500'
                        >
                            <option value="">Selecciona método de pago</option>
                            {metodosPago.map(metodo => (
                                <option key={metodo.id_metodo} value={metodo.id_metodo}>
                                    {metodo.nombre_metodo}
                                </option>
                            ))}
                        </select>

                        <input
                            type='number'
                            value={montoPagoTemp}
                            onChange={(e) => setMontoPagoTemp(e.target.value)}
                            placeholder={`Ingresa monto (Pendiente: $${pendiente.toLocaleString('es-CO')})`}
                            className='w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            min='0'
                        />

                        <button
                            onClick={agregarPago}
                            className='cursor-pointer w-full bg-yellow-otto text-white py-1 rounded text-sm font-semibold hover:brightness-95'
                        >
                            Agregar Pago
                        </button>
                    </div>

                    {/* Lista de pagos realizados */}
                    {pagos.length > 0 && (
                        <div className='space-y-2 mb-4'>
                            {pagos.map(pago => (
                                <div 
                                    key={pago.id}
                                    className='flex justify-between items-center bg-green-50 p-2 rounded border border-green-200'
                                >
                                    <div className='text-sm'>
                                        <p className='font-semibold text-gray-900'>
                                            {pago.nombre_metodo}
                                        </p>
                                        <p className='text-green-700'>
                                            ${pago.monto.toLocaleString('es-CO')}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => eliminarPago(pago.id)}
                                        className='cursor-pointer text-red-500 hover:text-red-700'
                                    >
                                        <FontAwesomeIcon icon={faTrash} size='sm' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Resumen de pagos */}
                    <div className='space-y-1 bg-gray-100 p-2 rounded text-sm'>
                        <div className='flex justify-between'>
                            <span>Total pagado:</span>
                            <span className='font-semibold'>${totalPagado.toLocaleString('es-CO')}</span>
                        </div>
                        <div className={`flex justify-between font-bold ${pendiente <= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                            <span>Pendiente:</span>
                            <span>${Math.max(0, pendiente).toLocaleString('es-CO')}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Botón registrar */}
            <button
                onClick={handleRegistrarVenta}
                disabled={carrito.length === 0 || pendiente > 0 || loading}
                className='cursor-pointer w-full bg-yellow-otto text-white font-bold py-3 rounded-lg hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
            >
                {loading 
                    ? 'Registrando...' 
                    : pendiente > 0 
                        ? `Falta pagar $${pendiente.toLocaleString('es-CO')}` 
                        : 'Registrar Venta'
                }
            </button>
        </div>
    );
}