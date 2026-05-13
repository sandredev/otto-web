import '../layout/RegisterData.css';
<<<<<<< HEAD

export default function Options({name}){
    return(
        <label>
            <input type="checkbox" name={name} required/>
            {name}
        </label>
    )

=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

export default function Options({ name, mode = "counter", value, onChange }) {

    if (mode === "selector") {
        return (
            <label className="option-item">
                <input
                    type="checkbox"
                    name={name}
                    className="accent-black text-[15px]"
                    onChange={(e) => onChange(name, e.target.checked)}
                />
                {name}
            </label>
        );
    }

    return (
        <div className="option-item">
            <span className="option-label">{name}</span>
            <div className="add-container">
                <button
                    type="button"
                    className="minus"
                    onClick={() => onChange(name, Math.max(0, value - 1))}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>

                <input type="number" readOnly value={value} />

                <button
                    type="button"
                    className="plus"
                    onClick={() => onChange(name, value + 1)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>
    );
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6
}