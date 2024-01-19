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
const uploadMiddleware = multer({ dest: '../blogsite/public/uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdjaisd1203810';

app.use(cors({credentials:true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://blog:zyHxQ0r96SA6nCAY@cluster0.l9mvpea.mongodb.net/?retryWrites=true&w=majority');

app.post('/register', async (req,res) => {
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
  
  app.post('/login', async (req,res) => {
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
  
  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });
  
  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {

    try {
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
        
        const {token} = req.cookies;
        jwt.verify(token, secret, {}, async (err,info) => {
          if (err) throw err;
          const {title, description, content, topic, likes} = req.body;
          const postDoc = await Post.create({
            title,
            description,
            content,
            topic,
            likes,
            img: newPath,
            author: info.id,
        });
        res.json(postDoc);
        });
        
    } catch (e) {
        res.status(400).json(e);
    }
    

});

app.get('/post', async (req, res) => {
  try {
    res.json(await Post.find().populate('author', ['username']));
  } catch(e) {
    console.log(e);
    res.json({});
  }
})

app.get('/programming', async (req, res) => {
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

app.get('/programming2', async (req, res) => {
  try {
      const programmingDoc = await Post.find({ topic: "programming" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(6);
      res.json(programmingDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/mentalHealth', async (req, res) => {
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

app.get('/cooking', async (req, res) => {
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

app.get('/cooking2', async (req, res) => {
  try {
      const cookingDoc = await Post.find({ topic: "cooking" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(6);
      res.json(cookingDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/education', async (req, res) => {
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

app.get('/education2', async (req, res) => {
  try {
      const educationDoc = await Post.find({ topic: "education" })
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(6);
      res.json(educationDoc);
  } catch (e) {
      console.log(e);
      res.json({});
  };
});

app.get('/sports', async (req, res) => {
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

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
  
})

app.listen(4000);


