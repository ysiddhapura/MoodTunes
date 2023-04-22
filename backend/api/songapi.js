const getAccessToken = require("../auth.js");
const axios = require("axios");
const dotenv = require("dotenv");
const json = require("express");
class songapi{
    static async getSonginfo(req, res){
        const token = await getAccessToken();
        const songName =  req.songName;
        const artistName = "Ed Sheeran"
        //const query = encodeURI(`track:${songName} artist:${artistName}`);
        let query = encodeURIComponent(`track:${songName} artist:${artistName}`)
        let url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;
        console.log(url)
      
      ////

      //let response = {}
      
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
        return res.json({
          url: url,
          songName: songName,
          artistName: artistName
        })
      })
      .catch((error) => {
        console.error(error)
      })
     
      /*
      let resAxios = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      let spotifyResult = resAxios.data;
     
        let link = spotifyResult.tracks.items[0].external_urls.spotify;
        let song = spotifyResult.tracks.items[0].name;
        let artist = spotifyResult.tracks.items[0].artists[0].name;
        console.log(spotifyResult)
        return spotifyResult;*/
    }
    
    
}

module.exports = songapi;