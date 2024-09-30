import type { ElementNode } from '@vue/compiler-dom';
import { parse } from '@vue/compiler-dom';

/**
 * Parse SFC user input to extract template, script and style
 */
const parseSfc = (sfcContent:string) => {
	const parsedUserInput = parse(sfcContent, {
		parseMode: 'sfc',
	});

	const template = parsedUserInput.children.find((node) => {
		return (node as ElementNode).tag === 'template';
	});

	const script = parsedUserInput.children.find((node) => {
		return (node as ElementNode).tag === 'script';
	});

	const style = parsedUserInput.children.find((node) => {
		return (node as ElementNode).tag === 'style';
	});

	return {
		templateContent: template?.innerLoc.source,
		scriptContent: script?.innerLoc.source,
		styleContent: style?.innerLoc.source,
	};
};

/**
 * Compose the output SFC
 *
 * @param scriptContent The updated script content
 */
const composeSfc = (
	scriptContent:string,
	templateContent:string,
	styleContent:string
) => {
	const templateSfc = `<template>${templateContent}</template>`;
	let scriptSfc = `&lt;script setup&gt;\n${scriptContent}\n&lt;/script&gt;`;
	const styleSfc = `<style scoped>${styleContent}</style>`;
	scriptSfc = scriptSfc.replaceAll('&lt;', '<').replaceAll('&gt;', '>');
	return [templateSfc, scriptSfc, styleSfc].join('\n\n');
};

export { parseSfc, composeSfc };