import request from 'supertest'
import {app} from "../src";

describe('/', () => {
    beforeAll(async () => {
        await request(app).delete('/ht_01/api/testing/all-data')
    })

    it('show all videos', async () => {
        await request(app)
            .get('/hometask_01/api/videos')
            .expect(200, [])
    })

    let createdVideo: any = null;

    it('create new videos', async () => {
        const createResponse = await request(app)
            .post('/hometask_01/api/videos')
            .send({title: "avatar", author: "kameron", availableResolutions: "P144"})
            .expect(201)
        const createVideoObj = {
            id: createResponse.body.id,
            title: "avatar",
            author: "kameron",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: createResponse.body.createdAt,
            publicationDate: createResponse.body.publicationDate,
            availableResolutions: "P144"
        };

        createdVideo = createResponse.body;

        expect(createdVideo).toEqual(createVideoObj)
    })

    it('show video by Id', async () => {
        await request(app)
            .get('/hometask_01/api/videos/' + createdVideo.id)
            .expect(200)
    })


    it('update video', async () => {
        await request(app)
            .put('/hometask_01/api/videos/' + createdVideo.id)
            .send({
                title: "avatar2", author: "kameron2", availableResolutions: "P1442", canBeDownloaded: "true",
                minAgeRestriction: "18", publicationDate: "2022-12-11T15:37:04.679Z"
            })
            .expect(204)
    })

    it('show update video', async () => {
        await request(app)
            .get('/hometask_01/api/videos')
            .expect(200, [{...createdVideo,
                title: "avatar2", author: "kameron2",
                availableResolutions: "P1442", canBeDownloaded: "true",
                minAgeRestriction: "18",
                publicationDate: "2022-12-11T15:37:04.679Z"
            }])
    })

    it('delete video by Id', async () => {
        await request(app)
            .delete('/hometask_01/api/videos/' + createdVideo.id)
            .expect(204)
    })

    it('show delete video', async () => {
        await request(app)
            .get('/hometask_01/api/videos')
            .expect(200, [])
    })

})