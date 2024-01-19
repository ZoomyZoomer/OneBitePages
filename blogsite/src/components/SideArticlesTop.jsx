import { Link } from "react-router-dom"

function SideArticlesTop({_id, title, description, author, topic}){
    return (
        <Link to={`/post/${_id}`}> 
            <h1 id="sideTopFontH1">{title}</h1>
            <p id="sideTopFontP">{description}</p>
            <div id="tm" className="defaultFlexLeft">
              <h4 id="sideTopFontH4">By {author.username} &#183;</h4>
              <div id="authorText" className="tagline">{topic}</div>
            </div>
        </Link>
    )
}

export default SideArticlesTop