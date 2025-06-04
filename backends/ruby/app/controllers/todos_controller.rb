class TodosController < ApplicationController
  # GET /todos
  def index
    todos = ToDoItem.all
    render json: todos
  end

  # POST /todos
  def create
    todo = ToDoItem.new(todo_params)
    if todo.save
      render json: todo, status: :created
    else
      render json: { errors: todo.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /todos/:id
  def destroy
    todo = ToDoItem.find_by(id: params[:id])
    if todo
      todo.destroy
      head :no_content
    else
      render json: { error: 'Not found' }, status: :not_found
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:text)
  end
end
