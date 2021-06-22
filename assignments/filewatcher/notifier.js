const EventEmitter = require('events');
const FileWatcher = require('./filewatcher');

module.exports = class Notifier extends EventEmitter 
{
    notifyUser = (path, name) => 
    {
        const filewatcher = new FileWatcher(path);

        filewatcher.on('nameFoundOnFile', filename => 
        { 
            const mesage = `Your name was mentioned on file: ${filename}`;
            
            this.emit('openToastNotification', mesage);
            this.emit('printToConsole', mesage);
        });
        
        filewatcher.watchFile(name);
    }
};