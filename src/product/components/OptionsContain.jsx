import '../layout/RegisterData.css';
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
}