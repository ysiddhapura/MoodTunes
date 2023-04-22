const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
class moodtunes {
    static async getSongsbyMood(req,res) {
        //console.log(req.query.mood);
        const mood = req.body.mood;
        const query = `user wants ${mood}, recommend me 5 songs and their artists, one song per line in the format: Song Title by Artist Name.`
        /*
        const configuration = new Configuration({
            apiKey: process.env.GPT_AUTH,
          });
          const openai = new OpenAIApi(configuration);
          
        const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        temperature: 0,
        max_tokens: 1000,
      });
      const test = response.data.choices[0].text;*/

       const test = "\n\n\"Happy\" by Pharrell Williams\n\"Don't Worry, Be Happy\" by Bobby McFerrin\n\"Can't Stop the Feeling!\" by Justin Timberlake\n\"Uptown Funk\" by Mark Ronson ft. Bruno Mars\n\"Good Life\" by OneRepublic";

      const lines = test.split("\n").filter(line => line.trim() !== '');
      
      const songs = [];
      const artists = [];
      
      lines.forEach(line => {
        const [song, artist] = line.split(" by ");
        songs.push(song.trim().slice(1, -1));
        artists.push(artist.trim());
      });
      const songName = "Shape of you"
        const artistName = "Ed Sheeran"
        const data = {
            songName: songs[0],
            artistName: artists[0]
        }
      axios.get('http://localhost:8000/api/v1/moodtunes/test',{data})
      .then((resAxios) => {
        
        return res.json(resAxios.data)
      })
      .catch((error) => {
        console.error(error)
      })

    
    }
}

module.exports = moodtunes;