const express = require("express");
const router = express.Router();
const knex = require("../db/client");

router.get("/cluckr/sign_in", (req, res) => {
  res.render("cluckr/sign_in")
});

router.get("/cluckr/new", (req, res) => {
  res.render("cluckr/new")
});

router.post("/cluckr/index", (req, res) => {
  knex("cluckr")
    .insert({
      username: req.cookies.username,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    })
    // .insert({
    //   timeAgo: timeSince(req.createdAt)
    // })
    .returning("*")
    .then( cluckr => {
      // console.log(cluckr.timeAgo)
      res.redirect("/cluckr/index");
    });
    
});

router.get("/cluckr/index", (req, res) => {
  knex("cluckr")
  .select("*")
  .orderBy("createdAt", "desc")
  //array of objects of cluckr
  .then(cluckr => {
    res.render("cluckr/index", { cluckrs: cluckr });
  });
});

router.get("/", (req, res) => {
  res.redirect("/cluckr/index");
});
router.get("/clucks", (req, res) => {
  res.redirect("/cluckr/index");
});

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}


module.exports = router;