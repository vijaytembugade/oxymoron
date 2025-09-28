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

end
