class SharedService {
  BACKEND_URL: string | undefined = process.env.BACKEND_URL;
  HEADER:any = {
    "content-type": "application/json"
  }
  public async getHeader() {
    return this.HEADER;
  }

  public isUserLoggedIn() {
    if(localStorage.getItem("user"))return true;
    return false;
  }

  public getUser() {
    return localStorage.getItem("user");
  }
  
}

export { SharedService };
