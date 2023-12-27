export const apps = [
    {
        name: 'war-generator',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
    }
];
  