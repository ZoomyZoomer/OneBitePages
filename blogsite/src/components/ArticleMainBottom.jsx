import { Link } from "react-router-dom"

function ArticleBottom({_id, title, topic, author}){

    return (
      <Link to={`/post/${_id}`}>
      <section className={"defaultGridLeftSmall" + " " + "borderRight" + " " + "scaler"}>
        <div>
            <div>
            <p>{title}</p>
            </div>
            <div className="defaultFlexLeft">
              <h4 id="authorText">By {author.username} &#183;</h4>
              <div id="authorText" className={"tagline" + " " + "goUp"}>{topic}</div>
            </div>
        </div>
          
      </section>
      </Link>
    )
    
  }

  export default ArticleBottom