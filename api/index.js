const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
const fs = require('fs');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdjaisd1203810';
const bucket ='kamil-blog-app';

app.use(cors({credentials:true, origin:'https://one-bite-pages.vercel.app'}));
app.use(express.json());
app.use(cookieParser());

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: 'AKIA6GBMHQXVF7OIT3NQ',
      secretAccessKey: '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',
    }
  });
  const parts = originalFilename.split('.');
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + '.' + ext;
  const data = await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key: newFilename,
    ContentType: mimetype,
    ACL: 'public-read',
  }));
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

app.post('/api/register', async (req,res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
    const {username,password} = req.body;
    try{
      const userDoc = await User.create({
        username,
        password:bcrypt.hashSync(password,salt),
      });
      res.json(userDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
  });
  
  app.post('/api/login', async (req,res) => {
    mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });
  
  app.get('/api/profile', (req, res) => {
    mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  const { token } = req.cookies;

  if (!token) {
    // If there's no token in the cookies, the user is not logged in
    return res.status(401).json({ message: 'Not logged in' });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      // If there's an error in token verification, the user is not logged in
      return res.status(401).json({ message: 'Not logged in' });
    }

    // If token verification is successful, the user is logged in
    // You can also send additional user information if needed
    res.status(200).json({ message: 'Logged in', user: info });
  });
});
  
app.post('/api/logout', (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  // Clear the 'token' cookie by setting it to null and expiring it immediately
  res.cookie('token', null, { expires: new Date(0), httpOnly: true });
  res.json('Logged out successfully');
});

const uploadMiddleware = multer({ dest: '/tmp' });
app.post('/api/post', uploadMiddleware.single('file'), async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');

    try {
        const {originalname, path, mimetype} = req.file;
        const url = await uploadToS3(path, originalname, mimetype);
        
        const {token} = req.cookies;
        jwt.verify(token, secret, {}, async (err,info) => {
          if (err) throw err;
          const {title, description, content, topic} = req.body;
          const postDoc = await Post.create({
            title,
            description,
            content,
            topic,
            img: url,
            author: info.id,
        });
        res.json(postDoc);
        });
        
    } catch (e) {
        res.status(400).json(e);
    }
    

});

app.put('/api/post',uploadMiddleware.single('file'), async (req,res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,description,content,topic} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.updateOne({
      title,
      description,
      content,
      topic,
      img: newPath ? newPath : postDoc.img,
    });

    res.json(postDoc);
  });

});

app.get('/api/post', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
    res.json(await Post.find().populate('author', ['username']));
  } catch(e) {
    console.log(e);
    res.json({});
  }
})

app.get('/api/programming', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
    try {
        const programmingDoc = await Post.find({ topic: "programming" })
        .populate('author', ['username'])
        .sort({ createdAt: -1 })
        .limit(2);
        res.json(programmingDoc);
    } catch (e) {
        console.log(e);
        res.json({});
    };
});

app.get('/api/programming2', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const programmingDoc = await Post.find({ topic: "programming" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      res.json(programmingDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/mentalHealth', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const mentalHealthDoc = await Post.find({ topic: "mentalHealth" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(3);
      res.json(mentalHealthDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/mentalHealth2', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const mentalHealthDoc = await Post.find({ topic: "mentalHealth" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      res.json(mentalHealthDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/cooking', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const cookingDoc = await Post.find({ topic: "cooking" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(2);
      res.json(cookingDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/cooking2', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const cookingDoc = await Post.find({ topic: "cooking" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      res.json(cookingDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/education', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const educationDoc = await Post.find({ topic: "education" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(2);
      res.json(educationDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/education2', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const educationDoc = await Post.find({ topic: "education" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      res.json(educationDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/sports', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const sportsDoc = await Post.find({ topic: "sports" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(3);
      res.json(sportsDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/sports2', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  try {
      const sportsDoc = await Post.find({ topic: "sports" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      res.json(sportsDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/api/post/:id', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
  
})

app.get('/api/cookie', async (req, res) => {
  mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');
  const count =  await Post.countDocuments();
  var randomNumber = Math.floor(Math.random() * count);
  const result = await Post.findOne({}).skip(randomNumber);
  console.log(result);
  res.json(result);
});


app.listen(4000);