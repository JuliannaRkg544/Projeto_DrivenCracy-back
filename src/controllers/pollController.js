import { ObjectId } from "bson";
import db from "../../db.js";

export async function signupPoll(req, res) {
  let { title, expireAt } = req.body;
  if (expireAt === null || !expireAt) {
    expireAt = "2022-08-14 11:00";
  }
  try {
    const existentTitle = await db.collection("polls").findOne({ title });
    if (existentTitle) {
      return res.status(409).send("poll já existe");
    }
    await db.collection("polls").insertOne({
      title,
      expireAt,
    });
    res.status(201).send("enquete criada");
  } catch (error) {
    console.log("erro ao cadastrar enquete", error);
    res.sendStatus(500);
    return;
  }
}

export async function getPoll(req, res) {
  try {
    const polls = await db.collection("polls").find().toArray();
    res.status(200).send(polls);
  } catch (error) {
    console.log("erro no get das votações ", error);
    return;
  }
}

export async function getPollChoices(req, res) {
  const { id } = req.params;
  try {
    const pollChoices = await db
      .collection("choices")
      .find({ pollId: id })
      .toArray();
    if (pollChoices.length === 0) {
      console.log("n existpo");
      return res.sendStatus(404);
    }

    res.status(200).send(pollChoices);
  } catch (error) {
    console.log("erro no get das escolhas das votações ", error);
    res.sendStatus(500);
    return;
  }
}

export async function getPollResults(req, res) {
  const { id } = req.params;
  //é o id da poll
  try {
    //pegando todas as choices com o mesmo id
    const pollChoices = await db
      .collection("choices")
      .find({ pollId: id })
      .toArray();
    let choiceVotes = 0;
    let choiceName = "";
    for (let i = 0; i < pollChoices.length; i++) {
      let votes = pollChoices[i].votes;
      if (votes > choiceVotes) {
        choiceVotes = votes;
        choiceName = pollChoices[i].title;
      }
    }
    const highVotedChoice = await db
      .collection("choices")
      .find({ votes: choiceVotes })
      .toArray();
    let result = {};
    if (highVotedChoice.length === 1) {
      result = {
        title: highVotedChoice[0].title,
        votes: highVotedChoice[0].votes,
      };
    } else {
      return res.status(207).send("resultados inconclusivos");
    }
    const votedPoll = await db
      .collection("polls")
      .findOne({ _id: ObjectId(`${id}`) });
    const pollResult = { ...votedPoll, result };
    res.status(200).send(pollResult);
  } catch (error) {
    console.log("erro no get das escolhas mais votadas ", error);
    res.sendStatus(500);
    return;
  }
}
