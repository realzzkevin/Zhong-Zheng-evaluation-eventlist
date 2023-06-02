const API = (function () {
  const API_URL = "http://localhost:3000/events";
  //get request
  const getEvents = async () => {
    const res = await fetch(API_URL);
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
    //console.log(this.#events);
    return this.#events;
  }
  async fetchEvents() {
    const event = await API.getEvents();
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
    constructor(){
        this.form = document.querySelector(".event-list");
        this.mainAddBtn = document.querySelector("#mainAddBtn");
        this.eventlist = document.querySelector(".event-list_table");
    }

    initRenderEvents(events) {
        this.eventlist.innerHTML ="";
        const header = this.createHeader();
        this.eventlist.append(header);
        events.forEach((event) => {
            this.appendEvent(event);
        })
    }

    createHeader(){
        const header = document.createElement("tr");
        header.classList.add("event-list_row");
        const col1 = document.createElement('th');
        col1.textContent = "Event";
        header.appendChild(col1);
        const col2 = document.createElement('th');
        col2.textContent = "Start";
        header.appendChild(col2);
        const col3 = document.createElement('th');
        col3.textContent = "end";
        header.appendChild(col3);
        const col4 = document.createElement('th');
        col4.textContent = "Action";
        header.appendChild(col4);
        col1.classList.add("event-list_row")
        col2.classList.add("event-list_row")
        col3.classList.add("event-list_row")
        col4.classList.add("event-list_row")
        return header;
    }

    removeEvent(id) {
        const elem = document.getElementById(`event-${id}`);
        elem.remove();
    }

    appendEvent(event) {
        const eventEl = document.createEventElem(event);
        this.eventlist
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

    setUpEvents(){
        this.setUpAddEvent();
        this.setUpDeleteEvent();
        this.setUpUpdateEvent();
        this.setUpCancelEvent();
    }

    setUpAddEvent() {
    }

    setUpDeleteEvent(){

    }
    setUpUpdateEvent(){

    }
    setUpCancelEvent(){

    }
}

const model = new EventModel();
const view = new EventView();
const controller = new EventController(model, view);