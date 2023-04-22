mongodb = require("mongodb")


const ObjectId = mongodb.ObjectId;

let dailytodo;

class dailyDAO
{
    static async injectDB(conn)
    {
        if(dailytodo)
        {
            return;
        }
        try{
            dailytodo = await conn.db(process.env.REV_NS).collection("daily")
        }catch(err)
        {
            console.error(
                `Unable to establish a collection handle in /api/dao/dailyDAO.js: ${err}`,
            )
        }
    } 

    static async getAll()
    {
        let cursor;
        try
        {
            cursor= await dailytodo.find()
        }
        catch(err)
        {
            console.error(`Unable to issue find command, ${err}`)
            return [];
        }

        try
        {
            const TodoList = await cursor.toArray();
            return TodoList;
        }
        catch(err)
        {
            console.error(`Unable to convert cursor to array or problem counting documents, ${err}`);
            return [];
        }
    }

    static async test(token)
    {
        try
        {
            const todoDoc = 
            {
                title : title,
                sev  : sev,
                date : date
            }

            return await dailytodo.insertOne(todoDoc);
        }
        catch(e)
        {
            console.error(`Unable to add todo: ${e}`);
            return { error : e};
        }
    }
}