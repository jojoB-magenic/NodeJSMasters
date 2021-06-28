const { pokemonService } = require('../services');
const qs = require('querystring') 
const url = require('url');

exports.handleGetRequest = (req, res) => {

    const { query } = url.parse(req.url)
    const { name } = qs.parse(query);

    const data = pokemonService.get(name);

    const result = { data };

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    res.write(JSON.stringify(result));
    res.end();
};

exports.handlePostRequest = (req, res) => {
    const data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    });

    req.on('end', () => {
        const parsedData = Buffer.concat(data).toString();
        const dataJson = JSON.parse(parsedData);

        const result = pokemonService.insert(dataJson);

        if (!result.success) {
            res.writeHead(400, {
                'Content-Type': 'application/json',
            });
            res.write(JSON.stringify(result));
            res.end();
        }

        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(result));
        res.end();
    });
};

exports.handleDeleteRequest = (req, res) => {

    const { query } = url.parse(req.url)
    const { name } = qs.parse(query);

    const data = pokemonService.delete(name);

    const result = { data };

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    
    res.write(JSON.stringify(result));
    res.end();
};

exports.handlePutRequest = (req, res) => {

    const { query } = url.parse(req.url)
    const { name } = qs.parse(query);

    const data = [];

    req.on('data', (chunk) => {
        data.push(chunk);
    });

    req.on('end', () => {
        const parsedData = Buffer.concat(data).toString();
        const dataJson = JSON.parse(parsedData);

        const result = pokemonService.update(dataJson, name);

        if (!result.success) {
            res.writeHead(400, {
                'Content-Type': 'application/json',
            });
            res.write(JSON.stringify(result));
            res.end();
        }

        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.write(JSON.stringify(result));
        res.end();
    });
};