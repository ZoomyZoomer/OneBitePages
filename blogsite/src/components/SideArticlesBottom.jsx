import { Link } from "react-router-dom"

function SideArticlesBottom({_id, title, author, topic}){
    return (
        <Link to={`/post/${_id}`}> 
            <div id="limitSize170" className={"defaultGridLeft" + " " + "sideBottomFonts" + " " + "scaler" + " " + "borderRight"}>
                <h1>{title}</h1>
                <div id="scaled" className="defaultFlexLeft">
                    <h4 id="sideTopFontH4">By {author.username} &#183;</h4>
                    <div id="authorText" className="tagline">{topic}</div>
                </div>
            </div>
        </Link>
    )
}

export default SideArticlesBottom