json.task do
  json.id @task.id
  json.slug @task.slug
  json.title @task.title

    if @task.assigned_user.present?
        json.assigned_user do
            json.id @task.assigned_user.id
            json.name @task.assigned_user.name
        end
    end
end

# json.task do
#   json.extract! @task,
#     :id,
#     :slug,
#     :title

#   json.assigned_user do
#     json.extract! @task.assigned_user,
#       :id,
#       :name
#   end
# end