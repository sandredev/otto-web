import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function ArrowLeft(){
    return(
        <button className="absolute top-6 left-6 text-white p-2">
            <span className="inline-block transition-transform duration-300 hover:-translate-x-1">
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </span>
        </button>
    )
}