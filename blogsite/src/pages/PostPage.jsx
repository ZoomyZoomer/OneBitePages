import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {

    const [postInfo, setPostInfo] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, []);


    if (!postInfo) return <div style={{marginTop: '1000px'}}></div>;
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