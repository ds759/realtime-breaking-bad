const router = require("express").Router();
const axios = require("axios");
const config = require("./breakingBadConfig");
const socket = require("../socketioAPI");

router.get("/", function(req, res, next) {
	setInterval(updatePageWithRandomCharacter, config.UPDATE_TIME);
	res.render("index", { title: "Breaking Bad Page" });
});

const updatePageWithRandomCharacter = () => {
	createCharacter().then(character => socket.push(config.namespace, character));
};

const createCharacter = async () => {
	const characterId = getRandomCharacterId();
	const characterBio = await queryAPI(config.getCharacterURL(characterId));
	const { quote } = await queryAPI(config.getQuoteURL(characterBio));
	const { deathCount: kills } = await queryAPI(config.getKillURL(characterBio));
	return { characterBio, quote, kills };
};

const getRandomCharacterId = () => {
	const FIRST_CHARACTER = 1;
	const LAST_CHARACTER = 54;
	return Math.floor(Math.random() * LAST_CHARACTER) + FIRST_CHARACTER;
};

const queryAPI = async resource => {
	const response = await axios.get(config.createEndpoint(resource));
	return response.data[0] || { name: [], quote: [], deathCount: [] };
};

module.exports = router;
