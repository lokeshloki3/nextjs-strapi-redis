export default {
  async afterCreate(event) {
    const { result } = event;
    const { title } = result;

    await strapi.plugins['email'].services.email.send({
      to: 'loki213012@gmail.com',
      subject: `New Lead Submission from ${title}`,
      html: `
        <h3>New Title Details</h3>
        <p><strong>Title:</strong> ${title}</p>
      `,
    });
  },
};
