import "./style.css";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";

function Like() {





    return(
        <div className="likeContiner">
            <div className="like">
           <AiFillLike color='green'/> 
           <p> 2 </p>
           </div>
           <div className="like">
            <AiFillDislike color='red'/>
            <p> 29 </p>
            </div>
            </div>
            )

    }

export default Like 