<<<<<<< HEAD
=======
import { useParams } from "react-router";
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6
import HeadSection from "./layout/HeadSection.jsx";
import RegisterData from "./layout/RegisterData.jsx";

export default function Product({img, productName}){
<<<<<<< HEAD
=======
    const {productId} = useParams();
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6
    return(
        <>
            <HeadSection img={img} productName={productName}/>
            <RegisterData/>
        </>
    )
}