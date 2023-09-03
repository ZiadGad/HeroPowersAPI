import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { send } from "process";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = 3000;
const token = "1015435366258427";
const API_URL = `https://www.superheroapi.com/api.php/${token}/`;

let data;
let id;
let heroName;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


app.get("/", (req, res) => {
    res.render("index.ejs",{heroes:data})
})

app.post("/selectHero",  async(req,res)=>{

    heroName = req.body.heroName;
    try{
        const result = await axios.get(API_URL+"search/"+heroName);
        data = result.data;
        res.redirect("/")
    }catch (error){
        console.log(error);
        send.status(404);
    }

})
app.post("/superHeros", async (req,res)=>{
    id = req.body.heroID;
    try{
        const heroInfo = await axios.get(API_URL+id);
        const result = heroInfo.data;
        res.render("info.ejs",{data:result});
    }catch (error){
        res.render("info.ejs",{data:JSON.stringify(error.result.data)}).status(404);
    }

    
})


app.listen(port, () => {
    console.log(`I Love You ${port}`);
})
