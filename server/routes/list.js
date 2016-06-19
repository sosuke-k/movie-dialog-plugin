export default function (server) {

  let call = server.plugins.elasticsearch.callWithRequest;

  server.route({
    path: '/api/movie_dialog_plugin/movies',
    method: 'GET',
    handler(req, reply) {
      call(req, 'search', {
        index: 'cornell_movie_dialogs_corpus',
        type: 'movie_titles_metadata',
        size: 617,
        body: {
          query: {
            "match_all": {}
          }
        }
      }).then(function (response) {
        reply(response['hits']);
      });
    }
  });

};
