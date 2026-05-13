import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import OptionsContain from "../components/OptionsContain";
import InputBasic from "../../shared/components/InputBasic.jsx";
import PrimaryButton from "../../shared/components/PrimaryButton.jsx";
import alertPop from "../../utils/alertPop.js";
import "./RegisterData.css";
import { useNavigate } from "react-router";

const ADDITIONALS = ["Gaseosa", "Tocineta"];
const PAYMENT_METHODS = ["Efectivo", "Transferencia"];

const initialAdditionals = () =>
    Object.fromEntries(ADDITIONALS.map((a) => [a, 0]));

const initialPayments = () =>
    Object.fromEntries(PAYMENT_METHODS.map((p) => [p, false]));

export default function RegisterData() {
    const [sandwichCount, setSandwichCount] = useState(0);
    const [additionals, setAdditionals] = useState(initialAdditionals);
    const [payments, setPayments] = useState(initialPayments);
    const navigate = useNavigate();
    const formRef = useRef(null);

    const handleAdditionalChange = (name, value) => {
        setAdditionals((prev) => ({ ...prev, [name]: value }));
    };

    const handlePaymentChange = (name, value) => {
        setPayments((prev) => ({ ...prev, [name]: Number(value) }));
    };

    const handleReset = () => {
        formRef.current.reset();
        setSandwichCount(0);
        setAdditionals(initialAdditionals());
        setPayments(initialPayments());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await alertPop(
                "VENTA EXITOSA",
                "proceso realizado satisfactoriamente",
                "success",
                "continuar"
            );
            setSandwichCount(0);
            setAdditionals(initialAdditionals());
            setPayments(initialPayments());

            if (result.isConfirmed) {
                navigate("/sales");
            }
        } catch (error) {
            await alertPop(
                "ERROR AL REGISTRAR",
                "No se pudo procesar la venta. Inténtalo de nuevo.",
                "error",
                "Cerrar"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            <section className="mainContainer">
                <div className="leftSide">

                    <div className="paymentMethod">
                        <h2 className="font-bold text-[15px]">Método de pago</h2>
                        <OptionsContain
                            options={PAYMENT_METHODS}
                            quantities={payments}
                            onQuantityChange={handlePaymentChange}
                            mode="selector"
                        />
                    </div>

                    <div className="aditionals">
                        <h2 className="font-bold text-[15px]">Adicionales</h2>
                        <OptionsContain
                            options={ADDITIONALS}
                            quantities={additionals}
                            onQuantityChange={handleAdditionalChange}
                        />
                    </div>

                    <div>
                        <h2>Cantidad del producto</h2>
                        <div className="add-container">
                            <button
                                type="button"
                                className="minus"
                                onClick={() => setSandwichCount((prev) => (prev > 0 ? prev - 1 : 0))}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </button>

                            <input type="number" readOnly value={sandwichCount} />

                            <button
                                type="button"
                                className="plus"
                                onClick={() => setSandwichCount((prev) => prev + 1)}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>


                </div>

                <div className="rightSide">
                    <h2>Pago</h2>
                    <div>
                        <p>Cantidad pagada en efectivo</p>
                        <InputBasic
                            type={"Number"}
                            placeholder={"$0-$20.000"}
                            name={"payedWithCash"}
                            onChange={(e) => handlePaymentChange("Efectivo", e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Cantidad pagada con transferencia</p>
                        <InputBasic
                            type={"Number"}
                            placeholder={"$0-$20.000"}
                            name={"payedWithTransfer"}
                            onChange={(e) => handlePaymentChange("Transferencia", e.target.value)}
                        />
                    </div>
                </div>

                <div className="Button-register-container">
                    <PrimaryButton text={"Registrar venta"} type={"submit"} />
                    <PrimaryButton text={"Reiniciar datos"} type={"button"} onClick={handleReset} />
                </div>
            </section>
        </form>
    );
}