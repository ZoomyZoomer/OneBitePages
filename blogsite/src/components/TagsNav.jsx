import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function TagsNav() {
  return (
    <section className="tagsGrid">
        <div className="tagsNavFlex">
            <Link to={`/topic/${"programming"}`}>
            <div>
                <p>Programming</p>
            </div>
            </Link>
            <Link to={`/topic/${"mentalHealth"}`}>
            <div>
                <p>Mental Health</p>
            </div>  
            </Link>      
            <Link to={`/topic/${"cooking"}`}>
            <div>
                <p>Cooking</p>
            </div>
            </Link> 
            <Link to={`/topic/${"education"}`}>
            <div>
                <p>Education</p>
            </div>
            </Link> 
            <Link to={`/topic/${"sports"}`}>
            <div>
                <p>Sports</p>
            </div>
            </Link> 
        </div>
    </section>
  )
}

export default TagsNav