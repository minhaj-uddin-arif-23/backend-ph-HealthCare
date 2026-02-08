import { Response } from "express";

// Creating Send Response Utility Functions  {status interface}
interface IResponse<T> {
  httpStatusCode: number;
  success: boolean;
  message?: string;
  data?: T;
}

const sendResponse = <T>(res: Response, response: IResponse<T>) => {
  const { httpStatusCode, success, message, data } = response;
  res.status(httpStatusCode).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
