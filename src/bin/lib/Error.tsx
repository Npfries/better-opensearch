import { Box, Text } from 'ink';
import React from 'react';

export default ({ message = 'Error' }) => {
    return (
        <Box borderColor={'red'} borderStyle="round">
            <Text>
                Error{message ? ':' : ''} {message}
            </Text>
        </Box>
    );
};
