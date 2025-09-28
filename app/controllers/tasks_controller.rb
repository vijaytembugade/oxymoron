# frozen_string_literal: true

class TasksController < ApplicationController
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
    task = Task.find_by(slug: params[:slug])
    if task
      render status: :ok, json: {task:}
    end
  end

  def update
    task = Task.find_by(slug: params[:slug])
    task.update(task_params)
    render status: :ok, json: {task:}
  end

  private
    def task_params
      params.require(:task).permit(:title)
    end
end
