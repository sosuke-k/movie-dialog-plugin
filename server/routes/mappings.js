export default function (server) {

  let call = server.plugins.elasticsearch.callWithRequest;

  server.route({
    path: '/api/movie_dialog_plugin/index/{name}/mappings',
    method: 'GET',
    handler(req, reply) {
      call(req, 'indices.getMapping', {
        'index': req.params.name
      }).then(function (response) {
        reply(response[req.params.name]['mappings']);
      });
    }
  });

};
