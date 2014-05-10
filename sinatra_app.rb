require 'sinatra/base'
require 'sinatra-index'

class AsciiBirdsApp < Sinatra::Application
  set :public_folder, 'site'

  register Sinatra::Index
  use_static_index 'index.html'
end

AsciiBirdsApp.run!