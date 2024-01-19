import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

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

    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    if (!postInfo) return '';
    console.log(postInfo);

    return (
        <div className="postWrapper">
            <div id="topScale" className="defaultGrid">
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