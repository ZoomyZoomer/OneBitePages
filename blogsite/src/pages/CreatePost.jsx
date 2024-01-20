import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const modules ={
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    };

const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
];

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
        const response = await fetch("http://localhost:4000/post", {
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
                <ReactQuill style={{
                        resize: 'both',
                        overflow: 'auto',
                        width: '100%',
                        height: '200px',
                        maxWidth: '1000px',
                        minWidth: '300px',
                    }}
                    value={content} 
                    onChange={newValue => setContent(newValue)}
                    modules={modules} 
                    formats={formats}/>
                <button id="createPostButton" style={{marginTop: '20px'}}>Create Post</button>
            </form>
        </div>
    )
}