import ReactQuill from "react-quill";

export default function Editor({value, onChange}) {

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

    return(
        <ReactQuill style={{
            resize: 'both',
            overflow: 'auto',
            width: '100%',
            height: '200px',
            maxWidth: '1000px',
            minWidth: '300px',
        }}
        value={value} 
        onChange={onChange}
        modules={modules} 
        formats={formats}/>
    );
}