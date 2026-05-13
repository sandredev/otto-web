import ProductManagement from './layout/ProductManagement.jsx';
import AddProduct from './layout/AddProduct.jsx';
import { Link } from 'react-router';
import PrimaryButton from '../shared/components/PrimaryButton.jsx';

export default function AdminView(){

const productList = [
  {
    id: 1,
    name: "Sándwich de Pollo Crispy",
    img: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    id: 2,
    name: "Sándwich Club Triple",
    img: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    id: 3,
    name: "Sándwich de Roast Beef",
    img: "https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    id: 4,
    name: "Grilled Cheese Clásico",
    img: "https://images.pexels.com/photos/3219483/pexels-photo-3219483.jpeg?auto=compress&cs=tinysrgb&w=500"
  },
  {
    id: 5,
    name: "Subway de Vegetales",
    img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=500"
  }
];

  return(
    <section className='w-full max-w-175 m-auto'>

      <div className="font-black text-4xl text-black text-left tracking-tighter mb-8">
        <h1>Manejo de la plataforma</h1>                    
      </div>

      <div className='flex justify-center items-center gap-3 w-full my-8'>

        <Link to={'/sales/history'} className='w-full'>
          <PrimaryButton type={'button'} text={'Ventas Del día'}/>
        </Link>
        
        <Link to={'/generalHistory'} className='w-full'>
          <PrimaryButton type={'button'} text={'Historial de ventas'}/>
        </Link>
      </div>

      <div className=' flex flex-col gap-12'>
        <AddProduct/>
        <ProductManagement products={productList}/>
      </div>

    </section>
  )
}