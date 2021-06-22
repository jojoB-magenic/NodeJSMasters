const NodeNotifier = require('node-notifier');
const Notifier = require('./notifier');
const Yargs = require("yargs");
const Fs = require('fs');

const args = Yargs.argv;

if (args.name && args.path) 
{
    const name = args.name;
    const path = args.path;

    Fs.access(path, Fs.constants.F_OK, err => 
    {
        if (err) 
        {
            console.error(`${path} does not exist.`); 
        } 
        else 
        {
            console.log(`Watching path: ${path}`);

            const notifier = new Notifier();

            notifier.on('openToastNotification', message => 
            {
                NodeNotifier.notify(
                {
                    title: 'File Watcher', 
                    message
                });
            });

            notifier.on('printToConsole', message => 
            {
                console.log(message);
            });

            notifier.notifyUser(path, name);
        }
    });
} 
else 
{
    console.error('Please provide name and path.');
}