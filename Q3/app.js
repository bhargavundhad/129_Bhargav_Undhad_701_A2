const express = require("express");
const session = require("express-session");
const ConnectRedis = require("connect-redis");
const { createClient } = require("redis");

const app = express();
const PORT = 8000;

// Redis client setup
const redisClient = createClient();
redisClient.connect().catch(console.error);

// Get RedisStore class from connect-redis
const RedisStore = ConnectRedis.RedisStore;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "SecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60000,
    },
  })
);

// Routes
app.get("/", (req, res) => {
  if (req.session.loggedIn) {
    res.send(`
      <html>
        <head>
          <link rel="stylesheet" href="/styles/style.css">
        </head>
        <body>
          <div class="container">
            <h2>Welcome, ${req.session.username}!</h2>
            <a href="/logout">Logout</a>
          </div>
        </body>
      </html>
    `);
  } else {
    res.send(`
      <html>
        <head>
          <link rel="stylesheet" href="/styles/style.css">
        </head>
        <body>
          <div class="container">
            <h2>Login</h2>
            <form method="POST" action="/login">
              <input name="username" placeholder="Username" required />
              <input name="password" type="password" placeholder="Password" required />
              <button type="submit">Login</button>
            </form>
          </div>
        </body>
      </html>
    `);
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "bhargav" && password === "bhargav1312") {
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect("/");
  } else {
    res.send('<p>Invalid credentials. <a href="/">Try again</a></p>');
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
