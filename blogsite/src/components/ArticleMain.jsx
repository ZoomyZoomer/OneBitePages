import { Link } from "react-router-dom"

function ArticleMain({_id, title, description, author, topic}){

    return (
      <Link to={`/post/${_id}`}>
        <section className={"borderBottom" + " " + "scaler"}>
            <h1>{title}</h1>
            <p>{description}</p>
            <div id="tm" className="defaultFlexLeft">
              <h4 id="authorText">By {author.username} &#183;</h4>
              <div id="authorText" className="tagline">{topic}</div>
            </div>
        </section>
      </Link>
    )
  }

  export default ArticleMain