import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import OptionsContain from "../components/OptionsContain";
import InputBasic from "../../shared/components/InputBasic.jsx";
import PrimaryButton from "../../shared/components/PrimaryButton.jsx";
import "./RegisterData.css"

export default function RegisterData(){

    const [count,setCount] = useState(0);
    return (
        <form>
            <section className="mainContainer">
                <div className="leftSide">

                    <div className="paymentMethod">
                        <h2>Método de pago</h2>
                        <OptionsContain 
                            options={["Efectivo", "Transferencia"]}
                        />
                    </div>

                    <div className="aditionals">
                        <div className="OptionsContain">
                            <h2>Adicionales</h2>
                            <OptionsContain 
                                options={["Gaseosa", "tocineta"]}
                            />
                        </div>
                    </div>

                    <div className="add-container">
                        <button 
                            type="button"
                            className="plus" 
                            onClick={()=>setCount(prev=>prev+1)}
                        ><FontAwesomeIcon icon={faPlus} />
                        </button>

                        <input type="number" value={count}/>

                        <button 
                            type="button" 
                            className="minus" 
                            onClick={()=>setCount(prev=> prev>0?prev-1:0)}
                        ><FontAwesomeIcon icon={faMinus}/>
                        </button>
                    </div>

                </div>

                <div className="rightSide">
                    <h2>Pago</h2>
                    <div>
                        <p>Cantidad pagada en efectivo</p>
                        <InputBasic 
                            type={'Number'} 
                            placeholder={'$0-$20.000'} 
                            name={'payedWithCash'}
                        />
                    </div>
                    <div>
                        <p>Cantidad pagada con transfarencia</p>
                        <InputBasic 
                            type={'Number'} 
                            placeholder={'$0-$20.000'} 
                            name={'payedWithCash'}
                        />
                    </div>
                </div>

                <div className="Button-register-container">
                    <PrimaryButton 
                        text={'Registrar venta'}
                        type={'submit'}
                    />
                </div>

            </section>
        </form>
    );
}