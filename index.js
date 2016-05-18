import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],

    uiExports: {
      app: {
        title: 'Movie Dialog Plugin',
        description: 'An awesome Kibana plugin',
        main: 'plugins/movie_dialog_plugin/app'
      },
      hacks: [
        'plugins/movie_dialog_plugin/hack'
      ]
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) {
      // Add server routes and initalize the plugin here
      exampleRoute(server);
    }

  });
};
