import HeadSection from "./layout/HeadSection.jsx";
import RegisterData from "./layout/RegisterData.jsx";

export default function Product({img, productName}){
    return(
        <main>
            <HeadSection img={img} productName={productName}/>
            <RegisterData/>
        </main>
    )
}