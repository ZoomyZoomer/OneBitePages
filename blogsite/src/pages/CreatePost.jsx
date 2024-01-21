import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";

export default function CreatePost(){
    const navigate = useNavigate();

    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [files, setFiles] = useState('');

    async function createNewPost(e) {
        resetButtons();
        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('topic', topic);
        data.set('file', files[0]);
            
        e.preventDefault();
        const response = await fetch("https://one-bite-pages.vercel.app/api/post", {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.status === 200){
            navigate('/');
        } else {
            alert('Enter all fields');
        }
    }


    function activeButton(e) {
        resetButtons();
        document.getElementById(e.target.id).classList.add("activeTopicButton");
      }
      
      function resetButtons() {
        const buttonIds = ["programmingB", "mentalHealthB", "cookingB", "educationB", "sportsB"];
      
        buttonIds.forEach((buttonId) => {
          const button = document.getElementById(buttonId);
          button.classList.remove("activeTopicButton");
          button.classList.add("nonActiveTopicButton");
        });
      }

      useEffect(() => {
        window.scrollTo(0,0);
    }, []);
      
      return (
        <div id="createGrid" className="defaultGrid">
          <div id="topicButtons" style={{marginBottom: '5px'}}className="defaultFlex">
            <p>Select A Topic: </p>
            <button id="programmingB" className="nonActiveTopicButton" onClick={(e) => {setTopic("programming"); activeButton(e)}}>Programming</button>
            <button id="mentalHealthB" className="nonActiveTopicButton" onClick={(e) => {setTopic("mentalHealth"); activeButton(e)}}>Mental Health</button>
            <button id="cookingB" className="nonActiveTopicButton" onClick={(e) => {setTopic('cooking'); activeButton(e)}}>Cooking</button>
            <button id="educationB" className="nonActiveTopicButton" onClick={(e) => {setTopic('education'); activeButton(e)}}>Education</button>
            <button id="sportsB" className="nonActiveTopicButton" onClick={(e) => {setTopic('sports'); activeButton(e)}}>Sports</button>
          </div>
            <form onSubmit={createNewPost}>
                <input type="title" 
                    placeholder={'Title'} 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}/>
                <input type="description" 
                    placeholder={"description"}
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>
                <input type="file" 
                    onChange={e => setFiles(e.target.files)}/>
                <Editor onChange={setContent} value={content}/>
                <button id="createPostButton" style={{marginTop: '20px'}}>Create Post</button>
            </form>
        </div>
    )
}