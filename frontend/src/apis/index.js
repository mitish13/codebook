import axios from "axios";

// export default axios.create({
//   baseURL: "https://codebookbackend.onrender.com",
// });

console.log(process.env.PORT);

export default axios.create({
baseURL: "http://localhost:8008/"
}) 