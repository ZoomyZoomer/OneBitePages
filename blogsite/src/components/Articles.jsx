import React, {useState} from 'react'
import { propsListMain } from '../data/articlesData.js'
import { propsListSmall } from '../data/smallarticlesData.js';
import {formatRelative, subDays} from "date-fns";

function ArticleMain(props){

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

function Articles({title, description, createdAt}) {

  return (
    <section className="defaultGrid">
      <div className="defaultFlexLeft">
        <heading>Mental Health</heading>
      </div>
        <div className="defaultFlexLeft">
            <div className="defaultGridLeft">
                    <ArticleMain title={title} description={description}/>
            </div>
            <div className="defaultGridRight">
              <img id="image" src="sleeping.jpg"></img>
              <time>{formatRelative(subDays(new Date(createdAt), 0), new Date())}</time>
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