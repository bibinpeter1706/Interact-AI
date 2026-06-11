const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = 'D:/interactai/products';
const targetDir = 'D:/interactai/public/products';

const mapping = {
  'Voice Agent.png': 'voice-agent.webp',
  'WhatsApp Agent.png': 'whatsapp.webp',
  'Web Chat Widget.png': 'web-assistant.webp',
  'Integrations Hub.png': 'integrations.webp',
  'No-Code Builder.png': 'visual-builder.webp',
  'Analytics Dashboard.png': 'analytics.webp'
};

async function compress() {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  for (const [sourceName, targetName] of Object.entries(mapping)) {
    const sourcePath = path.join(sourceDir, sourceName);
    const targetPath = path.join(targetDir, targetName);

    if (fs.existsSync(sourcePath)) {
      console.log(`Compressing ${sourceName} -> ${targetName}...`);
      await sharp(sourcePath)
        .resize(1200) // Resize to a reasonable max width
        .webp({ quality: 80 })
        .toFile(targetPath);
      console.log(`Done: ${targetName}`);
    } else {
      console.warn(`File not found: ${sourcePath}`);
    }
  }
}

compress().catch(err => {
  console.error(err);
  process.exit(1);
});
