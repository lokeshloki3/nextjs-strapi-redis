// config/plugins.ts

export default ({ env }) => ({
  email: {
    config: {
      provider: 'mailgun',
      providerOptions: {
        key: env('MAILGUN_API_KEY'),
        domain: env('MAILGUN_DOMAIN'),
        url: env('MAILGUN_URL', 'https://api.mailgun.net'), // Optional, defaults to this
      },
      settings: {
        // defaultFrom: 'loki213012@gmail.com',
        // defaultReplyTo: 'loki213012@gmail.com',

        defaultFrom: env('EMAIL_DEFAULT_FROM'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO'),

      },
    },
  },
});



// // export default () => ({});

// export default () => ({
//   email: {
//     config: {
//       provider: 'nodemailer',
//       providerOptions: {
//         host: process.env.SMTP_HOST,
//         port: parseInt(process.env.SMTP_PORT || '587', 10),
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//         // secure: false,
//       },
//       settings: {
//         defaultFrom: 'loki213012@gmail.com',
//         defaultReplyTo: 'loki213012@gmail.com',
//       },
//     },
//   },
// });
