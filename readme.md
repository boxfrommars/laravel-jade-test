## Laravel Jade Test

компиляция jade файлов.

#### структура относящихся к проблеме файлов

```
resources/
    jade-views/
        frontend/
            partials
                head.jade
            page.jade
            layout.jade
        mixins/
            blade.jade
    views/
        frontend/
        backend/
gulpfile.js
```

blade-mixin.jade взят отсюда: https://gist.github.com/franzose/280218e54f559040039f

#### [gulpfile.js](gulpfile.js)

```js
var gulp = require('gulp');

var clean = require('gulp-clean');
var jade = require('gulp-jade');
var rename = require('gulp-rename');

// directory for jade views
var jadeFrontendTemplatesDir = './resources/jade-views/frontend/'; // get files from here
var jadeFrontendTemplatesBuildDir = './resources/views/frontend/'; // and build it here

// clean jade build directory
gulp.task('clean.jade', function () {
  return gulp.src(jadeFrontendTemplatesBuildDir, {read: false})
    .pipe(clean());
});

// build jade templates
gulp.task('jade.templates', ['clean.jade'], function() {

  // jade options
  var options = {
    locals: {},
    pretty: true
  };

  return gulp.src(jadeFrontendTemplatesDir + '/**/*.jade')
    .pipe(jade(options))
    .pipe(rename({
      extname: ".blade.php" // proper extension for blade
    }))
    .pipe(gulp.dest(jadeFrontendTemplatesBuildDir))
});

gulp.task('jade', ['jade.templates']);

gulp.task('default', ['jade']);
```

#### Jade files

##### [page.jade](resources/jade-views/frontend/page.jade)
```jade
include ../mixins/blade-mixin

+extends('frontend.layout')

+section('content')
    ul
        +foreach('$characters', '$character', '$pid', '$pnum')
            li {{ $character['name'] }}
```


##### [layout.jade](resources/jade-views/frontend/layout.jade)
```jade
include ../mixins/blade-mixin

doctype html
html(lang="en")
    +include('frontend.partials.head', {'title': "'Amazing title'"})
    body
        .container
            h1 Jade Test
            +yield('content')
```


##### [partials/head.jade](resources/jade-views/frontend/partials/head.jade)
```jade
head
    title= '{{ $title }}'
    link(href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet")
```

#### Замечания
- миксины надо подключать во все файлы (я никогда не работал с jade, может это и всем известно :)
- мы не пользуемся инклудами jade только блейд-возможностями `+extends` `+yield` `+include`
- подробности синтаксиса для управляющих конструкций blade см. в [файле миксина](resources/jade-views/mixins/blade-mixin.jade)
- папка `resources/views/frontend/` полностью очищается при билде, туда ничего нельзя класть руками, только скомпилированные шаблоны jade


### Требования для установки тестового проекта

- node/npm
- gulp
- PHP >= 5.5.9
- OpenSSL PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension

### Установка

```
xu@calypso:~$ git clone
xu@calypso:~$ cd jade-test/
xu@calypso:~$ composer install              # install project dependencies
xu@calypso:~$ chmod a+rw storage -R         # folder for logs, cache, etc
xu@calypso:~$ npm i                         # install node dependencies
```

### Компиляция jade-темплейтов:

```
xu@calypso:~$ gulp
// or
xu@calypso:~$ gulp jade
```
