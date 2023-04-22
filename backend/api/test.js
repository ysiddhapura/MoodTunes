const getAccessToken = require("../auth.js");
const axios = require("axios");
const dotenv = require("dotenv");

class test{
    static async gettest(req, res){
        //console.log(req)
        const token = await getAccessToken();
        const songName = req.body.songName
        console.log(songName)
        const artistName = req.body.artistName
        const query = encodeURIComponent(`track:${songName} artist:${artistName}`);
        const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;
      
      ////
      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then((resAxios) => {
        //console.log(resAxios.data)
        let spotifyResult = resAxios.data;
        let url = spotifyResult.tracks.items[0].external_urls.spotify;
        let songName = spotifyResult.tracks.items[0].name;
        let artistName = spotifyResult.tracks.items[0].artists[0].name;
  res.json({
    url: url,
    songName: songName,
    artistName: artistName
  })
      })
      .catch((error) => {
        console.error(error)
      })
      
    }
    /*
    function a{
        req.text = //query
        //input qeury in chat gptprompt
        //response will have a huge text
        //split into 5
        //for loop and search for each song
            //we package into json
        //res json will have array of json
    }*/
    
    
}

module.exports = test;