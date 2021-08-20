class SharedService {
  BACKEND_URL: string | undefined = process.env.BACKEND_URL;
  HEADER:any = {
    "content-type": "application/json"
  }
  public async getHeader() {
    return this.HEADER;
  }
  
}

export { SharedService };
