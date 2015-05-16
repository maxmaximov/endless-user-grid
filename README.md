# my-user-grid
Angular directive for user data grid. With "endless" scroll and support remote and local storages.
## Usage
Remote HTTP data source:
```html
<my-user-grid source="rest" url="/my-user-grid/data/mock.json"/>
```
LocalStorage data source:
```html
<my-user-grid source="localstorage" prefix="my"/>
```
## Installation demo
```bash
git clone git@github.com:maxmaximov/my-user-grid.git
cd my-user-grid
npm install
npm start
```
[http://localhost:3000/demo/](http://localhost:3000/demo/)

## [Online demo](https://maxmaximov.github.io/my-user-grid)
