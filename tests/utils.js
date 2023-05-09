/**
 * @summary Gera string de caracteres aleatorios de acordo com o tamanho 'length'
 * @param {number} length
 */
const generateRandomString = (length = 20) =>
	Array.from(Array(length), () =>
		Math.floor(Math.random() * 36).toString(36)
	).join('');

module.exports = {
	generateRandomString,
};
