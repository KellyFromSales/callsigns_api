const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/callsigns");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5001;
}

app.post("/callsigns", async (req, res) => {
  const callsign = req.body

  if(!callsign || !callsign.Callsign){
    res.status(400)
    res.send({message:'Missing Callsign!', body: req.body})
    return
  }
  const results = await db.addCallsign(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/callsigns", async (req, res) => {
  const Callsigns = await db.getAllCallsigns();
  res.status(200).json({ Callsigns });
});

app.get("/callsigns/:id", async (req, res) => {
  const Callsign = await db.getCallsign(req.params.id);
  if(Callsign.length > 0) {
    res.status(200).json({ Callsign });
  } else {
    res.status(404)
    res.send({message: 'Callsign not found!'})
  }

});

app.get("/callsigns/level/:level", async (req, res) => {
  if(req.params.level == 'Full' || req.params.level == 'Intermediate' || req.params.level == 'Foundation'){
    const Callsigns = await db.getCallsignByLevel(req.params.level);
    res.status(200).json({ Callsigns });
  } else{
    res.status(404)
    res.send({message: 'Invalid Level!'})
  }

});

app.patch("/callsigns/:id", async (req, res) => {
  const Callsign = await db.updateCallsign(req.params.id, req.body);
  res.status(200).json({ Callsign });
});

app.delete("/callsigns/:id", async (req, res) => {
  await db.deleteCallsign(req.params.id);
  res.status(200).json({ sucess: true });
});

app.listen(port, () => console.log("server is listening"));
