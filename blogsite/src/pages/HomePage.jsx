import React from 'react'
import MainHeader from "../components/MainHeader";
import Articles from "../components/Articles";
import SideArticles from "../components/SideArticles";
import TagsNav from "../components/TagsNav";

function HomePage() {
  return (
    <div>
        <MainHeader />
        <TagsNav />
        <div className="defaultGrid">
            <div className="defaultFlex">
                <Articles />
                <div className="pageBorder"></div>
                <SideArticles />
            </div>
        </div>
    </div>
  )
}

export default HomePage