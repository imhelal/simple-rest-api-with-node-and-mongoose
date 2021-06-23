const mongoose = require("mongoose");
//connect to the database
mongoose.connect("mongodb://localhost:27017/tafhim",{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => console.log('connection successfull.....'))
.catch((err)=>console.log(err));


// Playlist Schema
const PlaylistSchema = new mongoose.Schema({
    name:String,
    videos:Number,
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
});

//Model or creating the collection

const Playlist = new mongoose.model('Playlist',PlaylistSchema);

//creating the document

const InsertPlaylist = new Playlist({
    name:'React',
    videos:10,
    active:true
});

InsertPlaylist.save();