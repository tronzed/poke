export class ApiService{



    //  API To Make Get Request for Common API
  getRequest(apiUrl) {
    return this.httpRequest("GET", `${apiUrl}`, null);
  }


}