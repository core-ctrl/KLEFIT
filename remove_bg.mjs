import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';

async function run() {
  console.log("Downloading image...");
  const res = await fetch('https://res.cloudinary.com/dkrvtfbor/image/upload/v1790065026/IMG-20260909-WA0097_ewsx4r.jpg');
  const buffer = await res.arrayBuffer();
  const blob = new Blob([buffer], { type: 'image/jpeg' });
  
  console.log("Removing background...");
  const resultBlob = await removeBackground(blob);
  
  console.log("Saving image...");
  const outBuffer = await resultBlob.arrayBuffer();
  fs.writeFileSync('./public/group-cutout.png', Buffer.from(outBuffer));
  console.log("Done!");
}

run().catch(console.error);
