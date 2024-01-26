import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';

function TopicSection({ _id, title, description, author, img }) {
  return (
    <Link to={`/post/${_id}`}>
      <div
        className={"defaultFlex" + " " + "scaler"}
        style={{
          borderBottomStyle: 'dashed',
          borderBottomWidth: '1px',
          borderBottomColor: 'gray',
          paddingTop: '20px',
          paddingBottom: '20px',
          cursor: 'pointer',
        }}
      >
        <div className="defaultFlex">
          <img
            id="sideImageMedium"
            src={img.replace('blogsite\\public\\', '')}
            alt={`Post ${title} Image`}
          />
        </div>
        <div className="defaultGridLeft">
          <h1 id="imageH1">{title}</h1>
          <p>{description}</p>
          <h4 id="imageH4">{author.username}</h4>
        </div>
      </div>
    </Link>
  );
}

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function TopicPage() {
  const [posts, setPosts] = useState([]);
  const [topic, setTopic] = useState(null);
  const { topic: routeTopic } = useParams();

  useEffect(() => {
    const getPosts = async () => {
      try {
        let response;

        switch (routeTopic) {
            case 'programming':
              response = await fetch('http://localhost:4000/programming2');
              break;
            case 'mentalHealth':
              response = await fetch('http://localhost:4000/mentalHealth2');
              break;
            case 'cooking':
              response = await fetch('http://localhost:4000/cooking2');
              break;
            case 'sports':
              response = await fetch('http://localhost:4000/sports2');
              break;
            case 'education':
              response = await fetch('http://localhost:4000/education2');
              break;
            default:
              
              break;
          }

        if (response && response.ok) {
          const data = await response.json();
          setPosts(data);
          setTopic(routeTopic);
          document.getElementById("issue1").classList.remove("megaMargin");
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, [routeTopic]);

  return (
    <>
        <div id="issue1" className={"defaultGrid" + " " + "megaMargin"} style={{ marginTop: '150px' }}>
        {topic !== null && (
            <div
            id="topicFlex"
            className="defaultFlexLeft"
            style={{
                marginLeft: '29px',
                marginBottom: '40px',
                fontSize: '30px',
            }}
            >
            <p>{topic}</p>
            </div>
        )}
        {posts.length > 0 ? (
            posts.map((post) => <TopicSection key={post._id} {...post} />)
        ) : (
            <p></p>
        )}
        </div>
    </>
  );
}

export default TopicPage;