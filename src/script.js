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
  getEventById(id) {
    for (let i = 0; i < this.#events.length; i++) {
      if (this.#events[i].id === id) {
        return this.#events[i];
      }
    }
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
  //update updateEvent
  async updateEvent(update, id) {
    const updateEvent = await API.putEvent(update, id);
    this.#events = this.#events.map((event) => {
      if (event.id === updateEvent.id) {
        return updateEvent;
      } else {
        return event;
      }
    });
    return updateEvent;
  }
}

class EventView {
  constructor() {
    this.form = document.querySelector(".event-list");
    this.mainAddBtn = document.querySelector("#mainAddBtn");
    this.eventlist = document.querySelector(".event-List__body");
  }

  initRenderEvents(events) {
    this.eventlist.innerHTML = "";
    events.forEach((el) => {
      this.appendEvent(el);
    });
  }

  removeEvent(id) {
    const elem = document.getElementById(`event-${id}`);
    elem.remove();
  }

  appendEvent(event) {
    const eventEl = this.createEventElem(event);
    this.eventlist.append(eventEl);
  }

  addNewEvent() {
    const eventEl = this.createEditRow();
    this.eventlist.append(eventEl);
  }

  createEditBtn(id) {
    const btn = document.createElement("button");
    btn.innerHTML =
      '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>';
    btn.classList.add("event-list__edit");
    btn.setAttribute("edit-id", id);
    return btn;
  }

  createDeleteBtn(id) {
    const btn = document.createElement("button");
    btn.innerHTML =
      '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>';
    btn.classList.add("event-list__delete");
    btn.setAttribute("remove-id", id);
    return btn;
  }

  createSaveBtn() {
    const btn = document.createElement("button");
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>';
    btn.classList.add("event-list__save");
    // btn.setAttribute("save-id", id);
    return btn;
  }
  createCancelBtn() {
    const btn = document.createElement("button");
    btn.innerHTML =
      '<svg focusable="false" aria-hidden="true" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M19.587 16.001l6.096 6.096c0.396 0.396 0.396 1.039 0 1.435l-2.151 2.151c-0.396 0.396-1.038 0.396-1.435 0l-6.097-6.096-6.097 6.096c-0.396 0.396-1.038 0.396-1.434 0l-2.152-2.151c-0.396-0.396-0.396-1.038 0-1.435l6.097-6.096-6.097-6.097c-0.396-0.396-0.396-1.039 0-1.435l2.153-2.151c0.396-0.396 1.038-0.396 1.434 0l6.096 6.097 6.097-6.097c0.396-0.396 1.038-0.396 1.435 0l2.151 2.152c0.396 0.396 0.396 1.038 0 1.435l-6.096 6.096z"></path></svg>';
    btn.classList.add("event-list__cancel");
    return btn;
  }

  createAddBtn(id) {
    const btn = document.createElement("button");
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>';
    btn.classList.add("event-list__save");
    btn.setAttribute("save-id", id);
    return btn;
  }

  //create a event elment
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
    const button1 = this.createEditBtn(event.id);
    const button2 = this.createDeleteBtn(event.id);

    buttonCol.append(button1);
    buttonCol.append(button2);
    eventElment.append(buttonCol);
    return eventElment;
  }

  //create a row to edit event element

  createEditRow(event) {
    const eventElment = document.createElement("tr");
    eventElment.classList.add("event-list_row");

    const nameElem = document.createElement("td");
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.classList.add("eventName");
    nameElem.append(nameInput);
    eventElment.append(nameElem);

    const start = document.createElement("td");
    const startInput = document.createElement("input");
    startInput.setAttribute("type", "date");
    startInput.classList.add("startDate");
    start.append(startInput);
    eventElment.append(start);

    const end = document.createElement("td");
    const endInput = document.createElement("input");
    endInput.setAttribute("type", "date");
    endInput.classList.add("endDate");
    end.append(endInput);
    eventElment.append(end);

    const buttonCol = document.createElement("td");

    let button1 = this.createSaveBtn();
    if (event === undefined) {
      button1 = this.createSaveBtn();
    } else {
      button1 = this.createAddBtn(event.id);
    }
    const button2 = this.createCancelBtn();
    
    buttonCol.append(button1);
    buttonCol.append(button2);
    eventElment.append(buttonCol);

    if (event !== undefined) {
      eventElment.setAttribute("id", `event-${event.id}`);
      nameInput.setAttribute("value", `${event.eventName}`);
      startInput.setAttribute("value", `${event.startDate}`);
      endInput.setAttribute("value", `${event.endDate}`);
      button2.setAttribute("cancel-id", `${event.id}`);
    }
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
    this.setUpSaveEvents();
    this.setUpDeleteEvent();
    this.setUpUpdateEvent();
    this.setUpCancelEvent();
  }

  setUpAddEvent() {
    this.view.mainAddBtn.addEventListener("click", (e) => {
      this.view.addNewEvent();
    });
  }

  setUpDeleteEvent() {
    this.view.eventlist.addEventListener("click", (e) => {
      const isDeleteBtn = e.target.classList.contains("event-list__delete");
      if (isDeleteBtn) {
        const removeId = e.target.getAttribute("remove-id");
        this.model.removeEvent(removeId).then(() => {
          this.view.removeEvent(removeId);
        });
      }
    });
  }

  setUpSaveEvents() {
    this.view.eventlist.addEventListener("click", (e) => {
      const isSaveBtn = e.target.classList.contains("event-list__save");
      if (isSaveBtn) {
        const row = e.target.parentNode.parentNode;
        const id = e.target.getAttribute("save-id");
        const eventName = row.querySelector(".eventName").value;
        const startDate = row.querySelector(".startDate").value;
        const endDate = row.querySelector(".endDate").value;

        if (id !== null) {
          this.model
            .updateEvent(
              {
                eventName,
                startDate,
                endDate,
                id,
              },
              id
            )
            .then((event) => {
              const updatedRow = this.view.createEventElem(event);
              row.parentNode.replaceChild(updatedRow, row);
            });
        } else {
          this.model
            .addEvent({
              eventName,
              startDate,
              endDate,
            })
            .then((event) => {
              const updatedRow = this.view.createEventElem(event);
              row.parentNode.replaceChild(updatedRow, row);
            });
        }
      }
    });
  }

  setUpUpdateEvent() {
    this.view.eventlist.addEventListener("click", (e) => {
      const isEditBtn = e.target.classList.contains("event-list__edit");
      if (isEditBtn) {
        const editId = e.target.getAttribute("edit-id");
        const currRow = document.getElementById(`event-${editId}`);
        const eEvent = this.model.getEventById(Number(editId));
        const editRow = this.view.createEditRow(eEvent);
        currRow.parentNode.replaceChild(editRow, currRow);
      }
    });
  }

  setUpCancelEvent() {
    this.view.eventlist.addEventListener("click", (e) => {
      const iscancelBtn = e.target.classList.contains("event-list__cancel");
      if (iscancelBtn) {
        const id = e.target.getAttribute("cancel-id");
        const currRow = e.target.parentNode.parentNode;
        if (id !== null) {
          const eEvent = this.model.getEventById(Number(id));
          const eventRow = this.view.createEventElem(eEvent);
          currRow.parentNode.replaceChild(eventRow, currRow);
        } else {
          currRow.parentNode.removeChild(currRow);
        }
      }
    });
  }
}

const model = new EventModel();
const view = new EventView();
const controller = new EventController(model, view);
