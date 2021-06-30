import { useState } from "react";

const Contador = () => {
    const [count, setCount] = useState(0);

    return(
        <>
            <p>Quantos itens deseja?</p>
            <button onClick={()=>setCount(count-1)}>-</button>
            <h1>{count}</h1>
            <button onClick={()=>setCount(count+1)}>+</button>
        </>
    )
}

export default Contador;