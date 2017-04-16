class EmailVerifyTokensController < ApplicationController
  before_action :verify_rucaptcha!
end
