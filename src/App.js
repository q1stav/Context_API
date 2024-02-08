import { useState } from "react";
import styles from "./App.module.css";
import { useEffect } from "react";
import { ToDos } from "./components/ToDos";
import { ToSort } from "./components/ToSort";
import { ToFind } from "./components/ToFind";
import { AppContext } from "./components/context";

export const App = () => {
  const [toDos, setToDos] = useState([]);
  const [addToDo, setAddToDo] = useState("");
  const [refreshToDoListFlag, setRefreshToDoListFlag] = useState(false);
  const [isSorted, setIsSorted] = useState(false); //Флаг
  const [toFind, setToFind] = useState([]);
  const [findToDo, setFindToDo] = useState([]);
  const [isFind, setIsFind] = useState(false); //Флаг

  const refreshToDoList = () => {
    setRefreshToDoListFlag(!refreshToDoListFlag);
  };
  const refreshIsSorted = () => {
    // Изменить состояния флага для сортировки
    setIsSorted(!isSorted);
  };

  const refreshIsFind = () => {
    // Изменить состояния флага для поиска
    setIsFind(!isFind);
  };

  useEffect(() => {
    fetch("http://localhost:3005/posts")
      .then((response) => response.json())
      .then((loadedToDos) => {
        setToDos(loadedToDos);
      });
  }, [refreshToDoListFlag]);

  const requestAddNewToDo = () => {
    fetch("http://localhost:3005/posts", {
      method: "POST",
      header: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: addToDo,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log(response);
        setAddToDo("");
        refreshToDoList();
      });
  };

  const requestDeleteToDo = (id) => {
    fetch(`http://localhost:3005/posts/${id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log(response);
        refreshToDoList();
      });
  };

  const onClickDelete = (id) => {
    requestDeleteToDo(id);
  };

  const onChange = ({ target }) => {
    setAddToDo(target.value);
  };

  const onChangeFind = ({ target }) => {
    setFindToDo(target.value);
  };

  const find = () => {
    refreshIsFind();
    const newFindArr = [];
    toDos.forEach((item) => {
      if (item.title.toLowerCase().includes(findToDo.toLowerCase())) {
        newFindArr.push(item);
      }
    });
    setToFind(newFindArr);
    setFindToDo("");
    refreshToDoList();
  };
  const userData = toDos;
  return (
    <AppContext.Provider value={userData}>
      <div className={styles.containerToDos}>
        <h1>TODO LIST</h1>
        <div className={styles.inputField}>
          <input
            className={styles.input}
            type="text"
            name="inputAddToDo"
            value={addToDo}
            onChange={onChange}
          />
          <button
            className={styles.button}
            onClick={requestAddNewToDo}
            type="submit"
          >
            Добавить
          </button>
        </div>
        <button
          hidden={!isFind}
          className={styles.cancelButton}
          onClick={() => {
            find();
          }}
          type="submit"
        >
          Отменить поиск
        </button>
        {!isSorted && !isFind && (
          <ToDos
            onClickDelete={onClickDelete}
            refreshToDoList={refreshToDoList}
          />
        )}
        {isSorted && !isFind && (
          <ToSort
            onClickDelete={onClickDelete}
            refreshToDoList={refreshToDoList}
          />
        )}
        {isFind && (
          <ToFind
            toFind={toFind}
            onClickDelete={onClickDelete}
            refreshToDoList={refreshToDoList}
          />
        )}
        <button
          hidden={isFind}
          className={isSorted ? styles.sortButtonClicked : styles.sortButton}
          onClick={refreshIsSorted}
          type="submit"
        >
          Сортировать по алфавиту
        </button>
        <input
          hidden={isFind}
          className={styles.input}
          type="text"
          name="inputAddToDo"
          value={findToDo}
          onChange={onChangeFind}
        />
        <button
          hidden={isFind}
          className={styles.findButton}
          onClick={() => {
            find();
          }}
          type="submit"
        >
          Поиск
        </button>
      </div>
    </AppContext.Provider>
  );
};

export default App;
