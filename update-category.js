const mongoose = require('mongoose');

async function update() {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    console.error("MONGODB_URI is not set in the environment variables.");
    process.exit(1);
  }
  await mongoose.connect(URI);
  
  const Member = mongoose.connection.collection('members');
  await Member.updateMany(
    { role: { $regex: /mentor/i } },
    { $set: { category: 'MENTOR' } }
  );
  
  console.log("Updated Mentors!");
  process.exit(0);
}

update();
