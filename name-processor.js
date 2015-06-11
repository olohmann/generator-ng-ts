var s = require('underscore.string');

function getSafeCamelizedName(name) {
	return s(name).
		trim().
		humanize().
		camelize().
		decapitalize().
		value();
}

function getSafeClassOrModuleName(name) {
	var camelized = s(getSafeCamelizedName(name)).value();
    var chunks = camelized.split('.');
    var capitalizedChunks = [];

    chunks.forEach(function(item) {
        capitalizedChunks.push(s(item).capitalize().value());
    });

	return capitalizedChunks.join('.');
}

function getSafeSlugifiedName(name) {
	return s(name).
		trim().
		humanize().
		slugify()
		.value();
}

module.exports = {
	getClassName: getSafeClassOrModuleName,
	getModuleName: getSafeClassOrModuleName,
	getCamelizedName: getSafeCamelizedName,
	getSlugifiedName: getSafeSlugifiedName
};
