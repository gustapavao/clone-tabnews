import database from "../../../../infra/database";

async function status(req, res) {
  const updadetAt = new Date().toISOString();
  res.status(200).send({
    updadet_at: updadetAt,
  });
}

export default status;
