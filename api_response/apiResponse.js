const successResponse = (data, message = 'Operation successful') => {
    return {
      success: true,
      data: Array.isArray(data) ? data : [data],
      message: message,
    };
  };
  
  const errorResponse = (message = 'Operation failed', errorCode = 500) => {
    return {
      success: false,
      error: {
        code: errorCode,
        message: message,
      },
    };
  };
  
  const warningResponse = (data, message = 'Operation completed with warnings') => {
    return {
      success: true,
      data: Array.isArray(data) ? data : [data],
      message: message,
      warning: true,
    };
  };
  
  module.exports = {
    successResponse,
    errorResponse,
    warningResponse,
  };