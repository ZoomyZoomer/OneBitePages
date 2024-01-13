import React, { useEffect, useState } from 'react'
import MainHeader from "../components/MainHeader";
import Articles from "../components/Articles";
import SideArticles from "../components/SideArticles";
import TagsNav from "../components/TagsNav";

function HomePage() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <div>
        <MainHeader />
        <TagsNav />
        <div className="defaultGrid">
            <div className="defaultFlex">
                <div className="pageBorder"></div>
                <SideArticles />
            </div>
        </div>
        {posts.length > 0 && posts.map(post => (
          <Articles {...post} />
        ))}
    </div>
  )
}

export default HomePage