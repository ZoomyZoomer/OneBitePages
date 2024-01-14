import React, { useEffect, useState } from 'react'
import MainHeader from "../components/MainHeader";
import Articles from "../components/Articles";
import SideArticles from "../components/SideArticles";
import TagsNav from "../components/TagsNav";

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
      })
    });
  } , []);

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
        {programmingPosts.length > 0 && programmingPosts.map(post => (
          console.log(programmingPosts),
          <Articles {...post} />
        ))}
    </div>
  )
}

export default HomePage