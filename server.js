const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const port = 8080;
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); //오리지널 이름으로 경로에 저장해주겠다.
    },
  }),
});

// 앱에대한 설정 영역. JSON형식으로 설정.
app.use(express.json());
app.use(cors()); //cors 적용. 모든브라우저에서 우리가 만들어준 서버에 접근가능.
app.use("/uploads", express.static("uploads"));
//express서버에서 클라이언트에게 정적인 데이터를 제공하기 위한 설정.

app.get("/banners", (req, res) => {
  models.Banner.findAll({
    limit: 2,
  })
    .then((result) => {
      res.send({
        banners: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("에러가 발생했습니다.");
    });
});

// get 요청시 실행될 로직
app.get("/products", (req, res) => {
  const query = req.query;
  console.log("QUERY : ", query);

  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "name",
      "price",
      "createdAt",
      "seller",
      "imageUrl",
      "soldout",
    ],
    limit: 10,
  })
    .then((result) => {
      console.log("RESULT : ", result);
      res.send({
        products: result,
      });
    })
    .catch((err) => {
      console.error("에러 발생 : ", err);
      res.send("상품 조회에 문제가 밝생했습니다.");
    });
});

//상품 업로드 처리 부분.
app.post("/products", (req, res) => {
  const body = req.body;
  const { imageUrl, name, description, price, seller } = body;
  if (!name || !description || !price || !seller || !imageUrl) {
    res.status(400).send("모든 필드를 입력해주세요");
  } //방어코드를 짜주자.
  models.Product.create({
    name,
    description,
    price,
    seller,
    imageUrl,
  })
    .then((result) => {
      console.log("상품 생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("상품 업로드에 문제가 발생했습니다.");
    });
});

//상품 상세정보 조회.
app.get("/products/:id", (req, res) => {
  //동적인 경로 처리하기.
  const params = req.params; //개신기하네 ㄹㅇ ㅋㅋ 여기 id값이 들어감
  const { id } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      console.log("PRODUCT : ", result);
      res.send({
        product: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("상품 조회에 에러가 발생했습니다.");
    });
});

//해당경로로 이미지파일업로드(multipart/form-data 형식의) 요청이 들어왔을떄.
app.post("/image", upload.single("image"), (req, res) => {
  //업로드된 이미지 저장하고 경로를 반환하는.
  const file = req.file; //저장된 이미지 정보를 얻어온다.
  console.log(file);
  res.send({
    imageUrl: file.path,
  }); // 이미지가 저장되어있는 경로를 반환.
});

//결제하기 로직
app.post("/purchase/:id", (req, res) => {
  const { id } = req.params;
  //데이터 수정
  models.Product.update(
    {
      soldout: 1,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((result) => {
      res.send({
        result: true,
      });
    })
    .catch((error) => {
      res.status(500).send("에러가 발생했씁니다.");
    });
});
app.listen(port, () => {
  console.log("쇼핑몰 서버 실행중..");
  //sequelize를 통해 데이터베이스(sqlite)와 연결해보자.

  models.sequelize
    .sync()
    .then(() => {
      console.log("DB연결 성공!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB연결 에러!");
      process.exit(); //서버 종료시키겠따는 의미.
    });
});
