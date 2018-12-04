var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose')
Foos = mongoose.model('Foos'),
    asyncHandler = require('express-async-handler');

module.exports = function (app, config) {
    app.use('/api', router);


    router.get('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Get all foos');
        let query = Foos.find();
        query.sort(req.query.order)
        await query.exec().then(result => {
            res.status(200).json(result);
        })
    }));


    router.get('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Get foos %s', req.params.id);
        await Foos.findById(req.params.id).then(result => {
            res.status(200).json(result);
        })
    }));

    router.post('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Creating foo');
        var foos = new Foos(req.body);
        const result = await foos.save()
        //  .then(result => {
        res.status(201).json(result);

    }));

    router.put('/foos', asyncHandler(async (req, res) => {
        logger.log('info', 'Updating foos');
        await Foos.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
            .then(result => {
                res.status(200).json(result);
            })
    }));


    router.delete('/foos/:id', asyncHandler(async (req, res) => {
        logger.log('info', 'Deleting foo %s', req.params.id);
        await Foos.remove({ _id: req.params.id })
            .then(result => {
                res.status(200).json(result);
            })
    }));


};
