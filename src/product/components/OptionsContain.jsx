import Options from "./Options";

export default function OptionsContain({options}){
    return(
        <div className="OptionsContain">
            {options.map((element,key) => (
                <Options key={key} name={element}/>
            ))};
        </div>
    )
}