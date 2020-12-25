const FirebaseClient = require('firebase-client')
const fs = require('fs');
const { exit } = require('process');

var firebase = new FirebaseClient({url:"https://technion-cs-drive.firebaseio.com"})

function timeStamp() {
    // Create a date object with the current time
      var now = new Date();
    
    // Create an array with the current month, day and time
      var date = [ now.getFullYear() , now.getDate(), now.getMonth() + 1 ];
    
    // Create an array with the current hour, minute and second
      var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
     
    // If seconds and minutes are less than 10, add a zero
      for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
          time[i] = "0" + time[i];
        }
      }
    
    // Return the formatted string
      return date.join("_") +"--" +time.join("_");
}

async function backup(firebasePath='/', downloadfolder='.'){
    let data = await firebase.get(firebasePath)
    save_path = `${downloadfolder}/CS-Drive-Firebase-Backup-${timeStamp()}.json`
    fs.writeFileSync(save_path, JSON.stringify(data))
}

if (require.main === module) {
    const minimist = require('minimist');

    let args = minimist(process.argv.slice(2), {
        default: {
            firebasePath: '/',
            downloadfolder: './firebase-backup',
        },
    });

    if ('h' in args || 'help' in args){
        console.log()
        console.log('This script will create a backup for the firebase database with a timestamp')
        console.log('=============================================')
        console.log('FIRST INSTALL Node.js and open terminal')
        console.log('MAKE SURE TO RUN:')
        console.log('   > npm install ')
        console.log('USAGE:')
        console.log('   > node firebase-backup.js -firebasePath <chosen path, default\'=\'/> -downloadfolder <where to backup, default=\'.\'>')
        console.log('=============================================')

        exit(0)
    }
    var dir = args.downloadfolder;
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    backup(args.firebasePath, args.downloadfolder)
}