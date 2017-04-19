class CustomException < StandardError; end
class ServiceException < CustomException; end
class ForbiddenException < CustomException; end
