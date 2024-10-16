import React, {useState} from "react";
import crossSvg from '../assets/cross.svg';


const NameCard = ({schoolData, onRemove}) => {
    const [isVisible, setIsVisible] = useState(true);
    return ( isVisible ? 
    (
    <div className=" bg-slate-300 flex flex-grow mx-3 rounded-lg flex justify-center px-1">
        <p>{schoolData.name}</p>
        <button onClick={()=>{
            handleRemoveSchool(schoolData.name);
            setIsVisible(false);
            
        }}><img className=" mx-1 w-5" src={crossSvg} alt="close"/></button>
    </div> 
    )
    : null       
    );
}

export default NameCard;