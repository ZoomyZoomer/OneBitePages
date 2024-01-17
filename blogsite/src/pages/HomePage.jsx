import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import MainHeader from "../components/MainHeader";
import TagsNav from "../components/TagsNav";
import ArticleMain from "../components/ArticleMain";
import ArticleMainBottom from "../components/ArticleMainBottom";
import SideArticlesTop from '../components/sideArticlesTop';
import SideArticlesBottom from '../components/SideArticlesBottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

function MainArticleSet() {
  const [posts, setPosts] = useState([]);
  const [programmingPosts, setProgrammingPosts] = useState([]);
  const [mentalHealthPosts, setMentalHealthPosts] = useState([]);

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

  useEffect(() => {
    fetch('http://localhost:4000/mentalhealth').then(response => {
      response.json().then(posts => {
        setMentalHealthPosts(posts);
      });
    });
  }, []);

  const firstThreeProgrammingPosts = programmingPosts.slice(0, 3);
  const remainingProgrammingPosts = programmingPosts.slice(3);
  const firstMentalHealthPost = mentalHealthPosts.slice(0, 1);
  const remainingMentalHealthPosts = mentalHealthPosts.slice(1);

  return (
    <div className="defaultFlex">
        <div id="mainBorder" className="defaultGrid">
          <div id="lineBottom" className="defaultFlexLeft">
            <h1>Programming</h1>
          </div>
          <div id="marginTop20" className="defaultFlex">
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
              <ArticleMainBottom key={post.id} {...post} />
            ))}
          </div>
        </div>
        <div id="side" className="defaultGrid">
        <div id="lineBottom" className="defaultFlexLeft">
            <h1 id="sideH1">Mental Health</h1>
          </div>
          <div id="limitSize350" className={"defaultGridLeftSmall" + " " + "sideTop" + " " + "scaler"}>
              <div className="defaultFlex">
                {firstMentalHealthPost.length > 0 && (
                  <img id="sideImageSmall" src={firstMentalHealthPost[0].img.replace("..\\blogsite\\public\\", "")} />
                )}
              </div>
              {firstMentalHealthPost.length > 0 && firstMentalHealthPost.map(post => (
                  <SideArticlesTop key={post.id} {...post} />
              ))}
          </div>
          <div id="sideBottom" className="defaultFlex">
              {remainingMentalHealthPosts.length > 0 && remainingMentalHealthPosts.map(post => (
                  <SideArticlesBottom key={post.id} {...post} />
              ))}
          </div>
        </div>
      </div>
  )

}

function SubArticleSet() {
  const [posts, setPosts] = useState([]);
  const [educationPosts, setEducationPosts] = useState([]);
  const [sportsPosts, setSportsPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/education').then(response => {
      response.json().then(posts => {
        setEducationPosts(posts);
      });
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/sports').then(response => {
      response.json().then(posts => {
        setSportsPosts(posts);
      });
    });
  }, []);

  const firstThreeEducationPosts = educationPosts.slice(0, 3);
  const remainingEducationPosts = educationPosts.slice(3);
  const firstSportsPost = sportsPosts.slice(0, 1);
  const remainingSportsPosts = sportsPosts.slice(1);

  return (
    <>
    <div className="defaultFlex">
        <div id="mainBorder" className="defaultGrid">
          <div id="lineBottom" className="defaultFlexLeft">
            <h1>Education</h1>
          </div>
          <div id="marginTop20" className="defaultFlex">
            <div className="defaultGridLeft">
              {firstThreeEducationPosts.length > 0 && firstThreeEducationPosts.map(post => (
                <ArticleMain key={post.id} {...post} />
              ))}
            </div>
            <div>
              {firstThreeEducationPosts.length > 0 && (
                <img id="sideImage" src={firstThreeEducationPosts[0].img.replace("..\\blogsite\\public\\", "")} alt="Side Image" />
              )}
            </div>
          </div>
          <div id="botFlex" className="defaultFlex">
            {remainingEducationPosts.length > 0 && remainingEducationPosts.map(post => (
              <ArticleMainBottom key={post.id} {...post} />
            ))}
          </div>
        </div>
        <div id="side" className="defaultGrid">
        <div id="lineBottom" className="defaultFlexLeft">
            <h1 id="sideH1">Sports</h1>
          </div>
          <div id="limitSize350" className={"defaultGridLeftSmall" + " " + "sideTop" + " " + "scaler"}>
              <div className="defaultFlex">
                {firstSportsPost.length > 0 && (
                  <img id="sideImageSmall" src={firstSportsPost[0].img.replace("..\\blogsite\\public\\", "")} />
                )}
              </div>
              {firstSportsPost.length > 0 && firstSportsPost.map(post => (
                  <SideArticlesTop key={post.id} {...post} />
              ))}
          </div>
          <div id="sideBottom" className="defaultFlex">
              {remainingSportsPosts.length > 0 && remainingSportsPosts.map(post => (
                  <SideArticlesBottom key={post.id} {...post} />
              ))}
          </div>
        </div>
      </div>
    </>
  )

}

function ImageArticle({_id, title, img}){

  return(
    <Link to={`/post/${_id}`}>
      <div id="marginTop20" className={"defaultGridLeftSmall" + " " + "borderRight"}>
        <div className="scaler">
          <div className="defaultFlexLeft">
            <img id="sideImageSmall" src={img.replace("..\\blogsite\\public\\", "")}></img>
          </div>
            <h1 id="imageH1">{title}</h1>
          <div className="defaultFlexLeft">
            <h4 id="imageH4">By Kamil Wisniewski</h4>
          </div>
        </div>
      </div>
    </Link>
  )

}

function ImageArticleSet(){

  const [cookingPosts, setCookingPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/cooking').then(response => {
      response.json().then(posts => {
        setCookingPosts(posts);
      });
    });
  }, []);

  return (
    <div className="defaultGrid">
    <div id="inline" className={"defaultFlex" + " " + "lineBottom"}>
      <h1>Cooking</h1>
    </div>
    <div className="defaultFlex">
      {cookingPosts.length > 0 && cookingPosts.map(post => (
            <ImageArticle key={post.id} {...post} />
      ))}
    </div>
    </div>
  )

}

function HomePage() {
  
  return (
    <>
      <MainHeader />
      <TagsNav />
      <MainArticleSet />
      <ImageArticleSet />
      <SubArticleSet />
    </>
  );
}

export default HomePage