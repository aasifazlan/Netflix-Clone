import express from 'express';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))
app.options('*', cors());  // Handle preflight requests


const PORT=ENV_VARS.PORT

app.use(express.json()) // this allow us to parse req.body
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", movieRoutes)





app.listen(PORT, () => {
    console.log('Server is running at http://localhost:5000/');
    connectDB()
});


// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
//   }
// };

// fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));