import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

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

    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('description', description);
        data.set('content', content);
        data.set('topic', topic);
        data.set('likes', 0);
        data.set('file', files[0]);
            
        e.preventDefault();
        const response = await fetch("http://localhost:4000/post", {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.status === 200){
            setRedirect(true);
        } else {
            alert('Enter all fields');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <><div id="topicButtons" className="defaultFlex">
                <button onClick={() => setTopic("programming")}>Programming</button>
                <button onClick={() => setTopic("mentalHealth")}>Mental Health</button>
                <button onClick={() => setTopic('cooking')}>Cooking</button>
                <button onClick={() => setTopic('education')}>Education</button>
                <button onClick={() => setTopic('sports')}>Sports</button>
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
                <ReactQuill 
                    value={content} 
                    onChange={newValue => setContent(newValue)}
                    modules={modules} 
                    formats={formats}/>
                <button style={{marginTop: '5px'}}>Create Post</button>
            </form>
        </>
    )
}