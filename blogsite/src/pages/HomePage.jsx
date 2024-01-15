import React, { useEffect, useState } from 'react'
import MainHeader from "../components/MainHeader";
import Articles from "../components/Articles";
import SideArticles from "../components/SideArticles";
import TagsNav from "../components/TagsNav";
import ArticleMain from "../components/ArticleMain";
import ArticleMainBottom from "../components/ArticleMainBottom";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [programmingPosts, setProgrammingPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/programming').then(response => {
      response.json().then(posts => {
        setProgrammingPosts(posts);
      });
    });
  }, []);

  const firstThreeProgrammingPosts = programmingPosts.slice(0, 3);
  const remainingProgrammingPosts = programmingPosts.slice(3);

  return (
    <div>
      <MainHeader />
      <TagsNav />
      <div className="defaultGrid">
        <div className="defaultFlex">
          <div className="defaultGridLeft">
            {firstThreeProgrammingPosts.length > 0 && firstThreeProgrammingPosts.map(post => (
              <ArticleMain key={post.id} {...post} />
            ))}
          </div>
          <div>
            {firstThreeProgrammingPosts.length > 0 && (
              <img id="sideImage" src={firstThreeProgrammingPosts[0].img.replace("..\\blogsite\\public\\", "")} alt="Side Image" />
            )}
          </div>
        </div>
        <div id="botFlex" className="defaultFlex">
          {remainingProgrammingPosts.length > 0 && remainingProgrammingPosts.map(post => (
            <ArticleMainBottom {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage