import { Link } from "react-router-dom"

function ArticleBottom({_id, title}){

    return (
      <Link to={`/post/${_id}`}>
      <section className={"defaultGridLeftSmall" + " " + "borderRight" + " " + "scaler"}>
        <div>
            <div>
            <p>{title}</p>
            </div>
            <div>
            <h4>By Kamil Wisniewski</h4>
            </div>
        </div>
          
      </section>
      </Link>
    )
    
  }

  export default ArticleBottom