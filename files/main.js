/* A builder class to simplify the task of creating HTML elements */
class ElementCreator {
    constructor(tag) {
        this.element = document.createElement(tag);
    }

    id(id) {
        this.element.id = id;
        return this;
    }

    class(clazz) {
        this.element.class = clazz;
        return this;
    }

    text(content) {
        this.element.innerHTML = content;
        return this;
    }

    with(name, value) {
        this.element.setAttribute(name, value)
        return this;
    }

    listener(name, listener) {
        this.element.addEventListener(name, listener)
        return this;
    }

    append(child) {
        child.appendTo(this.element);
        return this;
    }

    prependTo(parent) {
        parent.prepend(this.element);
        return this.element;
    }

    appendTo(parent) {
        parent.append(this.element);
        return this.element;
    }

    insertBefore(parent, sibling) {
        parent.insertBefore(this.element, sibling);
        return this.element;
    }

    replace(parent, sibling) {
        parent.replaceChild(this.element, sibling);
        return this.element;
    }
}

/* A class representing a resource. This class is used per default when receiving the
   available resources from the server (see end of this file).
   You can (and probably should) rename this class to match with whatever name you
   used for your resource on the server-side.
 */
class Book {

    /* If you want to know more about this form of getters, read this:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get */
    get idforDOM() {
        return `resource-${this.id}`;
    }
}

function add(resource, sibling) {
    const creator = new ElementCreator("article")
        .id(resource.idforDOM);

    /* Task 2: Instead of the name property of the example resource, add the properties of
       your resource to the DOM. If you do not have the name property in your resource,
       start by removing the h2 element that currently represents the name. For the 
       properties of your object you can use whatever html element you feel represents
       your data best, e.g., h2, paragraphs, spans, ... 
       Also, you don't have to use the ElementCreator if you don't want to and add the
       elements manually. */
    console.log("ADD");
    console.log(resource);

    creator
        .append(new ElementCreator("h2").text(resource.title).class("_header"))
        .append(new ElementCreator("lable").text("ISBN: ").with("for", resource.idforDOM + "-isbn"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-isbn").with("type", "text").with("readonly").with("value", resource.isbn))
        .append(new ElementCreator("lable").text("Title: ").with("for", resource.idforDOM + "-title"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-title").with("type", "text").with("readonly").with("value", resource.title))
        .append(new ElementCreator("lable").text("Genre: ").with("for", resource.idforDOM + "-genre"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-genre").with("type", "text").with("readonly").with("value", resource.genre))
        .append(new ElementCreator("lable").text("Number of pages: ").with("for", resource.idforDOM + "-numberOfPages"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-numberOfPages").with("type", "number").with("readonly").with("value", resource.numberOfPages))
        .append(new ElementCreator("lable").text("Is borrowed: ").with("for", resource.idforDOM + "-isBorrowed"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-isBorrowed").with("type", "checkbox").with("readonly").with("value", resource.isBorrowed))
        .append(new ElementCreator("lable").text("Release date: ").with("for", resource.idforDOM + "-releaseDate"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-releaseDate").with("type", "datePicker").with("readonly").with("value", new Date(resource.releaseDate).toLocaleDateString()));

    creator
        .append(new ElementCreator("button").id(resource.idforDOM + "-edit").text("Edit").listener('click', () => {
            console.log("EDIT");
            console.log(resource);
            edit(resource);
        }))
        .append(new ElementCreator("button").text("Remove").listener('click', () => {
            /* Task 3: Call the delete endpoint asynchronously using either an XMLHttpRequest
               or the Fetch API. Once the call returns successfully, remove the resource from
               the DOM using the call to remove(...) below. */
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.status === 204) {
                    remove(resource);  // <- This call removes the resource from the DOM. Call it after (and only if) your API call succeeds!
                } else {
                    alert("could not delete book");
                }
            };
            xhr.open("DELETE", "/api/books/" + resource.id);
            xhr.send();
        }));

    const parent = document.querySelector('main');

    if (sibling) {
        creator.replace(parent, sibling);
    } else {
        creator.insertBefore(parent, document.querySelector('#bottom'));
    }

    return resource;
}

function edit(resource) {
    const formCreator = new ElementCreator("form")
        .id(resource.idforDOM)
        .append(new ElementCreator("h2").text("Edit " + resource.title));

    console.log("#EDITS");
    console.log(resource);

    /* Task 4 - Part 1: Instead of the name property, add the properties your resource has here!
       The label and input element used here are just an example of how you can edit a
       property of a resource, in the case of our example property name this is a label and an
       input field. Also, we assign the input field a unique id attribute to be able to identify
       it easily later when the user saves the edited data (see Task 4 - Part 2 below). 
    */
    // let date = new Date(resource.releaseDate);
    // let month = date.getMonth();
    // let day = date.getDay();
    // let year = date.getFullYear();

    formCreator
        .append(new ElementCreator("lable").text("ISBN: ").with("for", resource.idforDOM + "-isbn"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-isbn").with("type", "text").with("value", resource.isbn))
        .append(new ElementCreator("lable").text("Title: ").with("for", resource.idforDOM + "-title"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-title").with("type", "text").with("value", resource.title))
        .append(new ElementCreator("lable").text("Genre: ").with("for", resource.idforDOM + "-genre"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-genre").with("type", "text").with("value", resource.genre))
        .append(new ElementCreator("lable").text("Number of pages: ").with("for", resource.idforDOM + "-numberOfPages"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-numberOfPages").with("type", "number").with("value", resource.numberOfPages))
        .append(new ElementCreator("lable").text("Is borrowed: ").with("for", resource.idforDOM + "-isBorrowed"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-isBorrowed").with("type", "checkbox").with("value", resource.isBorrowed))
        .append(new ElementCreator("lable").text("Release date: ").with("for", resource.idforDOM + "-releaseDate"))
        .append(new ElementCreator("input").id(resource.idforDOM + "-releaseDate").with("type", "datePicker").with("value", new Date(resource.releaseDate).toLocaleDateString()));

    // document.getElementById(`${resource.idforDOM}-releaseDate`).setDate(date.getDate());

    /* In the end, we add the code to handle saving the resource on the server and terminating edit mode */
    formCreator
        .append(new ElementCreator("button").text("Speichern").listener('click', (event) => {
            /* Why do we have to prevent the default action? Try commenting this line. */
            event.preventDefault();

            /* The user saves the resource.
               Task 4 - Part 2: We manually set the edited values from the input elements to the resource object. 
               Again, this code here is just an example of how the name of our example resource can be obtained
               and set in to the resource. The idea is that you handle your own properties here.
            */
            console.log("#SAVE");
            console.log(resource);
            resource.isbn = document.getElementById(resource.idforDOM + "-isbn").value;
            resource.title = document.getElementById(resource.idforDOM + "-title").value;
            resource.genre = document.getElementById(resource.idforDOM + "-genre").value;
            resource.numberOfPages = document.getElementById(resource.idforDOM + "-numberOfPages").value;
            resource.isBorrowed = document.getElementById(resource.idforDOM + "-isBorrowed").value;
            resource.releaseDate = document.getElementById(resource.idforDOM + "-releaseDate").value;
            console.log("UPDATED");
            console.log(resource);


            /* Task 4 - Part 3: Call the update endpoint asynchronously. Once the call returns successfully,
               use the code below to remove the form we used for editing and again render 
               the resource in the list.
            */
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.status === 200) {
                    add(resource, document.getElementById(resource.idforDOM));  // <- Call this after the resource is updated successfully on the server
                } else {
                    alert("could not edit book");
                }
            }
            xhr.open("PUT", "/api/books/" + resource.id);
            xhr.setRequestHeader("Content-Type", "application/json");
            console.log(resource.idforDOM)
            console.log(resource.id)
            console.log(resource)
            xhr.send(JSON.stringify(resource));
        }))
        .replace(document.querySelector('main'), document.getElementById(resource.idforDOM));
}

function remove(resource) {
    document.getElementById(resource.idforDOM).remove();
}

/* Task 5 - Create a new resource is very similar to updating a resource. First, you add
   an empty form to the DOM with the exact same fields you used to edit a resource.
   Instead of PUTing the resource to the server, you POST it and add the resource that
   the server returns to the DOM (Remember, the resource returned by the server is the
    one that contains an id).
 */
function create() {
    let resourceTemplate = { title: "new Book", isbn: "-", genre: "-", numberOfPages: 0, isBorrowed: false, releaseDate: "01/01/0001", id: 0 };

    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status !== 404) {
            let response = JSON.parse(xhr.responseText)
            let resource = add(Object.assign(new Book(), response));
            document.getElementById(resource.idforDOM + "-edit").click();

            alert(`added '${resource.title}' with id ${resource.id}`);
        } else {
            alert("could not create book");
        }
    }
    xhr.open("POST", "api/books");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(resourceTemplate));
}

function generateForm(isReadOnly) {

}

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("STARTUP")

    fetch("/api/books")
        .then(response => response.json())
        .then(resources => {
            for (const resource of resources) {
                add(Object.assign(new Book(), resource));
            }
        });
});

