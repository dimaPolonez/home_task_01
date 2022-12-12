import express, {Request, Response} from 'express'

export const app = express()
const port = process.env.PORT || 3001

const parserMiddleware = express.json()

app.use(parserMiddleware)

const newDate = new Date();

const newDateCreated = newDate.toISOString();

const newDatePublic = new Date(newDate.setDate(newDate.getDate() + 1)).toISOString();

let errorsArray: any = [];


let bdVideos = [
    {
        id: 1, title: "Video0", author: "Author0",
        canBeDownloaded: false, minAgeRestriction: null,
        createdAt: newDateCreated,
        publicationDate: newDatePublic,
        availableResolutions: ["P144"]
    }
]

app.get('/', (req: Request, res: Response) => {
    res.json('Hello, server start!')
})

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
    const title = req.body.title;
    const author = req.body.author;

    errorsArray = [];

    if (!title || !title.trim() || typeof title !== "string" || title.length > 40) {

        errorsArray.push({
            message: "Incorrect title",
            field: "title"
        })
    }

    if (!author || !author.trim() || typeof author !== "string" || author.length > 20) {
        errorsArray.push({
            message: "Incorrect author",
            field: "author"
        })
    }

    if (errorsArray.length > 0 ) {
        res
            .sendStatus(400)
            .send(
                {"errorsMessages": errorsArray})
        return;
    }

    const newVideo = {
        id: +(newDate),
        title: req.body.title, author: req.body.author,
        canBeDownloaded: false, minAgeRestriction: null,
        createdAt: newDateCreated,
        publicationDate: newDatePublic,
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
    const canBeDownloaded = req.body.canBeDownloaded;

    errorsArray = [];


    if (!title || !title.trim() || typeof title !== "string" || title.length > 40) {

        errorsArray.push({
            message: "Incorrect title",
            field: "title"
        })
    }

    if (!author || !author.trim() || typeof author !== "string" || author.length > 20) {
        errorsArray.push({
            message: "Incorrect author",
            field: "author"
        })
    }

    if (!canBeDownloaded || !canBeDownloaded.trim() || typeof canBeDownloaded !== "boolean") {
        errorsArray.push({
            message: "Incorrect canBeDownloaded",
            field: "canBeDownloaded"
        })
    }

    if (errorsArray.length > 0 ) {
        res
            .sendStatus(400)
            .send(
                {"errorsMessages": errorsArray})
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

app.delete('/hometask_01/api/testing/all-data', (req: Request, res: Response) => {
    bdVideos = []

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
