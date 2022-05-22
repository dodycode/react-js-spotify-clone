# React JS Spotify Clone
Simple react js web that consume data from Spotify WEB API <br /> <br />
![screenshot-desktop](https://i.imgur.com/EsG3Qqc.png)

## How to run
- First you need Client ID and Client Secret from your Spotify Account. You can get it from here: <br />
<a href="https://developer.spotify.com/dashboard/">Spotify Developers Dashboard</a>

- And then, at the dashboard page, please click edit settings and put callback url like this <br />
![screenshot-callback](https://i.imgur.com/QEP50Bf.png)

- Then open user and settings and add your spotify account, like this <br />
![screenshot-user](https://i.imgur.com/cx0WOpp.png)

- Copy env.example to .env and fill the client id and secret.
```bash
cp .env.example .env
```

- Install dependencies
```bash
yarn install

#or

npm install
```

- Run the app
```bash
yarn start

#or

npm start
```