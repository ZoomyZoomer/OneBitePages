import { Link } from "react-router-dom"

function SideArticlesTop({_id, title, description, author}){
    return (
        <Link to={`/post/${_id}`}> 
            <h1 id="sideTopFontH1">{title}</h1>
            <p id="sideTopFontP">{description}</p>
            <h4 id="sideTopFontH4">By {author.username}</h4>
        </Link>
    )
}

export default SideArticlesTop