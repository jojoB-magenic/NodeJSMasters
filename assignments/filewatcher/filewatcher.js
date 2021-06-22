const EventEmitter = require('events');
const Path = require('path');
const Fs = require('fs');

module.exports = class FileWatcher extends EventEmitter 
{
    constructor(dir) 
    {
        super();
        this.dir = dir;
    }

    watchFile = searchname => 
    {
        Fs.watch(this.dir, {recursive : true}, (eventType, filename) => 
        {
            const updatedFilename = Path.join(this.dir, filename);

            if (Fs.existsSync(updatedFilename) && Fs.lstatSync(updatedFilename).isFile()) 
            {
                Fs.readFile(updatedFilename, 'utf-8', (err, data) => 
                {                    
                    if (new RegExp("\\b" + String(searchname).toUpperCase() + "\\b").test(String(data).toUpperCase()))
                    {
                        this.emit('nameFoundOnFile', filename);
                    }
                });
            }
        });
    }
};