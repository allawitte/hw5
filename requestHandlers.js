'use strict';
var querystring = require("querystring");
var db = require("./db");

function start(response, postData) {
    console.log("Request handler 'start' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<form action="/incert" method="post">'+
        '<input type="submit" value="Ввести новый товар в базу" />'+
        '</form>'+
        '<form action="/add" method="post">'+
        '<input type="submit" value="Добавить товар в базу" />'+
        '</form>'+
        '<form action="/del" method="post">'+
        '<input type="submit" value="Удалить товар из базу" />'+
        '</form>'+
        '<form action="/list" method="post">'+
        '<input type="submit" value="Просмотр базы товаров" />'+
        '</form>'+
        '</body>'+
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function incert(response, postData) {
    console.log("Request handler 'incert' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<h2>Регистрация позиции на складе</h2>'+
        '<form action="/responce/incert" method="post">'+
        '<input type="text" name="name" placeholder="название товара"/>'+
        '<input type="text" name="amount" placeholder="количество"/>'+
        '<input type="submit" value="Ввести новый товар в базу" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function add(response, postData) {
    console.log("Request handler 'add' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<h2>Добавление определенной позиции на склад</h2>'+
        '<form action="/responce/add" method="post">'+
        '<input type="text" name="id" placeholder="идентификатор товара"/>'+
        '<input type="text" name="amount" placeholder="количество"/>'+
        '<input type="submit" value="Добавить товар в базу" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function del(response, postData) {
    console.log("Request handler 'del' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<h2>Удаление определённой позиции со склада</h2>'+
        '<form action="/responce/del" method="post">'+
        '<input type="text" name="id" placeholder="идентификатор товара"/>'+
        '<input type="text" name="amount" placeholder="количество"/>'+
        '<input type="submit" value="Удалить товар из базы" />'+
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function list(response, postData) {
    console.log("Request handler 'incert' was called.");

    var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<h2>Остаток на складе</h2>'+

        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body + JSON.stringify(db));
    response.end(JSON.stringify(db));
}

function responceAdd(response, postData) {
    console.log("Request handler '/responce/add' was called.");
    var newId = ++ db[db.length-1].id;
    var answer = '';
    var id = querystring.parse(postData).id;
    var amount = querystring.parse(postData).amount;
    var answer = '';
    if (id == '') {
        answer = "Необходимо ввести идентификатор товара";
    }
    if (amount == '') {
        answer += "  Необходимо ввести количество";
    }
    if ( id != '' && amount != '') {
        db.forEach(item => {
            if ( item.id == id) {
                item.amount += +amount;
                answer = JSON.stringify(item);
            }
            if ( answer == '') {
                answer = "Запрашиваемая позиция не найдена";
            }
        })
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("В базу введено: ");
    response.end(answer);
}

function responceDel(response, postData) {
    console.log("Request handler '/responce/del' was called.");
    var newId = ++ db[db.length-1].id;
    var answer = '';
    var id = querystring.parse(postData).id;
    var amount = querystring.parse(postData).amount;
    var answer = '';
    if (id == '') {
        answer = "Необходимо ввести идентификатор товара";
    }
    if (amount == '') {
        answer += "  Необходимо ввести количество";
    }
    if ( id != '' && amount != '') {
        db.forEach(item => {
            if ( item.id == id) {
                if ( item.amount < amount) {
                    answer = item.name + ": Не достаточно на складе";
                }
                else {
                    item.amount -= +amount;
                    answer = JSON.stringify(item);
                }
            }
            if ( answer == '') {
                answer = "Запрашиваемая позиция не найдена";
            }
        })
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("В базу введено: ");
    response.end(answer);
}

function responceIncert(response, postData) {
    console.log("Request handler 'responce/incert' was called.");
    var newId = ++ db[db.length-1].id;
    var answer = '';
    if (querystring.parse(postData).name == '') {
        answer = "Необходимо ввести название товара";
    }
    if (querystring.parse(postData).amount == '') {
        answer += "  Необходимо ввести количество";
    }
    if ( querystring.parse(postData).name != '' && querystring.parse(postData).amount != '') {
        db.push({"id": newId, "name": querystring.parse(postData).name, "amount": +querystring.parse(postData).amount});
        answer = JSON.stringify(db[newId-1]);
    }
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("В базу введено: " + answer);
    response.end(answer);
}

exports.start = start;
exports.add = add;
exports.del = del;
exports.responceAdd = responceAdd;
exports.responceDel = responceDel;
exports.responceIncert = responceIncert;
exports.incert = incert;
exports.list = list;
