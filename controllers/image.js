
const handleApiCall = (req, res) => {
    const PAT = '2a7d4bc9c8944f26a87ece770143e1af';
    const USER_ID = 'gadiklyte';
    const APP_ID = 'my-first-application-2uchra';
    const MODEL_ID = 'face-detection';
    const IMAGE_URL = req.body.input;

    const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
    const stub = ClarifaiStub.grpc();
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);
  
    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            inputs: [
                {
                    data: {
                        image: {
                            url: IMAGE_URL,
                            allow_duplicate_url: true
                        }
                    }
                }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }
            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }
            const output = response.outputs[0];
            return res.json(output)
                });
            }

const handleImage = (req, res, knex) => {
    const { id } = req.body;
    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}