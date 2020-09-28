var express = require('express');
const bcrypt = require('bcrypt');
var mongodb = require('mongodb')

var router = express.Router();
let getDataBase = async () => {
  const client = await mongodb.MongoClient.connect("mongodb://mongo:27017", {
    useNewUrlParser: true
  });

  const db = client.db("DATABSE_NAME");
  return db
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const validateMailAddress = address => { return true }
const validatePassword = pw => { return true }

router.post('/signup', async function (req, res, next) {
  try {
    let db = await getDataBase()
    const { mail, password } = req.body

    // 普通はここでmailとpwの方チェックをする
    // けど、今回は面倒だからしません。
    if (!validateMailAddress(mail) || !validatePassword(mail))
      return

    // すでに登録されているかチェック
    // 面倒だからやりません。

    // PWをハッシュ化
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(`user added mail: ${mail} password(hashed): ${hashedPassword}`)

    await db
      .collection("test")
      .insertOne({ mail, password: hashedPassword });

    res.send({ error: false });
  } catch (e) {
    res.send({ error: true });
    console.log(e)
  }
});
router.post('/signin', async function (req, res, next) {
  try {
    let db = await getDataBase()
    const { mail, password } = req.body

    // 普通はここでmailとpwの方チェックをする
    // けど、今回は面倒だからしません。
    if (!validateMailAddress(mail) || !validatePassword(mail))
      return

    const data = await db
      .collection("test")
      .findOne({ mail });

    const ValidPassword = bcrypt.compareSync(password, data.password)
    if (!ValidPassword)
      throw new Error("password is invalid")

    console.log(`user login OK mail: ${mail} password: "********"`)

    res.send({ error: false });
  } catch (e) {
    res.send({ error: true });
    console.log(e)
  }
});

module.exports = router;
