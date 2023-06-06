import "./style.css";


 

function Posts({imageUser,publicationDate ,imageUrl,deleteImg,description,firstname,lastname}) {
  



  const cover = "../images/user.png";

  return (
    <div className="post postCadre">
     
        <figure className="postContiner">
          {imageUser ? (
            <img className="photoUser" alt="profile" src={imageUser} />
          ) : (
            <img className="photoUser" src={cover} alt="user" />
          )}

          <figcaption>
          <b className="description">{firstname}{  } { lastname} </b>
            posted on {publicationDate}
          </figcaption>
        </figure>
        <div>

            </div>
<p> {description}</p>
        <div
          className="post_photo postPhoto"
          style={{ display: imageUrl ? "block" : "none" }}
        >
          
          <img src={imageUrl} alt="post" />
        </div>



        

  
     
    </div>
  );
}

export default Posts;
