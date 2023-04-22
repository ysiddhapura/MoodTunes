const getAccessToken = require("../auth.js");
const axios = require("axios");
const dotenv = require("dotenv");

class test{
    static async gettest(req, res){
        const token = await getAccessToken();
        const songName = "Shape of you"
        const artistName = "Ed Sheeran"
        console.log(token)
        const query = encodeURIComponent(`track:${songName} artist:${artistName}`);
        const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`;
      
        const headers = {
            'Authorization': `Bearer ${token}`
          };
        
          try {
            const response = await axios.get(url, { headers: headers });
            
            const data = response.data;
            res.send(response)
          } catch (e) {
            res.status(500).json({error:e.message});
          }
      
      
    }

    
}

module.exports = test;