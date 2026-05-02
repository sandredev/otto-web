import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

export default function HeadSection({img,productName}){
    return(
        <section>
            <div>
                <FontAwesomeIcon icon={faArrowLeft} />
            </div>
            <div>
                <img src={img} alt={productName} />
            </div>
            <div>
                <h1>{productName}</h1>
            </div>
        </section>
    )
}