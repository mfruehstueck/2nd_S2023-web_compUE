/* A class representing your resource. At the moment, its name is Resource. But you
   can (and probalby should) rename it to whatever you are going to use as a Resource.
   At the moment the example resource has only a name. You can delete this property
   if you don't need it.

   Task 1 - Part 1: Replace the Resource class with a new class of your choosing, that
   has at least three properties: one string property, one number property, one boolean
   property, and - optionally - a date property.
   Then, adapt the initialization of the data at the end of this file (Task 2 - Part 2)
   so that you have some instances of your object available that can be served to the client.
 */
class Book {
    constructor(isbn, title, genre, numberOfPages, isBorrowed, releaseDate) {
        this.isbn = isbn;
        this.title = title;
        this.genre = genre;
        this.numberOfPages = numberOfPages;
        this.isBorrowed = isBorrowed;
        this.releaseDate = releaseDate;
    }
}

/* A model managing a map of resources. The id of the object is used as key in the map. */
class Model {
    static ID = 1;

    constructor() {
        this.resources = new Map();
    }

    add(resource) {
        resource.id = Model.ID++;
        this.resources.set(resource.id, resource);
    }

    get(id) {
        this.checkId(id);
        return this.resources.get(id);
    }

    getAll() {
        return Array.from(this.resources.values());
    }

    checkId(id) {
        if (typeof id !== "number") {
            throw new Error(`Given id must be an number, but is a ${typeof id}`);
        }
    }

    create(resource) {
        this.add(resource);
        return resource;
    }

    update(id, resource) {
        this.checkId(id);

        const target = this.resources.get(id);
        if (!target) {
            throw new Error(`Resource with ${id} does not exist and cannot be updated.`)
        }

        Object.assign(target, resource);

        return target;
    }

    delete = (id) => {
        this.checkId(id);
        return this.resources.delete(id);
    }
}

const model = new Model();

/* Task 1 - Part 2. Replace these three instances of the example Class Resource with instances
   of your own class */
model.add(new Book("978-0-7475-3269-9", "Harry Potter and the Philosopher's Stone", "Fantasy", 223, true, "1997-06-26"));//"26 June 1997"
model.add(new Book("0-7475-3849-2", "Harry Potter and the Chamber of Secrets", "Fantasy", 251, false, "1998-07-02"));//"2 July 1998"
model.add(new Book("0-7475-4215-5", "Harry Potter and the Prisoner of Azkaban", "Fantasy", 317, true, "1999-07-08"));//"8 July 1999"

module.exports = model;
