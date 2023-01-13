# Execution
## run container
* please pull image from lettlebread/movie_list
* forward port 3000 to the container

## access web page
please use follow url
```
http://<server doamin>:<port>
```

## build image
```
docker build -t <image name>:<image version> . --build-arg MONGO_PWD=<mongodb password>}
```

# Develop Notes
## Next.js
* Since the test is a fullstack app, I use Next.js to build both front and backend side
* APIs are placed in pages/api
* The main page uses SSR to preload the movie list

## data storage
* I used mongoDB for data storage because I have a ready-made environment on mongoDB atlas
* There are two collection: movies, comments in database; comments has a property "movieId" which related to movie document