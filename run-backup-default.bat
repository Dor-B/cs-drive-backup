ECHO OFF
cd "C:\Users\Dor\Desktop\cs-drive\cs-drive-backup"
ECHO (Make sure first time to clone using git, install Node.js and run npm install in this folder)
ECHO BACKING UP EVRYTHING INTO firebase-backup folder
node firebase-backup.js
ECHO UPLOADING TO GITHUB
git add -A
git commit -m "Backup default"
git push origin master
PAUSE