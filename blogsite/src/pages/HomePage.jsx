import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import MainHeader from "../components/MainHeader";
import TagsNav from "../components/TagsNav";
import ArticleMain from "../components/ArticleMain";
import ArticleMainBottom from "../components/ArticleMainBottom";
import SideArticlesTop from '../components/sideArticlesTop';
import SideArticlesBottom from '../components/SideArticlesBottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';

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
    fetch('http://localhost:4000/programming2').then(response => {
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
  const remainingProgrammingPosts = programmingPosts.slice(3,6);
  const firstMentalHealthPost = mentalHealthPosts.slice(0, 1);
  const remainingMentalHealthPosts = mentalHealthPosts.slice(1,3);

  return (
    <>
      <div className="defaultFlex">
          <div id="triggerMain1" className="defaultGrid">
            <div className="defaultFlexLeft">
              <h1>Programming</h1>
            </div>
            <div id="b1" className={"defaultFlexLeft"}/>
            <div id="marginTop20" className="defaultFlex">
              <div className="defaultGridLeft">
                {firstThreeProgrammingPosts.length > 0 && firstThreeProgrammingPosts.map(post => (
                  console.log(post),
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
          <div id="sb1" className="sideBorder"/>
          <div id="side" className="defaultGrid">
          <div id="b2" className="defaultFlexLeft">
              <h1 id="sideH1">Mental Health</h1>
            </div>
            <div id="limitSize350" className={"defaultGridLeftSmall" + " " + "sideTop" + " " + "scaler"}>
                <div className="defaultFlexLeft">
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
      </>
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
    fetch('http://localhost:4000/education2').then(response => {
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
          <div id="limitSize350" className={"defaultGridLeftSmall" + " " + "sideTop" + " " + "scaler"} style={{marginTop: '5px'}}>
              <div className="defaultFlexLeft">
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

function ImageArticle({_id, title, img, author, topic}){

  return(
    <Link to={`/post/${_id}`}>
      <div id="marginTop20" className={"defaultGridLeftSmall" + " " + "borderRight"}>
        <div className="scaler">
          <div className="defaultFlexLeft">
            <img id="sideImageSmall" src={img.replace("..\\blogsite\\public\\", "")}></img>
          </div>
            <h1 id="imageH1">{title}</h1>
          <div className="defaultFlexLeft">
            <h4 id="imageH4">By {author.username}</h4>
            <div className="defaultFlex">
            <div id="authorText" className="tagline" style={{marginTop: '-10px'}}>{topic}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )

}

function ImageArticleSet(){

  const [cookingPosts, setCookingPosts] = useState([]);

  const allCookingPosts = cookingPosts.slice(0, 6);

  useEffect(() => {
    fetch('http://localhost:4000/cooking2').then(response => {
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
      {allCookingPosts.length > 0 && allCookingPosts.map(post => (
            <ImageArticle key={post.id} {...post} />
      ))}
    </div>
    <div id="borderBot"></div>
    </div>
  )

}

function Trends() {

  const [posts, setPosts] = useState([]);
  const [programmingPosts, setProgrammingPosts] = useState([]);
  const [educationPosts, setEducationPosts] = useState([]);
  const [cookingPosts, setCookingPosts] = useState([]);

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
    fetch('http://localhost:4000/education').then(response => {
      response.json().then(posts => {
        setEducationPosts(posts);
      });
    });
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/cooking').then(response => {
      response.json().then(posts => {
        setCookingPosts(posts);
      });
    });
  }, []);

  return (
    <>
    <div className="defaultGrid">
      <div id="trendContainer" className="defaultFlexLeft">
      <FontAwesomeIcon id="trendingIcon" icon={faArrowTrendUp} />
        <p id="topTrending">Trending</p>
      </div>
      <div id="trendRelative" className="trendsGrid">
        {programmingPosts.length > 1 && educationPosts.length > 1 && cookingPosts.length > 1 && (
          <>
            <ArticleTrend {...programmingPosts[0]}/>
            <ArticleTrend {...educationPosts[0]}/>
            <ArticleTrend {...cookingPosts[0]}/>
            <ArticleTrend {...programmingPosts[1]}/>
            <ArticleTrend {...educationPosts[1]}/>
            <ArticleTrend {...cookingPosts[1]}/>
            <div id="d1"/>
            <div id="d2"/>
            <div id="d3"/>
            <div id="d4"/>
            <div id="d5"/>
          </>
        )}
      </div>
      
    </div>
    <div id="triggerLines"/>
    <div className="defaultFlex">
      <div className="trendingBorder"/>
    </div>
    </>

  )
}

function ArticleTrend({_id, title, description, author, topic}){

  return (
    <Link to={`/post/${_id}`}>
      <div className="trendy">
        <section className={"borderBottom" + " " + "scaler"}>
                <h1>{title}</h1>
                <p>{description}</p>
                <div className="defaultFlexLeft">
                  <h4>By {author.username} &#183;</h4>
                  <div className="tagline">{topic}</div>
                </div>
        </section>
      </div>
    </Link>
  )

}


function HomePage() {
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.getElementById("d1").classList.add('dashBoxes');
          document.getElementById("d2").classList.add('dashBoxes2');
          document.getElementById("d3").classList.add('dashBoxes3');
          document.getElementById("d4").classList.add('dashBoxes4');
          document.getElementById("d5").classList.add('dashBoxes5');

        }
      });
    });
    
    const element = document.getElementById("triggerLines");
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.getElementById("b1").classList.add('bottomBorder');
          document.getElementById("b2").classList.add('bottomBorder');
          document.getElementById("sb1").classList.add('sideBorder');
        }
      });
    });
    
    const element = document.getElementById("triggerMain1");
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0,0);
}, []);
  
  return (
    <>
      <MainHeader />
      <TagsNav />
      <Trends />
      <div className="defaultGrid">
        <div className="defaultFlexLeft">
          <p id="mdt">Recent Posts</p>
        </div>
        <MainArticleSet />
        <ImageArticleSet />
        <SubArticleSet />
      </div>
    </>
  );
}

export default HomePage