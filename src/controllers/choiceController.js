import { ObjectId } from "mongodb";
import db from "../../db.js";
import dayjs from "dayjs";

export async function signupChoice(req, res) {
  const { title, pollId } = req.body;
  const actualPoll = ObjectId(pollId);
  //verificar se essa pollid existe no meu database de polls
  try {
    const existentPoll = await db
      .collection("polls")
      .findOne({ _id: actualPoll });
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
      votes: 0,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log("erro ao cadastrar escolhas", error);
    return res.sendStatus(500);
  }
}

export async function signupVote(req, res) {
  const { id } = req.params;
  try {
    let choiceVoted = await db
      .collection("choices")
      .findOne({ _id: ObjectId(`${id}`) });
    if (!choiceVoted) {
      return res.sendStatus(404);
    }
    const existentPoll = await db
      .collection("polls")
      .findOne({ _id: ObjectId(`${choiceVoted.pollId}`) });
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

    await db.collection("choices").findOneAndUpdate(
      { _id: ObjectId(`${id}`) },
      { $inc: { votes: 1 } }
      //   {

      //   pollId: existentPoll._id,
      //   choiceId: choiceVoted._id,
      //   votes: [{ time: dayjs().format("YYYY-MM-DD hh:mm"), count: cont }],
      // }
    );

    res.status(201).send("voto cadastrado");
  } catch (error) {
    console.log("erro ao cadastrar voto", error);
    return res.sendStatus(500);
  }
}
