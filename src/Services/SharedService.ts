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

  public getUser(): string {
    let toReturn = localStorage.getItem("user");
    if(!toReturn) return '';
    return toReturn;
  }
  
}

export { SharedService };
