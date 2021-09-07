const { default: axios } = require("axios");
const cheerio = require("cheerio");
const fbviddown = require("fb-video-downloader");
const ytdl = require("ytdl-core");
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const myinsta = require('insta_downloader');

const PORT = process.env.PORT || 2121

app.use(
    cors({
        origin: ["http://localhost:3000","http://comewithus.epizy.com/"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(bodyParser.json());

app.get('/hello', async function (req, res) {
        res.send("Hello Working Successfully")
});
app.get('/s', async function(req,res){
    const opt = await myinsta.url("https://www.instagram.com/p/CD4bXWPgWHd")
    console.log(opt)
    console.log("opt")
    res.send("Hello Working Successfully"+opt)
})
// Instagram Video Download
app.post('/insta', async function (req, res) {
    const { videourl } = req.body
    const data = await axios.get(videourl)
    const resp = await data.data
    const $ = cheerio.load(resp);
    // const img = $('meta[property="og:image"]').attr("content")
    const videos = $('meta[property="og:video"]').attr("content")
    if (videos === undefined) {
        res.send("Invalid Video Url")
    } else {
        res.send(videos)
    }
});
// Facebook Video Download
app.post('/facebk', async function (req, res) {
    const { videourl } = req.body
    try {
        const data = await fbviddown.getInfo(videourl);
        res.send(data);
    } catch (e) {
        res.send("Error to download facebook Video")
    }
});
// Facebook Video Download
app.post('/youtu', async function (req, res) {
    const { videourl } = req.body
    try {
        const info = await ytdl.getInfo(videourl);
        res.send(info);
    } catch (e) {
        res.send("Error to download youtube Video")
    }
});

app.listen(PORT, () => {
    console.log(`Serve is running on ${PORT}`)
})
