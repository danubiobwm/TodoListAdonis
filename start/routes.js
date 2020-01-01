'use strict'

const Route = use('Route')

Route.on('/').render('home')
Route.get('/tasks', 'TaskController.index')
Route.on('/add').render('add')
Route.post('/add', 'TaskController.store')

Route.get('/task/:id', 'TaskController.details')
Route.get('/remove/:id', 'TaskController.remove')
