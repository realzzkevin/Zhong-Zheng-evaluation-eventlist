const API = function () {
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
};

class EventModel {
  #events = [];
  constructor() {}

  getEvents() {
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

    }
}

class EventController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.init();
    }

    async init() {
        await this.model.fe
    }
}

const model = new EventModel();
const view = new EventView();
const controller = new EventController(model, view);