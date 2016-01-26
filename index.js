#!/usr/bin/env node


var program = require('commander');
var shell = require('shelljs');
var colors = require('colors');
var prompt = require('prompt');

var LIB_LOCATION = '/usr/local/lib/node_modules/tempgen/lib/';
var RESET_FILE_LOCATION = LIB_LOCATION + 'reset.css';
var INDEX_FILE_LOCATION = LIB_LOCATION + 'index.html';
var GULP_FILE_LOCATION = LIB_LOCATION + 'gulpfile.js';
var GULP_PACKAGE_LOCATION = LIB_LOCATION + 'package.json';


init();
preProcess();
postProcess();


function preProcess() {

    program.version("0.1.0")
        .option('-w, --website-name [website-name]', 'name of the website folder to be generated, required')
        .option('-r, --reset', 'Specify this option to add reset. By default false.')
        .option('-s, --sass', 'Specify this option to add sass. If -r specified, sass reset will be added. By default false.')
        .option('-l, --live-reload', 'Specify this option to add live reload. By default false.')

    .parse(process.argv);

    //if -w option is not specified or if -w is specified without value
    if (!program.websiteName || (typeof program.websiteName == "boolean")) {
        console.log(colors.warn("option `-w, --website-name <website-name>' argument missing"));
        console.log(colors.error("PROCESS FAILED"));
        process.exit(1);
    }
}

function init() {
    colors.setTheme({
        info: 'green',
        debug: 'blue',
        warn: 'yellow',
        error: 'red'
    });
}

var reset;
var sass;
var liveReload;
var websiteName;

function postProcess() {
    reset = program.reset ? program.reset : false;
    sass = program.sass ? program.sass : false;
    liveReload = program.liveReload ? program.liveReload : false;
    websiteName = program.websiteName;

    console.log(colors.debug("Reset : " + reset));
    console.log(colors.debug("SASS : " + sass));
    console.log(colors.debug("Live Reload : " + liveReload));
    console.log(colors.debug("Website name : " + websiteName));


    if (shell.test('-e', websiteName)) {

        var schema = {
            properties: {
                'choice': {
                    required: true,
                    pattern: /^[YynN]{1}$/,
                    message: 'Only (Y|y) or (N|n) allowed'
                }
            }
        }

        console.log(colors.warn("Folder with name : '" + websiteName + "' already exists. Do you want to delete it and create a new one?(Y/N)"));
        prompt.start();

        prompt.get(schema, function(error, result) {

            var choice = result.choice;

            if (choice.toLowerCase() == "y") {
                console.log("Deleting existing folder...")
                shell.rm('-rf', websiteName);
                buildBaseStructure();
            } else {
                process.exit(2);
            }
        });

    } else {
        buildBaseStructure();
    }
}


function buildBaseStructure() {

    console.log("Creating base structure...")
    shell.mkdir(websiteName);
    shell.cd(websiteName);
    shell.mkdir('css');
    shell.mkdir('js');
    shell.cp(INDEX_FILE_LOCATION, './');

    if (sass) {
        shell.mkdir('scss');
    }


    shell.cd('js');
    ''.to('script.js');
    shell.cd('..');

    if (liveReload) {
        console.log("Adding live reload...")
        shell.cp(GULP_FILE_LOCATION, './');
        shell.cp(GULP_PACKAGE_LOCATION, './');
    }

    buildCSS();
}


function buildCSS() {

    if (sass) {
        console.log("Adding SASS...")
        shell.cd('scss');

        if (reset) {
            shell.cp(RESET_FILE_LOCATION, '_reset.scss');
            "@import 'reset';".to('style.scss');
        } else {
            ''.to('style.scss');
        }
        shell.cd('..');
    }
    console.log("Adding CSS...");
    shell.cd('css');

    if (!sass && reset) {
        shell.cp(RESET_FILE_LOCATION, 'reset.css');
        "@import url('reset.css');".to('style.css');
    } else {
        ''.to('style.css');
    }
    shell.cd('..');

    console.log(colors.info("Website created successfully"));
}
