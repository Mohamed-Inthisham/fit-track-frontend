import axios from "axios";

const BASE_URL = "http://localhost:8080/api/comments";

class CommentService {
  saveComment(data) {
    return axios.post(BASE_URL + "/" + data.userId + "/post/" + data.postId , {
      commentText:data.commentText
    });
  }

  getComments(postId) {
    return axios.get(BASE_URL + "/" + postId);
  }

  editComment(commentId, editedComment) {
    return axios.put(BASE_URL + "/" + commentId, {commentText: editedComment});
  }

  deleteComment(commentId) {
    return axios.delete(BASE_URL + "/" + commentId);
  }
}

export default new CommentService();
