import http from "../http";

class UrlShortenerService {
  create(data) {
    return http.post("/create", data);
  }

  getAll() {
    return http.get("/all");
  }

  update(id, data) {
    return http.put(`/update/${id}`, data);
  }

  delete(id) {
    return http.put(`/delete/${id}`);
  }
}

export default new UrlShortenerService();