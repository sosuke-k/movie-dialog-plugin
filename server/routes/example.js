export default function (server) {

  server.route({
    path: '/api/movie_dialog_plugin/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
