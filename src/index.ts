import express, {Request, Response} from 'express'

const app = express()
const port = 3001

const parserMiddleware = express.json()

app.use(parserMiddleware)

let bdVideos = [
    { id : 1, title: "Video0", author : "Author0",
        canBeDownloaded: true, minAgeRestriction : null,
    createdAt : "2022-12-10T10:03:20.216Z",
    publicationDate : "publicationDate",
    availableResolutions : [ "P144" ]
    },
    { id : 2, title: "Video1", author : "Author1",
        canBeDownloaded: true, minAgeRestriction : null,
        createdAt : "2022-12-10T10:03:20.216Z",
        publicationDate : "publicationDate",
        availableResolutions : [ "P144" ]
    },
    { id : 3, title: "Video2", author : "Author2",
        canBeDownloaded: true, minAgeRestriction : null,
        createdAt : "2022-12-10T10:03:20.216Z",
        publicationDate : "publicationDate",
        availableResolutions : [ "P144" ]
    },
    { id : 4, title: "Video3", author : "Author3",
        canBeDownloaded: true, minAgeRestriction : null,
        createdAt : "2022-12-10T10:03:20.216Z",
        publicationDate : "publicationDate",
        availableResolutions : [ "P144" ]
    },
]

app.get('/', (req: Request, res: Response) => {
    res.json('Hello, server start!')
})

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

app.get('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    const findId = bdVideos.find(v => v.id === +req.params.id)

    if (!findId) {
        res.sendStatus(404)
        return;
    }

    res.json(findId)
})

app.put('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    let findId = bdVideos.find(v => v.id === +req.params.id)

    if (!findId) {
        res.sendStatus(404)
        return;
    }

/*    if ((req.body.title && req.body.author && req.body.availableResolutions && req.body.canBeDownloaded &&
        req.body.minAgeRestriction && req.body.publicationDate) != undefined) {
        findId.title = req.body.title
        findId.author = req.body.author
        findId.availableResolutions = req.body.availableResolutions
        findId.canBeDownloaded = req.body.canBeDownloaded
        findId.minAgeRestriction = req.body.minAgeRestriction
        findId.publicationDate = req.body.publicationDate
        res.sendStatus(204)
    } else {
        res.sendStatus(400)
    }*/

    findId.title = req.body.title
    findId.author = req.body.author
    findId.availableResolutions = req.body.availableResolutions
    findId.canBeDownloaded = req.body.canBeDownloaded
    findId.minAgeRestriction = req.body.minAgeRestriction
    findId.publicationDate = req.body.publicationDate
    res.sendStatus(204)


})

app.delete('/hometask_01/api/videos/:id', (req: Request, res: Response) => {

    if (!req.params.id) {
        res.sendStatus(404)
        return;
    }

    bdVideos = bdVideos.filter(v => v.id !== +req.params.id)

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
