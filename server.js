const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

// 앱에대한 설정 영역. JSON형식으로 설정.
app.use(express.json());
app.use(cors()); //cors 적용. 모든브라우저에서 우리가 만들어준 서버에 접근가능.

// get 요청시 실행될 로직
app.get("/products", (req, res) => {
  const query = req.query;
  console.log("QUERY : ", query);
  res.send({
    products: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageUrl: "/images/images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 50000,
        seller: "메시",
        imageUrl: "/images/images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageUrl: "/images/images/products/keyboard1.jpg",
      },
    ],
  });
});

//상품 업로드 처리 부분.
app.post("/products", (req, res) => {
  const body = req.body;
  res.send({
    body: body,
  });
});

//상품 상세정보 조회.
app.get("/products/:id", (req, res) => {
  //동적인 경로 처리하기.
  const params = req.params; //개신기하네 ㄹㅇ ㅋㅋ 여기 id값이 들어감
  res.send(`id는 ${params.id}입니다.`);
});

app.listen(port, () => {
  console.log("쇼핑몰 서버 실행중..");
});
