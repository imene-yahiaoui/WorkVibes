import "./style.css";
import { FcGallery } from "react-icons/fc";
import { useState } from "react";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

function Post() {
    const [imageUrl, setImageUrl] = useState( );
    const infos = useSelector(login);
    console.log(infos);
    const imageUser = infos?.payload.user?.user?.user.imageUrl;
    console.log(imageUser);
    const handleFile = async (e) => {
        e.preventDefault();
    
        const file = e.target.files[0];
        setImageUrl(URL.createObjectURL(file));
    }
    function deleteImg (){
        setImageUrl();
    }
    const cover = "../images/user.png";
  return (
    <div className="post">
<figure className="post_continer">
{imageUser? (
          <img className="photoUser" alt="profile" src={imageUser} />
        ) : (
            <img className="photoUser"  src={cover} alt="user"  />
        )}

<figcaption>
<input className="post_inputText"> 
</input >
</figcaption>
</figure>


<div className="post_photo" style={{ display: imageUrl ? "block" : "none" }}>
    <button className="post_icon" onClick={deleteImg}>
    <AiOutlineClose/>
    </button>
  <img src={imageUrl} alt="post" />
</div>
<div className ="post_btn">
<div className="post_icon-container">
            <FcGallery />
           
          <input
            className="post_input"
            type="file"
            accept="image/*"
            name="imageUrl"
            onChange={handleFile}
          />
        </div>

        <button> sendd </button>
        </div> 
    </div>
  );


}

export default Post;
