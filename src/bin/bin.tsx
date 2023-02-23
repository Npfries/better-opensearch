#!/usr/bin/env node

import React from 'react';
import { Box, render } from 'ink';
import meow from 'meow';
import { Text } from 'ink';
import Error from './lib/Error.js';
import Help from './lib/Help.js';
import * as fs from 'fs';

const App = ({ up = true, down = false }) => {
    if (up && down)
        return <Error message="--up and --down are mutually exclusive"></Error>;

    try {
        const config = JSON.parse(
            fs.readFileSync('./better-opensearch.config.json', 'utf-8')
        );

        const files = fs.readdirSync(config.migrationsPath);

        return (
            <>
                <Box borderStyle="round" borderColor="blue">
                    <Text>better-opensearch {up ? 'UP' : 'DOWN'}</Text>
                </Box>
                <Box borderStyle="round" borderColor="blue">
                    <Text>{JSON.stringify(files, null, 4)}</Text>
                </Box>
            </>
        );
    } catch (e) {
        return <Error message={JSON.stringify(e, null, 4)}></Error>;
    }
};

const cli = meow(Help, {
    flags: {
        up: {
            type: 'boolean',
        },
        down: {
            type: 'boolean',
        },
    },
    importMeta: import.meta,
});

render(<App up={cli.flags.up} down={cli.flags.down} />);
