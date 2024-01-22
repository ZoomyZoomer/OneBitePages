import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {

    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);
    const {id} = useParams();

    useEffect(() => {
        fetch(`/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);


    if (!postInfo) return <div style={{marginTop: '1500px'}}></div>;
    console.log(postInfo);


      

    return (
    
        <div className={"postWrapper"}>
            
            <div id="topScale" className={"defaultGrid"}>
                <div className="defaultGrid">
                    <div id="widthRestr" className="defaultFlexLeft">
                        <h1>{postInfo.title}</h1>
                    </div>
                    <div id="widthRestr" className={"defaultFlexLeft" + " " + "marginBottom"}>
                        <p>{postInfo.description}</p>
                    </div>
                    <div id="postH4" className="defaultFlexLeft3">
                        <h4>By {postInfo.author.username} &#183;</h4>
                        <div className="tagline">{postInfo.topic}</div>
                        {userInfo.id === postInfo.author._id && (
                            <Link className="edit-button" to={`/edit/${postInfo._id}`}>Edit this Post</Link>
                        )}
                    </div>
                    <div className="defaultFlex">
                    <img id="postImage" src={postInfo.img.replace("..\\blogsite\\public\\", "..\\")}/>
                    </div>
                </div>
                <div className="defaultFlex2">
                <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
                </div>
            </div>
        </div>
    );
}