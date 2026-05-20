const express = require('express');
const apiRoutes = require('./src/routes');
const app = express();
app.use('/api', apiRoutes);
function printRoutes(stack, prefix = '') {
    for (const layer of stack) {
        if (layer.route) {
            console.log('route', Object.keys(layer.route.methods).join(','), prefix + layer.route.path);
        } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
            const newPrefix = prefix;
            printRoutes(layer.handle.stack, newPrefix);
        }
    }
}
printRoutes(app._router.stack);
