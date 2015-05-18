# endless-user-grid
Angular Data Grid. With "endless" scroll and remote and local storages support.
## Usage
Remote HTTP data source:
```html
ng-init="init('rest', '/data/mock.json')" ng-grid
...
ng-endless-scroll ng-endless-scroll-append="append()"
```
LocalStorage data source:
```html
ng-init="init('localstorage', 'test')" ng-grid
...
ng-endless-scroll ng-endless-scroll-append="append()"
```
## Installation demo
```bash
git clone git@github.com:maxmaximov/endless-user-grid.git
cd endless-user-grid
npm install
npm start
```
[http://localhost:3000/](http://localhost:3000/)

## Online demo
* [REST](https://maxmaximov.github.io/endless-user-grid)
* [LocalStorage](https://maxmaximov.github.io/endless-user-grid/local.html)
