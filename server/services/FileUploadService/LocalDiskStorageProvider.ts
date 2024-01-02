// // LocalDiskStorageProvider.js
// import fs from 'fs';
// import path from 'path';
// import fileConfig from '../../config/fileConfig';
// import { resourceTypes } from '../../types';
// import { config } from 'dotenv';

// config({ path: '../../.env' });

// class LocalDiskStorageProvider {
//   uploadDirectory: string;
//   constructor() {
//     this.uploadDirectory = fileConfig.disks.local.root;
//   }

//   // Method to save the file to the disk
//   uploadFile(
//     file: Express.Multer.File,
//     resource_type: resourceTypes,
//     folder: string,
//   ) {
//     return new Promise((resolve, reject) => {
//       fs.rename(
//         file.path,
//         path.join((<any>process).env.UPLOADS_DIR, file.filename),
//         (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(`${process.env.UPLOADS_DIR}/${file.filename}`);
//           }
//         },
//       );
//     });
//   }

//   // Method to delete a file from the disk
//   removeFile(filename: any) {
//     // return new Promise((resolve, reject) => {
//     //   fs.unlink(path.join(this.uploadDirectory, filename), (err) => {
//     //     if (err) {
//     //       reject(err);
//     //     } else {
//     //       resolve();
//     //     }
//     //   });
//     // });
//   }
// }

// export default LocalDiskStorageProvider;


import fs from 'fs';
import path from 'path';
import fileConfig from '../../config/fileConfig';
import { resourceTypes } from '../../types';
import { config } from 'dotenv';

config({ path: '../../.env' });

class LocalDiskStorageProvider {
  uploadDirectory: string;
  constructor() {
    this.uploadDirectory = fileConfig.disks.local.root;
  }

  // Method to save the file to the disk
  uploadFile(
    file: Express.Multer.File,
    resource_type: resourceTypes,
    folder: string,
  ) {
    return new Promise((resolve, reject) => {
      //move file from the uploads to another folder
      fs.rename(
        file.path,
        path.join((<any>process).env.UPLOADS_DIR, file.filename),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(`${process.env.UPLOADS_DIR}/${file.filename}`);
          }
        },
      );
    });
  }

  // Method to delete a file from the disk
  removeFile(filename: any) {
    // return new Promise((resolve, reject) => {
    //   fs.unlink(path.join(this.uploadDirectory, filename), (err) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve();
    //     }
    //   });
    // });
  }
}

export default LocalDiskStorageProvider;

