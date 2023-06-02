const API = (function () {
  const API_URL = "http://localhost:3000/events";
  //get request
  const getEvents = async () => {
    const res = await fetch(`${API_URL}`);
    return await res.json();
  };
  //post request
  const postEvent = async (newEvent) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(newEvent),
    });
    return await res.json();
  };
  //delete Request
  const deleteEvent = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  };
  //put request
  const putEvent = async (updateEvent, id) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(updateEvent),
    });
    return await res.json();
  };

  //

  return {
    getEvents,
    postEvent,
    deleteEvent,
    putEvent,
  };
})();

class EventModel {
  #events = [];
  constructor() {}

  getEvents() {
    return this.#events;
  }
  async fetchEvents() {
    this.#events = await API.getEvents();
  }

  async addEvent(newEvent) {
    const event = await API.postEvent(newEvent);
    this.#events.push(event);
    return event;
  }

  async removeEvent(id) {
    const removeId = await API.deleteEvent(id);
    this.#events = this.#events.filter((event) => event.id !== id);
    return removeId;
  }

  async updateEvent(update, id) {
    const updateEvent = await API.putEvent(update, id);
    this.#events = this.#events.map((event) => {
      if (event.id === updateEvent.id) {
        event = updateEvent;
      }
    });
  }
}

class EventView {
  constructor() {
    this.form = document.querySelector(".event-list");
    this.mainAddBtn = document.querySelector("#mainAddBtn");
    this.eventlist = document.querySelector(".event-list_table");
  }

  initRenderEvents(events) {
    this.eventlist.innerHTML = "";
    const header = this.createHeader();
    this.eventlist.append(header);
    events.forEach((el) => {
      this.appendEvent(el);
    });
  }

  createHeader() {
    const header = document.createElement("tr");
    header.classList.add("event-list_row");
    const col1 = document.createElement("th");
    col1.textContent = "Event";
    header.appendChild(col1);
    const col2 = document.createElement("th");
    col2.textContent = "Start";
    header.appendChild(col2);
    const col3 = document.createElement("th");
    col3.textContent = "end";
    header.appendChild(col3);
    const col4 = document.createElement("th");
    col4.textContent = "Action";
    header.appendChild(col4);
    col1.classList.add("event-list_row");
    col2.classList.add("event-list_row");
    col3.classList.add("event-list_row");
    col4.classList.add("event-list_row");
    return header;
  }

  removeEvent(id) {
    const elem = document.getElementById(`event-${id}`);
    elem.remove();
  }

  appendEvent(event) {
    const eventEl = this.createEventElem(event);
    this.eventlist.append(eventEl);
  }

  createEventElem(event) {
    const eventElment = document.createElement("tr");
    eventElment.classList.add("event-list_row");
    eventElment.setAttribute("id", `event-${event.id}`);

    const nameElem = document.createElement("td");
    const nameP = document.createElement("p");
    nameP.textContent = event.eventName;
    nameElem.append(nameP);
    eventElment.append(nameElem);

    const start = document.createElement("td");
    const startP = document.createElement("p");
    startP.textContent = event.startDate;
    start.append(startP);
    eventElment.append(start);

    const end = document.createElement("td");
    const endP = document.createElement("p");
    endP.textContent = event.endDate;
    end.append(endP);
    eventElment.append(end);
    const buttonCol = document.createElement("td");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");
    button1.textContent = "edit";
    button2.textContent = "delete";
    button1.classList.add("event-list__edit");
    button2.classList.add("event-list__delete");
    buttonCol.append(button1);
    buttonCol.append(button2);
    eventElment.append(buttonCol);
    return eventElment;
  }

  createEditRow() {
    const eventElment = document.createElement("tr");
    eventElment.classList.add("event-list_row");
    eventElment.setAttribute("id", `event-${event.id}`);

    const nameElem = document.createElement("td");
    const nameP = document.createElement("input");
    nameP.setAttribute("type", "text");
    nameElem.append(nameP);
    eventElment.append(nameElem);

    const start = document.createElement("td");
    const startP = document.createElement("input");
    start.setAttribute("type", "date");
    start.append(startP);
    eventElment.append(start);

    const end = document.createElement("td");
    const endP = document.createElement("p");
    endP.setAttribute("type", "date");
    end.append(endP);
    eventElment.append(end);

    const buttonCol = document.createElement("td");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    button1.textContent = "save";
    button2.textContent = "cancle";
    button1.classList.add("event-list__save");
    button2.classList.add("event-list__cancle");
    buttonCol.append(button1);
    buttonCol.append(button2);
    eventElment.append(buttonCol);
    return eventElment;
  }
}

class EventController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.init();
  }

  async init() {
    this.setUpEvents();
    await this.model.fetchEvents();
    this.view.initRenderEvents(this.model.getEvents());
  }

  setUpEvents() {
    this.setUpAddEvent();
    this.setUpDeleteEvent();
    this.setUpUpdateEvent();
    this.setUpCancelEvent();
  }

  setUpAddEvent() {}

  setUpDeleteEvent() {}
  setUpUpdateEvent() {}
  setUpCancelEvent() {}
}

const model = new EventModel();
const view = new EventView();
const controller = new EventController(model, view);
