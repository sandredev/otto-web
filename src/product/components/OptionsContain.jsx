import '../layout/RegisterData.css';
<<<<<<< HEAD

import Options from "./Options";

export default function OptionsContain({options}){
    return(
        <div className="OptionsContain">
            {options.map((element,key) => (
                <Options key={key} name={element}/>
            ))};
        </div>
    )
=======
import Options from "./Options";

export default function OptionsContain({ options, quantities, onQuantityChange, mode = "counter" }) {
    return (
        <div className="OptionsContain">
            {options.map((element, key) => (
                <Options
                    key={key}
                    name={element}
                    mode={mode}
                    value={quantities[element] ?? 0}
                    onChange={onQuantityChange}
                />
            ))}
        </div>
    );
>>>>>>> ad14cd14bb79c261220ddfab54334ca6b77b01e6
}