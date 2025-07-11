// export default () => ({});

export default () => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        // secure: false,
      },
      settings: {
        defaultFrom: 'loki213012@gmail.com',
        defaultReplyTo: 'loki213012@gmail.com',
      },
    },
  },
});
