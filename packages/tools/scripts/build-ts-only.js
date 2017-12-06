import {SRC_PATH, DIST_PATH} from '../config/env';
import spawn from 'cross-spawn';

console.log('started', SRC_PATH);

const result = spawn.sync(
	require.resolve('typescript/bin/tsc'),
	[],
	{
		stdio: 'inherit',
		cwd: SRC_PATH
	}
);
if (result.signal) {
	if (result.signal === 'SIGKILL') {
		console.log(
			'The build failed because the process exited too early. ' +
			'This probably means the system ran out of memory or someone called ' +
			'`kill -9` on the process.'
		);
	} else if (result.signal === 'SIGTERM') {
		console.log(
			'The build failed because the process exited too early. ' +
			'Someone might have called `kill` or `killall`, or the system could ' +
			'be shutting down.'
		);
	}
	process.exit(1);
}

process.exit(result.status);