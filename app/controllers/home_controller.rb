class HomeController < ApplicationController
  def index
    @mock_data = { a: 1, b: 2 }
  end
end
