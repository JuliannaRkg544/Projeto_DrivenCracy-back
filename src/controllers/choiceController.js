import { ObjectId } from "mongodb";
import db from "../../db.js";

export default async function signupChoice(req, res) {
  const { title, pollId } = req.body;
  //verificar se essa pollid existe no meu database de polls
  try {
    const existentPoll = await db
      .collection("polls")
      .findOne({ _id: ObjectId(`${pollId}`) });
    if (!existentPoll) {
      return res.status(404).send("poll não existente");
    }
    const existentChoiceTitle = await db
      .collection("choices")
      .findOne({ title });
    if (existentChoiceTitle) {
      return res.status(409).send("nome de choice já cadastrada");
    }
    let validDate = existentPoll.expireAt;
    validDate = validDate.split(" ");
    validDate = validDate[0].split("-");
    let date = new Date().toLocaleString();
    date = date.split(" ");
    let actualDate = date[0].split("/").reverse();
    if (validDate[0] < actualDate[0] || validDate[1] < actualDate[1]) {
      return res.status(403).send("passou a data ");
    } else if (validDate[1] === actualDate[1]) {
      if (validDate[3] < actualDate[3]) {
        return res.status(403).send("passou o dia ");
      }
    }

    //let hour = date[1].split(":")
    await db.collection("choices").insertOne({
      title,
      pollId,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log("erro ao cadastrar escolhas", error);
    return res.sendStatus(500);
  }
}
