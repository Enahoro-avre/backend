import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import 'dotenv/config'
import { Options } from "./schema.js";
import { User } from "./schema.js";
//import { data } from "./data.js";



mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('[Error connecting to MongoDB]:', error);
});


const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT  || 5000

// app.get('/' , async(req , res)=>{

//     try {
//         const options = { ordered: true };
//         const option =  await Options.insertMany(data)
//         res.status(200).json(option)
//       }

//       res.
//     } catch (error) {
//       res.status(500).send(error);
//     }
// });

app.get('/' , async(req , res)=> {
  try {
    const options = await Options.find({})
    res.send(options)
  } catch (error) {
    res.status(500).json({ message: error})
  }
})


app.post('/' , async (req , res)=> {
  const body = req.body
  // console.log(body)
    try {
      const user = new User(body)
      await user.save()
      res.status(200).json(user)
    } catch (error) {
      res.status(500).send(error); 
    }
})

app.get('/user', async (req, res) => {
  try {
    const user = await User.find({}).sort({ _id: -1 });
    res.send(user)
  } catch (error) {
   
    res.status(500).send(error);

  }
});

app.get('/:id' , async(req , res)=> {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    res.send(user)
  } catch (error) {
    res.status(500).send(error) 
  }
})

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, SelectOption, agreed } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        name, SelectOption, agreed
      },
      { new: true }
    );
    // console.log("edited user" , user)
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.delete('/:id', async(req, res) => {
  const { id } = req.params

  try {
    const user = await User.findByIdAndDelete(id)
    // console.log(user)
    res.send({message: "deleted"})
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
})

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});