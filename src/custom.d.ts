declare namespace Express {
  export interface Request {
    userId?: string;
    user?: string | Object;
  }
}
