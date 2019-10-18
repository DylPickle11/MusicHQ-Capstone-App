const remoteURL = "http://localhost:3000";

export default {
    addUser(newUser) {
      return fetch(`${remoteURL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      }).then(data => data.json())
    },
    searchUsername(email) {
      return fetch(`${remoteURL}/users?email=${email}`)
      .then(e => e.json()
      )
    },
    get(id) {
        return fetch(`${remoteURL}/coffee/${id}`).then(result => result.json())
    },
    getAll(resource) {
        return fetch(`${remoteURL}/${resource}`).then(result => result.json())
    },
    delete(resource, id) {
        return fetch(`${remoteURL}/${resource}/${id}`,{
            method: "DELETE"
        })
        .then(result => result.json())
    }
}
