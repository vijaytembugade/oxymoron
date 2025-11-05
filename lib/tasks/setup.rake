desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'
  create_user! email: 'vijay@test.com', name: 'Vijay'
  create_user! email: 'test@test.com', name: 'test'
  puts 'Done! Now you can login with either "vijay@test.com" or "test@test.com", using password "123456"'
end

def create_user!(options = {})
  user_attributes = { password: '123456', password_confirmation: '123456' }
  attributes = user_attributes.merge options
  User.create! attributes
end