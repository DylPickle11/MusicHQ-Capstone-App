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
        return fetch(`${remoteURL}/songPlans/${id}`).then(result => result.json())
    },
    getAll(resource) {
        return fetch(`${remoteURL}/${resource}`).then(result => result.json())
    },
    delete(id) {
        return fetch(`${remoteURL}/songPlans/${id}`,{
            method: "DELETE"
        })
        .then(result => result.json())
    },
    post(resource, newObject) {
        return fetch(`${remoteURL}/${resource}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(response => response.json())
    },
    update(editedObject) {
        return fetch(`${remoteURL}/SongPlans/${editedObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        }).then(response => response.json());

    }, getObjectWithDatabase(firstResource, id, secondResource) {
        return fetch(`${remoteURL}/${firstResource}/${id}?_embed=${secondResource}`)
            .then(response => response.json())
    },
     searchDatabase(search, database, type) {
        return fetch(`${remoteURL}/${database}?${type}_like=${search}`)
            .then(response => response.json())
    }
}
