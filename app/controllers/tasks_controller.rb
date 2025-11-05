# frozen_string_literal: true

class TasksController < ApplicationController
  # before_action :load_task!, only: %i[show update destroy]
  respond_to :html, :xml, :json
  
  def index
    tasks = Task.all
    ## thie below fucking sentence is as same as -> render({status: :ok, json: {task: task}})
    render status: :ok, json: {tasks:}
    # respond_to do |format|
    #     format.html
    #     format.json {render json: @tasks}
    #     format.xml {render xml: @tasks}
    # end
    # respond_with(@tasks)
  end

  def create
    task = Task.new(task_params)
    task.save!
    render status: :ok, json: {task:}
  end

 def show
    # task = Task.includes(:assigned_user).find_by(slug: params[:slug])
    # if task
    #   render status: :ok, json: {task:}
    # end
    render
  end

  def update
    task = Task.find_by(slug: params[:slug])
    task.update!(task_params)
    render status: :ok, json: {task:}
  end

  def destroy
    task = Task.find_by(slug: params[:slug])
    task.destroy()
    render status: :ok, json: {message: "Task deleted successfully"}
  end

  private
    def task_params
      params.require(:task).permit(:title, :assigned_user_id)
    end

    def load_task!
      @task = Task.find_by!(slug: params[:slug])
    end
end
