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
        data.set('file', files[0]);
        e.preventDefault();
        const response = await fetch("http://localhost:4000/post", {
            method: 'POST',
            body: data,
        });
        if (response.ok){
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
            <div className="defaultFlex">
                <button onClick={() => setTopic("programming")}>Programming</button>
                <button onClick={() => setTopic("mental_health")}>Mental Health</button>
                <button onClick={() => setTopic('cooking')}>Cooking</button>
            </div>
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
    )
}