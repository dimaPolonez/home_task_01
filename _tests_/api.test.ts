import request from 'supertest'
import {app} from "../src";

describe('/', () => {
    beforeAll(async () => {
        await request(app).delete('/_test_/data')
    })

    it('show all videos', async () => {
        await request(app)
            .get('/hometask_01/api/videos')
            .expect(200, [])
    })

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
            minAgeRestriction : null,
            createdAt : createResponse.body.createdAt,
            publicationDate : createResponse.body.publicationDate,
            availableResolutions: "P144"
        };

    expect(createResponse.body).toEqual(createVideoObj)

    })


})