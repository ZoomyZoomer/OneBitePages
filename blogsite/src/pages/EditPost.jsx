import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setDescription(postInfo.description);
          setTopic(postInfo.topic);
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('description', description);
    data.set('content', content);
    data.set('topic', topic);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://127.0.0.1:4000/api:3000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
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
        <form onSubmit={updatePost}>
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
            <button id="createPostButton" style={{marginTop: '20px'}}>Update Post</button>
        </form>
    </div>
)
}