const { exec } = require('child_process');
const { database } = require('../config/keys');

exports.backupDatabase = async (type) => {
    const today = new Date();
  const backupPath = `db_backup/${today.getFullYear()}_${today.getMonth()}_${today.getDate()}_${type}`; // Set the path where you want to store the backups
  const command = `mongodump --uri ${database.url} --out ${backupPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Backup failed: ${error}`);
    } else {
      console.log(`Backup successful: ${backupPath}`);
    }
  });
};
