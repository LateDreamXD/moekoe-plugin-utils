import { assert, test } from 'vitest';
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

test('gen-manifest-by-file', () => {
	const input = [
		'--config',
		'test/test-config.json',
		'--clean'
	];

	execSync(`node bin/utils.js gen-manifest ${input.join(' ')}`);
	const output = readFileSync('./manifest.json', 'utf-8');
	assert.deepNestedInclude(JSON.parse(output), {
		name: 'test',
		version: '2.3.3',
		action: {
			default_title: 'test',
			default_popup: 'popup.html',
			default_icon: null
		}
	});
});


test('gen-manifest-by-inline', () => {
	const input = [
		'--name',
		'test-plugin',
		'--ver',
		'1.0.0',
		'--add',
		'{\\"test\\":0}',
		'--author',
		'晚梦',
		'--clean'
	];

	execSync(`node bin/utils.js gen-manifest ${input.join(' ')}`);
	const output = readFileSync('./manifest.json', 'utf-8');
	assert.deepNestedInclude(JSON.parse(output), {
		name: input[1],
		version: input[3],
		author: input[7],
		test: 0,
	});
});
