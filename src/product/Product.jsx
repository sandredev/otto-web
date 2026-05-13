import { useParams } from "react-router";
import HeadSection from "./layout/HeadSection.jsx";
import RegisterData from "./layout/RegisterData.jsx";

export default function Product({img, productName}){
    const {productId} = useParams();
    return(
        <>
            <HeadSection img={img} productName={productName}/>
            <RegisterData/>
        </>
    )
}