import React from 'react'
import { propsListSideTop } from '../data/sideTopArticlesData.js'
import { propsListSideBottom } from '../data/sideBottomArticleData.js'

function Articles(props){
    return (
        <div className={"fonts" + " " + "borderBottom"}>
            <div className="defaultGridLeftImage">
                <img id="sideImage" src="programming.jpg"></img>
            </div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <h4>By {props.author}</h4>
        </div>
    )
}

function ArticlesBottom(props){
    return (
        <div className={"defaultGridLeftSmall" + " " + "borderRight"}>
            <div className="defaultGridLeftSmallImage">
                <img id="sideImageSmall" src={props.img}></img>
            </div>
            <h1>{props.title}</h1>
            <h4>By {props.author}</h4>
        </div>
    )
}

function SideArticles() {
  return (
    <section id="side" className="defaultGrid">
        <div className="defaultGridLeft">
            <heading>Progamming</heading>
            {propsListSideTop.map((props) => (
                <Articles title={props.title} description={props.description} author={props.author}/>
            ))} 
        </div>
        <div id="TwentyMarginTop" className="defaultFlex">
            {propsListSideBottom.map((props) => (
                <ArticlesBottom title={props.title} description={props.description} author={props.author} img={props.img}/>
            ))}
        </div>
    </section>
  )
}

export default SideArticles