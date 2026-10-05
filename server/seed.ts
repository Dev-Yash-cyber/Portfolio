import { connectDB } from './config/db';
import { ProjectModel } from './models/Project';
import { BlogPostModel } from './models/BlogPost';
import { SettingModel } from './models/Setting';
import { MessageModel } from './models/Message';
import { projectsData } from '../src/data/projectsData';
import { blogPostsData } from '../src/data/blogData';
import { developerData } from '../src/data/portfolioData';

async function seed() {
  console.log('🚀 Connecting to MongoDB Atlas...');
  await connectDB();

  console.log('📦 Seeding projects to MongoDB Atlas...');
  for (const p of projectsData) {
    await ProjectModel.findOneAndUpdate(
      { id: p.id },
      { $set: p },
      { upsert: true, new: true }
    );
  }
  const projectCount = await ProjectModel.countDocuments();
  console.log(`✅ Projects seeded: ${projectCount} total in MongoDB.`);

  console.log('📝 Seeding blog posts to MongoDB Atlas...');
  for (const b of blogPostsData) {
    await BlogPostModel.findOneAndUpdate(
      { id: b.id },
      { $set: b },
      { upsert: true, new: true }
    );
  }
  const blogCount = await BlogPostModel.countDocuments();
  console.log(`✅ Blog posts seeded: ${blogCount} total in MongoDB.`);

  console.log('⚙️ Seeding developer settings to MongoDB Atlas...');
  await SettingModel.findOneAndUpdate(
    {},
    { $set: developerData },
    { upsert: true, new: true }
  );
  console.log('✅ Developer settings seeded in MongoDB.');

  const messageCount = await MessageModel.countDocuments();
  console.log(`💬 Inquiries in database: ${messageCount}`);

  console.log('🎉 Database synchronization complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
