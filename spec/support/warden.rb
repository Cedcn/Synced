module Warden::Test::ControllerHelpers
  # Warden::Test::ControllerHelpers provides a facility to test controllers in isolation
  # Most of the code was extracted from Devise's Devise::TestHelpers.
  def self.included(base)
    base.class_eval do
      setup :setup_controller_for_warden, :warden if respond_to?(:setup)
    end
  end

  # Override process to consider warden.
  def process(*)
    _catch_warden { super }
    @response
  end

  # We need to setup the environment variables and the response in the controller
  def setup_controller_for_warden
    @request.env['action_controller.instance'] = @controller
  end

  # Quick access to Warden::Proxy.
  def warden
    @warden ||= begin
      manager = Warden::Manager.new(
        nil,
        &Rails.application.config.middleware.detect { |m| m.name == 'Warden::Manager' }.block
      )
      @request.env['warden'] = Warden::Proxy.new(@request.env, manager)
    end
  end

  protected

  def _catch_warden(&block)
    result = catch(:warden, &block)
    env = @controller.request.env

    result ||= {}

    case result
    when Array
      if result.first == 401 && intercept_401?(env) # does this happen during testing?
        _process_unauthenticated(env)
      else
        result
      end
    when Hash
      _process_unauthenticated(env, result)
    else
      result
    end
  end

  def _process_unauthenticated(env, options = {})
    options[:action] ||= :unauthenticated
    proxy = request.env['warden']
    result = options[:result] || proxy.result

    ret = case result
          when :redirect
            body = proxy.message || "You are being redirected to #{proxy.headers['Location']}"
            [proxy.status, proxy.headers, [body]]
          when :custom
            proxy.custom_response
          else
            request.env["PATH_INFO"] = "/#{options[:action]}"
            request.env["warden.options"] = options
            Warden::Manager._run_callbacks(:before_failure, env, options)

            status, headers, response = warden.config[:failure_app].call(env).to_a
            @controller.response.headers.merge!(headers)
            @controller.status = status
            @controller.response.body = response.body
            nil # causes process return @response
          end

    if ret.is_a?(Array)
      status, headers, body = *ret
      @controller.response ||= @response
      @response.status = status
      @response.headers.merge!(headers)
      @response.body = body
    end

    ret
  end
end
