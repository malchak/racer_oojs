get '/' do
  
  erb :index
end

post '/start' do
  @player1 = Player.find_or_create_by_username(params["player1"])
  @player2 = Player.find_or_create_by_username(params["player2"])
  @game = Game.create(:board_length => params["board_length"])
  @game.players << [@player1, @player2]
  
  erb :player_board
end


get '/games/:id' do
  content_type :json
  game = Game.find(params[:id]) 
  {game: game.id, board_length: game.board_length, player1: game.players.first, player2: game.players.last}.to_json

end


post '/games/:id/results' do
  @game = Game.find(params[:id])
  @game.update_attributes(winner: params[:winner])
end
