import express, {Request, Response} from 'express'

const app = express()
const port = 3001

const parserMiddleware = express.json()

app.use(parserMiddleware)

let bdVideos = [
    { id : +(new Date()), title: "Video0", author : "Author0",
        canBeDownloaded: true, minAgeRestriction : null,
    createdAt : "2022-12-10T10:03:20.216Z",
    publicationDate : "publicationDate",
    availableResolutions : [ "P144" ]
    },
    { id : +(new Date()), title: "Video1", author : "Author1",
        canBeDownloaded: true, minAgeRestriction : null,
        createdAt : "2022-12-10T10:03:20.216Z",
        publicationDate : "publicationDate",
        availableResolutions : [ "P144" ]
    },
    { id : +(new Date()), title: "Video2", author : "Author2",
        canBeDownloaded: true, minAgeRestriction : null,
        createdAt : "2022-12-10T10:03:20.216Z",
        publicationDate : "publicationDate",
        availableResolutions : [ "P144" ]
    },
    { id : +(new Date()), title: "Video3", author : "Author3",
        canBeDownloaded: true, minAgeRestriction : null,
        createdAt : "2022-12-10T10:03:20.216Z",
        publicationDate : "publicationDate",
        availableResolutions : [ "P144" ]
    },
]

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {

    const newVideo = { id : +(new Date()),
        title : req.body.title, author : req.body.author,
        canBeDownloaded: true, minAgeRestriction : null,
        createdAt : "2022-12-10T10:03:20.216Z",
        publicationDate : "publicationDate",
        availableResolutions : req.body.availableResolutions}

    bdVideos.push(newVideo)

    res.json(newVideo)
})

app.get('/hometask_01/api/videos', (req: Request, res: Response) => {
    res.json(bdVideos)
})

app.get('/hometask_01/api/videos/{id}', (req: Request, res: Response) => {
    res.send('Hello Incubator! I am Backend-developer!')
})

app.put('/hometask_01/api/videos/{id}', (req: Request, res: Response) => {
    res.send('Hello Incubator! I am Backend-developer!')
})

app.delete('/hometask_01/api/videos/{id}', (req: Request, res: Response) => {
    res.send('Hello Incubator! I am Backend-developer!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
