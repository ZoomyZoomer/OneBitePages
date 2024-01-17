import { Link } from "react-router-dom"

function ArticleMain({_id, title, description}){

    return (
      <Link to={`/post/${_id}`}>
        <section className={"borderBottom" + " " + "scaler"}>
            <h1>{title}</h1>
            <p>{description}</p>
            <h4>By Kamil Wisniewski</h4>
        </section>
      </Link>
    )
  }

  export default ArticleMain