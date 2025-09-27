class TasksController < ApplicationController
    respond_to :html, :xml, :json
    def index
        @tasks = Task.all
        # respond_to do |format|
        #     format.html
        #     format.json {render json: @tasks}
        #     format.xml {render xml: @tasks}
        # end
        respond_with(@tasks)
    end
end
