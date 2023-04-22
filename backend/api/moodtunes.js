const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require("openai");
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
      const test = "\n\n\"Happy\" by Pharrell Williams\n\"Don't Worry, Be Happy\" by Bobby McFerrin\n\"Can't Stop the Feeling!\" by Justin Timberlake\n\"Uptown Funk\" by Mark Ronson ft. Bruno Mars\n\"Good Life\" by OneRepublic"
        res.json({
            test: test,
        });
    }
}

module.exports = moodtunes;