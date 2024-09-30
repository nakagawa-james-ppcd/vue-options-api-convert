import { assert, expect, test } from 'vitest';
import { formatCode, parseCode } from './helpers';
import Parser from '../parser';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { parseSfc } from '../utils';
const rootFolder = join(__dirname, 'parser');

test('should throw an error for no export default', () => {
	const noExportDeclaration = readFileSync(`${rootFolder}/no-export-declaration.txt`, 'utf8');
	const { scriptContent } = parseSfc(noExportDeclaration);
	expect(() => {
		parseCode(scriptContent);
	}).toThrow('No export declaration found');
});

test('show throw syntax error for invalid export default', () => {
	expect(() => {
		parseCode('{},,}');
	}).toThrow('Unexpected token');
});

test('should show script if data is empty', () => {
	const emptyInput = readFileSync(`${rootFolder}/empty-data-input.txt`, 'utf8');
	const emptyOutput = readFileSync(`${rootFolder}/empty-data-output.txt`, 'utf8');
	assert.equal(formatCode(emptyInput), emptyOutput);
});

test('should throw an error if lifcycle callback is not a function', () => {
	expect(() => {
		const noCreatedMethod = readFileSync(`${rootFolder}/no-created-method.txt`, 'utf8');
		const { scriptContent } = parseSfc(noCreatedMethod);
		const ParseInput = new Parser(scriptContent);
		ParseInput.callbacksMap = {
			created: 'created',
		};

		ParseInput.parse();
	}).toThrow('Parser class does not have a created method');
});
