import redis from "../../../../lib/redis";

export default {
  async afterCreate(event) {
    const { result } = event;
    const { title, slug } = result;

    // Send email
    await strapi.plugins['email'].services.email.send({
      // to: 'loki213012@gmail.com',
      to: process.env.EMAIL_TO_ADDRESS,
      subject: `New Lead Submission from ${title}`,
      html: `
        <h3>New Title Details</h3>
        <p><strong>Title:</strong> ${title}</p>
      `,
    });

    // Clear Redis cache
    await redis.del('blog:articles');
    await redis.del(`blog:article:${slug}:published`);
    await redis.del(`blog:article:${slug}:draft`);
  },

  async afterUpdate(event) {
    const { result } = event;

    // Clear Redis cache
    await redis.del('blog:articles');
    await redis.del(`blog:article:${result.slug}:published`);
    await redis.del(`blog:article:${result.slug}:draft`);
  },

  async afterDelete(event) {
    const { result } = event;

    // Clear Redis cache
    await redis.del('blog:articles');
    await redis.del(`blog:article:${result.slug}:published`);
    await redis.del(`blog:article:${result.slug}:draft`);
  },
};




// export default {
//   async afterCreate(event) {
//     const { result } = event;
//     const { title } = result;

//     await strapi.plugins['email'].services.email.send({
//       to: 'loki213012@gmail.com',
//       subject: `New Lead Submission from ${title}`,
//       html: `
//         <h3>New Title Details</h3>
//         <p><strong>Title:</strong> ${title}</p>
//       `,
//     });
//   },
// };
