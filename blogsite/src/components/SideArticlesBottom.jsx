import { Link } from "react-router-dom"

function SideArticlesBottom({_id, title}){
    return (
        <Link to={`/post/${_id}`}> 
            <div id="limitSize170" className={"defaultGridLeft" + " " + "sideBottomFonts" + " " + "scaler" + " " + "borderRight"}>
                <h1>{title}</h1>
                <h4>By Kamil Wisniewski</h4>
            </div>
        </Link>
    )
}

export default SideArticlesBottom