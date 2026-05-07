import Title from './layout/Title.jsx';
import ProductManagement from './layout/ProductManagement.jsx';
import AddProduct from './layout/AddProduct.jsx';

export default function AdminView({productList}){
    return(
        <section>
            <Title/>
            <AddProduct/>
            <ProductManagement products={productList}/>
        </section>
    )
}