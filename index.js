var db = require("./db");
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/add"] = requestHandlers.add;
handle["/del"] = requestHandlers.del;
handle["/responce/add"] = requestHandlers.responceAdd;
handle["/responce/incert"] = requestHandlers.responceIncert;
handle["/responce/del"] = requestHandlers.responceDel;
handle["/incert"] = requestHandlers.incert;
handle["/list"] = requestHandlers.list;

server.start(router.route, handle);
/**
 * Created by HP on 10/27/2016.
 */
