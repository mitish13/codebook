import axios from "axios";

console.log(process.env.PORT);


// export default axios.create({
// baseURL: "https://d2z1wkwnktfscs.cloudfront.net/api/"
// }) 

// Alternate deployement on onrender; for cost optimization
export default axios.create({
baseURL: "https://codebookbackend.onrender.com/api/"
}) 