const { server } = require("./consumer")

server.listen(5002, () => {
  console.log("Frontend running on http://localhost:5002")
})