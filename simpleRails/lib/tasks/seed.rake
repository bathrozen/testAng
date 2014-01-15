namespace :pd do

  desc "destroy and rebuild the database"
  task :clear => ["db:drop", "db:create", "db:migrate"]

end