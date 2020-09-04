// При загрузке страницы, выгрузить данные если они есть
window.onload = () => {
  let _id = ""; // глобальная переменная
  let task_length = 1;
  let sub_length = 1;
  let isEdit = false;
  const data = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

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
    let subTasks = document.querySelectorAll(".subTasks");
    if (expand.getAttribute("src") === "./img/circle-down.png") {
      for (let i = 0; i < subTasks.length; i++) {
        subTasks[i].style.display = 'block';
      }
      expand.setAttribute("src", "./img/circle-up.png");
    } else {
      for (let i = 0; i < subTasks.length; i++) {
        subTasks[i].style.display = 'none';
      }
      expand.setAttribute("src", "./img/circle-down.png");
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
    localStorage.clear();
    saves.style.display = "none";
    fond.style.display = "none";
    let taskArray = [];
    let tasks = document.querySelectorAll(".task");
    tasks.forEach(elem => {
      let arr = [];
      let subTasks = elem.querySelectorAll('.subTask');
      subTasks.forEach(item => {
        let subTask = {};
        subTask.txt = item.querySelector('span').innerHTML;
        subTask.check = item.querySelector('.check').checked;
        arr.push(subTask);
      });

      let task = {};
      task.txt = elem.querySelector('span').innerHTML;
      task.check = elem.querySelector('.check').checked;
      task.subArray = arr;

      taskArray.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(taskArray));
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

  input.onkeydown = (e) => {
    if (e.key === 'Enter') return false;
  }

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
      subAdd[sub].onclick = () =>
        SubAdd(subAdd[sub].parentElement.parentElement.parentElement.getAttribute("id"));
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
    if (i !== "") {
      if (_id !== "") PastSubTask(i);
      else PastTask(i);
    }
  }

  // Функция добавления Задачи
  function PastTask(taskName, check) {
    let newTask =
      `<div class="task_content"><input class="item check" type="checkbox" ${check !== undefined ? check === true? 'checked' : '' : ''}/><span class="item" style="text-decoration: ${check !== undefined ? check === true? 'line-through' : 'none' : 'none'}">${taskName}</span><input class="edit_text" type="text" style="display: none" /><div class="manag"><img src="./img/plus.png" class="subAdd item" /><img src="./img/pencil.png" class="edit item"/><img src="./img/blocked.png" class="del item"/></div></div><ul class="subTasks" style="display: block"></ul>`;
    const li = document.createElement("li");
    li.setAttribute("class", "task");
    li.setAttribute("id", "t" + task_length++);
    li.innerHTML = newTask;
    container.appendChild(li);
    EventSubAdd();
    CheckEvent();
    DeleteEvent();
    ExpandEvent();
    EventEdite();
  }

  // Функция добавления Подзадачи
  function PastSubTask(subTaskName, check) {
    let subTasks = document.querySelector(`#${_id} .subTasks`);
    const li = document.createElement("li");
    li.setAttribute("class", "subTask");
    li.setAttribute("id", 's' + _id + sub_length++);
    let newSubTask = `<input class="item check" type="checkbox" ${check !== undefined ? check === true? 'checked' : '' : ''}/><span class="item" style="text-decoration: ${check !== undefined ? check === true? 'line-through' : 'none' : 'none'}">${subTaskName}</span><input class="edit_text" type="text" style="display: none" /><div class="manag"><img src="./img/pencil.png" class="edit item"/><img src="./img/blocked.png" class="del item"/></div>`;
    li.innerHTML = newSubTask;

    subTasks.appendChild(li);
    _id = "";
    CheckEvent();
    DeleteEvent();
    EventEdite();
  }

  // Функция зачеркивания выполненного пунката
  function IsChecked(check, tag) {
    let text = tag.querySelector("span");
    if (check.checked === true) {
      text.setAttribute("style", "text-decoration: line-through");
      if (tag.parentElement.getAttribute("id") !== null) {
        tag.parentElement.querySelectorAll(".subTask").forEach(
          (elem) => {
            elem.querySelector('span').setAttribute("style", "text-decoration: line-through");
            elem.querySelector('input').checked = true;
          });
      }
    } else {
      text.setAttribute("style", "text-decoration: none");
      if (tag.parentElement.getAttribute("id") !== null) {
        tag.parentElement.querySelectorAll(".subTask").forEach(
          (elem) => {
            elem.querySelector('span').setAttribute("style", "text-decoration: none");
            elem.querySelector('input').checked = false;
          });
      }
    }
  }

  // Присваивание события для чекбоксов
  function CheckEvent() {
    let checks = document.querySelectorAll(".check");
    for (let i = 0; i < checks.length; i++) {
      checks[i].onclick = () => IsChecked(checks[i], checks[i].parentElement);
    }
  }
  CheckEvent();

  // Функция удаления Задачи/Подзадачи
  function DeleteTask(t) {
    let id = t.parentElement.parentElement.getAttribute("id");
    if (id !== null) {
      let subtasks = t.parentElement.parentElement.parentElement;
      let s = null;
      if (subtasks !== null) s = subtasks.querySelector("#" + id);
      if (s !== null) subtasks.removeChild(s);
    } else {
      id = t.parentElement.parentElement.parentElement.getAttribute("id");
      let ts = container.querySelector('#' + id);
      if (ts !== null) container.removeChild(ts);
    }
    if (id === _id) _id = '';
  }

  // Функция добавления событий удаления
  function DeleteEvent() {
    let dels = document.querySelectorAll(".del");
    for (let i = 0; i < dels.length; i++) {
      dels[i].onclick = () => DeleteTask(dels[i]);
    }
  }
  DeleteEvent();

  // Функция выделения и раскрытия подзадач у задачи
  function ExpandEvent() {
    let tasks = container.querySelectorAll(".task");
    tasks.forEach((elem) => {
      let s = elem.querySelector(".subTasks");
      elem.querySelector("span").onclick = () => {
        if (elem.getAttribute('id') !== _id) {
          _id = elem.getAttribute('id');
          s.style.display = "block";
        } else {
          Edite(elem);
        }
        ExpandSubTasks();
      }
    });
  }
  ExpandEvent();

  // Функция скрытия подзадач
  function ExpandSubTasks() {
    if (expand.getAttribute("src") !== "./img/circle-up.png") {
      let tasks = container.querySelectorAll(".task");
      tasks.forEach((elem) => {
        if (elem.getAttribute('id') !== _id) {
          elem.querySelector(".subTasks").style.display = "none";
        }
      });
    }
  }
  ExpandSubTasks();

  // Функция редактирования задач и подзадач
  function Edite(t) {
    let text = t.querySelector('span').innerHTML;
    isEdit = true;

    t.querySelector('span').style.display = 'none';
    t.querySelector('.edit_text').style.display = 'block';
    t.querySelector('.edit_text').value = text;
    t.querySelector('.edit_text').focus();

    t.querySelector('.edit_text').oninput = () => {
      t.querySelector('span').innerHTML = t.querySelector('.edit_text').value;
    };

    t.querySelector('.edit_text').onblur = () => {
      t.querySelector('span').style.display = 'block';
      t.querySelector('.edit_text').style.display = 'none';
    };
  }

  // Добавления события редактирования на все подзадачи и кнопки
  function EventEdite() {
    let subTasks = document.querySelectorAll('.subTask');
    let edits = document.querySelectorAll('.edit');

    edits.forEach((elem) => {
      elem.onclick = () => {
        Edite(elem.parentElement.parentElement);
      }
    });

    subTasks.forEach((elem) => {
      elem.querySelector('span').onclick = () => {
        if (_id === elem.getAttribute('id')) {
          Edite(elem);
        } else {
          _id = elem.getAttribute('id');
        }
      }
    });
  }
  EventEdite();

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
      } else if (e.code === "Enter" && isEdit == false) {
        Add(); // Enter - Добавить новую задачу
      } else if (e.code === "Enter" && isEdit == true) {
        add.focus();
        isEdit = false;
        _id = "";
      } else if (e.code === "Delete") {
        Deleted(); // Del - Удалить все задачи
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

  //Выгрузка данных из LocalStorage
  for (let y = 0; y < data.length; y++) {
    PastTask(data[y].txt, data[y].check);
    for (let i = 0; i < data[y].subArray.length; i++) {
      _id = 't' + (task_length - 1);
      PastSubTask(data[y].subArray[i].txt, data[y].subArray[i].check);
    }
  }
  // -------------------------------------------------------
}; // OnLoadEnd