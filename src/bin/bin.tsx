#!/usr/bin/env node

import React, { useEffect, useState } from 'react';
import { Box, render } from 'ink';
import meow from 'meow';
import { Text } from 'ink';
import Error from './lib/Error.js';
import Help from './lib/Help.js';
import fs from 'fs';
import path from 'path';

const App = ({ up = true, down = false }) => {
    const [migrations, setMigrations] = useState<string[]>([]);
    if (up && down)
        return <Error message="--up and --down are mutually exclusive"></Error>;

    const getAndRunMigrations = async (dir: string, files: string[]) => {
        const result = await Promise.all(
            files.map(async (name) => {
                const mig = await import(
                    path.resolve(path.dirname('./'), `${dir}/${name}`)
                );
                return await new mig.default()[up ? 'up' : 'down']();
            })
        );
        setMigrations(result);
        // console.log(JSON.stringify(migrationImports, null, 4));
    };

    useEffect(() => {
        const config = JSON.parse(
            fs.readFileSync('./better-opensearch.config.json', 'utf-8')
        );

        const files = fs.readdirSync(config.migrationsPath);
        getAndRunMigrations(config.migrationsPath, files);
    }, []);

    return (
        <>
            <Box borderStyle="round" borderColor="blue">
                <Text>better-opensearch {up ? 'UP' : 'DOWN'}</Text>
            </Box>
            {migrations.map((migration, i) => {
                return (
                    <Box key={i} borderStyle="round" borderColor="green">
                        <Text>{migration}</Text>
                    </Box>
                );
            })}
        </>
    );
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
