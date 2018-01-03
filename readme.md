# Build a sample project with Gulp

Using Gulp as the task runner to prepare a sample website for deployment

### Prerequisites

```
use npm install for all dependencies
```

### To Run

In Command Line
```
gulp scripts --- concatenates, minifies, and copies all of the project’s JavaScript files into an all.min.js file into the dist/scripts folder
gulp styles --- compiles the project’s SCSS files into CSS, and concatenates and minifies into an all.min.css file into the dist/styles folder
gulp images --- copies the optimized images to the dist/content folder.
gulp clean ---  deletes all of the files and folders in the dist folder.
gulp build --- clean up files, and then runs the scripts, styles, and images tasks.
gulp (default) --- runs the build task, serve the website on local server, and watch for style changes. Any changes to the style will result in auto refreshing
```
