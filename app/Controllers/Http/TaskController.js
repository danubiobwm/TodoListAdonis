'use strict'
const Task = use('App/Models/Task')
const { validateAll } = use('Validator')

class TaskController {
  async index({view}){

    const tasks= await Task.all()

    return view.render('tasks',{
      title:'Tarefas',
      tasks:tasks.toJSON()
    })
  }

  async store({request, response, session}){
    const msg = {
      'title.required':'Required min 3',
      'body.required':'Required min 5',
    }

    const validation= await validateAll(request.all(),{
       title: 'required|min:5|max:15',
       body:'required|min:5|max:140'
    }, msg)

    if(validation.fails()){
      session.withErrors(validation.messages()).flashAll()
      return response.redirect('back')
    }


    const task = new Task()

    task.title = request.input('title')
    task.body = request.input('body')

    await task.save()
    session.flash({ notification: 'Task Added Sucess!' })

    return response.redirect('/tasks')
  }
  async details({params, view}){
    const task = await Task.find(params.id)

    return view.render('detail', {
      task:task
    })
  }


  async remove({params, response, session}){
    const task = await Task.find(params.id)
    await task.delete()
    session.flash({ notification: 'Task Removed!' })
    return response.redirect('/tasks')
  }

}

module.exports = TaskController
