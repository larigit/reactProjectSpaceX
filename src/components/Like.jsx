import { useState } from "react";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const Like = () => {
    const [curtir, setCurtir] = useState(0);
    return(
        <button onClick={()=>setCurtir(curtir+1)}><FavoriteBorderIcon style={{ color: "white"}}/>{curtir}</button>
    )
}

export default Like;