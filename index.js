const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
var admin = require('firebase-admin');
var randomstring = require("randomstring");
var serviceAccount = require("./secret/config.json");

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
async function generateURL(host, url) { 
    var randStr = randomstring.generate({
        length: 5,
        charset: 'alphabetic'
    });

    var response = {
        url: url,
        short_url: `http://${host}/${randStr}`,
        randStr: randStr
    };
    await storeUrl(randStr, response)
    return response  
}

async function storeUrl(randStr ,response) {
    const docRef = await db.collection('Short').add(response)
}

async function getUrl(randStr,res) {
  try {
   const snapshot = await db.collection("Short").where("randStr", "==", randStr).get();
   snapshot.forEach((doc) => {
   console.log(doc.id, '=>', doc.data());
    data=doc.data();
    res.redirect(data['url']);
   })
  
  } catch (error) {
    console.log(error)
  }
}

app.post('/url', cors(), async  (req, res) => {
    var URL = req.body.url;
    let data = null;
    const host = req.get('host');
    
   try {
     console.log(URL)
    const snapshot = await db.collection("Short").where("url", "==", URL).get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
            data=doc.data()
      })
   
   } catch (error) {
     console.log(error)
   }
    
     if(data){
    res.json(data)
}else
var generatedURL = await generateURL(host, URL);
    if (generatedURL != null)
    res.json(generatedURL)
    else
    res.sendStatus(500)

});

app.get('/:short_url_id', cors(), async (req, res) => {
    var url = await getUrl(req.params.short_url_id, res)
});

app.listen(5000, () => {
  console.log("server is listening on port: 5000")
})
