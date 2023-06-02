import "./style.css";


// import { AiOutlineClose } from "react-icons/ai";

function Posts({imageUser,publicationDate ,imageUrl,deleteImg,description}) {
  



  const cover = "../images/user.png";

  return (
    <div className="post">
     
        <figure className="post_continer">
          {imageUser ? (
            <img className="photoUser" alt="profile" src={imageUser} />
          ) : (
            <img className="photoUser" src={cover} alt="user" />
          )}

          <figcaption>
            posted on {publicationDate}
          </figcaption>
        </figure>
<p> {description}</p>
        <div
          className="post_photo"
          style={{ display: imageUrl ? "block" : "none" }}
        >
          <button className="post_icon" onClick={deleteImg}>
            {/* <AiOutlineClose /> */}
          </button>
          <img src={imageUrl} alt="post" />
        </div>



        

  
     
    </div>
  );
}

export default Posts;
