import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function TagsNav() {
  return (
    <section className="tagsGrid">
        <div className="tagsNavFlex">
            <div>
                <p>Programming</p>
            </div>
            <div>
                <p>Cooking</p>
            </div>
            <div id="searchDiv" className="searchDiv">           
            </div>
            <div>
                <p>Politics</p>
            </div>
            <div>
                <p>Mental Health</p>
            </div>
        
        </div>
    </section>
  )
}

export default TagsNav