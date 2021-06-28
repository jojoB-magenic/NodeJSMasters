const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../pokemon.json');
const db = lowdb(adapter);

db.defaults({ pokemons: [] }).write();

exports.get = (name) => {

    let pokemons;

    if (name) {
        pokemons = 
        db
            .get('pokemons')
            .find({name:`${name}`})
            .value();
        console.log(pokemons);
    } else {
        pokemons = db.get('pokemons').value();
    }

    return pokemons;
};

exports.insert = (pokemon) => {
    const { name } = pokemon;

    const isPokemonExist =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name === name).length > 0;

    if (isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${name} already exist.`,
        };
    }

    db.get('pokemons').push(pokemon).write();

    return {
        success: true,
    };
};

exports.delete = (name) => {

    const isPokemonExist =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name === name).length > 0;

    if (!isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${name} does not exist.`,
        };
    }

    db.get('pokemons').remove({name:`${name}`}).write();

    return {
        success: true,
    };
};

exports.update = (pokemon, name) => {

    const { type,  generation } = pokemon;

    const isPokemonExist =
        db
            .get('pokemons')
            .value()
            .filter((_) => _.name === name).length > 0;

    if (!isPokemonExist) {
        return {
            success: false,
            errorMessage: `Pokemon ${name} does not exist.`,
        };
    }

    if (type) {
        if (generation) {
            db
            .get('pokemons')
            .find({ name:`${name}` })
            .assign({ type: `${type}`, generation: `${generation}` })
            .write()
        } else {
            db
            .get('pokemons')
            .find({ name:`${name}` })
            .assign({ type: `${type}` })
            .write()
        }        
    } else {
        return {
            success: false,
            errorMessage: 'Update fail, type property is missing and/or blank',
        };
    }
    
    return {
        success: true,
    };
};