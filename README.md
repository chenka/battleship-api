# battleship-api
For interview

## Prerequisites
Node.js

MongoDB

## Installing
```
npm install
npm start
```

## API
`POST /attack/:gameId`

`POST /deploy/:gameId`

`POST /games`

`POST /attack/:gameId`


## User Interface
![image](https://user-images.githubusercontent.com/837612/29033923-d5221eba-7bc0-11e7-9c34-8e5133ce5ff6.png)

You can view game result at `/grids/:gameID


## Running the simulation
You have to start app by `npm start` before simulate.
Open new terminal and run `npm run simulate`

```
==== Start Game ===
Created new game. gameId is 177
deploy: deployed battleship to row: 1, column: 1
deploy: deployed cruiser to row: 1, column: 6
deploy: deployed cruiser to row: 1, column: 10
deploy: deployed destroyer to row: 5, column: 1
deploy: deployed destroyer to row: 10, column: 1
deploy: deployed destroyer to row: 10, column: 9
deploy: deployed submarine to row: 6, column: 5
deploy: deployed submarine to row: 6, column: 7
deploy: deployed submarine to row: 5, column: 10
deploy: deployed submarine to row: 7, column: 9
attack: row: 1 col: 1
attack: Hit
attack: row: 1 col: 2
attack: Hit
attack: row: 1 col: 3
attack: Hit
attack: row: 1 col: 4
attack: You just sank the battleship
attack: row: 9 col: 10
attack: Miss
attack: row: 1 col: 6
attack: Hit
attack: row: 1 col: 8
attack: Miss
attack: row: 1 col: 8
attack: already hit
attack: row: 2 col: 6
attack: Hit
attack: row: 2 col: 8
attack: Miss
attack: row: 3 col: 6
attack: You just sank the cruiser
attack: row: 1 col: 10
attack: Hit
attack: row: 2 col: 10
attack: Hit
attack: row: 3 col: 10
attack: You just sank the cruiser
attack: row: 5 col: 1
attack: Hit
attack: row: 6 col: 1
attack: You just sank the destroyer
attack: row: 10 col: 1
attack: Hit
attack: row: 10 col: 2
attack: You just sank the destroyer
attack: row: 7 col: 3
attack: Miss
attack: row: 10 col: 9
attack: Hit
attack: row: 10 col: 10
attack: You just sank the destroyer
attack: row: 9 col: 5
attack: Miss
attack: row: 5 col: 10
attack: You just sank the submarine
attack: row: 6 col: 5
attack: You just sank the submarine
attack: row: 6 col: 7
attack: You just sank the submarine
attack: row: 7 col: 9
attack: Win ! You completed the game in 25 moves. 5 missed shots
==== Game End ===
Visit simulation result at http://localhost:3000/grids/177
```



## Running the tests
`npm test`
