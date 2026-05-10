import ProductCard from './ProductCard'

const productsTemplate = [{
    name: "Sandwich de pollo",
    img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Sandwich de carne",
    img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Sandwich de cerdo",
    img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Sandwich mixto",
    img: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Te Hatsu",
    img: "https://images.unsplash.com/photo-1776146398835-2ec949915027?q=80&w=1079&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Botella de agua",
    img: "https://images.unsplash.com/photo-1616118132534-381148898bb4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    name: "Coca Cola 400ml",
    img: "https://images.unsplash.com/photo-1648569883125-d01072540b4c?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},]

export default function RegisterSales({products = productsTemplate, isAdmin = false}) {
    return (
        <div className='grid grid-cols-[repeat(auto-fill,minmax(clamp(100px,20vw,300px),1fr))] gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
            {products.map(product => <ProductCard product={product} key={product.name} isAdmin={isAdmin}/>)}
        </div>
    );
}