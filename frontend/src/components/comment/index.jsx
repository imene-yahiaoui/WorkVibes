import "./style.css";
 
import { useState } from "react";
import { login } from "../../helpers/features/userSlice.js";
import { useSelector } from "react-redux";
import { LuSend} from 'react-icons/lu';


function Comment({idComment}) {
 
  const [comment, setComment] = useState("");
 
  const infos = useSelector(login);
  console.log(infos);
  const imageUser = infos?.payload.user?.user?.user.imageUrl;

 
  const token = localStorage.getItem("token");
console.log("comment",comment)
  const sendComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();

   
      formData.append("comment", comment);
    

    const commentPost = await fetch(`  http://localhost:3000/api/comment/${idComment}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
    
      },
      body: (formData),
    });

    if (commentPost.status === 201) {
      alert("The changes have been successfully saved");
      setComment("");
   
    }
  };

  const cover = "../images/user.png";

  return (
 
      <form method="post" className="comment" encType="multipart/form-data">
        <figure className="post_continer comment_continer">
          {imageUser ? (
            <img className="photoUser" alt="profile" src={imageUser} />
          ) : (
            <img className="photoUser" src={cover} alt="user" />
          )}

          <figcaption>
            <input
              type="text"
              className="post_inputText"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </figcaption>
        </figure>

       

       

          <button className="sendComment" onClick={sendComment}>
          <LuSend />
          </button>
        
      </form>
  
  );
}

export default Comment;
