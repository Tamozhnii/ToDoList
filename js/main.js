// При загрузке страницы, выгрузить данные если они есть
window.onload = () => {
  let _id = ""; // глобальная переменная

  let fond = document.querySelector(".fond"); // Затемненный экран под всплывающими окнами

  let burger = document.querySelector(".burger img"); // кнопка Бургер меню
  let ul = document.querySelector(".nav ul"); // Выпадающее меню

  let expand = document.querySelector(".expand"); // кнопка Раскрыть/Скрыть в меню

  let add = document.querySelector(".add"); // кнопка Добавить (плюсик)
  let input = document.querySelector(".input"); // Окно ввода задачи
  let iputArea = document.querySelector("#input"); // Поле ввода текста
  let inputYes = document.querySelector(".input_yes"); // кнопка ДА в меню ввода задачи
  let inputNo = document.querySelector(".input_no"); // кнопка НЕТ в меню ввода задачи

  let save = document.querySelector(".save"); // кнопка Сохранить в меню
  let saves = document.querySelector(".saves"); // Окно подтверждения сохранения
  let seveYes = document.querySelector(".save_yes"); // кнопка Да в окне Сохранения
  let seveNo = document.querySelector(".save_no"); // кнопка Нет в окне Сохранения

  let dlt = document.querySelector(".delete"); // кнопка Удалить в Меню
  let deletes = document.querySelector(".deletes"); // Окно подтверждения удаления
  let deleteYes = document.querySelector(".delete_yes"); // кнопка ДА в окне удаления
  let deleteNo = document.querySelector(".delete_no"); // кнопка Нет в окне удаления

  let references = document.querySelector(".references"); // Окно справочной информации
  let reference = document.querySelector(".reference"); // кнопка Справка в меню

  let container = document.querySelector(".container"); // область добавления задач

  // ------------------Меню----------------------

  // Бургер меню
  burger.addEventListener("click", () => {
    if (ul.style.display === "flex") {
      ul.style.display = "none";
    } else {
      ul.style.display = "flex";
    }
  });

  // Кнопка меню - разворачивание/сворачивание подзадач
  expand.addEventListener("click", () => {
    if (expand.getAttribute("src") === "./img/circle-down.png") {
      expand.setAttribute("src", "./img/circle-up.png");
    } else {
      expand.setAttribute("src", "./img/circle-down.png");
    }
    if (ul.style.display === "flex") {
      ul.style.display = "none";
    } else {
      ul.style.display = "flex";
    }
  });

  // Кнопка меню - Сохранить
  function Save() {
    if (saves.style.display === "flex") {
      saves.style.display = "none";
      fond.style.display = "none";
    } else {
      saves.style.display = "flex";
      fond.style.display = "block";
    }
    if (ul.style.display === "flex") {
      ul.style.display = "none";
    } else {
      ul.style.display = "flex";
    }
  }
  save.addEventListener("click", () => Save());

  // Кнопка меню - Справка
  function Reference() {
    if (references.style.display === "block") {
      references.style.display = "none";
      fond.style.display = "none";
    } else {
      references.style.display = "block";
      fond.style.display = "block";
    }
    if (ul.style.display === "flex") {
      ul.style.display = "none";
    } else {
      ul.style.display = "flex";
    }
  }
  reference.addEventListener("click", () => Reference());

  // Кнопка меню - Удалить
  function Deleted() {
    if (deletes.style.display === "flex") {
      deletes.style.display = "none";
      fond.style.display = "none";
    } else {
      deletes.style.display = "flex";
      fond.style.display = "block";
    }
    if (ul.style.display === "flex") {
      ul.style.display = "none";
    } else {
      ul.style.display = "flex";
    }
  }
  dlt.addEventListener("click", () => Deleted());

  // ---------------------------------------------

  // --------Окно подтверждения сохранения--------
  // Кнопка Да
  function SaveYes() {
    saves.style.display = "none";
    fond.style.display = "none";
  }
  seveYes.addEventListener("click", () => SaveYes());

  // Кнопка Нет
  function SaveNo() {
    saves.style.display = "none";
    fond.style.display = "none";
  }
  seveNo.addEventListener("click", () => SaveNo());
  // ---------------------------------------------

  // -------Окно подтверждения удаления-----------
  // Кнопка Да
  function DeleteYes() {
    deletes.style.display = "none";
    fond.style.display = "none";
    let tasks = document.querySelectorAll(".task");
    for (let i = 0; i < tasks.length; i++) {
      container.removeChild(tasks[i]);
    }
  }
  deleteYes.addEventListener("click", () => DeleteYes());
  // Кнопка Нет
  function DeleteNo() {
    deletes.style.display = "none";
    fond.style.display = "none";
  }
  deleteNo.addEventListener("click", () => DeleteNo());
  // ---------------------------------------------

  // --------Окно ввода задачи---------

  // Окно ввода/редактирования задачи/подзадачи
  function Add() {
    if (fond.style.display === "flex") {
      input.style.display = "none";
      fond.style.display = "none";
    } else {
      input.style.display = "flex";
      fond.style.display = "block";
      document.querySelector("#input").focus();
    }
    if (ul.style.display === "flex") ul.style.display = "none";
  }
  add.addEventListener("click", () => Add());

  // Добавление подзадачи
  function SubAdd(id) {
    _id = id;
    if (fond.style.display === "flex") {
      input.style.display = "none";
      fond.style.display = "none";
    } else {
      input.style.display = "flex";
      fond.style.display = "block";
      document.querySelector("#input").focus();
    }
    if (ul.style.display === "flex") ul.style.display = "none";
  }

  // Событие добавления подзадач для кнопок у задач
  function EventSubAdd() {
    let subAdd = document.querySelectorAll(".subAdd");
    for (let sub = 0; sub < subAdd.length; sub++) {
      subAdd[sub].addEventListener("click", () =>
        SubAdd(
          subAdd[sub].parentElement.parentElement.parentElement.getAttribute(
            "id"
          )
        )
      );
    }
  }
  EventSubAdd();

  // кнопка Нет
  function Input_No() {
    input.style.display = "none";
    fond.style.display = "none";
    iputArea.value = "";
  }
  inputNo.addEventListener("click", () => Input_No());

  // кнопка Да
  function Input_Yes() {
    CopyTask();
    input.style.display = "none";
    fond.style.display = "none";
    iputArea.value = "";
  }
  inputYes.addEventListener("click", () => Input_Yes());

  // ----------------------------------

  // ------------------Общие события-------------------------

  // Обработка клика по затемненному фону для всех всплывающих окон
  fond.addEventListener("click", () => {
    fond.style.display = "none";
    input.style.display = "none";
    saves.style.display = "none";
    references.style.display = "none";
    deletes.style.display = "none";
  });

  // Функция копирования значения
  function CopyTask() {
    let i = document.querySelector("#input").value;
    if (i !== "" || i !== null) {
      if (_id !== "") PastSubTask(i);
      else PastTask(i);
    }
  }

  // Функция добавления Задачи
  function PastTask(taskName) {
    let newTask =
      '<div class="task_content"><input class="item check" type="checkbox"/><span class="item" style="text-decoration: none">' +
      taskName +
      '</span><div class="manag"><img src="./img/plus.png" class="subAdd item" /><img src="./img/pencil.png" class="edit item"/><img src="./img/blocked.png" class="del item"/></div></div><ul class="subTasks"></ul>';
    let tasksLength = document.querySelectorAll(".task").length;
    const li = document.createElement("li");
    li.setAttribute("class", "task");
    li.setAttribute("id", "t" + tasksLength);
    li.innerHTML = newTask;
    container.appendChild(li);
    EventSubAdd();
    CheckEvent();
  }

  // Функция добавления Подзадачи
  function PastSubTask(subTaskName) {
    let subTasks = document.querySelector(`#${_id} .subTasks`);
    const li = document.createElement("li");
    li.setAttribute("class", "subTask");

    let newSubTask = `<input class="item check" type="checkbox"/><span class="item" style="text-decoration: none">${subTaskName}</span><div class="manag"><img src="./img/pencil.png" class="edit item"/><img src="./img/blocked.png" class="del item"/></div>`;
    li.innerHTML = newSubTask;

    subTasks.appendChild(li);
    _id = "";
    CheckEvent();
  }

  // Функция зачеркивания выполненного пунката
  function IsChecked(check, tag) {
    let text = tag.querySelector("span");
    if (check.checked === true) {
      text.setAttribute("style", "text-decoration: line-through");
    } else {
      text.setAttribute("style", "text-decoration: none");
    }
  }

  // Присваивание события для чекбоксов
  function CheckEvent() {
    let checks = document.querySelectorAll(".check");
    for (let i = 0; i < checks.length; i++) {
      checks[i].addEventListener("click", () =>
        IsChecked(checks[i], checks[i].parentElement)
      );
    }
  }
  CheckEvent();

  // Нажатие клавишь
  document.onkeyup = (e) => {
    // console.log();
    // Если все временные окна закрыты
    if (
      saves.style.display === "none" &&
      input.style.display === "none" &&
      deletes.style.display === "none" &&
      references.style.display === "none" &&
      fond.style.display === "none"
    ) {
      if (e.altKey === true && e.code === "KeyS") {
        Save(); // Alt + S - сохранить
      } else if (e.code === "Enter") {
        Add(); // Enter - Добавить новую задачу
      } else if (e.code === "Delete") {
        Deleted(); // Alt + Del - Удалить все задачи
      }
    } // Если открыто окно ввода/редактирования задачи/подзадачи
    else if (input.style.display === "flex") {
      if (e.code === "Enter") {
        Input_Yes(); // При нажатии Enter - подтвердить ввод
        return false;
      } else if (e.code === "Escape") {
        Input_No(); // При нажатии Esc - отменить ввод
        return false;
      }
    } // Если открыто окно подтверждения сохранения
    else if (saves.style.display === "flex") {
      if (e.code === "Enter") {
        SaveYes(); // При нажатии Enter - подтвердить сохранения
        return false;
      } else if (e.code === "Escape") {
        SaveNo(); // При нажатии Esc - отменить сохранение
        return false;
      }
    } // Если открыто окно подтверждения удаления всех задач
    else if (deletes.style.display === "flex") {
      if (e.code === "Enter") {
        DeleteYes(); // При нажатии Enter - подтвердить удыление
        return false;
      } else if (e.code === "Escape") {
        DeleteNo(); // При нажатии Esc - отменить удыление
        return false;
      }
    } // Если открыто окно Справки
    else if (references.style.display === "block") {
      if (e.code === "Enter") {
        references.style.display = "none";
        fond.style.display = "none"; // При нажатии Enter - закрыть справку
      } else if (e.code === "Escape") {
        references.style.display = "none";
        fond.style.display = "none"; // При нажатии Esc - закрыть справку
      }
    }
  };
  // -------------------------------------------------------
}; // OnLoadEnd
