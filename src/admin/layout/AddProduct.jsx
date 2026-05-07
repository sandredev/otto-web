import InputBasic from '../../shared/components/InputBasic.jsx';
import PrimaryButton from '../../shared/components/PrimaryButton.jsx';

export default function AddProduct(){
    return(
        <form>
            <div>
                <input type="file" />
                <PrimaryButton text={'Ingrese la imagen'} type={'button'}/>
            </div>

            <section>
                <InputBasic
                    type={'text'}
                    placeholder={'Ingrese nombre del producto'} 
                    name={'ProductName'}
                />
                <InputBasic 
                    type={'number'}
                    placeholder={'ingrese el precio del producto'} 
                    name={'cost'}
                />
            </section>

            <section>
                <PrimaryButton 
                    type={'submit'} 
                    text={'Ingresar nuevo producto'}
                />
            </section>

        </form>
    )
}