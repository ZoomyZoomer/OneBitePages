import React, {useState} from 'react'
import { propsListMain } from '../data/articlesData.js'
import { propsListSmall } from '../data/smallarticlesData.js';

function ArticleMain(props){

  console.log(props.type);

  return (
    <section className="borderBottom">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <h4>By {props.author}</h4>
    </section>
  )
}

function ArticleBottom(props){

  return (
    <section className={"defaultGridLeft" + " " + "borderRight"}>
      <div>
        <p>{props.title}</p>
      </div>
      <div>
        <h4>By {props.author}</h4>
      </div>
        
    </section>
  )
  
}

function Articles() {

  return (
    <section className="defaultGrid">
      <div className="defaultFlexLeft">
        <heading>Mental Health</heading>
      </div>
        <div className="defaultFlexLeft">
            <div className="defaultGridLeft">
                {propsListMain.map((props) => (
                    <ArticleMain title={props.title} description={props.description} author={props.author}/>
                ))} 
            </div>
            <div className="defaultGridRight">
              <img id="image" src="sleeping.jpg"></img>
              <h4>Stock Image</h4>
            </div>
        </div>
        <div className="defaultFlex">
            {propsListSmall.map((props) => (
                <ArticleBottom title={props.title} author={props.author}/>
            ))} 
        </div>
    </section>
  )
}

export default Articles