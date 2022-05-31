// Details of Mime types: https://developers.google.com/drive/api/guides/mime-types
// Note Google Script uses the older Drive v2 API's: https://stackoverflow.com/questions/52100052/folder-searchfiles-method-raises-invalid-argument-q-error

const DATE = Utilities.formatDate(new Date(), "GMT+10", "dd/MM/yyyy HH:mm")
//Replace the below ID with the desired location. Can grab this from the URL when browsing Google Drive
const DESTINATION = DriveApp.getFolderById("1r4A2_O3pYthGZ1OZ-F1ez6FqHJbbjOwG").createFolder(DATE).getId(); // Created a sub folder with date/time


function backupForms(){
  var files = DriveApp.searchFiles('not title contains "Backup of -" and mimeType = "application/vnd.google-apps.form"');
  let counter = 0;
  while (files.hasNext()) {
    var file = files.next();
    // console.log(file.getName());
    var id = DriveApp.getFileById(file.getId());
    id.makeCopy("Backup of - " + file.getName(), DriveApp.getFolderById(DESTINATION));
    counter++
  }
  console.log("Forms backed up: " + counter)
}

function backupSites(){
  var files = DriveApp.searchFiles('not title contains "Backup of -" and mimeType = "application/vnd.google-apps.site"');
  let counter = 0;
  while (files.hasNext()) {
    var file = files.next();
    // console.log(file.getName());
    var id = DriveApp.getFileById(file.getId());
    id.makeCopy("Backup of - " + file.getName(), DriveApp.getFolderById(DESTINATION));
    counter++

  }
    console.log("Sites backed up: " + counter)
}

function backupFormsAndSites(){
  console.log("Backup has started")
  backupForms();
  backupSites();
  console.log("Backup has completed")
}
