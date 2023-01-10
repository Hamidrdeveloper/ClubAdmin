# Sale System Admin Dashboard

## Branches

These 3 branches are marked as protected, and force pushing has been disabled.

#### release (https://admin.solutionsapps.shop/)

it's the main branch we start developing on. all PRs(Pull Requests) are merging into this branch.
when we want to start developing we create our developement branch base on this branch. cause this is the most recent updated branch of them all.

> we call this: "Staging Area" or better known as "Stage"

#### cleafin-release (https://admin.nslag.com/auth/login)

after CI/CD Pipeline in **release** branch succeeds, you can create the merge request from release branch to this branch.
This website is protected since we are using real-time database and its a sandbox for customer to test our product

> We call this: "Pre-Production" or "Pre-Prod"

#### cleafin-live (https://admin.cleafin.shop/auth/login)

when all previous pipelines & jobs succeed, its time to create and merge the final merge request from cleafin-release into cleafin-live.
this is the site that is alive and users are using it.

> We call this: "Production"

## Installation

Cleafin-Admin requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

using yarn

```sh
git clone git@gitlab.solutions-apps.com:front/front-refactor.git
cd front-refactor
```

using yarn

```sh
yarn install && yarn start
```

OR
using npm

```sh
npm install && npm run start
```

> note that the server is using port 3000 by default make sure it is available
> the installation may take some time.

For production environments...

```sh
npm run build
OR
yarn build
```

## Development

Want to contribute? Great!

Cleafin-Admin uses Webpack for fast developing.
Make a change in your file and instantaneously see your updates! (Hot Module Reloading)

make sure the server is running

```sh
yarn start
OR
npm run start
```

### Merge Requests

When you create a new merge request you should consider following rules and conventions:

> To be written...

### Commit Messages

When you are committing a file or multiple files, consider following rules and conventions:

> To be written...

## Project Directory Structure

> To be Written...

## Tech

> To Be Written...

<!-- Dillinger uses a number of open source projects to work properly:

- [AngularJS] - HTML enhanced for web apps!
- [Ace Editor] - awesome web-based text editor
- [markdown-it] - Markdown parser done right. Fast and easy to extend.
- [Twitter Bootstrap] - great UI boilerplate for modern web apps
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]
- [Gulp] - the streaming build system
- [Breakdance](https://breakdance.github.io/breakdance/) - HTML
  to Markdown converter
- [jQuery] - duh

And of course Dillinger itself is open source with a [public repository][dill]
on GitHub. -->

## Features

> To Be Written...

<!--
- Import a HTML file and watch it magically convert to Markdown
- Drag and drop images (requires your Dropbox account be linked)
- Import and save files from GitHub, Dropbox, Google Drive and One Drive
- Drag and drop markdown and HTML files into Dillinger
- Export documents as Markdown, HTML and PDF

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> The overriding design goal for Markdown's
> formatting syntax is to make it as readable
> as possible. The idea is that a
> Markdown-formatted document should be
> publishable as-is, as plain text, without
> looking like it's been marked up with tags
> or formatting instructions.

This text you see here is \*actually- written in Markdown! To get a feel
for Markdown's syntax, type some text into the left window and
watch the results in the right. -->

## Plugins

> To be Written...

<!-- Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin           | README                                    |
| ---------------- | ----------------------------------------- |
| Dropbox          | [plugins/dropbox/README.md][pldb]         |
| GitHub           | [plugins/github/README.md][plgh]          |
| Google Drive     | [plugins/googledrive/README.md][plgd]     |
| OneDrive         | [plugins/onedrive/README.md][plod]        |
| Medium           | [plugins/medium/README.md][plme]          |
| Google Analytics | [plugins/googleanalytics/README.md][plga] | -->

## License

> To be Written...

<!-- **Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dill]: https://github.com/joemccann/dillinger
[git-repo-url]: https://github.com/joemccann/dillinger.git
[john gruber]: http://daringfireball.net
[df1]: http://daringfireball.net/projects/markdown/
[markdown-it]: https://github.com/markdown-it/markdown-it
[ace editor]: http://ace.ajax.org
[node.js]: http://nodejs.org
[twitter bootstrap]: http://twitter.github.com/bootstrap/
[jquery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[gulp]: http://gulpjs.com
[pldb]: https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md
[plgh]: https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md
[plgd]: https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md
[plod]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[plme]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[plga]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md -->
