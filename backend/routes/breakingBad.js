const express = require("express");
const app = require("../app");
const router = express.Router();
const axios = require("axios");
const config = require("./breakingBadConfig");
const socket = require("../socketioAPI");

router.get("/", function(req, res, next) {
	runCharacterUpdateInterval();
	//res.render("index", { title: "Breaking Bad Page" });
	res.send({ title: "Breaking Bad" });
});

const runCharacterUpdateInterval = () => {
	const updateTime = 2000;
	setInterval(() => {
		updatePageWithRandomCharacter();
	}, updateTime);
};

const updatePageWithRandomCharacter = () => {
	createCharacter().then(character => {
		socket.push(config.namespace, character);
	});
};

// TODO
// add try and catch
// add promise all
const createCharacter = async () => {
	const characterId = getRandomCharacterId();
	const characterBio = await queryAPI(config.getCharacterURL(characterId));
	const { quote } = await queryAPI(config.getQuoteURL(characterBio));
	const { deathCount: kills } = await queryAPI(config.getKillURL(characterBio));
	return await { characterBio, quote, kills };
};

const getRandomCharacterId = () => {
	const firstCharacter = 1;
	const lastCharacter = 54;
	return Math.floor(Math.random() * Math.floor(lastCharacter)) + firstCharacter;
};

const queryAPI = async resource => {
	const api = await axios.get(config.createEndpoint(resource));
	if (await api.data[0]) return await api.data[0];
	else return { name: [], quote: [], deathCount: [] };
};

module.exports = router;
