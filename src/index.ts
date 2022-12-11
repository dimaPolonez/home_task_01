import express, {Request, Response} from 'express'

export const app = express()
const port = process.env.PORT || 3001

const parserMiddleware = express.json()

app.use(parserMiddleware)

let bdVideos = [
    {
        id: 1, title: "Video0", author: "Author0",
        canBeDownloaded: true, minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: ["P144"]
    }
]

app.get('/', (req: Request, res: Response) => {
    res.json('Hello, server start!')
})

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
    const title = req.body.title;
    const author = req.body.author;

    if (!title || !title.trim() || typeof title !== "string") {
        res
            .status(400)
            .send({
                errorsMessages: [
                    {
                        "message": "Incorrect values",
                        "field": "title"
                    }
                ]
            })
        return;
    }

    if (!author || !author.trim() || typeof author !== "string") {
        res
            .status(400)
            .send({
                errorsMessages: [
                    {
                        "message": "Incorrect values",
                        "field": "author"
                    }
                ]
            })
        return;
    }

    const newVideo = {
        id: +(new Date()),
        title: req.body.title, author: req.body.author,
        canBeDownloaded: true, minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: req.body.availableResolutions
    }

    bdVideos.push(newVideo)

    res
        .status(201)
        .json(newVideo)
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

    const title = req.body.title;
    const author = req.body.author;

    if (!title || !title.trim() || typeof title !== "string") {
        res
            .status(400)
            .send({
                errorsMessages: [
                    {
                        "message": "Incorrect values",
                        "field": "title"
                    }
                ]
            })
        return;
    }

    if (!author || !author.trim() || typeof author !== "string") {
        res
            .status(400)
            .send({
                errorsMessages: [
                    {
                        "message": "Incorrect values",
                        "field": "author"
                    }
                ]
            })
        return;
    }

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

app.delete('/ht_01/api/testing/all-data', (req: Request, res: Response) => {
    bdVideos = []

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
