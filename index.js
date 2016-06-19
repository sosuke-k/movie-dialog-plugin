import exampleRoute from './server/routes/example';
import mappingsRoute from './server/routes/mappings';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],

    uiExports: {
      app: {
        title: 'Movie Dialog',
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
      mappingsRoute(server);

      let call = server.plugins.elasticsearch.callWithRequest;

      server.route({
        path: '/api/movie_dialog_plugin/indices',
        method: 'GET',
        handler(req, reply) {
          call(req, 'cluster.state').then(function (response) {
            reply(Object.keys(response.metadata.indices));
          });
        }
      });

      server.route({
        // We can use path variables in here, that can be accessed on the request
        // object in the handler.
        path: '/api/movie_dialog_plugin/index/{name}',
        method: 'GET',
        handler(req, reply) {
          call(req, 'cluster.state', {
            metric: 'metadata',
            index: req.params.name
          }).then(function (response) {
            console.log(response);
            reply(response.metadata.indices[req.params.name]);
          });
        }
      });
    }

  });
};
