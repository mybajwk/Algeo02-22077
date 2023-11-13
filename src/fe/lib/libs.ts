import JSZip from "jszip";

export async function getAllFileEntries(
  dataTransferItemList: DataTransferItemList
) {
  let fileEntries = [];
  let queue = [];
  for (let i = 0; i < dataTransferItemList.length; i++) {
    queue.push(dataTransferItemList[i].webkitGetAsEntry());
  }
  while (queue.length > 0) {
    let entry: any = queue.shift();
    if (entry.isFile) {
      fileEntries.push(entry);
    } else if (entry.isDirectory) {
      queue.push(...(await readAllDirectoryEntries(entry.createReader())));
    }
  }
  return fileEntries;
}

export async function getFile(fileEntry: any) {
  try {
    return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
  } catch (err) {
    console.log(err);
  }
}

async function readAllDirectoryEntries(directoryReader: any) {
  let entries = [];
  let readEntries: any = await readEntriesPromise(directoryReader);
  while (readEntries.length > 0) {
    entries.push(...readEntries);
    readEntries = await readEntriesPromise(directoryReader);
  }
  return entries;
}

async function readEntriesPromise(directoryReader: any) {
  try {
    return await new Promise((resolve, reject) => {
      directoryReader.readEntries(resolve, reject);
    });
  } catch (err) {
    console.log(err);
  }
}

export async function zipFilesUrl(images: File[]): Promise<string> {
  var zip = new JSZip();

  for (let i = 0; i < images.length; i++) {
    const buffer = await images[i].arrayBuffer();
    zip.file(`${images[i].name}`, buffer );
  }

  const archive = await zip.generateAsync({ type: "blob" });

  return URL.createObjectURL(archive);
}

export async function zipFilesBase64(images: File[]): Promise<string> {
  const zip = new JSZip();
  const promises = images.map(async (image) => {
    const buffer = await image.arrayBuffer();
    zip.file(`${image.name}`, buffer);
  });
  await Promise.all(promises);

  const archive = await zip.generateAsync({ type: "base64" });
  return archive;
}

export function convertFileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        // Remove the data URL prefix
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      } else {
        reject(new Error("Failed to read file as string"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };

    reader.readAsDataURL(file);
  });
}
