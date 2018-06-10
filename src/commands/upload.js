const { randomBytes } = require('crypto');
const { get } = require('snekfetch');
const { createWriteStream } = require('fs');

module.exports = class UploadCommand {
  async execute ({ msg }) {
    const [ attachment ] = msg.attachments;
    if (!attachment) {
      return 'Attach an image.';
    }

    if (attachment.size > 8e6) { // 8 MB
      return 'Image is too big.';
    }

    const path = await this.downloadImage(attachment);
    return `https://boisbetterthanluca.xyz/i/${path}`;
  }

  downloadImage ({ url }) {
    return new Promise(resolve => {
      const id = randomBytes(3).toString('hex');
      const ext = url.split('.').pop();

      get(url)
        .pipe(createWriteStream(`/home/aetheryx/i/${id}.${ext}`))
        .on('finish', () => {
          resolve(`${id}.${ext}`);
        });
    });
  }

  get props () {
    return {
      triggers: ['upload'],
      usage: '{command}',
      description: 'Uploads your image to boisbetterthanluca.xyz'
    };
  }
};
