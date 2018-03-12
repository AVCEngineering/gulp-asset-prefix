# gulp-asset-prefix
> gulp plugin to prefix asset paths

## Install

Install package with NPM and add it to your development dependencies:

```
npm install --save-dev gulp-asset-prefix
```

## Usage

Prefix relative urls in `<link>`, `<script>` and `<img>` tags.

*Note: External paths with a leading double slash or paths without a leading slash will be ignored. File streams are not currently supported*

### gulpfile.js

```javascript
var gulp = require('gulp');
var prefix = require('gulp-asset-prefix');

gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe(prefix({prefix: 'https://static.my-website.com' }))
    .pipe(gulp.dest('dest/index.html'));
});
```

### Before: src/index.html

```html
<!-- relative -->
<link href="/css/index.js" />

<!-- no leading slash -->
<img src="img/avatar.png" />

<!-- external -->
<script type="javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/core.js" />
```

### After: dest/index.html

```html
<!-- relative -->
<link href="https://static.my-website.com/css/index.js" />

<!-- no leading slash -->
<img src="img/avatar.png" />

<!-- external -->
<script type="javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/core.js" />
```

## TODO

- [ ] Add stream support
- [ ] Add options to include non-relative and external files
- [ ] Add option to allow users to specify their own patterns
