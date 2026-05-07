import InputBasic from "../../shared/components/InputBasic";
import PrimaryButton from "../../shared/components/PrimaryButton";

export default function EditProduct(product){
    return(
        <section>
            <form>
                <section>
                    <img src={product.img} alt={product.name} />
                    <input type="file" />
                    <PrimaryButton text={'Actualizar foto'} type={'button'}/>
                </section>

                <section>
                    <InputBasic
                        type={'text'}
                        placeholder={'Ingrese el nuevo nombre'} 
                        name={'ProductName'}
                        defaultValue={product.name}
                    />
                    <InputBasic 
                        type={'number'}
                        placeholder={'ingrese el nuevo precio'} 
                        name={'cost'}
                        defaultValue={product.cost}
                    />
                </section>

                <section>
                    <PrimaryButton 
                        type={'submit'} 
                        text={'Actualizar producto'}
                    />
                </section>

            </form>
        </section>
    )
}