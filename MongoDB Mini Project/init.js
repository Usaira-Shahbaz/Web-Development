const mongoose = require("mongoose");

const chats = require("./models/chats.js");

chats.insertMany([
    {
        from: "usaira",
        to: "shahbaz",
        msg: "Send me a message",
        created_at: new Date()
    },
    {
        from: "shahbaz",
        to: "usaira",
        msg: "hey bro.....",
        created_at: new Date()
    },
    {
        from: "usaira",
        to: "shahbaz",
        msg: "Send me a message",
        created_at: new Date()
    },
    {
        from: "hussain",
        to: "aion",
        msg: "Nowadays Facebook has a big community",
        created_at: new Date()
    },
    {
        from: "haris",
        to: "huzaifa",
        msg: "Keep working hard",
        created_at: new Date()
    },
    {
        from: "farooq",
        to: "zohaib",
        msg: "Best cricket in the world....",
        created_at: new Date()
    },
    {
        from: "dawood",
        to: "qasim",
        msg: "I am sending you a mail...",
        created_at: new Date()
    }
]).then((res) => console.log(res))
.catch((err) => console.log(err));
