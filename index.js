var http = require("http"); //노드 내장 http모듈 불러오기.
var hostname = "127.0.0.1"; //내컴퓨터주소.
var port = 8080;

//해당 서버에 요청이 들어올때 여기 콜백함수가 실행됨.
const server = http.createServer(function (req, res) {
  const url = req.url;
  const method = req.method;
  if (url === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      const products = JSON.stringify([
        {
          name: "농구공",
          price: 6000,
        },
      ]);

      res.end(products);
      //JSON형식의 응답을 보낼예정.
    } else if (method === "POST") {
      res.end("생성되었습니다.");
    } else {
    }
  }
});

server.listen(port, hostname); // 기다리고있따.

console.log("grab market server on!");

//초간단 서버 구축 ㅋㅋㅋ
/*ㅁㄴㅇㄹ */
