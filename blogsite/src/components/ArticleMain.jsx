function ArticleMain({title, description}){

    return (
      <section className="borderBottom">
          <h1>{title}</h1>
          <p>{description}</p>
          <h4>By Kamil Wisniewski</h4>
      </section>
    )
  }

  export default ArticleMain