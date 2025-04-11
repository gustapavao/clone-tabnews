import database from '../../../../infra/database'

async function status(req, res) {
  const result = await database.query('SELECT 1 + 1;')
  console.log(result)
  console.log("*******************")
  res.status(200).send({ message: "eu te amo" });
}

export default status;
