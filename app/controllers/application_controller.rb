class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  def method_name
    puts ("teste")
  end
  
  def find_player( id = 0 )
                          
    assert { !id.nil? }
    id = id.to_i
    assert { id >= 0 }
    puts "teste"
    @player= Player.find(id);
                          
  end

end
