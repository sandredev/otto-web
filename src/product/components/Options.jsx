import '../layout/RegisterData.css';

export default function Options({name}){
    return(
        <label>
            <input type="checkbox" name={name} required/>
            {name}
        </label>
    )

}