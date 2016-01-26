### Website Template Generator (tempgen)

Website Template Generator (tempgen) is a simple CLI (Command Line Interface) tool that creates a skeleton structure of a modern website. 

Features include: 
- an `index.html` page with boilerplate HTML
- option to include *Eric Meyer's* CSS reset
- option to choose between CSS and SASS/SCSS
- option to choose live reload server 

The utility is cross platform compatible (Windows, OSX, Linux and any Unik like systems)

### Installation

##### Using NPM
The utility is available in NPM and can be installed using the following command: 

```sh
sudo npm install tempgen
```

### Description

| Flag | Description | Required |
| :--: | :---------- | :------: |
| -w, -website-name | name of the folder to be generated | yes |
| -r, --reset | specify this option to add reset. By default false | no |
| -s, --sass | specify this option to add sass. If -r specified, sass will be added with reset. By default false | no |
| -l, --live-reload | Specify this option to add live reload. By default false | no |

### Usage

```sh
tempgen [-r | -s | -l ] -w|--website-name <your-website-name>
```

### Example 1: 

##### Input

```sh
tempgen -w mysite
```

##### Output

```
mysite
├── css
│   └── style.css
├── index.html
└── js
    └── script.js
```

### Example 2: 

##### Input

```sh
tempgen -s -r -w mysite
```

##### Output
```
mysite
├── css
│   └── style.css
├── index.html
├── js
│   └── script.js
└── scss
    ├── _reset.scss
    └── style.scss
```

### Creating a site with live reload server

##### input
```sh
tempgen -s -r -l -w mysite
```
##### Output
```
mysite
├── css
│   └── style.css
├── gulpfile.js
├── index.html
├── js
│   └── script.js
├── package.json
└── scss
    ├── _reset.scss
    └── style.scss
```

The live reload server uses gulp modules. So, you have to do an npm install to install the dependencies.

```sh
sudo npm install
```

After which you can launch the live reload server by running the gulp task named serve.

```sh
gulp serve
```



